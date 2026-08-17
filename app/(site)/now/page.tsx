import type { Metadata } from 'next';
import { getPublishedNowItems, formatUpdatedLabel } from '@/lib/now';

// Originally shipped with hardcoded content, verbatim from
// design_handoff_full_site_backend/site/Now.dc.html. Now reads from the
// real `now_items` table (see lib/now.ts, supabase/migrations/
// 006_now_items.sql) so it can be updated from /control-room without a
// code deploy -- the whole point of a "now page" is that it stays current.
// Seeded with the same 5 items it originally shipped with.

export const metadata: Metadata = {
  title: 'Now — Eugine Micah',
  description: 'What Eugine Micah is currently working on.',
  alternates: { canonical: '/now' },
};

// ISR, same reasoning as /work's revalidate export -- see its comment.
export const revalidate = 60;

export default async function NowPage() {
  const nowItems = await getPublishedNowItems();
  const updatedLabel = formatUpdatedLabel(nowItems);
  return (
    <main>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '90px 32px 100px' }}>
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
          Now
        </div>
        <h1
          style={{
            fontFamily: 'var(--f-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            color: 'var(--em-near-black)',
            margin: '0 0 12px',
          }}
        >
          What he&rsquo;s doing right now.
        </h1>
        {updatedLabel && (
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 13, color: 'rgba(23,23,26,0.5)', marginBottom: 48 }}>
            {updatedLabel}
          </div>
        )}
        {nowItems.length === 0 && (
          <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, opacity: 0.6 }}>Nothing published yet.</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {nowItems.map((n) => (
            <div key={n.id} style={{ display: 'flex', gap: 24, padding: '24px 0', borderTop: '2px solid var(--em-near-black)', flexWrap: 'wrap' }}>
              <div
                style={{
                  flex: 'none',
                  width: 150,
                  fontFamily: 'var(--f-work-sans)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--em-crimson)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                {n.label}
              </div>
              <div style={{ flex: 1, minWidth: 220, fontFamily: 'var(--f-work-sans)', fontSize: 16, lineHeight: 1.55, color: 'var(--em-near-black)' }}>
                {n.text}
              </div>
            </div>
          ))}
          <div style={{ borderTop: '2px solid var(--em-near-black)' }} />
        </div>
      </section>
    </main>
  );
}
