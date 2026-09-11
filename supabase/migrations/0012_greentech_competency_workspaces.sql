-- LIFEWS GreenTech module workspace extensions.
-- Scope: GreenTech only. Uses the existing GreenSkills participant, lesson, FieldWorks,
-- Skills Passport and credential architecture from migration 0011.

create table if not exists public.greentech_practical_assessments (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid not null references public.greenskills_lessons(id) on delete cascade,
  attempt_no integer not null default 1 check (attempt_no > 0),
  safety_gate_passed boolean,
  critical_safety_failure boolean not null default false,
  preparation_status text check (preparation_status in ('ND','A','C','I')),
  safety_status text check (safety_status in ('ND','A','C','I')),
  tools_status text check (tools_status in ('ND','A','C','I')),
  measurement_status text check (measurement_status in ('ND','A','C','I')),
  execution_status text check (execution_status in ('ND','A','C','I')),
  testing_status text check (testing_status in ('ND','A','C','I')),
  troubleshooting_status text check (troubleshooting_status in ('ND','A','C','I')),
  documentation_status text check (documentation_status in ('ND','A','C','I')),
  communication_status text check (communication_status in ('ND','A','C','I')),
  competency_rating integer check (competency_rating between 0 and 5),
  decision text not null default 'IN_PROGRESS' check (decision in ('IN_PROGRESS','COMPETENT','REMEDIATION_REQUIRED','REASSESSMENT_REQUIRED')),
  assessor_notes text,
  evidence_ids text[],
  assessed_by uuid references public.profiles(id),
  assessed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(participant_id, lesson_id, attempt_no)
);

create table if not exists public.greentech_ai_work_logs (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid not null references public.greenskills_lessons(id) on delete cascade,
  ai_layer integer check (ai_layer between 1 and 5),
  task text not null,
  input_summary text,
  ai_use text,
  output_summary text,
  verification_method text,
  errors_or_limitations text,
  correction text,
  final_decision text not null,
  privacy_check boolean not null default false,
  independent_reasoning_verified boolean not null default false,
  status text not null default 'SUBMITTED' check (status in ('DRAFT','SUBMITTED','VERIFIED','REQUIRES_REMEDIATION')),
  verified_by uuid references public.profiles(id),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.greentech_enterprise_tasks (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid not null references public.greenskills_lessons(id) on delete cascade,
  customer_type text,
  customer_problem text not null,
  service_scope text not null,
  deliverables text,
  exclusions text,
  materials_cost numeric(12,2) not null default 0,
  consumables_cost numeric(12,2) not null default 0,
  labor_cost numeric(12,2) not null default 0,
  transport_cost numeric(12,2) not null default 0,
  equipment_allowance numeric(12,2) not null default 0,
  overhead_cost numeric(12,2) not null default 0,
  contingency_cost numeric(12,2) not null default 0,
  customer_price numeric(12,2),
  after_service text,
  evidence_ids text[],
  competency_rating integer check (competency_rating between 0 and 5),
  status text not null default 'DRAFT' check (status in ('DRAFT','SUBMITTED','VERIFIED','REQUIRES_REMEDIATION')),
  assessed_by uuid references public.profiles(id),
  assessed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.greentech_remediation_records (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid not null references public.greenskills_lessons(id) on delete cascade,
  domain_code text references public.competency_domains(code),
  competency_gap text not null,
  assigned_practice text not null,
  evidence_required text,
  safety_conditions text,
  reassessment_method text,
  target_date date,
  status text not null default 'OPEN' check (status in ('OPEN','READY_FOR_REASSESSMENT','CLOSED')),
  outcome text,
  assigned_by uuid references public.profiles(id),
  closed_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

alter table public.greentech_practical_assessments enable row level security;
alter table public.greentech_ai_work_logs enable row level security;
alter table public.greentech_enterprise_tasks enable row level security;
alter table public.greentech_remediation_records enable row level security;

create policy "staff read GreenTech practical assessments by site"
on public.greentech_practical_assessments for select to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "authorized staff manage GreenTech practical assessments"
on public.greentech_practical_assessments for all to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)))
with check (public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "staff read GreenTech AI logs by site"
on public.greentech_ai_work_logs for select to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "authorized staff manage GreenTech AI logs"
on public.greentech_ai_work_logs for all to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)))
with check (public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "staff read GreenTech enterprise tasks by site"
on public.greentech_enterprise_tasks for select to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "authorized staff manage GreenTech enterprise tasks"
on public.greentech_enterprise_tasks for all to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)))
with check (public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','TRANSITION_OFFICER','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "staff read GreenTech remediation by site"
on public.greentech_remediation_records for select to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "authorized staff manage GreenTech remediation"
on public.greentech_remediation_records for all to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)))
with check (public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create index if not exists greentech_practical_participant_lesson_idx on public.greentech_practical_assessments(participant_id,lesson_id);
create index if not exists greentech_ai_participant_lesson_idx on public.greentech_ai_work_logs(participant_id,lesson_id);
create index if not exists greentech_enterprise_participant_lesson_idx on public.greentech_enterprise_tasks(participant_id,lesson_id);
create index if not exists greentech_remediation_participant_lesson_idx on public.greentech_remediation_records(participant_id,lesson_id);
