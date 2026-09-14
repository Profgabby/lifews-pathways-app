-- Complete GreenSkills modules only after verified practical evidence and maintain
-- subprogram-level credential eligibility without auto-issuing credentials.

create table if not exists public.greenskills_credential_eligibility (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  subprogram_id uuid not null references public.greenskills_subprograms(id) on delete cascade,
  required_lessons integer not null default 0 check (required_lessons >= 0),
  verified_lessons integer not null default 0 check (verified_lessons >= 0),
  eligible boolean not null default false,
  eligibility_basis text not null default 'ALL_ACTIVE_LESSONS_VERIFIED',
  last_verified_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(participant_id, subprogram_id)
);

alter table public.greenskills_credential_eligibility enable row level security;

drop policy if exists "staff read credential eligibility by site" on public.greenskills_credential_eligibility;
create policy "staff read credential eligibility by site"
on public.greenskills_credential_eligibility for select to authenticated
using (
  exists (
    select 1 from public.participants participant
    where participant.id = participant_id
      and public.same_site(participant.site_id)
  )
);

drop policy if exists "authorized staff manage credential eligibility" on public.greenskills_credential_eligibility;
create policy "authorized staff manage credential eligibility"
on public.greenskills_credential_eligibility for all to authenticated
using (
  exists (
    select 1 from public.participants participant
    where participant.id = participant_id
      and public.same_site(participant.site_id)
  )
)
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER')
  and exists (
    select 1 from public.participants participant
    where participant.id = participant_id
      and public.same_site(participant.site_id)
  )
);

create or replace function public.refresh_greenskills_credential_eligibility(
  p_participant_id uuid,
  p_subprogram_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_required integer;
  v_verified integer;
  v_last timestamptz;
begin
  select count(*)::integer
    into v_required
  from public.greenskills_lessons lesson
  where lesson.subprogram_id = p_subprogram_id
    and lesson.active = true;

  select count(*)::integer, max(assessment.assessed_at)
    into v_verified, v_last
  from public.greenskills_lesson_assessments assessment
  join public.greenskills_lessons lesson on lesson.id = assessment.lesson_id
  where assessment.participant_id = p_participant_id
    and lesson.subprogram_id = p_subprogram_id
    and lesson.active = true
    and assessment.status = 'VERIFIED';

  insert into public.greenskills_credential_eligibility (
    participant_id, subprogram_id, required_lessons, verified_lessons,
    eligible, last_verified_at, updated_at
  ) values (
    p_participant_id, p_subprogram_id, coalesce(v_required,0), coalesce(v_verified,0),
    coalesce(v_required,0) > 0 and coalesce(v_verified,0) = coalesce(v_required,0),
    v_last, now()
  )
  on conflict (participant_id, subprogram_id) do update
  set required_lessons = excluded.required_lessons,
      verified_lessons = excluded.verified_lessons,
      eligible = excluded.eligible,
      last_verified_at = excluded.last_verified_at,
      updated_at = now();
end;
$$;

create or replace function public.sync_greenskills_completion_after_assessment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_subprogram_id uuid;
begin
  select lesson.subprogram_id into v_subprogram_id
  from public.greenskills_lessons lesson
  where lesson.id = new.lesson_id;

  if new.status = 'VERIFIED' then
    update public.learner_module_progress progress
    set highest_stage = 7,
        current_stage = 7,
        status = 'COMPLETED',
        practical_viewed_at = coalesce(progress.practical_viewed_at, now()),
        last_activity_at = now(),
        updated_at = now()
    where progress.participant_id = new.participant_id
      and progress.lesson_id = new.lesson_id;
  elsif new.status = 'REQUIRES_REMEDIATION' then
    update public.learner_module_progress progress
    set status = 'PRACTICAL_PENDING',
        last_activity_at = now(),
        updated_at = now()
    where progress.participant_id = new.participant_id
      and progress.lesson_id = new.lesson_id
      and progress.status <> 'COMPLETED';
  end if;

  if v_subprogram_id is not null then
    perform public.refresh_greenskills_credential_eligibility(new.participant_id, v_subprogram_id);
  end if;

  return new;
end;
$$;

drop trigger if exists sync_greenskills_completion_after_assessment on public.greenskills_lesson_assessments;
create trigger sync_greenskills_completion_after_assessment
after insert or update of status on public.greenskills_lesson_assessments
for each row execute function public.sync_greenskills_completion_after_assessment();

-- Backfill eligibility from existing verified assessment records.
insert into public.greenskills_credential_eligibility (
  participant_id, subprogram_id, required_lessons, verified_lessons, eligible, last_verified_at
)
select
  participant.id,
  subprogram.id,
  (select count(*)::integer from public.greenskills_lessons lesson where lesson.subprogram_id=subprogram.id and lesson.active=true),
  (select count(*)::integer
     from public.greenskills_lesson_assessments assessment
     join public.greenskills_lessons lesson on lesson.id=assessment.lesson_id
    where assessment.participant_id=participant.id
      and lesson.subprogram_id=subprogram.id
      and lesson.active=true
      and assessment.status='VERIFIED'),
  ((select count(*) from public.greenskills_lessons lesson where lesson.subprogram_id=subprogram.id and lesson.active=true) > 0
   and
   (select count(*)
      from public.greenskills_lesson_assessments assessment
      join public.greenskills_lessons lesson on lesson.id=assessment.lesson_id
     where assessment.participant_id=participant.id
       and lesson.subprogram_id=subprogram.id
       and lesson.active=true
       and assessment.status='VERIFIED')
   =
   (select count(*) from public.greenskills_lessons lesson where lesson.subprogram_id=subprogram.id and lesson.active=true)),
  (select max(assessment.assessed_at)
     from public.greenskills_lesson_assessments assessment
     join public.greenskills_lessons lesson on lesson.id=assessment.lesson_id
    where assessment.participant_id=participant.id
      and lesson.subprogram_id=subprogram.id
      and assessment.status='VERIFIED')
from public.participants participant
cross join public.greenskills_subprograms subprogram
where exists (
  select 1 from public.greenskills_enrollments enrollment
  where enrollment.participant_id=participant.id
    and enrollment.subprogram_id=subprogram.id
)
on conflict(participant_id,subprogram_id) do update
set required_lessons=excluded.required_lessons,
    verified_lessons=excluded.verified_lessons,
    eligible=excluded.eligible,
    last_verified_at=excluded.last_verified_at,
    updated_at=now();

revoke all on function public.refresh_greenskills_credential_eligibility(uuid,uuid) from public, anon, authenticated;
revoke all on function public.sync_greenskills_completion_after_assessment() from public, anon, authenticated;
