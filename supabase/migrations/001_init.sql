-- euginemicah.tech content engine schema
-- Run in Supabase SQL editor (or `supabase db push` if using the CLI).

create table if not exists posts (
  id bigint generated always as identity primary key,
  scheduled_at timestamptz not null,
  pillar text not null check (pillar in ('book','origin','media','tour','builder','newsletter','review')),
  series text default '',
  format text not null default 'text',            -- text | photo | video | document
  hook text not null,
  body text not null,
  cta text not null default '',
  repurpose text not null default '',             -- what it becomes on the newsletter
  status text not null default 'draft'
    check (status in ('draft','approved','queued','posted','failed','skipped')),
  linkedin_post_id text,
  error text,
  retries int not null default 0,
  performance jsonb not null default '{}'::jsonb, -- {impressions, reactions, comments, notes}
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_sched_idx on posts (scheduled_at);
create index if not exists posts_status_idx on posts (status);

create table if not exists linkedin_tokens (
  id int primary key default 1 check (id = 1),    -- single-row table (one member)
  access_token text,
  refresh_token text,
  member_urn text,
  expires_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Row Level Security: deny-all for anon/authenticated. The app talks to these
-- tables ONLY through Next API routes using the service-role key, which
-- bypasses RLS after the route has verified the ADMIN_EMAIL allowlist.
alter table posts enable row level security;
alter table linkedin_tokens enable row level security;
