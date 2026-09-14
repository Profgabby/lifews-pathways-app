-- Safe learner-facing Skills Passport summary.
-- Learners remain outside general Supabase auth and access their own summary only
-- through the opaque learner session token established in 0012.

create or replace function public.get_learner_passport_summary(p_session_token text)
returns table (
  passport_code text,
  knowledge_score numeric,
  practical_score numeric,
  data_digital_score numeric,
  safety_score numeric,
  enterprise_employability_score numeric,
  leadership_score numeric,
  verified_field_hours numeric,
  passport_status text,
  verified_modules integer,
  submitted_modules integer,
  remediation_modules integer,
  passport_updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_session_token is null or length(p_session_token) <> 64 then
    return;
  end if;

  return query
  select
    sp.passport_code,
    coalesce(sp.knowledge_score, 0),
    coalesce(sp.practical_score, 0),
    coalesce(sp.data_digital_score, 0),
    coalesce(sp.safety_score, 0),
    coalesce(sp.enterprise_employability_score, 0),
    coalesce(sp.leadership_score, 0),
    coalesce(sp.verified_field_hours, 0),
    coalesce(sp.status, 'ACTIVE')::text,
    coalesce(assessment_counts.verified_modules, 0)::integer,
    coalesce(assessment_counts.submitted_modules, 0)::integer,
    coalesce(assessment_counts.remediation_modules, 0)::integer,
    sp.updated_at
  from public.learner_access_sessions las
  join public.participants participant on participant.id = las.participant_id
  left join public.skills_passports sp on sp.participant_id = participant.id
  left join lateral (
    select
      count(*) filter (where assessment.status = 'VERIFIED') as verified_modules,
      count(*) filter (where assessment.status = 'SUBMITTED') as submitted_modules,
      count(*) filter (where assessment.status = 'REQUIRES_REMEDIATION') as remediation_modules
    from public.greenskills_lesson_assessments assessment
    where assessment.participant_id = participant.id
  ) assessment_counts on true
  where las.token_hash = encode(digest(p_session_token, 'sha256'), 'hex')
    and las.revoked_at is null
    and las.expires_at > now()
    and participant.active = true
  limit 1;
end;
$$;

revoke all on function public.get_learner_passport_summary(text) from public;
grant execute on function public.get_learner_passport_summary(text) to anon, authenticated;
