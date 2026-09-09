-- LIFEWS GreenSkills program, Skills Passport, FieldWorks and opportunity architecture.
-- Non-destructive: retains public.participants, public.profiles, safeguarding and existing Pathways records.

create table if not exists public.greenskills_programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug in ('pathways','kadara','greentech')),
  name text not null,
  tagline text,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.greenskills_subprograms (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.greenskills_programs(id) on delete cascade,
  slug text unique not null,
  code text unique not null,
  name text not null,
  target_age_level text not null,
  purpose text not null,
  sequence_no integer not null check (sequence_no between 1 and 9),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.greenskills_lessons (
  id uuid primary key default gen_random_uuid(),
  subprogram_id uuid not null references public.greenskills_subprograms(id) on delete cascade,
  lesson_code text unique not null,
  sequence_no integer not null check (sequence_no between 1 and 12),
  title text not null,
  competency_focus text not null,
  diy_task text not null,
  minimum_evidence text not null,
  gender_delivery_standard text not null,
  active boolean not null default true,
  unique(subprogram_id, sequence_no)
);

create table if not exists public.greenskills_standards (
  id uuid primary key default gen_random_uuid(),
  standard_key text unique not null,
  title text not null,
  body text not null,
  active boolean not null default true
);

create table if not exists public.competency_domains (
  code text primary key check (code in ('K','P','D','S','E','L')),
  name text not null,
  description text not null
);

create table if not exists public.greenskills_enrollments (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  program_id uuid not null references public.greenskills_programs(id),
  subprogram_id uuid references public.greenskills_subprograms(id),
  cohort_label text,
  status text not null default 'ACTIVE' check (status in ('APPLIED','ACTIVE','PAUSED','COMPLETED','TRANSITIONED','WITHDRAWN')),
  started_at date not null default current_date,
  completed_at date,
  transition_destination text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create unique index if not exists greenskills_one_open_enrollment
on public.greenskills_enrollments(participant_id, program_id, coalesce(subprogram_id, '00000000-0000-0000-0000-000000000000'::uuid))
where status in ('APPLIED','ACTIVE','PAUSED');

create table if not exists public.skills_passports (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid unique not null references public.participants(id) on delete cascade,
  passport_code text unique not null,
  knowledge_score numeric(5,2) not null default 0 check (knowledge_score between 0 and 100),
  practical_score numeric(5,2) not null default 0 check (practical_score between 0 and 100),
  data_digital_score numeric(5,2) not null default 0 check (data_digital_score between 0 and 100),
  safety_score numeric(5,2) not null default 0 check (safety_score between 0 and 100),
  enterprise_employability_score numeric(5,2) not null default 0 check (enterprise_employability_score between 0 and 100),
  leadership_score numeric(5,2) not null default 0 check (leadership_score between 0 and 100),
  verified_field_hours numeric(10,2) not null default 0,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','PAUSED','ARCHIVED')),
  issued_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.greenskills_lesson_assessments (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid not null references public.greenskills_lessons(id) on delete cascade,
  knowledge_score numeric(5,2) check (knowledge_score between 0 and 100),
  practical_rating integer check (practical_rating between 0 and 5),
  data_digital_rating integer check (data_digital_rating between 0 and 5),
  safety_rating integer check (safety_rating between 0 and 5),
  enterprise_employability_rating integer check (enterprise_employability_rating between 0 and 5),
  leadership_rating integer check (leadership_rating between 0 and 5),
  theory_score numeric(5,2) check (theory_score between 0 and 100),
  mcq_score numeric(5,2) check (mcq_score between 0 and 100),
  evidence_note text,
  evidence_url text,
  status text not null default 'IN_PROGRESS' check (status in ('NOT_STARTED','IN_PROGRESS','SUBMITTED','VERIFIED','REQUIRES_REMEDIATION')),
  assessed_by uuid references public.profiles(id),
  assessed_at timestamptz,
  unique(participant_id, lesson_id)
);

create table if not exists public.fieldwork_placements (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  program_id uuid references public.greenskills_programs(id),
  subprogram_id uuid references public.greenskills_subprograms(id),
  site_id uuid references public.sites(id),
  site_type text not null check (site_type in ('AGRIHUB','SCHOOL','FARM','IRRIGATION','PROCESSING','WORKSHOP','FEW_INSTALLATION','COMMUNITY','PARTNER','OTHER')),
  site_name text not null,
  supervisor_name text,
  supervisor_profile_id uuid references public.profiles(id),
  start_date date,
  end_date date,
  required_hours numeric(10,2) not null default 0,
  verified_hours numeric(10,2) not null default 0,
  status text not null default 'PLANNED' check (status in ('PLANNED','ACTIVE','COMPLETED','CANCELLED')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.fieldwork_evidence (
  id uuid primary key default gen_random_uuid(),
  placement_id uuid not null references public.fieldwork_placements(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid references public.greenskills_lessons(id),
  evidence_type text not null check (evidence_type in ('FIELD_LOG','SUPERVISOR_OBSERVATION','PHOTO','VIDEO','MEASUREMENT','INSTALLATION_CHECKLIST','GARDEN_RECORD','COMMISSIONING_SHEET','CUSTOMER_SERVICE','ENTERPRISE_RECORD','MAINTENANCE_REPORT','OTHER')),
  title text not null,
  description text,
  file_url text,
  verification_status text not null default 'PENDING' check (verification_status in ('PENDING','VERIFIED','REJECTED')),
  verified_by uuid references public.profiles(id),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.greenskills_credentials (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  program_id uuid references public.greenskills_programs(id),
  subprogram_id uuid references public.greenskills_subprograms(id),
  credential_type text not null check (credential_type in ('BADGE','CERTIFICATE','AWARD')),
  title text not null,
  credential_code text unique not null,
  qr_payload text,
  issued_at date not null default current_date,
  expires_at date,
  file_url text,
  verification_status text not null default 'VALID' check (verification_status in ('VALID','EXPIRED','REVOKED')),
  issued_by uuid references public.profiles(id)
);

create table if not exists public.greenskills_opportunities (
  id uuid primary key default gen_random_uuid(),
  opportunity_type text not null check (opportunity_type in ('APPRENTICESHIP','INTERNSHIP','JOB','COOPERATIVE','ENTERPRISE','COMMUNITY_SERVICE','ADVANCED_TRAINING')),
  title text not null,
  organization text,
  location text,
  description text,
  requirements text,
  minimum_age integer check (minimum_age is null or minimum_age between 12 and 100),
  commercial_activity boolean not null default false,
  active boolean not null default true,
  closes_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.greenskills_opportunity_applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.greenskills_opportunities(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  status text not null default 'SUBMITTED' check (status in ('SUBMITTED','REVIEWING','SHORTLISTED','PLACED','DECLINED','WITHDRAWN')),
  applied_by uuid references public.profiles(id),
  applied_at timestamptz not null default now(),
  unique(opportunity_id, participant_id)
);

create or replace function public.ensure_skills_passport_for_participant()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.skills_passports(participant_id,passport_code)
  values(new.participant_id,'LGS-' || upper(substr(replace(new.participant_id::text,'-',''),1,12)))
  on conflict(participant_id) do nothing;
  return new;
end; $$;

drop trigger if exists ensure_skills_passport_after_enrollment on public.greenskills_enrollments;
create trigger ensure_skills_passport_after_enrollment after insert on public.greenskills_enrollments
for each row execute function public.ensure_skills_passport_for_participant();

create or replace function public.enforce_greenskills_opportunity_age()
returns trigger language plpgsql security definer set search_path=public as $$
declare participant_age integer; min_required integer; commercial boolean;
begin
  select coalesce(p.estimated_age_years, case when p.date_of_birth is not null then extract(year from age(current_date,p.date_of_birth))::int end)
  into participant_age from public.participants p where p.id=new.participant_id;
  select o.minimum_age,o.commercial_activity into min_required,commercial from public.greenskills_opportunities o where o.id=new.opportunity_id;
  if min_required is not null and (participant_age is null or participant_age < min_required) then raise exception 'Participant does not meet the minimum age for this opportunity.'; end if;
  if commercial is true and (participant_age is null or participant_age < 18) then raise exception 'Commercial opportunity applications require participant age 18 or older.'; end if;
  return new;
end; $$;

drop trigger if exists enforce_greenskills_opportunity_age_before_write on public.greenskills_opportunity_applications;
create trigger enforce_greenskills_opportunity_age_before_write before insert or update on public.greenskills_opportunity_applications
for each row execute function public.enforce_greenskills_opportunity_age();

alter table public.greenskills_programs enable row level security;
alter table public.greenskills_subprograms enable row level security;
alter table public.greenskills_lessons enable row level security;
alter table public.greenskills_standards enable row level security;
alter table public.competency_domains enable row level security;
alter table public.greenskills_enrollments enable row level security;
alter table public.skills_passports enable row level security;
alter table public.greenskills_lesson_assessments enable row level security;
alter table public.fieldwork_placements enable row level security;
alter table public.fieldwork_evidence enable row level security;
alter table public.greenskills_credentials enable row level security;
alter table public.greenskills_opportunities enable row level security;
alter table public.greenskills_opportunity_applications enable row level security;

create policy "public read GreenSkills programs" on public.greenskills_programs for select to anon,authenticated using(active);
create policy "public read GreenSkills subprograms" on public.greenskills_subprograms for select to anon,authenticated using(active);
create policy "public read GreenSkills lessons" on public.greenskills_lessons for select to anon,authenticated using(active);
create policy "public read GreenSkills standards" on public.greenskills_standards for select to anon,authenticated using(active);
create policy "public read competency domains" on public.competency_domains for select to anon,authenticated using(true);
create policy "public read active opportunities" on public.greenskills_opportunities for select to anon,authenticated using(active);

create policy "admins manage GreenSkills programs" on public.greenskills_programs for all to authenticated using(public.is_program_admin()) with check(public.is_program_admin());
create policy "admins manage GreenSkills subprograms" on public.greenskills_subprograms for all to authenticated using(public.is_program_admin()) with check(public.is_program_admin());
create policy "admins manage GreenSkills lessons" on public.greenskills_lessons for all to authenticated using(public.is_program_admin()) with check(public.is_program_admin());
create policy "admins manage GreenSkills standards" on public.greenskills_standards for all to authenticated using(public.is_program_admin()) with check(public.is_program_admin());
create policy "admins manage competency domains" on public.competency_domains for all to authenticated using(public.is_program_admin()) with check(public.is_program_admin());

create policy "staff read GreenSkills enrollments by site" on public.greenskills_enrollments for select to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "authorized staff manage GreenSkills enrollments" on public.greenskills_enrollments for all to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','TRANSITION_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "staff read Skills Passports by site" on public.skills_passports for select to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "authorized staff manage Skills Passports" on public.skills_passports for all to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','TRANSITION_OFFICER','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "staff read GreenSkills assessments by site" on public.greenskills_lesson_assessments for select to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "authorized staff manage GreenSkills assessments" on public.greenskills_lesson_assessments for all to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "staff read FieldWorks placements by site" on public.fieldwork_placements for select to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "authorized staff manage FieldWorks placements" on public.fieldwork_placements for all to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','TRANSITION_OFFICER','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "staff read FieldWorks evidence by site" on public.fieldwork_evidence for select to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "authorized staff manage FieldWorks evidence" on public.fieldwork_evidence for all to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','TRANSITION_OFFICER','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "staff read GreenSkills credentials by site" on public.greenskills_credentials for select to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "authorized staff manage GreenSkills credentials" on public.greenskills_credentials for all to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "admins manage GreenSkills opportunities" on public.greenskills_opportunities for all to authenticated using(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','TRANSITION_OFFICER')) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','TRANSITION_OFFICER'));
create policy "staff read opportunity applications by site" on public.greenskills_opportunity_applications for select to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));
create policy "authorized staff manage opportunity applications" on public.greenskills_opportunity_applications for all to authenticated using(exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))) with check(public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','TRANSITION_OFFICER') and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

revoke all on public.greenskills_enrollments,public.skills_passports,public.greenskills_lesson_assessments,public.fieldwork_placements,public.fieldwork_evidence,public.greenskills_credentials,public.greenskills_opportunity_applications from anon;
