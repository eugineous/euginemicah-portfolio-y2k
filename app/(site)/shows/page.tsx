import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Shows & Podcasts — structure/layout ported from the DCLogic mockup at
// "Celebrity website project/Shows.dc.html" (flagship spotlight, credibility
// strip, "more shows" grid, watch-and-listen platform badges), reimplemented
// as a real server component reading from Supabase (public anon client —
// see lib/supabase.ts's verifyAdmin() for the same url/anon-key pattern;
// RLS on the `shows` table already scopes anon reads to status='published'
// rows, so no service-role key is needed here). The mockup's own four
// shows and their stats (e.g. "2M+ weekly viewers") were mockup content,
// not verified real numbers — dropped per the content-integrity rule.
// Real content comes from content/em-site-data.ts's tvGuideData/
// workDetailData and is seeded into the `shows` table by the
// `-- seed data` section at the bottom of
// supabase/migrations/002_site_rebuild.sql (see that file for cta_href
// sourcing notes — every link below was independently verified, not
// invented).

export const metadata: Metadata = {
  title: 'Shows',
  description:
    'Watch and listen to Eugine Micah: Urban News on PPP TV, Campus Xposure, The Nairobi Podcast and the Urban Gang Tour, live.',
  alternates: { canonical: '/shows' },
};

// Revalidate periodically so /control-room edits (a later phase) show up
// without a redeploy, without hitting Supabase on every request.
export const revalidate = 300;

type Show = {
  id: number;
  name: string;
  tag: string;
  description: string;
  meta: string;
  image_url: string;
  cta_label: string;
  cta_href: string;
  is_flagship: boolean;
  sort_order: number;
  status: 'draft' | 'published';
};

async function getShows(): Promise<Show[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return [];
  try {
    const supabase = createClient(url, anon, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from('shows')
      .select('*')
      .eq('status', 'published')
      .order('is_flagship', { ascending: false })
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return data as Show[];
  } catch {
    // Network/config issue — fail soft into the empty-state below rather
    // than breaking the page for visitors.
    return [];
  }
}

// Real, verified facts (already used elsewhere in the site — press/page.tsx's
// factsData, roylandz/page.tsx's stats) — not invented for this page.
const credStats: [string, string][] = [
  ['4', 'Shows & podcasts'],
  ['2022', 'On air, Urban News'],
  ['EN / SW', 'Hosted bilingually'],
  ['40+', 'Schools toured, Urban Gang Tour'],
];

// Real, verified profile/channel links (same URLs already used sitewide in
// Roylandz/Work's socials lists, plus the two shows-specific links
// confirmed for this page — see the migration's seed-data comment).
const platforms: [string, string][] = [
  ['YouTube', 'https://www.youtube.com/channel/UC3ED9wyUawELS4tQx99u48Q'],
  ['TikTok', 'https://www.tiktok.com/@eugine.micah'],
  ['Amazon Music', 'https://music.amazon.com/podcasts/a949f49a-b297-4122-9a2e-54bd77f0b286/the-nairobi-podcast'],
  ['Urban Gang Tour', 'https://urbangangtour.co.ke'],
  ['Instagram', 'https://www.instagram.com/eugine.micah/'],
];

const railStops: [string, string, 'a' | 'b' | 'c'][] = [
  ['#flagship', 'FLAGSHIP', 'a'],
  ['#shows', 'SHOWS', 'b'],
  ['#listen', 'LISTEN', 'c'],
  ['#next', 'NEXT', 'a'],
];

const railBg: Record<'a' | 'b' | 'c', string> = { a: 'var(--a)', b: 'var(--b)', c: 'var(--c)' };
const railColor: Record<'a' | 'b' | 'c', string> = { a: '#FAF4EA', b: '#FAF4EA', c: '#1B1714' };
const cardShadows = ['var(--a)', 'var(--b)', 'var(--c)'];

export default async function ShowsPage() {
  const shows = await getShows();
  const flagship = shows.find((s) => s.is_flagship) ?? shows[0];
  const rest = shows.filter((s) => s.id !== flagship?.id);

  return (
    <main>
      {/* ON-PAGE NAV */}
      <div
        className="hidden md:flex"
        style={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 45, flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}
      >
        <div style={{ writingMode: 'vertical-rl', fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--text)', opacity: 0.4, padding: '4px 2px' }}>
          ON THIS PAGE
        </div>
        {railStops.map(([href, label, key]) => (
          <Link
            key={href}
            href={href}
            title={label}
            className="emx-navdot"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', padding: '14px 7px', background: railBg[key], color: railColor[key], border: '2.5px solid var(--text)', borderRadius: '10px 0 0 10px', fontWeight: 800, fontSize: 11, letterSpacing: 1.5, boxShadow: '-3px 3px 0 var(--text)' }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* HERO */}
      <header style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 28px 30px' }}>
        <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--a)' }}>
          on screen and on mic
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(42px, 6vw, 76px)', letterSpacing: '-2.5px', lineHeight: 0.98, margin: '10px 0 18px' }}>
          The shows
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 560, fontWeight: 500, margin: 0 }}>
          Four shows, one voice. From live national youth news to the stories of Nairobi&rsquo;s creative economy,
          this is where the culture gets covered.
        </p>
      </header>

      {shows.length === 0 ? (
        <>
          {/* EMPTY STATE — no rows yet (migration not seeded, or Supabase env vars unset) */}
          <section style={{ maxWidth: 900, margin: '20px auto 100px', padding: '0 28px' }}>
            <div style={{ border: '3px dashed var(--text)', borderRadius: 24, padding: '60px 32px', textAlign: 'center' }}>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-1px', margin: '0 0 14px' }}>
                Shows lineup landing soon
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, fontWeight: 500, opacity: 0.75, maxWidth: 480, margin: '0 auto 26px' }}>
                We&rsquo;re setting up this page behind the scenes. In the meantime, catch Urban News, Campus
                Xposure, the Nairobi Podcast and the Urban Gang Tour on the socials below.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                {platforms.map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="emx-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, color: 'var(--text)', border: '2px solid var(--text)', borderRadius: 999, padding: '9px 18px' }}
                  >
                    {name} ↗
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* FLAGSHIP HERO */}
          {flagship && (
            <section id="flagship" style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 28px 0' }}>
              <a
                href={flagship.cta_href}
                target="_blank"
                rel="noopener"
                className="emx-lane"
                style={{
                  ['--sh' as string]: 'var(--a)',
                  position: 'relative',
                  display: 'block',
                  border: '3px solid #1B1714',
                  borderRadius: 24,
                  overflow: 'hidden',
                  minHeight: 440,
                  color: '#FAF4EA',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flagship.image_url}
                  alt={flagship.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div
                  aria-hidden
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,23,20,0.95) 10%, rgba(27,23,20,0.45) 50%, rgba(27,23,20,0.05) 80%)' }}
                />
                <div style={{ position: 'relative', height: '100%', minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 40, boxSizing: 'border-box' }}>
                  {flagship.tag && (
                    <span style={{ display: 'inline-block', width: 'fit-content', fontWeight: 800, fontSize: 13, background: 'var(--c)', color: '#1B1714', border: '2px solid #1B1714', borderRadius: 999, padding: '5px 14px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>
                      {flagship.tag}
                    </span>
                  )}
                  <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4.5vw, 50px)', letterSpacing: '-1.5px', margin: '0 0 14px', lineHeight: 1 }}>
                    {flagship.name}
                  </h2>
                  <p style={{ margin: '0 0 18px', fontSize: 17, lineHeight: 1.6, fontWeight: 500, maxWidth: 580, opacity: 0.92 }}>
                    {flagship.description}
                  </p>
                  {flagship.meta && (
                    <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 0.5, color: 'var(--c)', marginBottom: 22 }}>
                      {flagship.meta}
                    </div>
                  )}
                  <div style={{ display: 'inline-block', width: 'fit-content', fontWeight: 700, fontSize: 15, background: '#FAF4EA', color: '#1B1714', border: '3px solid #1B1714', borderRadius: 12, padding: '12px 22px', boxShadow: '4px 4px 0 var(--c)' }}>
                    {flagship.cta_label || 'Watch now'} ↗
                  </div>
                </div>
              </a>
            </section>
          )}

          {/* CREDIBILITY STRIP */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 28px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 18 }}>
            {credStats.map(([num, label]) => (
              <div key={label} className="emx-stat" style={{ textAlign: 'center', border: '2.5px solid var(--text)', borderRadius: 14, padding: '18px 12px', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: '-0.5px', color: 'var(--a)' }}>{num}</div>
                <div style={{ fontWeight: 600, fontSize: 12.5, opacity: 0.7, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </section>

          {/* MORE SHOWS */}
          {rest.length > 0 && (
            <section id="shows" style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 28px 60px' }}>
              <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.5, marginBottom: 22 }}>
                More to watch and hear
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                {rest.map((show, i) => {
                  const shadow = cardShadows[i % cardShadows.length];
                  return (
                    <div
                      key={show.id}
                      className="emx-lane"
                      style={{ ['--sh' as string]: shadow, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, background: '#fff', border: '3px solid #1B1714', borderRadius: 20, overflow: 'hidden' }}
                    >
                      <div style={{ position: 'relative', minHeight: 240 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img loading="lazy" src={show.image_url} alt={show.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                        {show.tag && (
                          <span style={{ position: 'absolute', top: 16, left: 16, fontWeight: 800, fontSize: 12, background: shadow, color: '#FAF4EA', border: '2px solid #1B1714', borderRadius: 999, padding: '5px 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {show.tag}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 30, justifyContent: 'center', color: '#1B1714' }}>
                        <h3 style={{ fontWeight: 800, fontSize: 'clamp(22px, 2.6vw, 28px)', letterSpacing: '-0.5px', margin: 0 }}>{show.name}</h3>
                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 500, opacity: 0.85 }}>{show.description}</p>
                        {show.meta && (
                          <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--a)', letterSpacing: '0.3px' }}>{show.meta}</div>
                        )}
                        {show.cta_href && show.cta_href !== '#' && (
                          <div style={{ marginTop: 4 }}>
                            <a
                              href={show.cta_href}
                              target="_blank"
                              rel="noopener"
                              className="emx-cta"
                              style={{ display: 'inline-block', fontWeight: 700, fontSize: 15, background: '#1B1714', color: '#FAF4EA', border: '3px solid #1B1714', borderRadius: 12, padding: '11px 20px', boxShadow: `3px 3px 0 ${shadow}` }}
                            >
                              {show.cta_label || 'Watch now'} ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* WATCH & LISTEN EVERYWHERE */}
          <section id="listen" style={{ background: '#1B1714', borderTop: '3px solid #1B1714', borderBottom: '3px solid #1B1714', padding: '60px 28px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 22, color: 'var(--c)' }}>
                  wherever you already are
                </div>
                <h2 style={{ fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 40px)', letterSpacing: '-1px', color: '#FAF4EA', margin: '6px 0 0' }}>
                  Watch &amp; listen everywhere
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                {platforms.map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="emx-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14, color: '#FAF4EA', border: '2.5px solid rgba(250,244,234,0.35)', borderRadius: 999, padding: '11px 22px' }}
                  >
                    {name} ↗
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* NEXT TRANSITION */}
      <section id="next" style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px' }}>
        <div style={{ fontWeight: 800, fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-2px' }}>
          Next: <Link href="/book" className="emx-link" style={{ color: 'var(--a)' }}>the book →</Link>
        </div>
      </section>
    </main>
  );
}
