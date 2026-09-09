-- LIFEWS Pathways™ explicit Row Level Security and child/commercial firewall

create or replace function public.current_profile_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and active = true;
$$;

create or replace function public.current_profile_site_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select site_id from public.profiles where id = auth.uid() and active = true;
$$;

create or replace function public.is_program_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN'), false);
$$;

create or replace function public.is_safeguarding_authorized()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('SUPER_ADMIN','SAFEGUARDING_LEAD'), false);
$$;

create or replace function public.same_site(target_site uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_program_admin() or public.current_profile_site_id() = target_site;
$$;

-- Sites
create policy "authenticated can read permitted sites" on public.sites
for select to authenticated
using (public.is_program_admin() or id = public.current_profile_site_id());

create policy "program admins manage sites" on public.sites
for all to authenticated
using (public.is_program_admin())
with check (public.is_program_admin());

-- Profiles
create policy "users read own profile" on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_program_admin() or site_id = public.current_profile_site_id());

create policy "program admins manage profiles" on public.profiles
for all to authenticated
using (public.is_program_admin())
with check (public.is_program_admin());

-- Participants
create policy "staff read participants in permitted sites" on public.participants
for select to authenticated
using (public.same_site(site_id));

create policy "authorized staff create participants" on public.participants
for insert to authenticated
with check (
  public.same_site(site_id)
  and public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','COMMUNITY_LIAISON')
);

create policy "authorized staff update participants" on public.participants
for update to authenticated
using (public.same_site(site_id))
with check (
  public.same_site(site_id)
  and public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR')
);

-- Guardian contacts inherit participant site permissions.
create policy "staff read guardian contacts by participant site" on public.guardian_contacts
for select to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = guardian_contacts.participant_id and public.same_site(p.site_id)
));

create policy "authorized staff manage guardian contacts" on public.guardian_contacts
for all to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = guardian_contacts.participant_id and public.same_site(p.site_id)
))
with check (exists (
  select 1 from public.participants p
  where p.id = guardian_contacts.participant_id and public.same_site(p.site_id)
));

-- Baseline assessments
create policy "staff read baseline assessments by participant site" on public.baseline_assessments
for select to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = baseline_assessments.participant_id and public.same_site(p.site_id)
));

create policy "educators manage baseline assessments" on public.baseline_assessments
for all to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = baseline_assessments.participant_id and public.same_site(p.site_id)
))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER')
  and exists (
    select 1 from public.participants p
    where p.id = baseline_assessments.participant_id and public.same_site(p.site_id)
  )
);

-- Attendance
create policy "staff read attendance sessions by site" on public.attendance_sessions
for select to authenticated
using (public.same_site(site_id));

create policy "authorized staff manage attendance sessions" on public.attendance_sessions
for all to authenticated
using (public.same_site(site_id))
with check (
  public.same_site(site_id)
  and public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR')
);

create policy "staff read attendance records by session site" on public.attendance_records
for select to authenticated
using (exists (
  select 1 from public.attendance_sessions s
  where s.id = attendance_records.session_id and public.same_site(s.site_id)
));

create policy "authorized staff manage attendance records" on public.attendance_records
for all to authenticated
using (exists (
  select 1 from public.attendance_sessions s
  where s.id = attendance_records.session_id and public.same_site(s.site_id)
))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR')
  and exists (
    select 1 from public.attendance_sessions s
    where s.id = attendance_records.session_id and public.same_site(s.site_id)
  )
);

-- Curriculum and badges are readable by authenticated users; program admins manage definitions.
create policy "authenticated read curriculum" on public.curriculum_modules
for select to authenticated using (true);
create policy "program admins manage curriculum" on public.curriculum_modules
for all to authenticated using (public.is_program_admin()) with check (public.is_program_admin());

create policy "authenticated read badges" on public.badges
for select to authenticated using (true);
create policy "program admins manage badges" on public.badges
for all to authenticated using (public.is_program_admin()) with check (public.is_program_admin());

-- Participant-linked learning evidence
create policy "staff read competency evidence by participant site" on public.competency_evidence
for select to authenticated
using (exists (select 1 from public.participants p where p.id = competency_evidence.participant_id and public.same_site(p.site_id)));

create policy "educators manage competency evidence" on public.competency_evidence
for all to authenticated
using (exists (select 1 from public.participants p where p.id = competency_evidence.participant_id and public.same_site(p.site_id)))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR','M_AND_E_OFFICER')
  and exists (select 1 from public.participants p where p.id = competency_evidence.participant_id and public.same_site(p.site_id))
);

create policy "staff read participant badges by site" on public.participant_badges
for select to authenticated
using (exists (select 1 from public.participants p where p.id = participant_badges.participant_id and public.same_site(p.site_id)));

create policy "authorized staff award badges" on public.participant_badges
for all to authenticated
using (exists (select 1 from public.participants p where p.id = participant_badges.participant_id and public.same_site(p.site_id)))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR')
  and exists (select 1 from public.participants p where p.id = participant_badges.participant_id and public.same_site(p.site_id))
);

-- Transition data
create policy "transition staff read plans by site" on public.transition_plans
for select to authenticated
using (exists (select 1 from public.participants p where p.id = transition_plans.participant_id and public.same_site(p.site_id)));

create policy "transition officers manage plans" on public.transition_plans
for all to authenticated
using (exists (select 1 from public.participants p where p.id = transition_plans.participant_id and public.same_site(p.site_id)))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','TRANSITION_OFFICER')
  and exists (select 1 from public.participants p where p.id = transition_plans.participant_id and public.same_site(p.site_id))
);

create policy "transition staff read verified transitions by site" on public.verified_transitions
for select to authenticated
using (exists (select 1 from public.participants p where p.id = verified_transitions.participant_id and public.same_site(p.site_id)));

create policy "transition officers manage verified transitions" on public.verified_transitions
for all to authenticated
using (exists (select 1 from public.participants p where p.id = verified_transitions.participant_id and public.same_site(p.site_id)))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','TRANSITION_OFFICER','M_AND_E_OFFICER')
  and exists (select 1 from public.participants p where p.id = verified_transitions.participant_id and public.same_site(p.site_id))
);

-- Adult enterprise referrals: only adult-linked participants and explicitly authorized roles.
create or replace function public.participant_is_adult(target_participant uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    case
      when date_of_birth is not null then date_of_birth <= (current_date - interval '18 years')::date
      when estimated_age_years is not null then estimated_age_years >= 18
      else false
    end,
    false
  )
  from public.participants where id = target_participant;
$$;

create policy "authorized staff read adult enterprise referrals" on public.adult_enterprise_referrals
for select to authenticated
using (
  public.participant_is_adult(participant_id)
  and exists (select 1 from public.participants p where p.id = adult_enterprise_referrals.participant_id and public.same_site(p.site_id))
  and public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','TRANSITION_OFFICER')
);

create policy "authorized staff manage adult enterprise referrals" on public.adult_enterprise_referrals
for all to authenticated
using (
  public.participant_is_adult(participant_id)
  and public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','TRANSITION_OFFICER')
)
with check (
  public.participant_is_adult(participant_id)
  and voluntary_interest_confirmed = true
  and public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','TRANSITION_OFFICER')
);

create or replace function public.enforce_adult_enterprise_referral()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.participant_is_adult(new.participant_id) then
    raise exception 'Adult enterprise referrals require participant age 18 or older.';
  end if;
  if new.voluntary_interest_confirmed is not true then
    raise exception 'Adult enterprise referrals require explicit voluntary interest.';
  end if;
  return new;
end;
$$;

create trigger enforce_adult_enterprise_referral_before_write
before insert or update on public.adult_enterprise_referrals
for each row execute function public.enforce_adult_enterprise_referral();

-- Safeguarding is deliberately isolated and requires explicit safeguarding authorization.
create policy "safeguarding authorized read incidents" on public.safeguarding_incidents
for select to authenticated
using (public.is_safeguarding_authorized());

create policy "safeguarding authorized create incidents" on public.safeguarding_incidents
for insert to authenticated
with check (
  public.is_safeguarding_authorized()
  and reported_by = auth.uid()
);

create policy "safeguarding authorized update incidents" on public.safeguarding_incidents
for update to authenticated
using (public.is_safeguarding_authorized())
with check (public.is_safeguarding_authorized());

revoke all on public.safeguarding_incidents from anon;
