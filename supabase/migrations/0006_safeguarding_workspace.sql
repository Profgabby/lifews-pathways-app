-- LIFEWS Pathways™ safeguarding workspace expansion
-- Restricted case-management support for authorized safeguarding roles only.

create table public.safeguarding_actions (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid not null references public.safeguarding_incidents(id) on delete cascade,
  action_type text not null check (action_type in ('IMMEDIATE_SAFETY','REFERRAL','FOLLOW_UP','CASE_REVIEW','CLOSURE_NOTE')),
  action_note text not null,
  receiving_service text,
  follow_up_date date,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.safeguarding_audit_log (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.safeguarding_incidents(id) on delete cascade,
  actor_id uuid not null references public.profiles(id),
  action text not null,
  detail text,
  created_at timestamptz not null default now()
);

alter table public.safeguarding_actions enable row level security;
alter table public.safeguarding_audit_log enable row level security;

create policy "safeguarding authorized read incidents"
on public.safeguarding_incidents
for select to authenticated
using (
  public.is_safeguarding_authorized()
  and public.same_site(site_id)
);

create policy "safeguarding authorized create incidents"
on public.safeguarding_incidents
for insert to authenticated
with check (
  public.is_safeguarding_authorized()
  and public.same_site(site_id)
);

create policy "safeguarding authorized update incidents"
on public.safeguarding_incidents
for update to authenticated
using (
  public.is_safeguarding_authorized()
  and public.same_site(site_id)
)
with check (
  public.is_safeguarding_authorized()
  and public.same_site(site_id)
);

create policy "safeguarding authorized manage actions"
on public.safeguarding_actions
for all to authenticated
using (
  public.is_safeguarding_authorized()
  and exists (
    select 1 from public.safeguarding_incidents i
    where i.id = safeguarding_actions.incident_id
      and public.same_site(i.site_id)
  )
)
with check (
  public.is_safeguarding_authorized()
  and exists (
    select 1 from public.safeguarding_incidents i
    where i.id = safeguarding_actions.incident_id
      and public.same_site(i.site_id)
  )
);

create policy "safeguarding authorized read audit"
on public.safeguarding_audit_log
for select to authenticated
using (
  public.is_safeguarding_authorized()
  and (
    incident_id is null
    or exists (
      select 1 from public.safeguarding_incidents i
      where i.id = safeguarding_audit_log.incident_id
        and public.same_site(i.site_id)
    )
  )
);

create policy "safeguarding authorized create audit"
on public.safeguarding_audit_log
for insert to authenticated
with check (public.is_safeguarding_authorized());

create or replace function public.log_safeguarding_audit(
  p_incident_id uuid,
  p_action text,
  p_detail text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_safeguarding_authorized() then
    raise exception 'Not authorized for safeguarding records';
  end if;

  insert into public.safeguarding_audit_log (incident_id, actor_id, action, detail)
  values (p_incident_id, auth.uid(), p_action, p_detail);
end;
$$;

grant execute on function public.log_safeguarding_audit(uuid, text, text) to authenticated;
