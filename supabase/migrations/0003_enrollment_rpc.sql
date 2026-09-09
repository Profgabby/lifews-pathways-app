-- Transactional participant enrollment helper.
-- SECURITY INVOKER preserves caller RLS policies.

create or replace function public.enroll_pathways_participant(
  p_participant_code text,
  p_preferred_name text,
  p_date_of_birth date,
  p_estimated_age_years integer,
  p_track public.program_track,
  p_band public.developmental_band,
  p_primary_language text,
  p_guardian_name text,
  p_guardian_relationship text,
  p_guardian_phone text,
  p_literacy_level integer,
  p_numeracy_level integer,
  p_digital_level integer,
  p_applied_skills_level integer,
  p_strengths text,
  p_priority_needs text
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_profile public.profiles%rowtype;
  v_participant_id uuid;
begin
  select * into v_profile
  from public.profiles
  where id = auth.uid() and active = true;

  if v_profile.id is null then
    raise exception 'Active staff profile required.';
  end if;

  if v_profile.site_id is null and v_profile.role not in ('SUPER_ADMIN','PROGRAM_ADMIN') then
    raise exception 'A site assignment is required for enrollment.';
  end if;

  if p_band = 'ENTERPRISE' and not (
    (p_date_of_birth is not null and p_date_of_birth <= (current_date - interval '18 years')::date)
    or coalesce(p_estimated_age_years, 0) >= 18
  ) then
    raise exception 'Enterprise band requires participant age 18 or older.';
  end if;

  insert into public.participants (
    participant_code, preferred_name, date_of_birth, estimated_age_years,
    track, band, primary_language, site_id, created_by
  ) values (
    p_participant_code, p_preferred_name, p_date_of_birth, p_estimated_age_years,
    p_track, p_band, nullif(p_primary_language, ''),
    coalesce(v_profile.site_id, (select id from public.sites where active = true order by created_at limit 1)),
    auth.uid()
  ) returning id into v_participant_id;

  if nullif(trim(coalesce(p_guardian_name, '')), '') is not null then
    insert into public.guardian_contacts (
      participant_id, name, relationship, phone
    ) values (
      v_participant_id, p_guardian_name, nullif(p_guardian_relationship, ''), nullif(p_guardian_phone, '')
    );
  end if;

  insert into public.baseline_assessments (
    participant_id, literacy_level, numeracy_level, digital_level,
    applied_skills_level, strengths, priority_needs, recommended_band, assessed_by
  ) values (
    v_participant_id, p_literacy_level, p_numeracy_level, p_digital_level,
    p_applied_skills_level, nullif(p_strengths, ''), nullif(p_priority_needs, ''),
    p_band, auth.uid()
  );

  return v_participant_id;
end;
$$;

grant execute on function public.enroll_pathways_participant(
  text,text,date,integer,public.program_track,public.developmental_band,text,text,text,text,
  integer,integer,integer,integer,text,text
) to authenticated;
