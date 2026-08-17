-- Reconnects the `shows` table to the live site. Until this migration,
-- /work rendered hardcoded content and this table's admin tab edited
-- nothing anyone could see. Adds the two columns /work's design needs
-- (a short bullet list, an optional partner logo) and backfills real
-- content: bullets for the three existing published rows, plus two new
-- rows (Journalism, Digital) that /work's design called for but weren't
-- in this table yet. No generic "Live" placeholder row was added --
-- "Urban Gang Tour Live" already covers live/tour work with real,
-- previously-verified links, and Build page covers Urban Gang Tour in
-- depth separately.

alter table shows
  add column if not exists details jsonb not null default '[]'::jsonb,
  add column if not exists logo_url text not null default '';

comment on column shows.details is 'Array of short bullet strings shown under the description on /work.';
comment on column shows.logo_url is 'Optional partner/brand logo image, shown above the description on /work.';

update shows set details = '["Co-host and on-air interviewer","Editorial input on segment selection","Field and studio production"]'::jsonb, logo_url = '/assets/brand-2026-08/logos/PPP-TV-logo.webp' where name = 'Urban News';
update shows set details = '["Host and field producer","On-location interviews","Short-form digital cuts"]'::jsonb where name = 'Campus Xposure';
update shows set details = '["Host","Guest booking and interview preparation","Also on TikTok @thenairobipodcast"]'::jsonb where name = 'Nairobi Podcast';

insert into shows (name, tag, description, meta, image_url, cta_label, cta_href, is_flagship, sort_order, status, details)
values (
  'Journalism',
  'Reporting & Writing',
  'Background across Citizen TV, Royal Media Services and radio, plus editorial writing for Global Cyber Alliance.',
  '',
  '/assets/brand-2026-08/1 (16).webp',
  'View portfolio on Muck Rack',
  'https://muckrack.com/eugine-micah/portfolio',
  false,
  5,
  'published',
  '["Broadcast reporting","Editorial writing","Contributor — Protecting the Online Safety of Journalists in Africa (Global Cyber Alliance, 2021)"]'::jsonb
)
on conflict do nothing;

insert into shows (name, tag, description, meta, image_url, cta_label, cta_href, is_flagship, sort_order, status, details)
values (
  'Digital',
  'Content & Growth',
  'Content strategy, SEO and AI-assisted publishing workflows built for newsroom and personal-brand use.',
  '',
  '/assets/brand-2026-08/1 (9).webp',
  '',
  '',
  false,
  6,
  'published',
  '["SEO and web publishing","Social and audience growth","AI-assisted content pipelines"]'::jsonb
)
on conflict do nothing;
