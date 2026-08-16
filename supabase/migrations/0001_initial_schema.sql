-- ============================================================================
-- InsureLeague — Initial schema
-- Run this in the Supabase SQL editor, or via `supabase db push` with the CLI.
-- ============================================================================

-- Required for gen_random_uuid()
create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- callback_requests
-- ----------------------------------------------------------------------------
create table if not exists public.callback_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  customer_type text not null check (customer_type in ('individual', 'corporate')),
  insurance_category text not null check (insurance_category in ('corporate', 'individual', 'employee-benefits')),
  insurance_product text not null,
  callback_time text not null check (callback_time in ('morning', 'afternoon', 'evening')),
  message text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'In Progress', 'Completed', 'Closed')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_callback_requests_phone on public.callback_requests (phone);
create index if not exists idx_callback_requests_created_at on public.callback_requests (created_at desc);
create index if not exists idx_callback_requests_status on public.callback_requests (status);

-- Keep updated_at current on every row change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_callback_requests_updated_at on public.callback_requests;
create trigger trg_callback_requests_updated_at
  before update on public.callback_requests
  for each row execute function public.set_updated_at();

alter table public.callback_requests enable row level security;

-- No direct client access at all — every read/write goes through server-side
-- API routes and Server Actions using the service-role key, which bypasses RLS
-- by design. This keeps the table completely inaccessible to the anon/public
-- key and to any authenticated (non-service) client, satisfying least-privilege.
-- (No policies are created deliberately: RLS enabled + zero policies = deny-all.)

-- ----------------------------------------------------------------------------
-- newsletter_subscribers
-- ----------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_newsletter_subscribers_email on public.newsletter_subscribers (email);

alter table public.newsletter_subscribers enable row level security;
-- Same deny-all-by-default posture; writes happen via the service-role client only.

-- ----------------------------------------------------------------------------
-- admin_audit_log
-- ----------------------------------------------------------------------------
create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  admin_email text,
  target_id uuid,
  details jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_audit_log_created_at on public.admin_audit_log (created_at desc);
create index if not exists idx_admin_audit_log_admin_email on public.admin_audit_log (admin_email);

alter table public.admin_audit_log enable row level security;
-- Deny-all by default; only the service-role client (used inside lib/audit-log.ts) writes here.
