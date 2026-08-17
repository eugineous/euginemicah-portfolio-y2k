-- Backs the "Now" page (/now) -- short, frequently-updated status items.
-- /now shipped hardcoded during the rebrand; this makes it editable from
-- /control-room without a code deploy, matching the "living brand" intent
-- a Now page is supposed to serve. Seeded with the same 5 real items /now
-- already shipped with, verbatim.

create table if not exists now_items (
  id bigint generated always as identity primary key,
  label text not null default '',
  text text not null default '',
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table now_items enable row level security;

create policy "now_items public read published" on now_items
  for select
  to anon, authenticated
  using (status = 'published');

comment on table now_items is 'Backs the "Now" page (/now) -- short, frequently-updated status items, editable from /control-room without a code deploy.';

insert into now_items (label, text, sort_order, status)
values
  ('On air', 'Co-hosting Urban News, covering current affairs and culture.', 1, 'published'),
  ('On tour', 'Running Urban Gang Tour''s next school cycle with Lucy and Charles Luche.', 2, 'published'),
  ('Hosting', 'Campus Xposure across Kenyan campuses, and The Nairobi Podcast.', 3, 'published'),
  ('Published', 'Released his first book, Born Broke, Built Loud — out now on Amazon.', 4, 'published'),
  ('Building', 'ProPost and a second technical project, both in development.', 5, 'published');
