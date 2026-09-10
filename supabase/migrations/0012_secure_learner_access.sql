-- Secure learner access foundation for LIFEWS GreenSkills.
-- Learners do not become general Supabase auth users. Staff issue a short-lived
-- opaque access code; successful verification creates an opaque learner session.
-- Plaintext codes and session tokens are returned only once and are never stored.

create table if not exists public.learner_access_codes (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  code_hash text unique not null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  issued_by uuid not null references public.profiles(id),
  issued_at timestamptz not null default now(),
  last_used_at timestamptz,
  used_count integer not null default 0 check (used_count >= 0),
  check (expires_at > issued_at)
);

create index if not exists learner_access_codes_participant_idx
  on public.learner_access_codes(participant_id);
create index if not exists learner_access_codes_active_idx
  on public.learner_access_codes(code_hash, expires_at)
  where revoked_at is null;

create table if not exists public.learner_access_sessions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  access_code_id uuid not null references public.learner_access_codes(id) on delete cascade,
  token_hash text unique not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  last_seen_at timestamptz not null default now(),
  revoked_at timestamptz,
  check (expires_at > created_at)
);

create index if not exists learner_access_sessions_participant_idx
  on public.learner_access_sessions(participant_id);
create index if not exists learner_access_sessions_active_idx
  on public.learner_access_sessions(token_hash, expires_at)
  where revoked_at is null;

alter table public.learner_access_codes enable row level security;
alter table public.learner_access_sessions enable row level security;

-- No direct learner/anon table policies are created. Learner access is only through
-- the narrowly scoped RPCs below. Authorized staff can inspect code/session metadata.
drop policy if exists "authorized staff read learner access codes" on public.learner_access_codes;
create policy "authorized staff read learner access codes"
on public.learner_access_codes for select to authenticated
using (
  exists (
    select 1
    from public.profiles p
    join public.participants participant on participant.id = learner_access_codes.participant_id
    where p.id = auth.uid()
      and p.active
      and p.role in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR')
      and (
        p.role in ('SUPER_ADMIN','PROGRAM_ADMIN')
        or p.site_id = participant.site_id
      )
  )
);

drop policy if exists "authorized staff read learner sessions" on public.learner_access_sessions;
create policy "authorized staff read learner sessions"
on public.learner_access_sessions for select to authenticated
using (
  exists (
    select 1
    from public.profiles p
    join public.participants participant on participant.id = learner_access_sessions.participant_id
    where p.id = auth.uid()
      and p.active
      and p.role in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR')
      and (
        p.role in ('SUPER_ADMIN','PROGRAM_ADMIN')
        or p.site_id = participant.site_id
      )
  )
);

create or replace function public.issue_learner_access_code(
  p_participant_id uuid,
  p_expires_at timestamptz default (now() + interval '30 days')
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role public.user_role;
  v_site_id uuid;
  v_participant_site uuid;
  v_code text;
begin
  select role, site_id into v_role, v_site_id
  from public.profiles
  where id = auth.uid() and active = true;

  if v_role is null or v_role not in ('SUPER_ADMIN','PROGRAM_ADMIN','SITE_COORDINATOR','EDUCATOR') then
    raise exception 'Not authorized to issue learner access';
  end if;

  select site_id into v_participant_site
  from public.participants
  where id = p_participant_id and active = true;

  if v_participant_site is null then
    raise exception 'Active participant not found';
  end if;

  if v_role not in ('SUPER_ADMIN','PROGRAM_ADMIN') and v_site_id is distinct from v_participant_site then
    raise exception 'Participant is outside your assigned site';
  end if;

  if p_expires_at <= now() or p_expires_at > now() + interval '90 days' then
    raise exception 'Learner access expiry must be within the next 90 days';
  end if;

  update public.learner_access_codes
  set revoked_at = now()
  where participant_id = p_participant_id and revoked_at is null;

  update public.learner_access_sessions
  set revoked_at = now()
  where participant_id = p_participant_id and revoked_at is null;

  -- 48 bits of entropy, presented as 12 uppercase hexadecimal characters.
  v_code := upper(encode(gen_random_bytes(6), 'hex'));

  insert into public.learner_access_codes (
    participant_id, code_hash, expires_at, issued_by
  ) values (
    p_participant_id,
    encode(digest(v_code, 'sha256'), 'hex'),
    p_expires_at,
    auth.uid()
  );

  return v_code;
end;
$$;

create or replace function public.start_learner_session(p_access_code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_normalized_code text;
  v_code_id uuid;
  v_participant_id uuid;
  v_code_expires_at timestamptz;
  v_token text;
  v_session_expires_at timestamptz;
begin
  v_normalized_code := upper(regexp_replace(coalesce(p_access_code, ''), '[^0-9A-F]', '', 'g'));

  if length(v_normalized_code) <> 12 then
    return null;
  end if;

  select lac.id, lac.participant_id, lac.expires_at
    into v_code_id, v_participant_id, v_code_expires_at
  from public.learner_access_codes lac
  join public.participants participant on participant.id = lac.participant_id
  where lac.code_hash = encode(digest(v_normalized_code, 'sha256'), 'hex')
    and lac.revoked_at is null
    and lac.expires_at > now()
    and participant.active = true
  limit 1;

  if v_code_id is null then
    return null;
  end if;

  v_token := encode(gen_random_bytes(32), 'hex');
  v_session_expires_at := least(v_code_expires_at, now() + interval '8 hours');

  insert into public.learner_access_sessions (
    participant_id, access_code_id, token_hash, expires_at
  ) values (
    v_participant_id,
    v_code_id,
    encode(digest(v_token, 'sha256'), 'hex'),
    v_session_expires_at
  );

  update public.learner_access_codes
  set used_count = used_count + 1,
      last_used_at = now()
  where id = v_code_id;

  return v_token;
end;
$$;

create or replace function public.get_learner_session(p_session_token text)
returns table (
  preferred_name text,
  primary_language text,
  program_slug text,
  subprogram_slug text,
  session_expires_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_session_token is null or length(p_session_token) <> 64 then
    return;
  end if;

  update public.learner_access_sessions las
  set last_seen_at = now()
  where las.token_hash = encode(digest(p_session_token, 'sha256'), 'hex')
    and las.revoked_at is null
    and las.expires_at > now();

  return query
  select
    participant.preferred_name,
    participant.primary_language,
    gs_program.slug,
    gs_subprogram.slug,
    las.expires_at
  from public.learner_access_sessions las
  join public.participants participant on participant.id = las.participant_id
  left join lateral (
    select enrollment.program_id, enrollment.subprogram_id
    from public.greenskills_enrollments enrollment
    where enrollment.participant_id = participant.id
      and enrollment.status in ('ACTIVE','PAUSED')
    order by enrollment.started_at desc, enrollment.created_at desc
    limit 1
  ) current_enrollment on true
  left join public.greenskills_programs gs_program on gs_program.id = current_enrollment.program_id
  left join public.greenskills_subprograms gs_subprogram on gs_subprogram.id = current_enrollment.subprogram_id
  where las.token_hash = encode(digest(p_session_token, 'sha256'), 'hex')
    and las.revoked_at is null
    and las.expires_at > now()
    and participant.active = true
  limit 1;
end;
$$;

create or replace function public.end_learner_session(p_session_token text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  if p_session_token is null or length(p_session_token) <> 64 then
    return false;
  end if;

  update public.learner_access_sessions
  set revoked_at = now()
  where token_hash = encode(digest(p_session_token, 'sha256'), 'hex')
    and revoked_at is null;

  get diagnostics v_count = row_count;
  return v_count > 0;
end;
$$;

revoke all on function public.issue_learner_access_code(uuid, timestamptz) from public, anon;
grant execute on function public.issue_learner_access_code(uuid, timestamptz) to authenticated;

revoke all on function public.start_learner_session(text) from public;
grant execute on function public.start_learner_session(text) to anon, authenticated;

revoke all on function public.get_learner_session(text) from public;
grant execute on function public.get_learner_session(text) to anon, authenticated;

revoke all on function public.end_learner_session(text) from public;
grant execute on function public.end_learner_session(text) to anon, authenticated;

revoke all on table public.learner_access_codes from anon;
revoke all on table public.learner_access_sessions from anon;
