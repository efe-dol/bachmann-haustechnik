-- Run this script in Supabase SQL Editor before using the admin panel.
-- Security: registration tokens are stored only as SHA-256 hashes.

create extension if not exists pgcrypto;

create table if not exists public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('administrator', 'intern')),
  privacy_consent_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.registration_tokens (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  token_preview text not null,
  role text not null check (role in ('administrator', 'intern')) default 'intern',
  expires_at timestamptz not null,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  used_at timestamptz,
  used_by uuid references auth.users (id) on delete set null
);

create table if not exists public.site_settings (
  key text primary key,
  value_json jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  active boolean not null default true,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz
);

create or replace function public.app_role(uid uuid)
returns text
language sql
security definer
set search_path = public
as $$
  select role from public.user_profiles where id = uid;
$$;

create or replace function public.consume_registration_token(token_input text)
returns table(ok boolean, assigned_role text, reason text)
language sql
security definer
set search_path = public
as $$
  with invalid_input as (
    select
      false as ok,
      null::text as assigned_role,
      'empty'::text as reason
    where token_input is null or length(trim(token_input)) = 0
  ),
  candidate as (
    select rt.id, rt.role
    from public.registration_tokens rt
    where token_input is not null
      and length(trim(token_input)) > 0
      and rt.token_hash = encode(extensions.digest(trim(token_input), 'sha256'), 'hex')
      and rt.used_at is null
      and rt.expires_at > timezone('utc', now())
    order by rt.created_at asc
    limit 1
    for update skip locked
  ),
  marked as (
    update public.registration_tokens rt
    set used_at = timezone('utc', now())
    from candidate c
    where rt.id = c.id
    returning c.role
  ),
  valid_result as (
    select
      true as ok,
      (select role from marked limit 1) as assigned_role,
      null::text as reason
    where exists (select 1 from marked)
  ),
  invalid_token as (
    select
      false as ok,
      null::text as assigned_role,
      'invalid_or_expired'::text as reason
    where token_input is not null
      and length(trim(token_input)) > 0
      and not exists (select 1 from marked)
  )
  select * from invalid_input
  union all
  select * from valid_result
  union all
  select * from invalid_token
  limit 1;
$$;

alter table public.user_profiles enable row level security;
alter table public.registration_tokens enable row level security;
alter table public.site_settings enable row level security;
alter table public.announcements enable row level security;

drop policy if exists "internal_can_view_profiles" on public.user_profiles;
create policy "internal_can_view_profiles"
on public.user_profiles
for select
using (
  auth.uid() = id
  or public.app_role(auth.uid()) in ('administrator', 'intern')
);

drop policy if exists "admin_can_update_profiles" on public.user_profiles;
create policy "admin_can_update_profiles"
on public.user_profiles
for update
using (public.app_role(auth.uid()) = 'administrator');

drop policy if exists "admin_can_insert_tokens" on public.registration_tokens;
create policy "admin_can_insert_tokens"
on public.registration_tokens
for insert
with check (public.app_role(auth.uid()) = 'administrator');

drop policy if exists "admin_can_select_tokens" on public.registration_tokens;
create policy "admin_can_select_tokens"
on public.registration_tokens
for select
using (public.app_role(auth.uid()) = 'administrator');

drop policy if exists "public_can_read_settings" on public.site_settings;
create policy "public_can_read_settings"
on public.site_settings
for select
using (true);

drop policy if exists "admin_can_manage_settings" on public.site_settings;
create policy "admin_can_manage_settings"
on public.site_settings
for all
using (public.app_role(auth.uid()) = 'administrator')
with check (public.app_role(auth.uid()) = 'administrator');

drop policy if exists "public_can_read_active_announcements" on public.announcements;
create policy "public_can_read_active_announcements"
on public.announcements
for select
using (
  active = true
  and (expires_at is null or expires_at > timezone('utc', now()))
);

drop policy if exists "internal_can_insert_announcements" on public.announcements;
create policy "internal_can_insert_announcements"
on public.announcements
for insert
with check (public.app_role(auth.uid()) in ('administrator', 'intern'));

drop policy if exists "internal_can_update_announcements" on public.announcements;
create policy "internal_can_update_announcements"
on public.announcements
for update
using (public.app_role(auth.uid()) in ('administrator', 'intern'));

insert into public.site_settings (key, value_json)
values ('maintenance_mode', '{"active": false}'::jsonb)
on conflict (key) do nothing;
