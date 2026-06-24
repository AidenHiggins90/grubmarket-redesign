-- ============================================================
-- GrubMarket redesign — lead capture table
-- Run this in the Supabase dashboard → SQL Editor → New query → Run.
-- ============================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  company     text,
  role        text,
  message     text,
  source      text
);

-- Lock the table down with Row Level Security.
alter table public.leads enable row level security;

-- Allow the public (anon) key to INSERT only — never read, update, or delete.
-- This is what makes it safe to ship the anon key in the static site.
create policy "anon can submit leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- (No select/update/delete policy for anon, so submissions are write-only
--  from the website. You read them in the dashboard → Table Editor → leads,
--  which uses your privileged service role.)
