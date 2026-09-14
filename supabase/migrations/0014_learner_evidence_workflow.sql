-- Secure learner evidence workflow for LIFEWS GreenSkills.
-- Learner submissions are authorized by the opaque learner-session token.
-- Evidence files live in a private Storage bucket and are uploaded only by
-- server-side application code using the service-role key.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'learner-evidence',
  'learner-evidence',
  false,
  10485760,
  array['image/jpeg','image/png','application/pdf']::text[]
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.learner_evidence_submissions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  lesson_id uuid not null references public.greenskills_lessons(id) on delete cascade,
  learner_note text,
  status text not null default 'PENDING'
    check (status in ('PENDING','VERIFIED','REQUIRES_REMEDIATION','REJECTED')),
  file_count integer not null default 0 check (file_count between 0 and 12),
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  review_note text
);

create index if not exists learner_evidence_submissions_participant_idx
  on public.learner_evidence_submissions(participant_id, submitted_at desc);
create index if not exists learner_evidence_submissions_lesson_idx
  on public.learner_evidence_submissions(lesson_id, submitted_at desc);
create index if not exists learner_evidence_submissions_status_idx
  on public.learner_evidence_submissions(status, submitted_at desc);

create table if not exists public.learner_evidence_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.learner_evidence_submissions(id) on delete cascade,
  storage_path text unique not null,
  original_name text not null,
  mime_type text not null check (mime_type in ('image/jpeg','image/png','application/pdf')),
  byte_size bigint not null check (byte_size > 0 and byte_size <= 10485760),
  created_at timestamptz not null default now()
);

create index if not exists learner_evidence_files_submission_idx
  on public.learner_evidence_files(submission_id);

alter table public.learner_evidence_submissions enable row level security;
alter table public.learner_evidence_files enable row level security;

-- Learners never query these tables directly. Their opaque session token is
-- validated inside the narrowly scoped SECURITY DEFINER RPCs below.
drop policy if exists "staff read learner evidence submissions" on public.learner_evidence_submissions;
create policy "staff read learner evidence submissions"
on public.learner_evidence_submissions for select to authenticated
using (
  exists (
    select 1
    from public.profiles profile
    join public.participants participant
      on participant.id = learner_evidence_submissions.participant_id
    where profile.id = auth.uid()
      and profile.active
      and profile.role in (
        'SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR',
        'GROWMEAL_FACILITATOR','M_AND_E_OFFICER'
      )
      and (
        profile.role in ('SUPER_ADMIN','PROGRAM_ADMIN')
        or profile.site_id = participant.site_id
      )
  )
);

drop policy if exists "staff read learner evidence files" on public.learner_evidence_files;
create policy "staff read learner evidence files"
on public.learner_evidence_files for select to authenticated
using (
  exists (
    select 1
    from public.learner_evidence_submissions submission
    join public.participants participant on participant.id = submission.participant_id
    join public.profiles profile on profile.id = auth.uid()
    where submission.id = learner_evidence_files.submission_id
      and profile.active
      and profile.role in (
        'SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR',
        'GROWMEAL_FACILITATOR','M_AND_E_OFFICER'
      )
      and (
        profile.role in ('SUPER_ADMIN','PROGRAM_ADMIN')
        or profile.site_id = participant.site_id
      )
  )
);

create or replace function public.create_learner_evidence_submission(
  p_session_token text,
  p_lesson_code text,
  p_learner_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_participant_id uuid;
  v_lesson_id uuid;
  v_subprogram_id uuid;
  v_submission_id uuid;
  v_note text;
begin
  if p_session_token is null or length(p_session_token) <> 64 then
    return null;
  end if;

  v_note := nullif(btrim(coalesce(p_learner_note, '')), '');
  if v_note is not null and length(v_note) > 4000 then
    raise exception 'Learner evidence note is too long';
  end if;

  select session.participant_id into v_participant_id
  from public.learner_access_sessions session
  join public.participants participant on participant.id = session.participant_id
  where session.token_hash = encode(digest(p_session_token, 'sha256'), 'hex')
    and session.revoked_at is null
    and session.expires_at > now()
    and participant.active = true
  limit 1;

  if v_participant_id is null then
    return null;
  end if;

  select lesson.id, lesson.subprogram_id
    into v_lesson_id, v_subprogram_id
  from public.greenskills_lessons lesson
  where upper(lesson.lesson_code) = upper(btrim(coalesce(p_lesson_code, '')))
    and lesson.active = true
  limit 1;

  if v_lesson_id is null then
    raise exception 'Active GreenSkills lesson not found';
  end if;

  if not exists (
    select 1
    from public.greenskills_enrollments enrollment
    where enrollment.participant_id = v_participant_id
      and enrollment.subprogram_id = v_subprogram_id
      and enrollment.status in ('ACTIVE','PAUSED')
  ) then
    raise exception 'Learner is not enrolled in this module pathway';
  end if;

  insert into public.learner_evidence_submissions (
    participant_id, lesson_id, learner_note
  ) values (
    v_participant_id, v_lesson_id, v_note
  )
  returning id into v_submission_id;

  return v_submission_id;
end;
$$;

create or replace function public.register_learner_evidence_file(
  p_session_token text,
  p_submission_id uuid,
  p_storage_path text,
  p_original_name text,
  p_mime_type text,
  p_byte_size bigint
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_participant_id uuid;
  v_owned boolean;
begin
  if p_session_token is null or length(p_session_token) <> 64 then
    return false;
  end if;

  if p_storage_path is null or length(p_storage_path) > 500
     or p_original_name is null or length(p_original_name) > 255
     or p_mime_type not in ('image/jpeg','image/png','application/pdf')
     or p_byte_size is null or p_byte_size <= 0 or p_byte_size > 10485760 then
    return false;
  end if;

  select session.participant_id into v_participant_id
  from public.learner_access_sessions session
  where session.token_hash = encode(digest(p_session_token, 'sha256'), 'hex')
    and session.revoked_at is null
    and session.expires_at > now()
  limit 1;

  select exists (
    select 1
    from public.learner_evidence_submissions submission
    where submission.id = p_submission_id
      and submission.participant_id = v_participant_id
      and submission.status = 'PENDING'
  ) into v_owned;

  if not coalesce(v_owned, false) then
    return false;
  end if;

  insert into public.learner_evidence_files (
    submission_id, storage_path, original_name, mime_type, byte_size
  ) values (
    p_submission_id, p_storage_path, p_original_name, p_mime_type, p_byte_size
  );

  update public.learner_evidence_submissions
  set file_count = (
    select count(*)::integer
    from public.learner_evidence_files file
    where file.submission_id = p_submission_id
  )
  where id = p_submission_id;

  return true;
end;
$$;

create or replace function public.get_learner_evidence_status(
  p_session_token text,
  p_lesson_code text
)
returns table (
  submission_id uuid,
  submission_status text,
  learner_note text,
  file_count integer,
  file_names jsonb,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  review_note text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_participant_id uuid;
  v_lesson_id uuid;
begin
  if p_session_token is null or length(p_session_token) <> 64 then
    return;
  end if;

  select session.participant_id into v_participant_id
  from public.learner_access_sessions session
  where session.token_hash = encode(digest(p_session_token, 'sha256'), 'hex')
    and session.revoked_at is null
    and session.expires_at > now()
  limit 1;

  select lesson.id into v_lesson_id
  from public.greenskills_lessons lesson
  where upper(lesson.lesson_code) = upper(btrim(coalesce(p_lesson_code, '')))
    and lesson.active = true
  limit 1;

  if v_participant_id is null or v_lesson_id is null then
    return;
  end if;

  return query
  select
    submission.id,
    submission.status,
    submission.learner_note,
    submission.file_count,
    coalesce(
      (
        select jsonb_agg(file.original_name order by file.created_at)
        from public.learner_evidence_files file
        where file.submission_id = submission.id
      ),
      '[]'::jsonb
    ),
    submission.submitted_at,
    submission.reviewed_at,
    submission.review_note
  from public.learner_evidence_submissions submission
  where submission.participant_id = v_participant_id
    and submission.lesson_id = v_lesson_id
  order by submission.submitted_at desc
  limit 1;
end;
$$;

create or replace function public.review_learner_evidence(
  p_submission_id uuid,
  p_decision text,
  p_review_note text default null,
  p_knowledge_score numeric default null,
  p_practical_rating integer default null,
  p_data_digital_rating integer default null,
  p_safety_rating integer default null,
  p_enterprise_employability_rating integer default null,
  p_leadership_rating integer default null
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role public.user_role;
  v_site_id uuid;
  v_participant_id uuid;
  v_participant_site uuid;
  v_lesson_id uuid;
  v_passport_id uuid;
  v_avg numeric;
begin
  select profile.role, profile.site_id
    into v_role, v_site_id
  from public.profiles profile
  where profile.id = auth.uid() and profile.active = true;

  if v_role is null or v_role not in (
    'SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR','GROWMEAL_FACILITATOR'
  ) then
    raise exception 'Not authorized to review learner evidence';
  end if;

  if p_decision not in ('VERIFIED','REQUIRES_REMEDIATION','REJECTED') then
    raise exception 'Invalid evidence review decision';
  end if;

  if p_knowledge_score is not null and (p_knowledge_score < 0 or p_knowledge_score > 100) then
    raise exception 'Knowledge score must be between 0 and 100';
  end if;

  if (p_practical_rating is not null and p_practical_rating not between 0 and 5)
     or (p_data_digital_rating is not null and p_data_digital_rating not between 0 and 5)
     or (p_safety_rating is not null and p_safety_rating not between 0 and 5)
     or (p_enterprise_employability_rating is not null and p_enterprise_employability_rating not between 0 and 5)
     or (p_leadership_rating is not null and p_leadership_rating not between 0 and 5) then
    raise exception 'Competency ratings must be between 0 and 5';
  end if;

  select submission.participant_id, participant.site_id, submission.lesson_id
    into v_participant_id, v_participant_site, v_lesson_id
  from public.learner_evidence_submissions submission
  join public.participants participant on participant.id = submission.participant_id
  where submission.id = p_submission_id;

  if v_participant_id is null then
    raise exception 'Evidence submission not found';
  end if;

  if v_role not in ('SUPER_ADMIN','PROGRAM_ADMIN') and v_site_id is distinct from v_participant_site then
    raise exception 'Evidence submission is outside your assigned site';
  end if;

  update public.learner_evidence_submissions
  set status = p_decision,
      reviewed_by = auth.uid(),
      reviewed_at = now(),
      review_note = nullif(btrim(coalesce(p_review_note, '')), '')
  where id = p_submission_id;

  insert into public.greenskills_lesson_assessments (
    participant_id,
    lesson_id,
    knowledge_score,
    practical_rating,
    data_digital_rating,
    safety_rating,
    enterprise_employability_rating,
    leadership_rating,
    evidence_note,
    status,
    assessed_by,
    assessed_at
  )
  select
    submission.participant_id,
    submission.lesson_id,
    p_knowledge_score,
    p_practical_rating,
    p_data_digital_rating,
    p_safety_rating,
    p_enterprise_employability_rating,
    p_leadership_rating,
    submission.learner_note,
    case when p_decision = 'VERIFIED' then 'VERIFIED' else 'REQUIRES_REMEDIATION' end,
    auth.uid(),
    now()
  from public.learner_evidence_submissions submission
  where submission.id = p_submission_id
  on conflict (participant_id, lesson_id) do update
  set knowledge_score = excluded.knowledge_score,
      practical_rating = excluded.practical_rating,
      data_digital_rating = excluded.data_digital_rating,
      safety_rating = excluded.safety_rating,
      enterprise_employability_rating = excluded.enterprise_employability_rating,
      leadership_rating = excluded.leadership_rating,
      evidence_note = excluded.evidence_note,
      status = excluded.status,
      assessed_by = excluded.assessed_by,
      assessed_at = excluded.assessed_at;

  if p_decision = 'VERIFIED' then
    insert into public.skills_passports (participant_id, passport_code)
    values (
      v_participant_id,
      'LGS-' || upper(substr(replace(v_participant_id::text, '-', ''), 1, 12))
    )
    on conflict (participant_id) do nothing;

    update public.skills_passports passport
    set knowledge_score = coalesce((
          select avg(assessment.knowledge_score)
          from public.greenskills_lesson_assessments assessment
          where assessment.participant_id = v_participant_id
            and assessment.status = 'VERIFIED'
            and assessment.knowledge_score is not null
        ), passport.knowledge_score),
        practical_score = coalesce((
          select avg(assessment.practical_rating * 20.0)
          from public.greenskills_lesson_assessments assessment
          where assessment.participant_id = v_participant_id
            and assessment.status = 'VERIFIED'
            and assessment.practical_rating is not null
        ), passport.practical_score),
        data_digital_score = coalesce((
          select avg(assessment.data_digital_rating * 20.0)
          from public.greenskills_lesson_assessments assessment
          where assessment.participant_id = v_participant_id
            and assessment.status = 'VERIFIED'
            and assessment.data_digital_rating is not null
        ), passport.data_digital_score),
        safety_score = coalesce((
          select avg(assessment.safety_rating * 20.0)
          from public.greenskills_lesson_assessments assessment
          where assessment.participant_id = v_participant_id
            and assessment.status = 'VERIFIED'
            and assessment.safety_rating is not null
        ), passport.safety_score),
        enterprise_employability_score = coalesce((
          select avg(assessment.enterprise_employability_rating * 20.0)
          from public.greenskills_lesson_assessments assessment
          where assessment.participant_id = v_participant_id
            and assessment.status = 'VERIFIED'
            and assessment.enterprise_employability_rating is not null
        ), passport.enterprise_employability_score),
        leadership_score = coalesce((
          select avg(assessment.leadership_rating * 20.0)
          from public.greenskills_lesson_assessments assessment
          where assessment.participant_id = v_participant_id
            and assessment.status = 'VERIFIED'
            and assessment.leadership_rating is not null
        ), passport.leadership_score),
        updated_at = now()
    where passport.participant_id = v_participant_id;
  end if;

  return true;
end;
$$;

revoke all on function public.create_learner_evidence_submission(text, text, text) from public;
grant execute on function public.create_learner_evidence_submission(text, text, text) to anon, authenticated;

revoke all on function public.register_learner_evidence_file(text, uuid, text, text, text, bigint) from public;
grant execute on function public.register_learner_evidence_file(text, uuid, text, text, text, bigint) to anon, authenticated;

revoke all on function public.get_learner_evidence_status(text, text) from public;
grant execute on function public.get_learner_evidence_status(text, text) to anon, authenticated;

revoke all on function public.review_learner_evidence(uuid, text, text, numeric, integer, integer, integer, integer, integer) from public, anon;
grant execute on function public.review_learner_evidence(uuid, text, text, numeric, integer, integer, integer, integer, integer) to authenticated;

revoke all on table public.learner_evidence_submissions from anon;
revoke all on table public.learner_evidence_files from anon;
