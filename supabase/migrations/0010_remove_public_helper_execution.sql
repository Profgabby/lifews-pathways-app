-- LIFEWS Pathways™ SECURITY DEFINER privilege hardening, phase 2
-- PostgreSQL grants EXECUTE on new functions to PUBLIC by default. Revoking only
-- from anon is insufficient because anon inherits PUBLIC privileges. Remove PUBLIC
-- execution first, then explicitly grant only the role required by RLS evaluation.

revoke execute on function public.current_profile_role() from public;
revoke execute on function public.current_profile_site_id() from public;
revoke execute on function public.is_program_admin() from public;
revoke execute on function public.is_safeguarding_authorized() from public;
revoke execute on function public.same_site(uuid) from public;
revoke execute on function public.participant_is_adult(uuid) from public;

grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.current_profile_site_id() to authenticated;
grant execute on function public.is_program_admin() to authenticated;
grant execute on function public.is_safeguarding_authorized() to authenticated;
grant execute on function public.same_site(uuid) to authenticated;
grant execute on function public.participant_is_adult(uuid) to authenticated;
