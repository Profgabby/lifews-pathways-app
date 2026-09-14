-- LIFEWS GreenSkills credential requirements, FieldWorks-aware eligibility,
-- staff-controlled issuance, and public verification.

create table if not exists public.greenskills_credential_requirements (
  id uuid primary key default gen_random_uuid(),
  subprogram_id uuid unique not null references public.greenskills_subprograms(id) on delete cascade,
  require_all_lessons_verified boolean not null default true,
  require_fieldworks boolean not null default true,
  require_completed_placement boolean not null default true,
  minimum_verified_hours numeric(10,2),
  active boolean not null default true,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now(),
  check (minimum_verified_hours is null or minimum_verified_hours >= 0)
);

insert into public.greenskills_credential_requirements(subprogram_id)
select id from public.greenskills_subprograms
on conflict(subprogram_id) do nothing;

alter table public.greenskills_credential_requirements enable row level security;

drop policy if exists "staff read credential requirements" on public.greenskills_credential_requirements;
create policy "staff read credential requirements"
on public.greenskills_credential_requirements for select to authenticated using(true);

drop policy if exists "admins manage credential requirements" on public.greenskills_credential_requirements;
create policy "admins manage credential requirements"
on public.greenskills_credential_requirements for all to authenticated
using (public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN'))
with check (public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN'));

alter table public.greenskills_credential_eligibility
  add column if not exists curriculum_complete boolean not null default false,
  add column if not exists fieldwork_required boolean not null default true,
  add column if not exists required_field_hours numeric(10,2) not null default 0,
  add column if not exists verified_field_hours numeric(10,2) not null default 0,
  add column if not exists completed_placements integer not null default 0,
  add column if not exists fieldwork_complete boolean not null default false;

create or replace function public.refresh_greenskills_credential_eligibility(
  p_participant_id uuid,
  p_subprogram_id uuid
)
returns void
language plpgsql
security definer
set search_path=public
as $$
declare
  v_required_lessons integer := 0;
  v_verified_lessons integer := 0;
  v_last timestamptz;
  v_require_all boolean := true;
  v_require_fieldworks boolean := true;
  v_require_completed boolean := true;
  v_min_hours numeric := null;
  v_assigned_required numeric := 0;
  v_verified_hours numeric := 0;
  v_completed integer := 0;
  v_curriculum_complete boolean := false;
  v_fieldwork_complete boolean := false;
  v_eligible boolean := false;
begin
  select count(*)::integer into v_required_lessons
  from public.greenskills_lessons lesson
  where lesson.subprogram_id=p_subprogram_id and lesson.active=true;

  select count(*)::integer,max(assessment.assessed_at)
    into v_verified_lessons,v_last
  from public.greenskills_lesson_assessments assessment
  join public.greenskills_lessons lesson on lesson.id=assessment.lesson_id
  where assessment.participant_id=p_participant_id
    and lesson.subprogram_id=p_subprogram_id
    and lesson.active=true
    and assessment.status='VERIFIED';

  select requirement.require_all_lessons_verified,
         requirement.require_fieldworks,
         requirement.require_completed_placement,
         requirement.minimum_verified_hours
    into v_require_all,v_require_fieldworks,v_require_completed,v_min_hours
  from public.greenskills_credential_requirements requirement
  where requirement.subprogram_id=p_subprogram_id and requirement.active=true;

  if not found then
    v_require_all := true;
    v_require_fieldworks := true;
    v_require_completed := true;
    v_min_hours := null;
  end if;

  select coalesce(sum(placement.required_hours),0),
         coalesce(sum(placement.verified_hours),0),
         count(*) filter(where placement.status='COMPLETED')::integer
    into v_assigned_required,v_verified_hours,v_completed
  from public.fieldwork_placements placement
  where placement.participant_id=p_participant_id
    and placement.subprogram_id=p_subprogram_id
    and placement.status <> 'CANCELLED';

  v_curriculum_complete := case
    when not v_require_all then true
    else v_required_lessons > 0 and v_verified_lessons=v_required_lessons
  end;

  if not v_require_fieldworks then
    v_fieldwork_complete := true;
  else
    v_fieldwork_complete :=
      (not v_require_completed or v_completed > 0)
      and v_verified_hours >= greatest(v_assigned_required,coalesce(v_min_hours,0));
  end if;

  v_eligible := v_curriculum_complete and v_fieldwork_complete;

  insert into public.greenskills_credential_eligibility(
    participant_id,subprogram_id,required_lessons,verified_lessons,eligible,
    eligibility_basis,last_verified_at,updated_at,curriculum_complete,
    fieldwork_required,required_field_hours,verified_field_hours,completed_placements,fieldwork_complete
  ) values (
    p_participant_id,p_subprogram_id,v_required_lessons,v_verified_lessons,v_eligible,
    'CURRICULUM_AND_FIELDWORK_REQUIREMENTS',v_last,now(),v_curriculum_complete,
    v_require_fieldworks,greatest(v_assigned_required,coalesce(v_min_hours,0)),v_verified_hours,v_completed,v_fieldwork_complete
  )
  on conflict(participant_id,subprogram_id) do update set
    required_lessons=excluded.required_lessons,
    verified_lessons=excluded.verified_lessons,
    eligible=excluded.eligible,
    eligibility_basis=excluded.eligibility_basis,
    last_verified_at=excluded.last_verified_at,
    updated_at=now(),
    curriculum_complete=excluded.curriculum_complete,
    fieldwork_required=excluded.fieldwork_required,
    required_field_hours=excluded.required_field_hours,
    verified_field_hours=excluded.verified_field_hours,
    completed_placements=excluded.completed_placements,
    fieldwork_complete=excluded.fieldwork_complete;
end;
$$;

create or replace function public.sync_credential_eligibility_after_fieldwork()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if coalesce(new.subprogram_id,old.subprogram_id) is not null then
    perform public.refresh_greenskills_credential_eligibility(
      coalesce(new.participant_id,old.participant_id),
      coalesce(new.subprogram_id,old.subprogram_id)
    );
  end if;
  return coalesce(new,old);
end;
$$;

drop trigger if exists sync_credential_eligibility_after_fieldwork on public.fieldwork_placements;
create trigger sync_credential_eligibility_after_fieldwork
after insert or update or delete on public.fieldwork_placements
for each row execute function public.sync_credential_eligibility_after_fieldwork();

create or replace function public.issue_greenskills_credential(
  p_participant_id uuid,
  p_subprogram_id uuid,
  p_credential_type text default 'CERTIFICATE',
  p_title text default null
)
returns text
language plpgsql
security definer
set search_path=public
as $$
declare
  v_role public.user_role;
  v_site uuid;
  v_participant_site uuid;
  v_program_id uuid;
  v_subprogram_name text;
  v_eligible boolean;
  v_code text;
  v_title text;
begin
  select role,site_id into v_role,v_site
  from public.profiles where id=auth.uid() and active=true;

  if v_role is null or v_role not in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR') then
    raise exception 'Not authorized to issue GreenSkills credentials';
  end if;

  select site_id into v_participant_site from public.participants
  where id=p_participant_id and active=true;
  if v_participant_site is null then raise exception 'Active participant not found'; end if;
  if v_role='SITE_COORDINATOR' and v_site is distinct from v_participant_site then
    raise exception 'Participant is outside your assigned site';
  end if;

  perform public.refresh_greenskills_credential_eligibility(p_participant_id,p_subprogram_id);
  select eligible into v_eligible from public.greenskills_credential_eligibility
  where participant_id=p_participant_id and subprogram_id=p_subprogram_id;
  if not coalesce(v_eligible,false) then
    raise exception 'Credential requirements are not yet satisfied';
  end if;

  if p_credential_type not in ('BADGE','CERTIFICATE','AWARD') then
    raise exception 'Invalid credential type';
  end if;

  select program_id,name into v_program_id,v_subprogram_name
  from public.greenskills_subprograms where id=p_subprogram_id and active=true;
  if v_program_id is null then raise exception 'Active subprogram not found'; end if;

  if exists(
    select 1 from public.greenskills_credentials c
    where c.participant_id=p_participant_id and c.subprogram_id=p_subprogram_id
      and c.credential_type=p_credential_type and c.verification_status='VALID'
  ) then
    raise exception 'A valid credential of this type already exists for this subprogram';
  end if;

  v_code := 'LGS-' || to_char(current_date,'YYYY') || '-' || upper(encode(gen_random_bytes(6),'hex'));
  v_title := coalesce(nullif(btrim(p_title),''),v_subprogram_name || ' ' || initcap(lower(p_credential_type)));

  insert into public.greenskills_credentials(
    participant_id,program_id,subprogram_id,credential_type,title,credential_code,
    qr_payload,issued_at,verification_status,issued_by
  ) values (
    p_participant_id,v_program_id,p_subprogram_id,p_credential_type,v_title,v_code,
    'LIFEWS-GREENSKILLS|' || v_code,current_date,'VALID',auth.uid()
  );

  return v_code;
end;
$$;

create or replace function public.verify_greenskills_credential(p_credential_code text)
returns table(
  credential_code text,
  credential_type text,
  title text,
  holder_name text,
  participant_code text,
  program_name text,
  subprogram_code text,
  subprogram_name text,
  issued_at date,
  expires_at date,
  verification_status text
)
language sql
security definer
set search_path=public
as $$
  select c.credential_code,c.credential_type,c.title,
         p.preferred_name,p.participant_code,
         gp.name,gs.code,gs.name,c.issued_at,c.expires_at,c.verification_status
  from public.greenskills_credentials c
  join public.participants p on p.id=c.participant_id
  left join public.greenskills_programs gp on gp.id=c.program_id
  left join public.greenskills_subprograms gs on gs.id=c.subprogram_id
  where upper(c.credential_code)=upper(btrim(coalesce(p_credential_code,'')))
  limit 1;
$$;

-- Recalculate all current eligibility records using the new requirements.
do $$ declare r record; begin
  for r in select participant_id,subprogram_id from public.greenskills_credential_eligibility loop
    perform public.refresh_greenskills_credential_eligibility(r.participant_id,r.subprogram_id);
  end loop;
end $$;

revoke all on function public.issue_greenskills_credential(uuid,uuid,text,text) from public,anon;
grant execute on function public.issue_greenskills_credential(uuid,uuid,text,text) to authenticated;
revoke all on function public.verify_greenskills_credential(text) from public;
grant execute on function public.verify_greenskills_credential(text) to anon,authenticated;
revoke all on function public.refresh_greenskills_credential_eligibility(uuid,uuid) from public,anon,authenticated;
revoke all on function public.sync_credential_eligibility_after_fieldwork() from public,anon,authenticated;
