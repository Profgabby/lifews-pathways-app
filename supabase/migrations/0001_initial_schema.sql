-- LIFEWS Pathways™ initial data model
-- PostgreSQL / Supabase foundation

create extension if not exists "pgcrypto";

create type public.user_role as enum (
  'SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR',
  'SAFEGUARDING_LEAD','TRANSITION_OFFICER','M_AND_E_OFFICER','COMMUNITY_LIAISON',
  'PARTNER_VIEWER','ADULT_PARTICIPANT'
);

create type public.developmental_band as enum ('DISCOVER','EXPLORE','BUILD','TRANSITION','ENTERPRISE');
create type public.program_track as enum ('ALMAJIRI','GIRLS','GENERAL');
create type public.transition_destination as enum (
  'FORMAL_EDUCATION','ALTERNATIVE_EDUCATION','VOCATIONAL_TRAINING','APPRENTICESHIP',
  'HIGHER_EDUCATION','AGRICULTURE','EMPLOYMENT','ADULT_ENTERPRISE'
);

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  community text,
  lga text,
  state text,
  country text not null default 'Nigeria',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null,
  site_id uuid references public.sites(id),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  participant_code text unique not null,
  preferred_name text not null,
  date_of_birth date,
  estimated_age_years integer check (estimated_age_years is null or estimated_age_years between 0 and 120),
  track public.program_track not null default 'GENERAL',
  band public.developmental_band not null,
  primary_language text,
  site_id uuid not null references public.sites(id),
  active boolean not null default true,
  enrolled_at date not null default current_date,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles(id)
);

create table public.guardian_contacts (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  name text not null,
  relationship text,
  phone text,
  authorized_pickup boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.baseline_assessments (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  literacy_level integer check (literacy_level between 0 and 5),
  numeracy_level integer check (numeracy_level between 0 and 5),
  digital_level integer check (digital_level between 0 and 5),
  applied_skills_level integer check (applied_skills_level between 0 and 5),
  strengths text,
  priority_needs text,
  recommended_band public.developmental_band,
  assessed_by uuid references public.profiles(id),
  assessed_at timestamptz not null default now()
);

create table public.attendance_sessions (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id),
  session_date date not null,
  session_name text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.attendance_sessions(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  status text not null check (status in ('PRESENT','ABSENT','LATE','EXCUSED')),
  arrival_time time,
  departure_time time,
  follow_up_required boolean not null default false,
  notes text,
  unique(session_id, participant_id)
);

create table public.curriculum_modules (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  domain text not null,
  band public.developmental_band not null,
  module_type text not null check (module_type in ('CORE','GROWMEAL','FOOD_DISCOVERY','SKILLSBRIDGE','DIGITAL','TRANSITION')),
  learning_objectives jsonb not null default '[]'::jsonb,
  active boolean not null default true
);

create table public.competency_evidence (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  module_id uuid references public.curriculum_modules(id),
  competency_code text not null,
  evidence_type text not null check (evidence_type in ('OBSERVATION','WORKSHEET','PROJECT','ASSESSMENT','DEMONSTRATION')),
  evidence_note text,
  achieved boolean not null default false,
  assessed_by uuid references public.profiles(id),
  assessed_at timestamptz not null default now()
);

create table public.badges (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  minimum_band public.developmental_band not null,
  description text not null,
  active boolean not null default true
);

create table public.participant_badges (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  badge_id uuid not null references public.badges(id),
  awarded_by uuid references public.profiles(id),
  awarded_at timestamptz not null default now(),
  evidence_note text,
  unique(participant_id, badge_id)
);

create table public.transition_plans (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  interests text,
  current_strengths text,
  next_skill_needed text,
  intended_destination public.transition_destination,
  next_30_day_action text,
  support_person text,
  prepared_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.verified_transitions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  destination public.transition_destination not null,
  destination_name text,
  start_date date,
  verification_method text,
  verified_by uuid references public.profiles(id),
  verified_at timestamptz not null default now(),
  retention_3m boolean,
  retention_6m boolean,
  retention_12m boolean
);

create table public.adult_enterprise_referrals (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  pathway text not null check (pathway in ('AGRIROOTS','AGRINEXT','AGRIABLE','ZARIKS','OTHER')),
  voluntary_interest_confirmed boolean not null default false,
  eligibility_confirmed boolean not null default false,
  readiness_assessed boolean not null default false,
  referred_by uuid references public.profiles(id),
  referred_at timestamptz not null default now(),
  notes text
);

-- Safeguarding data is intentionally isolated from normal learner records.
create table public.safeguarding_incidents (
  id uuid primary key default gen_random_uuid(),
  incident_reference text unique not null,
  participant_id uuid references public.participants(id),
  site_id uuid not null references public.sites(id),
  occurred_at timestamptz,
  reported_at timestamptz not null default now(),
  factual_account text not null,
  immediate_action text,
  referral_status text,
  case_status text not null default 'OPEN' check (case_status in ('OPEN','REFERRED','MONITORING','CLOSED')),
  reported_by uuid not null references public.profiles(id)
);

alter table public.sites enable row level security;
alter table public.profiles enable row level security;
alter table public.participants enable row level security;
alter table public.guardian_contacts enable row level security;
alter table public.baseline_assessments enable row level security;
alter table public.attendance_sessions enable row level security;
alter table public.attendance_records enable row level security;
alter table public.curriculum_modules enable row level security;
alter table public.competency_evidence enable row level security;
alter table public.badges enable row level security;
alter table public.participant_badges enable row level security;
alter table public.transition_plans enable row level security;
alter table public.verified_transitions enable row level security;
alter table public.adult_enterprise_referrals enable row level security;
alter table public.safeguarding_incidents enable row level security;

-- RLS policies are deliberately implemented in a separate migration after
-- authentication claims and site-assignment behavior are finalized.
