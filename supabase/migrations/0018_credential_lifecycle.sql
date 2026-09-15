-- LIFEWS GreenSkills credential lifecycle management.

alter table public.greenskills_credentials
  add column if not exists revoked_at timestamptz,
  add column if not exists revoked_by uuid references public.profiles(id),
  add column if not exists revocation_reason text,
  add column if not exists supersedes_credential_id uuid references public.greenskills_credentials(id),
  add column if not exists lifecycle_updated_at timestamptz not null default now();

create table if not exists public.greenskills_credential_events (
  id uuid primary key default gen_random_uuid(),
  credential_id uuid not null references public.greenskills_credentials(id) on delete cascade,
  event_type text not null check (event_type in ('ISSUED','REVOKED','REISSUED','STATUS_CHANGED')),
  detail text,
  actor_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

alter table public.greenskills_credential_events enable row level security;

drop policy if exists "staff read credential events by site" on public.greenskills_credential_events;
create policy "staff read credential events by site"
on public.greenskills_credential_events for select to authenticated
using (exists(
  select 1 from public.greenskills_credentials c
  join public.participants p on p.id=c.participant_id
  where c.id=credential_id and public.same_site(p.site_id)
));

insert into public.greenskills_credential_events(credential_id,event_type,detail,actor_id,created_at)
select c.id,'ISSUED','Credential issued',c.issued_by,c.issued_at::timestamptz
from public.greenskills_credentials c
where not exists(select 1 from public.greenskills_credential_events e where e.credential_id=c.id and e.event_type='ISSUED');

create or replace function public.revoke_greenskills_credential(
  p_credential_id uuid,
  p_reason text
)
returns void
language plpgsql
security definer
set search_path=public
as $$
declare
  v_role public.user_role;
  v_site uuid;
  v_participant_site uuid;
  v_status text;
begin
  select role,site_id into v_role,v_site from public.profiles where id=auth.uid() and active=true;
  if v_role is null or v_role not in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR') then
    raise exception 'Not authorized to revoke GreenSkills credentials';
  end if;
  if nullif(btrim(coalesce(p_reason,'')),'') is null then
    raise exception 'A revocation reason is required';
  end if;

  select p.site_id,c.verification_status into v_participant_site,v_status
  from public.greenskills_credentials c
  join public.participants p on p.id=c.participant_id
  where c.id=p_credential_id;
  if v_status is null then raise exception 'Credential not found'; end if;
  if v_role='SITE_COORDINATOR' and v_site is distinct from v_participant_site then
    raise exception 'Credential holder is outside your assigned site';
  end if;
  if v_status <> 'VALID' then raise exception 'Only a valid credential can be revoked'; end if;

  update public.greenskills_credentials
  set verification_status='REVOKED',revoked_at=now(),revoked_by=auth.uid(),revocation_reason=btrim(p_reason),lifecycle_updated_at=now()
  where id=p_credential_id;

  insert into public.greenskills_credential_events(credential_id,event_type,detail,actor_id)
  values(p_credential_id,'REVOKED',btrim(p_reason),auth.uid());
end;
$$;

create or replace function public.reissue_greenskills_credential(
  p_credential_id uuid,
  p_reason text default null
)
returns text
language plpgsql
security definer
set search_path=public
as $$
declare
  v_old public.greenskills_credentials%rowtype;
  v_role public.user_role;
  v_site uuid;
  v_participant_site uuid;
  v_code text;
  v_eligible boolean;
begin
  select role,site_id into v_role,v_site from public.profiles where id=auth.uid() and active=true;
  if v_role is null or v_role not in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR') then
    raise exception 'Not authorized to reissue GreenSkills credentials';
  end if;

  select * into v_old from public.greenskills_credentials where id=p_credential_id;
  if not found then raise exception 'Credential not found'; end if;
  if v_old.verification_status <> 'REVOKED' then raise exception 'Only a revoked credential can be reissued'; end if;

  select site_id into v_participant_site from public.participants where id=v_old.participant_id and active=true;
  if v_participant_site is null then raise exception 'Active participant not found'; end if;
  if v_role='SITE_COORDINATOR' and v_site is distinct from v_participant_site then
    raise exception 'Credential holder is outside your assigned site';
  end if;

  if v_old.subprogram_id is not null then
    perform public.refresh_greenskills_credential_eligibility(v_old.participant_id,v_old.subprogram_id);
    select eligible into v_eligible from public.greenskills_credential_eligibility
    where participant_id=v_old.participant_id and subprogram_id=v_old.subprogram_id;
    if not coalesce(v_eligible,false) then raise exception 'Credential requirements are no longer satisfied'; end if;
  end if;

  v_code := 'LGS-' || to_char(current_date,'YYYY') || '-' || upper(encode(gen_random_bytes(6),'hex'));
  insert into public.greenskills_credentials(
    participant_id,program_id,subprogram_id,credential_type,title,credential_code,qr_payload,
    issued_at,expires_at,file_url,verification_status,issued_by,supersedes_credential_id,lifecycle_updated_at
  ) values (
    v_old.participant_id,v_old.program_id,v_old.subprogram_id,v_old.credential_type,v_old.title,v_code,
    'LIFEWS-GREENSKILLS|' || v_code,current_date,v_old.expires_at,v_old.file_url,'VALID',auth.uid(),v_old.id,now()
  );

  insert into public.greenskills_credential_events(credential_id,event_type,detail,actor_id)
  select id,'REISSUED',coalesce(nullif(btrim(p_reason),''),'Reissued from ' || v_old.credential_code),auth.uid()
  from public.greenskills_credentials where credential_code=v_code;
  return v_code;
end;
$$;

revoke all on public.greenskills_credential_events from anon;
revoke all on function public.revoke_greenskills_credential(uuid,text) from public,anon;
grant execute on function public.revoke_greenskills_credential(uuid,text) to authenticated;
revoke all on function public.reissue_greenskills_credential(uuid,text) from public,anon;
grant execute on function public.reissue_greenskills_credential(uuid,text) to authenticated;
