-- Secure learner progress and self-assessment persistence for LIFEWS GreenSkills.

create table if not exists public.learner_module_progress (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid not null references public.greenskills_lessons(id) on delete cascade,
  highest_stage integer not null default 1 check (highest_stage between 1 and 7),
  current_stage integer not null default 1 check (current_stage between 1 and 7),
  mcq_answers jsonb,
  theory_answers jsonb,
  self_mcq_score numeric(5,2) check (self_mcq_score between 0 and 100),
  assessment_submitted_at timestamptz,
  practical_viewed_at timestamptz,
  status text not null default 'IN_PROGRESS' check (status in ('IN_PROGRESS','ASSESSMENT_SUBMITTED','PRACTICAL_PENDING','COMPLETED')),
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(participant_id, lesson_id)
);

create index if not exists learner_module_progress_participant_idx on public.learner_module_progress(participant_id);
create index if not exists learner_module_progress_lesson_idx on public.learner_module_progress(lesson_id);

alter table public.learner_module_progress enable row level security;
revoke all on table public.learner_module_progress from anon;

create policy "staff read learner module progress by site"
on public.learner_module_progress for select to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)));

create policy "authorized staff manage learner module progress"
on public.learner_module_progress for all to authenticated
using (exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id)))
with check (
  public.current_profile_role() in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','M_AND_E_OFFICER')
  and exists(select 1 from public.participants p where p.id=participant_id and public.same_site(p.site_id))
);

create or replace function public.save_learner_module_progress(
  p_session_token text,
  p_lesson_code text,
  p_stage integer,
  p_mcq_answers jsonb default null,
  p_theory_answers jsonb default null,
  p_self_mcq_score numeric default null
)
returns table (
  highest_stage integer,
  current_stage integer,
  self_mcq_score numeric,
  status text,
  assessment_submitted_at timestamptz,
  practical_viewed_at timestamptz
)
language plpgsql
security definer
set search_path=public
as $$
declare
  v_participant_id uuid;
  v_lesson_id uuid;
begin
  if p_session_token is null or length(p_session_token) <> 64 then
    return;
  end if;
  if p_stage < 1 or p_stage > 7 then
    raise exception 'Stage must be between 1 and 7';
  end if;

  select las.participant_id into v_participant_id
  from public.learner_access_sessions las
  join public.participants p on p.id=las.participant_id
  where las.token_hash=encode(digest(p_session_token,'sha256'),'hex')
    and las.revoked_at is null and las.expires_at>now() and p.active=true
  limit 1;

  if v_participant_id is null then return; end if;

  select gl.id into v_lesson_id
  from public.greenskills_lessons gl
  where upper(gl.lesson_code)=upper(p_lesson_code) and gl.active=true
  limit 1;
  if v_lesson_id is null then return; end if;

  insert into public.learner_module_progress(
    participant_id,lesson_id,highest_stage,current_stage,mcq_answers,theory_answers,self_mcq_score,
    assessment_submitted_at,practical_viewed_at,status,last_activity_at,updated_at
  ) values (
    v_participant_id,v_lesson_id,p_stage,p_stage,p_mcq_answers,p_theory_answers,p_self_mcq_score,
    case when p_stage=6 and p_mcq_answers is not null then now() end,
    case when p_stage=7 then now() end,
    case when p_stage=7 then 'PRACTICAL_PENDING' when p_stage=6 and p_mcq_answers is not null then 'ASSESSMENT_SUBMITTED' else 'IN_PROGRESS' end,
    now(),now()
  )
  on conflict(participant_id,lesson_id) do update set
    highest_stage=greatest(public.learner_module_progress.highest_stage,excluded.highest_stage),
    current_stage=excluded.current_stage,
    mcq_answers=coalesce(excluded.mcq_answers,public.learner_module_progress.mcq_answers),
    theory_answers=coalesce(excluded.theory_answers,public.learner_module_progress.theory_answers),
    self_mcq_score=coalesce(excluded.self_mcq_score,public.learner_module_progress.self_mcq_score),
    assessment_submitted_at=coalesce(excluded.assessment_submitted_at,public.learner_module_progress.assessment_submitted_at),
    practical_viewed_at=coalesce(excluded.practical_viewed_at,public.learner_module_progress.practical_viewed_at),
    status=case
      when public.learner_module_progress.status='COMPLETED' then 'COMPLETED'
      when excluded.current_stage=7 then 'PRACTICAL_PENDING'
      when excluded.current_stage=6 and excluded.mcq_answers is not null then 'ASSESSMENT_SUBMITTED'
      else public.learner_module_progress.status end,
    last_activity_at=now(),updated_at=now();

  return query
  select lmp.highest_stage,lmp.current_stage,lmp.self_mcq_score,lmp.status,lmp.assessment_submitted_at,lmp.practical_viewed_at
  from public.learner_module_progress lmp
  where lmp.participant_id=v_participant_id and lmp.lesson_id=v_lesson_id;
end;
$$;

create or replace function public.get_learner_module_progress(p_session_token text,p_lesson_code text)
returns table (
  highest_stage integer,
  current_stage integer,
  mcq_answers jsonb,
  theory_answers jsonb,
  self_mcq_score numeric,
  status text,
  assessment_submitted_at timestamptz,
  practical_viewed_at timestamptz
)
language plpgsql
security definer
set search_path=public
as $$
declare v_participant_id uuid;
begin
  if p_session_token is null or length(p_session_token)<>64 then return; end if;
  select las.participant_id into v_participant_id
  from public.learner_access_sessions las
  join public.participants p on p.id=las.participant_id
  where las.token_hash=encode(digest(p_session_token,'sha256'),'hex')
    and las.revoked_at is null and las.expires_at>now() and p.active=true limit 1;
  if v_participant_id is null then return; end if;
  return query
  select lmp.highest_stage,lmp.current_stage,lmp.mcq_answers,lmp.theory_answers,lmp.self_mcq_score,lmp.status,lmp.assessment_submitted_at,lmp.practical_viewed_at
  from public.learner_module_progress lmp
  join public.greenskills_lessons gl on gl.id=lmp.lesson_id
  where lmp.participant_id=v_participant_id and upper(gl.lesson_code)=upper(p_lesson_code)
  limit 1;
end;
$$;

revoke all on function public.save_learner_module_progress(text,text,integer,jsonb,jsonb,numeric) from public;
grant execute on function public.save_learner_module_progress(text,text,integer,jsonb,jsonb,numeric) to anon,authenticated;
revoke all on function public.get_learner_module_progress(text,text) from public;
grant execute on function public.get_learner_module_progress(text,text) to anon,authenticated;
