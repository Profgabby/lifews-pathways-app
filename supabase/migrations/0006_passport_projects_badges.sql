-- LIFEWS Pathways™ Passport, projects and badge progression

create table public.learner_projects (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  title text not null,
  project_type text not null check (project_type in ('LEARNING','GROWMEAL','FOOD_DISCOVERY','DIGITAL','SKILLSBRIDGE','COMMUNITY','OTHER')),
  description text,
  reflection text,
  status text not null default 'IN_PROGRESS' check (status in ('PLANNED','IN_PROGRESS','COMPLETED')),
  started_at date,
  completed_at date,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.passport_goals (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  goal_text text not null,
  goal_area text not null check (goal_area in ('LITERACY','NUMERACY','GROWMEAL','FOOD','DIGITAL','PRACTICAL','CAREER','OTHER')),
  target_date date,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','ACHIEVED','PAUSED')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  achieved_at timestamptz
);

alter table public.learner_projects enable row level security;
alter table public.passport_goals enable row level security;

create policy "staff read learner projects by participant site" on public.learner_projects
for select to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = learner_projects.participant_id and public.same_site(p.site_id)
));

create policy "authorized staff manage learner projects" on public.learner_projects
for all to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = learner_projects.participant_id and public.same_site(p.site_id)
))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR','TRANSITION_OFFICER')
  and exists (
    select 1 from public.participants p
    where p.id = learner_projects.participant_id and public.same_site(p.site_id)
  )
);

create policy "staff read passport goals by participant site" on public.passport_goals
for select to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = passport_goals.participant_id and public.same_site(p.site_id)
));

create policy "authorized staff manage passport goals" on public.passport_goals
for all to authenticated
using (exists (
  select 1 from public.participants p
  where p.id = passport_goals.participant_id and public.same_site(p.site_id)
))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR','TRANSITION_OFFICER')
  and exists (
    select 1 from public.participants p
    where p.id = passport_goals.participant_id and public.same_site(p.site_id)
  )
);

insert into public.badges (code, name, minimum_band, description)
values
  ('READING-EXPLORER','Reading Explorer™','DISCOVER','Demonstrates evidence of progress in foundational reading.'),
  ('NUMBER-EXPLORER','Number Explorer™','DISCOVER','Demonstrates evidence of progress in foundational numeracy.'),
  ('SEED-EXPLORER','Seed Explorer™','DISCOVER','Demonstrates safe observation and comparison of seeds.'),
  ('PLANT-EXPLORER','Plant Explorer™','DISCOVER','Demonstrates basic plant observation and identification.'),
  ('FOOD-EXPLORER','Food Explorer™','DISCOVER','Demonstrates introductory understanding of food origins and ingredients.'),
  ('GROWMEAL-GARDENER','GrowMeal Gardener™','EXPLORE','Demonstrates age-appropriate GrowMeal garden competencies.'),
  ('WATER-STEWARD','Water Steward™','EXPLORE','Demonstrates responsible water observation and use in learning activities.'),
  ('GARDEN-INVESTIGATOR','Garden Investigator™','EXPLORE','Uses observation, measurement and records in garden investigations.'),
  ('FOOD-SYSTEMS-EXPLORER','Food Systems Explorer™','EXPLORE','Demonstrates understanding of how food moves from production to use.'),
  ('FOOD-HYGIENE-LEARNER','Food Hygiene Learner™','EXPLORE','Demonstrates age-appropriate food-hygiene knowledge and safe practice.'),
  ('DIGITAL-FOUNDATIONS','Digital Foundations™','BUILD','Demonstrates foundational digital skills.'),
  ('PRACTICAL-PROBLEM-SOLVER','Practical Problem Solver™','BUILD','Applies a structured process to a practical learning problem.'),
  ('AGRICULTURE-FOUNDATIONS','Agriculture Foundations™','BUILD','Demonstrates foundational agricultural knowledge and practical competency.'),
  ('ENTERPRISE-FOUNDATIONS','Enterprise Foundations™','TRANSITION','Demonstrates age-appropriate enterprise and financial-literacy foundations.'),
  ('CAREER-EXPLORER','Career Explorer™','TRANSITION','Completes structured career and transition exploration.'),
  ('AGRIROOTS-FOUNDATION','AgriRoots Foundation™','ENTERPRISE','Adult participant completes the designated AgriRoots foundation requirements.'),
  ('AGRINEXT-ENTERPRISE-FOUNDATION','AgriNext Enterprise Foundation™','ENTERPRISE','Adult participant completes the designated AgriNext enterprise foundation requirements.'),
  ('AGRIABLE-ENTERPRISE-FOUNDATION','AgriAble Enterprise Foundation™','ENTERPRISE','Adult participant completes the designated AgriAble enterprise foundation requirements.')
on conflict (code) do nothing;
