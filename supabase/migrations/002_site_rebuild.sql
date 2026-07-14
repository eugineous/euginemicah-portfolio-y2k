-- euginemicah.tech 2026-07 site rebuild schema
-- Run in Supabase SQL editor (or `supabase db push` if using the CLI).
-- This is a separate admin surface from the LinkedIn tool (001_init.sql) --
-- no shared tables, no shared allowlist env var.

-- Backfill: documents the book_purchases table (created ad hoc in the SQL
-- editor during the original Paystack checkout build, no migration existed
-- for it). `create table if not exists` is a no-op if the live schema
-- already matches -- this does NOT drop or alter the live table.
create table if not exists book_purchases (
  id bigint generated always as identity primary key,
  reference text not null unique,
  email text not null,
  name text not null default '',
  amount_kes numeric not null default 0,
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
alter table book_purchases enable row level security;

create table if not exists blog_posts (
  id bigint generated always as identity primary key,
  slug text not null unique,
  category text not null default '',
  title text not null,
  excerpt text not null default '',
  paragraphs jsonb not null default '[]'::jsonb,   -- string[]
  tag_chips jsonb not null default '[]'::jsonb,    -- string[]
  read_time text not null default '',              -- e.g. "6 min read"
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_posts_status_idx on blog_posts (status, published_at desc);
alter table blog_posts enable row level security;
create policy "public can read published posts" on blog_posts
  for select using (status = 'published');

create table if not exists shows (
  id bigint generated always as identity primary key,
  name text not null,
  tag text not null default '',
  description text not null default '',
  meta text not null default '',
  image_url text not null default '',
  cta_label text not null default '',
  cta_href text not null default '',
  is_flagship boolean not null default false,
  sort_order int not null default 0,
  status text not null default 'published' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table shows enable row level security;
create policy "public can read published shows" on shows
  for select using (status = 'published');

-- Used by Phase 4 (/messages + booking/Roylandz lead capture). Created now
-- alongside the rest of the schema so one migration covers the whole
-- rebuild -- inert until Phase 4 ships the API routes that write to it.
create table if not exists messages (
  id bigint generated always as identity primary key,
  source text not null default 'contact'
    check (source in ('contact','booking','roylandz','deletion_request')),
  name text not null,
  email text not null,
  phone text default '',
  body text not null,
  meta jsonb not null default '{}'::jsonb, -- e.g. {eventType, date, budget} for booking inquiries
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);
create index if not exists messages_status_idx on messages (status, created_at desc);
alter table messages enable row level security;

-- Used by Phase 4 (Book/Blog newsletter signup). Inert until then.
create table if not exists newsletter_subscribers (
  id bigint generated always as identity primary key,
  email text not null unique,
  source text not null default 'book', -- 'book' | 'blog'
  created_at timestamptz not null default now()
);
alter table newsletter_subscribers enable row level security;

-- Used by Phase 4 (/control-room admin). Env var CMS_ADMIN_EMAILS is always
-- full-access; rows here let admins be added/removed without a redeploy.
-- Deliberately separate from the LinkedIn tool's ADMIN_EMAIL env var --
-- no coupling between the two admin surfaces.
create table if not exists cms_admin_emails (
  email text primary key,
  added_at timestamptz not null default now()
);
alter table cms_admin_emails enable row level security;

-- Row Level Security summary:
--   blog_posts / shows -- public can SELECT rows with status = 'published'.
--     All writes (and reading drafts) go through the service-role client
--     in /control-room API routes, which bypasses RLS after verifying the
--     CMS_ADMIN_EMAILS allowlist (mirrors the LinkedIn tool's pattern).
--   book_purchases / messages / newsletter_subscribers / cms_admin_emails --
--     no public policy at all. Deny-all for anon/authenticated; every read
--     and write goes through the service-role client.
