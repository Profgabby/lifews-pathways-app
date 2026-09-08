-- LIFEWS Pathways™ RPC privilege hardening
-- Remove anonymous execution from SECURITY DEFINER helpers and ensure trigger-only
-- functions cannot be called directly. Authenticated execution is retained only
-- where required by RLS policy evaluation or an intentional authenticated RPC.

-- Authorization/RLS helper functions are never available to anonymous callers.
revoke execute on function public.current_profile_role() from anon;
revoke execute on function public.current_profile_site_id() from anon;
revoke execute on function public.is_program_admin() from anon;
revoke execute on function public.is_safeguarding_authorized() from anon;
revoke execute on function public.same_site(uuid) from anon;
revoke execute on function public.participant_is_adult(uuid) from anon;

-- These helpers are used by authenticated RLS policies, so authenticated callers
-- retain EXECUTE. They still enforce identity/site/role constraints internally.
grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.current_profile_site_id() to authenticated;
grant execute on function public.is_program_admin() to authenticated;
grant execute on function public.is_safeguarding_authorized() to authenticated;
grant execute on function public.same_site(uuid) to authenticated;
grant execute on function public.participant_is_adult(uuid) to authenticated;

-- Trigger function must never be callable as an RPC.
revoke execute on function public.enforce_adult_enterprise_referral() from public;
revoke execute on function public.enforce_adult_enterprise_referral() from anon;
revoke execute on function public.enforce_adult_enterprise_referral() from authenticated;

-- Safeguarding audit logging is an intentional authenticated RPC only.
revoke execute on function public.log_safeguarding_audit(uuid, text, text) from public;
revoke execute on function public.log_safeguarding_audit(uuid, text, text) from anon;
grant execute on function public.log_safeguarding_audit(uuid, text, text) to authenticated;

-- Enrollment RPC is intentionally authenticated-only.
revoke execute on function public.enroll_pathways_participant(
  text,text,date,integer,public.program_track,public.developmental_band,text,text,text,text,
  integer,integer,integer,integer,text,text
) from public;
revoke execute on function public.enroll_pathways_participant(
  text,text,date,integer,public.program_track,public.developmental_band,text,text,text,text,
  integer,integer,integer,integer,text,text
) from anon;
grant execute on function public.enroll_pathways_participant(
  text,text,date,integer,public.program_track,public.developmental_band,text,text,text,text,
  integer,integer,integer,integer,text,text
) to authenticated;
