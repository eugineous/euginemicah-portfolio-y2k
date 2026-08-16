import type { Metadata } from 'next';

// New route — verbatim content from design_handoff_full_site_backend/site/Now.dc.html.

export const metadata: Metadata = {
  title: 'Now — Eugine Micah',
  description: 'What Eugine Micah is currently working on.',
  alternates: { canonical: '/now' },
};

const nowItems = [
  { label: 'On air', text: 'Co-hosting Urban News, covering current affairs and culture.' },
  { label: 'On tour', text: "Running Urban Gang Tour's next school cycle with Lucy and Charles Luche." },
  { label: 'Hosting', text: 'Campus Xposure across Kenyan campuses, and The Nairobi Podcast.' },
  { label: 'Published', text: 'Released his first book, Born Broke, Built Loud — out now on Amazon.' },
  { label: 'Building', text: 'ProPost and a second technical project, both in development.' },
];

export default function NowPage() {
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
        <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 13, color: 'rgba(23,23,26,0.5)', marginBottom: 48 }}>
          Updated August 2026
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {nowItems.map((n) => (
            <div key={n.label} style={{ display: 'flex', gap: 24, padding: '24px 0', borderTop: '2px solid var(--em-near-black)', flexWrap: 'wrap' }}>
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
