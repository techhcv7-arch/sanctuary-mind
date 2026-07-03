create extension if not exists pgcrypto;

create table if not exists public.snapshot_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  raw_total integer not null,
  scaled_total integer not null,
  tier text not null check (tier in ('wellness', 'prayer', 'pastoral', 'specialist', 'clinical')),
  crisis_override boolean not null default false,
  primary_archetype text null,
  secondary_archetype text null,
  taken_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists snapshot_results_user_taken_at_idx
  on public.snapshot_results (user_id, taken_at desc);

create table if not exists public.pastor_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pastor_id text not null,
  scheduled_for date not null,
  slot text not null,
  confirmed_at timestamptz not null,
  status text not null check (status in ('scheduled', 'completed', 'cancelled')),
  completed_at timestamptz null,
  cancelled_at timestamptz null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists pastor_bookings_user_scheduled_for_idx
  on public.pastor_bookings (user_id, scheduled_for asc);

alter table public.snapshot_results enable row level security;
alter table public.pastor_bookings enable row level security;

drop policy if exists "Users can read own snapshot results" on public.snapshot_results;
create policy "Users can read own snapshot results"
  on public.snapshot_results
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own snapshot results" on public.snapshot_results;
create policy "Users can insert own snapshot results"
  on public.snapshot_results
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can read own pastor bookings" on public.pastor_bookings;
create policy "Users can read own pastor bookings"
  on public.pastor_bookings
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own pastor bookings" on public.pastor_bookings;
create policy "Users can insert own pastor bookings"
  on public.pastor_bookings
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own pastor bookings" on public.pastor_bookings;
create policy "Users can update own pastor bookings"
  on public.pastor_bookings
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
