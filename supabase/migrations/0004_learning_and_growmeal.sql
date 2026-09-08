-- LIFEWS Pathways™ learning, assessment, GrowMeal™ and Food Discovery extension

create table public.learning_activities (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.curriculum_modules(id) on delete cascade,
  code text unique not null,
  title text not null,
  activity_type text not null check (activity_type in ('LESSON','PRACTICAL','GROWMEAL','FOOD_DISCOVERY','DIGITAL','SKILLSBRIDGE')),
  objective text not null,
  materials jsonb not null default '[]'::jsonb,
  instructions jsonb not null default '[]'::jsonb,
  safety_notes text,
  assessment_method text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.knowledge_checks (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.curriculum_modules(id) on delete cascade,
  title text not null,
  questions jsonb not null default '[]'::jsonb,
  passing_score integer not null default 60 check (passing_score between 0 and 100),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.learning_attempts (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  module_id uuid not null references public.curriculum_modules(id) on delete cascade,
  activity_id uuid references public.learning_activities(id) on delete set null,
  status text not null default 'IN_PROGRESS' check (status in ('NOT_STARTED','IN_PROGRESS','COMPLETED')),
  score numeric(5,2) check (score is null or (score between 0 and 100)),
  reflection text,
  evidence_note text,
  completed_at timestamptz,
  recorded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.growmeal_observations (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  activity_id uuid references public.learning_activities(id) on delete set null,
  station text not null check (station in (
    'SEED_DISCOVERY','SOIL_LEARNING','WATER_IRRIGATION','ROOT_OBSERVATION','PLANT_GROWTH',
    'VEGETABLE_PRODUCTION','HERBS_SPICES','FOOD_NUTRITION','COMPOST','HARVEST','POSTHARVEST','MARKET_FOOD_SYSTEMS'
  )),
  observation_date date not null default current_date,
  observation_text text not null,
  measurement_label text,
  measurement_value numeric,
  measurement_unit text,
  recorded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.food_discovery_records (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  activity_id uuid references public.learning_activities(id) on delete set null,
  ingredient_or_topic text not null,
  observation_text text not null,
  hygiene_check_completed boolean not null default false,
  tasting_involved boolean not null default false,
  allergy_check_completed boolean not null default false,
  recorded_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  check (not tasting_involved or allergy_check_completed)
);

alter table public.learning_activities enable row level security;
alter table public.knowledge_checks enable row level security;
alter table public.learning_attempts enable row level security;
alter table public.growmeal_observations enable row level security;
alter table public.food_discovery_records enable row level security;

-- Curriculum catalog is readable by authenticated staff.
create policy "authenticated can read learning activities"
on public.learning_activities for select
to authenticated using (true);

create policy "authenticated can read knowledge checks"
on public.knowledge_checks for select
to authenticated using (true);

-- Staff may view and write learning evidence only for participants visible under existing site RLS.
create policy "staff can read learning attempts"
on public.learning_attempts for select
to authenticated using (
  exists (select 1 from public.participants p where p.id = participant_id)
);

create policy "staff can insert learning attempts"
on public.learning_attempts for insert
to authenticated with check (
  exists (select 1 from public.participants p where p.id = participant_id)
);

create policy "staff can update learning attempts"
on public.learning_attempts for update
to authenticated using (
  exists (select 1 from public.participants p where p.id = participant_id)
) with check (
  exists (select 1 from public.participants p where p.id = participant_id)
);

create policy "staff can read growmeal observations"
on public.growmeal_observations for select
to authenticated using (
  exists (select 1 from public.participants p where p.id = participant_id)
);

create policy "staff can insert growmeal observations"
on public.growmeal_observations for insert
to authenticated with check (
  exists (select 1 from public.participants p where p.id = participant_id)
);

create policy "staff can read food discovery records"
on public.food_discovery_records for select
to authenticated using (
  exists (select 1 from public.participants p where p.id = participant_id)
);

create policy "staff can insert food discovery records"
on public.food_discovery_records for insert
to authenticated with check (
  exists (select 1 from public.participants p where p.id = participant_id)
);

-- Seed the 12 LIFEWS Pathways™ curriculum domains with one foundation module each.
insert into public.curriculum_modules (code,title,domain,band,module_type,learning_objectives) values
('PATH-LIT-001','Literacy & Communication Foundations','Literacy & Communication','DISCOVER','CORE','["Recognize and use everyday words","Communicate observations clearly"]'),
('PATH-NUM-001','Practical Numeracy Foundations','Numeracy','DISCOVER','CORE','["Count familiar objects","Use simple measurement language"]'),
('PATH-SCI-001','Science Through Observation','Science & Discovery','EXPLORE','CORE','["Ask questions","Observe, compare and record"]'),
('PATH-AGR-001','Introduction to Agriculture','Agriculture','EXPLORE','CORE','["Identify basic plant needs","Describe a simple crop cycle"]'),
('PATH-FOOD-001','Food Origins & Food Literacy','Food Literacy','EXPLORE','FOOD_DISCOVERY','["Connect foods to their sources","Recognize diverse food groups"]'),
('PATH-HYG-001','Hygiene, Water & Sanitation','Hygiene & Sanitation','DISCOVER','CORE','["Demonstrate handwashing","Identify clean learning practices"]'),
('PATH-ENV-001','Resource Responsibility','Environment & Resources','BUILD','CORE','["Explain soil and water stewardship","Practice responsible resource use"]'),
('PATH-DIG-001','Digital Foundations','Digital Literacy','BUILD','DIGITAL','["Use a device safely","Create and save basic digital work"]'),
('PATH-LIFE-001','Life Skills & Problem Solving','Life Skills','BUILD','CORE','["Work in teams","Use a simple problem-solving process"]'),
('PATH-VOC-001','Vocational Exploration','Vocational Exploration','TRANSITION','SKILLSBRIDGE','["Explore skill clusters","Identify strengths and training interests"]'),
('PATH-ENT-001','Enterprise & Financial Literacy','Enterprise & Financial Literacy','TRANSITION','TRANSITION','["Understand customers, costs and records","Distinguish learning from adult commercial participation"]'),
('PATH-TRN-001','My Next Pathway','Transition & Career Planning','TRANSITION','TRANSITION','["Create a next-step plan","Identify education, training, work or adult enterprise options"]')
on conflict (code) do nothing;
