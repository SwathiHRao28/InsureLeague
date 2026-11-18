-- ============================================================================
-- InsureLeague — Customer reviews submitted via the "Write a review" form
-- Run this in the Supabase SQL editor after 0001_initial_schema.sql.
-- ============================================================================

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  role text check (role is null or char_length(role) <= 80),
  rating smallint not null check (rating between 1 and 5),
  text text not null check (char_length(text) between 10 and 1000),
  created_at timestamptz not null default now()
);

create index if not exists idx_reviews_created_at on public.reviews (created_at desc);

alter table public.reviews enable row level security;
-- Deny-all by default; reads and writes go through /api/reviews using the service-role client.
