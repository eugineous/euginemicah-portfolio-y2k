import type { Metadata } from 'next';
import { getPublishedShows } from '@/lib/shows';

// Full replace under the new brand IA — structure/design from
// design_handoff_full_site_backend/site/Work.dc.html (6-entry alternating
// layout). Originally shipped with hardcoded content; now reads from the
// real `shows` table (see lib/shows.ts, supabase/migrations/
// 005_shows_details_and_logo.sql) so editing it in /control-room actually
// changes what's live here — that table previously backed the old /work
// (booking/hire) page and had gone orphaned when this route was replaced.
// Falls back to an empty-state message rather than 500ing if the table
// isn't reachable or has no published rows.

export const metadata: Metadata = {
  title: 'Work — Eugine Micah',
  description: 'Where the work actually happens.',
  alternates: { canonical: '/work' },
};

export default async function WorkPage() {
  const items = await getPublishedShows();

  return (
    <main>
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '70px 32px 40px' }}>
        <div
          style={{
            fontFamily: 'var(--f-work-sans)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--em-crimson)',
            marginBottom: 14,
          }}
        >
          Work
        </div>
        <h1
          style={{
            fontFamily: 'var(--f-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(34px, 5.5vw, 60px)',
            lineHeight: 0.98,
            letterSpacing: '-0.01em',
            color: 'var(--em-near-black)',
            margin: 0,
            maxWidth: 800,
          }}
        >
          Where the work actually happens.
        </h1>
      </section>

      {items.length === 0 ? (
        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px 90px' }}>
          <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, opacity: 0.6 }}>Nothing published yet.</p>
        </section>
      ) : (
        <section style={{ borderTop: '3px solid var(--em-near-black)' }}>
          {items.map((w, i) => {
            const flip = i % 2 === 1;
            const aspect = '3/4';
            return (
              <div
                key={w.id}
                style={{
                  borderBottom: '3px solid var(--em-near-black)',
                  maxWidth: 1400,
                  margin: '0 auto',
                  padding: '56px 32px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 40,
                  alignItems: 'center',
                }}
              >
                <div style={{ order: flip ? 2 : 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--f-work-sans)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--em-crimson)',
                      marginBottom: 12,
                    }}
                  >
                    {w.tag}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--f-archivo)',
                      fontWeight: 900,
                      fontSize: 'clamp(24px, 3.2vw, 32px)',
                      color: 'var(--em-near-black)',
                      marginBottom: 14,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {w.name}
                  </div>
                  {w.logo_url && (
                    <div style={{ height: 32, marginBottom: 14 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.logo_url} alt={`${w.name} logo`} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, color: 'rgba(23,23,26,0.7)', lineHeight: 1.6, marginBottom: 16, maxWidth: 520 }}>
                    {w.description}
                  </div>
                  {w.details.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {w.details.map((d) => (
                        <div key={d} style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, color: 'rgba(23,23,26,0.55)' }}>
                          — {d}
                        </div>
                      ))}
                    </div>
                  )}
                  {w.cta_href && (
                    <div style={{ marginTop: 16 }}>
                      <a
                        href={w.cta_href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-block', color: 'var(--em-crimson)', textDecoration: 'none', fontFamily: 'var(--f-work-sans)', fontSize: 13, fontWeight: 700 }}
                      >
                        {w.cta_label || 'Learn more'} &rarr;
                      </a>
                    </div>
                  )}
                </div>
                <div style={{ order: flip ? 1 : 2, position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: aspect }}>
                  {w.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.image_url} alt={w.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--em-tan)' }} />
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      <section style={{ background: 'var(--em-near-black)', color: 'var(--em-paper)', padding: '56px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 20, marginBottom: 10 }}>Selected collaborations</div>
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, color: 'rgba(250,247,242,0.65)', maxWidth: 560, lineHeight: 1.6 }}>
            Brand and commercial work is largely handled privately. Details on specific collaborations are available
            on request through Work With Eugine.
          </div>
        </div>
      </section>
    </main>
  );
}
