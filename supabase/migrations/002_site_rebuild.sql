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
  name text not null unique, -- unique so the seed data below can upsert on conflict (name)
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

-- ============================================================================
-- seed data (run this after the migration above, once, e.g. via the
-- Supabase SQL editor or `supabase db push`) -- /shows launch content
-- ============================================================================
-- The four real shows Eugine hosts today, per content/em-site-data.ts's
-- tvGuideData/workDetailData (both already-verified, existing site copy --
-- not invented for this seed). `on conflict (name) do nothing` makes this
-- safe to re-run: it will never duplicate or clobber rows an admin has
-- since edited via /control-room.
--
-- cta_href sourcing notes (verified 2026-07-15, see phase report):
--   - Urban News: real YouTube playlist of the show, confirmed via search.
--   - Campus Xposure: no dedicated Campus Xposure channel could be
--     confirmed to exist -- linked instead to Eugine's own verified TikTok
--     (@eugine.micah, already used sitewide in Roylandz/Work's socials
--     lists), where tvGuideData/workDetailData both say this show's
--     clips actually live. Flagged for the owner to replace with a
--     dedicated Campus Xposure link if/when one exists.
--   - Nairobi Podcast: real Amazon Music show page, confirmed via search
--     (exact title + host match: "The Nairobi Podcast", Eugine Micah &
--     Lucy Ogunde).
--   - Urban Gang Tour Live: the tour's own real, live site,
--     urbangangtour.co.ke (Eugine's own ticketing/events site).
insert into shows (name, tag, description, meta, image_url, cta_label, cta_href, is_flagship, sort_order, status)
values
  (
    'Urban News',
    'Flagship · PPP TV',
    'The youth news desk of PPP TV, co-anchored with Lucy Ogunde. Hard topics made easy, easy topics made to matter -- at conversational speed, live, with no script and no retakes. The audience is young, national, and impossible to fool.',
    'PPP TV · Live · Tue & Thu 7:30 PM',
    '/hq-assets/un-desk-02.jpg',
    'Watch on YouTube',
    'https://www.youtube.com/playlist?list=PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz',
    true,
    1,
    'published'
  ),
  (
    'Campus Xposure',
    'The Roaming Show',
    'A camera walks into a campus and the quad becomes a studio -- talent, fashion, hot takes, and the occasional roast, all captured raw. Student culture without the adult supervision it probably deserves.',
    'Tour season · YouTube & TikTok',
    '/hq-assets/gal-dance.jpg',
    'Watch on TikTok',
    'https://www.tiktok.com/@eugine.micah',
    false,
    2,
    'published'
  ),
  (
    'Nairobi Podcast',
    'The Long Form',
    'Long conversations with the people building East African culture -- artists, founders, athletes, and the occasional politician who arrived with talking points and left without them. Silence is a co-host.',
    'Weekly · Spotify & Amazon Music',
    '/hq-assets/shoot-08.jpg',
    'Listen on Amazon Music',
    'https://music.amazon.com/podcasts/a949f49a-b297-4122-9a2e-54bd77f0b286/the-nairobi-podcast',
    false,
    3,
    'published'
  ),
  (
    'Urban Gang Tour Live',
    'The Live Vehicle',
    'Kenya''s youth talent search, mentorship and awards concert tour, co-founded with Lucy Ogunde. Showcases, mentorship pods, a modelling runway, and a national broadcast -- from a school field, every stop, at full volume.',
    'Every stop · PPP TV · Live',
    '/hq-assets/gal-festival.jpg',
    'See tour dates',
    'https://urbangangtour.co.ke',
    false,
    4,
    'published'
  )
on conflict (name) do nothing;
