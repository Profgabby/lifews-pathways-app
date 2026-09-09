-- LIFEWS Pathways™ progress assessment and KPI support
-- Adds repeatable learning assessments so literacy/numeracy progression can be measured
-- without overwriting the enrollment baseline.

create table public.progress_assessments (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  assessment_type text not null check (assessment_type in ('MIDLINE','ENDLINE','FOLLOW_UP')),
  literacy_level integer check (literacy_level between 0 and 5),
  numeracy_level integer check (numeracy_level between 0 and 5),
  digital_level integer check (digital_level between 0 and 5),
  applied_skills_level integer check (applied_skills_level between 0 and 5),
  evidence_note text,
  assessed_by uuid references public.profiles(id),
  assessed_at timestamptz not null default now()
);

create index progress_assessments_participant_idx
  on public.progress_assessments(participant_id, assessed_at desc);

alter table public.progress_assessments enable row level security;

create policy "staff read progress assessments by participant site"
on public.progress_assessments
for select to authenticated
using (
  exists (
    select 1 from public.participants p
    where p.id = progress_assessments.participant_id
      and public.same_site(p.site_id)
  )
);

create policy "authorized staff manage progress assessments"
on public.progress_assessments
for all to authenticated
using (
  exists (
    select 1 from public.participants p
    where p.id = progress_assessments.participant_id
      and public.same_site(p.site_id)
  )
)
with check (
  public.current_profile_role() in (
    'SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER'
  )
  and exists (
    select 1 from public.participants p
    where p.id = progress_assessments.participant_id
      and public.same_site(p.site_id)
  )
);
