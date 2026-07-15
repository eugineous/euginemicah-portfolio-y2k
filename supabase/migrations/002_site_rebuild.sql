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

-- ============================================================================
-- seed data
-- ============================================================================
-- blog_posts: migrated as-is from content/em-site-data.ts's `articlesData`
-- (the site's real, already-published journal entries, previously rendered
-- by the now-retired /journal page). This is the *only* source used for
-- these seed rows. The DCLogic mockup this rebuild's /blog pages were
-- designed against ("Celebrity website project/Blog.dc.html") ships its
-- own 16 fully-written placeholder posts for layout/schema reference only
-- -- none of that fictional content is seeded here, deliberately.
--
-- Column mapping: cat -> category, deck -> excerpt, `lead` + parasA + parasB
-- (in that reading order) -> paragraphs, `read` (a number) -> read_time as
-- "N min read", tag_chips -> a single-element array of the real category
-- (no invented sub-tags). `date` was a loose string ("Jul 2026" etc.);
-- published_at is that month's 1st, in UTC. Two source months (Jun 2026,
-- May 2026) contain two articles each -- both keep the literal 1st of the
-- month, disambiguated by time-of-day (noon vs. midnight) so that ordering
-- by `published_at desc` reproduces articlesData's own array order, which
-- is already newest-first.
insert into blog_posts (slug, category, title, excerpt, paragraphs, tag_chips, read_time, status, published_at)
values
  (
    'no-script',
    'The Craft',
    'No script, no retake, no mercy',
    'What live television teaches you about honesty that journalism school charges tuition to avoid mentioning.',
    to_jsonb(array[
      'Two million people can tell when you are lying. Not because they are detectives — because live television is a polygraph with better lighting. The camera does not catch your words; it catches the half-second before them, and that half-second has never once been on my side.',
      'People ask what it feels like the moment the red light comes on. Honestly? It feels like the moment before you jump into cold water, except the water is two million Kenyans and several of them are your aunties, and at least one of them will call your mother if your collar is crooked.',
      'The first time I anchored, I had rehearsed a greeting so smooth it could have run for office. The autocue died in four seconds. What came out of my mouth instead was the truth — clumsy, unrehearsed, alive — and the audience leaned in. That was the whole lesson, delivered in one broadcast: polish is forgettable. Presence is not.',
      'Lucy and I do not use scripts now, which sounds brave until you understand what replaced them: preparation so heavy it should be checked luggage. We read everything. We argue about everything, off air, at volume, so that on air the argument has already been survived. The audience thinks we are winging it. We are — off a cliff we have measured very carefully.',
      'Here is what live TV teaches you that no lecture hall will: the truth is the only thing you can say at speed. Lies need drafting. Spin needs a committee. But the truth comes out at conversation pace, which is the only pace live television allows.',
      'So no — no script, no retake. But also no mercy, and I mean that gratefully. An audience that would forgive me anything would have taught me nothing.'
    ]::text[]),
    to_jsonb(array['The Craft']::text[]),
    '7 min read',
    'published',
    timestamptz '2026-07-01T00:00:00Z'
  ),
  (
    'kerosene',
    'The Climb',
    'The kerosene economy',
    'A financial education, administered one lamp at a time. Tuition was paid in darkness.',
    to_jsonb(array[
      'Before I understood money, I understood kerosene. Kerosene is honest currency: you can see exactly how much light you have left, and when the lamp starts coughing you know precisely how many pages of homework remain in the day. No banker has ever given me a statement that clear.',
      'In Lugari, the lamp was our streetlight, our reading light, and — when the wick misbehaved — our fire alarm. My grandmother rationed it like a central bank governor. There were interest rates: finish your chores early and the lamp burned an extra half hour. Default on your duties and you studied by moonlight, which sounds romantic and is not.',
      'What growing up broke actually teaches you about money is this: money is time you can see. Every shilling was a unit of light, of maize flour, of the bus to Lumakanda. Nothing was abstract. When I hear economists say "liquidity," I picture a jerrican.',
      'But here is what poverty lies to you about, and it lies fluently: it tells you that you are the shortage. That the empty tin is a character reference. It took me years — and one very patient grandfather, a reverend with a preaching voice that could bend weather — to learn that broke is a location, not an identity. You can be shipped out of a location.',
      'These days I get paid to talk, which my childhood self would find suspicious and my grandmother would find obvious. She always said the mouth would either bury me or build me. She lived to see it start building. We keep a lamp in the house — full tank, never lit. Some receipts you keep.'
    ]::text[]),
    to_jsonb(array['The Climb']::text[]),
    '6 min read',
    'published',
    timestamptz '2026-06-01T12:00:00Z'
  ),
  (
    'forty-schools',
    'The Tour',
    'Forty schools later, a field report on genius',
    'The most gifted kid in Kenya has never held a microphone. That fact should keep the whole country up at night.',
    to_jsonb(array[
      'Somewhere in this country, right now, there is a girl who can silence eight hundred students with one verse — and the only stage she has ever stood on is a desk, during lunch, while a prefect took her name. I know because the Urban Gang Tour has met her, in forty different uniforms, in forty different schools.',
      'Every stop runs the same experiment. We arrive with a stage, a sound system, and a national broadcast. We ask one question: who has something? The teachers point at the usual suspects — the choir kids, the ones with certificates. And then someone at the back gets pushed forward by their friends, visibly plotting revenge, and picks up the mic like it might bite.',
      'It never bites. What happens instead is the school discovers a star it has been marking absent all term.',
      'People ask why a talent tour needs mentorship pods and a broadcast attached. Because applause fades by Monday. A recording does not. A kid who has seen herself on national television has evidence — and evidence, where I grew up, is worth more than encouragement.',
      'Lucy says my favourite phrase on tour is "one more time," and she is right, because the second attempt is where the shaking stops and the talent stands up straight. Forty schools later, I can report: the genius is out there, in bulk. The microphones are the bottleneck. So we keep driving.'
    ]::text[]),
    to_jsonb(array['The Tour']::text[]),
    '6 min read',
    'published',
    timestamptz '2026-06-01T00:00:00Z'
  ),
  (
    'disagree',
    'The Craft',
    'How to interview a man you disagree with',
    'A field manual for keeping your eyebrows neutral while your opinions riot quietly behind them.',
    to_jsonb(array[
      'Every interviewer has a tell. Mine, according to Lucy, is that I get extremely polite — dangerously polite, the way a cat gets slow before it pounces. When a guest says something I find sincerely wrong, my "mmh" acquires an extra syllable. Viewers have started counting them.',
      'Here is the discipline: your disagreement is not the story. You are not the story. The story is the gap between what the guest is saying and what the audience needs to know, and your whole job is to hold that gap open long enough for everyone to look inside.',
      'So you ask the question. Then — and this is the hard part, the part they cannot teach — you let the silence do the follow-up. Silence is the best interviewer I know. It has no ego, it cannot be flattered, and guests fill it with the exact things their press officers begged them not to say.',
      'What you do not do is perform outrage. Outrage is cheap, it edits well, and it changes nobody’s mind — it just tells your side you are still on it. I did not leave Lugari and cross half of Kenya to become a mirror for people’s existing opinions.',
      'And when it ends, you shake the hand. Every time. Not because you agree — because the handshake is a message to the audience: this is what disagreement looks like when adults do it. In this country, on this continent, that might be the most useful thing my show broadcasts all week.'
    ]::text[]),
    to_jsonb(array['The Craft']::text[]),
    '5 min read',
    'published',
    timestamptz '2026-05-01T12:00:00Z'
  ),
  (
    'valedictorian',
    'The Climb',
    'Valedictorian, eventually',
    'On finishing school late, loudly, and first in the class. The timeline is not the achievement.',
    to_jsonb(array[
      'There is a photograph from my graduation at TIBS — class of 2024, valedictorian, gown slightly too short because confidence takes up room — and every time I look at it I hear the aunties from years ago asking my mother, with surgical concern, whether the boy was "still in school."',
      'The boy was intermittently in school. School costs money, and money, as covered elsewhere in this journal, was busy. I studied in bursts, worked in between — carrying cables at Citizen TV as an intern, learning television from the floor up, literally, because the floor is where the cables live.',
      'Here is what nobody tells you about a delayed education: you arrive at every class knowing exactly why you are there. The eighteen-year-olds were studying for exams. I was studying like the electricity bill depended on it, because at various points it had.',
      'When they read my name first at graduation, my mother did not cry. She did something better: she looked around at the aunties. Slowly. A full panoramic sweep, like a broadcast camera. I have hosted live television for years and I have never delivered anything with that much precision.',
      'So to everyone running late by somebody else’s calendar: the timeline is not the achievement. The arrival is. And arriving loud, with receipts — that is just style points.'
    ]::text[]),
    to_jsonb(array['The Climb']::text[]),
    '5 min read',
    'published',
    timestamptz '2026-05-01T00:00:00Z'
  ),
  (
    'fame-rental',
    'Unfiltered',
    'Fame is a rental (mine is due Tuesday)',
    'Notes on being recognised at the supermarket while buying the cheap bread, and other celebrity experiences.',
    to_jsonb(array[
      'A boy stopped me outside a supermarket last month, phone already filming, and shouted the Urban News intro at me word for word. Then he looked into my basket, saw the budget bread, and lowered his phone out of respect for the fallen. That, right there, is fame in its natural habitat.',
      'I enjoy being known. I would be lying otherwise, and as established, I am contractually incapable of lying at speed. But I keep a ledger in my head, and on that ledger fame is filed under rentals — enjoyable, useful, and absolutely not mine. The landlord is public attention, and the landlord is moody.',
      'You can always spot the celebrities who think they own the property. They stop preparing. They start explaining. Their captions get longer as their work gets thinner. I have watched it happen the way you watch a slow puncture — no drama, just a gradual loss of altitude and an eventual walk home.',
      'So the rule at Roylandz is simple: feed the work, not the fame. The show gets rehearsed, the tour gets planned, the book got written at 4 a.m. — and the fame can come along if it behaves. Attention is a consequence. The moment you make it the objective, you are competing with every phone in the country, and the phones are undefeated.',
      'Because when the rental notice comes — and it comes for everyone — I intend to hand back the keys politely, walk into a room I actually built, and keep talking. Loudly, obviously. Some things are freehold.'
    ]::text[]),
    to_jsonb(array['Unfiltered']::text[]),
    '5 min read',
    'published',
    timestamptz '2026-04-01T00:00:00Z'
  )
on conflict (slug) do nothing;
