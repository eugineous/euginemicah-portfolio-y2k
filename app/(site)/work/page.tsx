import type { Metadata } from 'next';

// Full replace under the new brand IA — verbatim structure/copy from
// design_handoff_full_site_backend/site/Work.dc.html. The old /work page
// (booking/hire content) has moved to /work-with-eugine; this route is now
// the portfolio page the design calls "Work" (6 alternating entries).
//
// The old app/(site)/shows/page.tsx was checked for real content to fold
// in — it reads live from the Supabase `shows` table with no hardcoded
// booking copy of its own, so there was nothing to carry over beyond the
// "Live" entry below, which is an intentional placeholder per the source
// ("Structure ready — confirmed bookings will be listed here") — not
// fabricated.

export const metadata: Metadata = {
  title: 'Work — Eugine Micah',
  description: 'Where the work actually happens.',
  alternates: { canonical: '/work' },
};

type WorkItem = {
  slotId: string;
  src: string;
  imgLabel: string;
  kicker: string;
  title: string;
  aspect: string;
  flip: boolean;
  desc: string;
  details: string[];
  logo?: string;
  logoAlt?: string;
  links?: { href: string; label: string }[];
};

const items: WorkItem[] = [
  {
    slotId: 'work-urbannews',
    src: '/assets/brand-2026-08/1 (12).webp',
    imgLabel: 'Urban News',
    kicker: 'Broadcast',
    title: 'Urban News',
    aspect: '3/4',
    flip: false,
    desc: "Co-hosted with Lucy. Current affairs and culture coverage for PPP TV's Urban News desk.",
    details: ['Co-host and on-air interviewer', 'Editorial input on segment selection', 'Field and studio production'],
    logo: '/assets/brand-2026-08/logos/PPP-TV-logo.webp',
    logoAlt: 'PPP TV logo',
    links: [{ href: 'https://www.youtube.com/@urbannewsgang', label: 'Watch on YouTube' }],
  },
  {
    slotId: 'work-campus',
    src: '/assets/brand-2026-08/1 (13).webp',
    imgLabel: 'Campus Xposure',
    kicker: 'Campus',
    title: 'Campus Xposure',
    aspect: '3/4',
    flip: true,
    desc: 'Field-hosted coverage of student culture, innovation and creative talent across Kenyan universities and colleges.',
    details: ['Host and field producer', 'On-location interviews', 'Short-form digital cuts'],
  },
  {
    slotId: 'work-podcast',
    src: '/assets/brand-2026-08/1 (3).webp',
    imgLabel: 'The Nairobi Podcast',
    kicker: 'Audio',
    title: 'The Nairobi Podcast',
    aspect: '3/4',
    flip: false,
    desc: 'Long-form conversations recorded around the city.',
    details: ['Host', 'Guest booking and interview preparation', 'Also on TikTok @thenairobipodcast'],
    links: [{ href: 'https://www.youtube.com/@thenairobipodcast', label: 'Watch on YouTube' }],
  },
  {
    slotId: 'work-journalism',
    src: '/assets/brand-2026-08/1 (16).webp',
    imgLabel: 'Journalism',
    kicker: 'Journalism',
    title: 'Journalism',
    aspect: '16/9',
    flip: true,
    desc: 'Background across Citizen TV, Royal Media Services and radio, plus editorial writing for Global Cyber Alliance.',
    details: [
      'Broadcast reporting',
      'Editorial writing',
      'Contributor — Protecting the Online Safety of Journalists in Africa (Global Cyber Alliance, 2021)',
    ],
    links: [
      { href: 'https://muckrack.com/eugine-micah/portfolio', label: 'View portfolio on Muck Rack' },
      { href: 'https://gcatoolkit.org/', label: 'Read the GCA toolkit' },
    ],
  },
  {
    slotId: 'work-digital',
    src: '/assets/brand-2026-08/1 (9).webp',
    imgLabel: 'Digital',
    kicker: 'Digital',
    title: 'Digital',
    aspect: '3/4',
    flip: false,
    desc: 'Content strategy, SEO and AI-assisted publishing workflows built for newsroom and personal-brand use.',
    details: ['SEO and web publishing', 'Social and audience growth', 'AI-assisted content pipelines'],
  },
  {
    slotId: 'work-live',
    src: '/assets/brand-2026-08/1 (6).webp',
    imgLabel: 'Live hosting',
    kicker: 'Live',
    title: 'Live',
    aspect: '16/9',
    flip: true,
    desc: 'MC, hype, hosting and moderation for events and school activations.',
    details: ['Structure ready — confirmed bookings will be listed here'],
  },
];

export default function WorkPage() {
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

      <section style={{ borderTop: '3px solid var(--em-near-black)' }}>
        {items.map((w) => (
          <div
            key={w.slotId}
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
            <div style={{ order: w.flip ? 2 : 1 }}>
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
                {w.kicker}
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
                {w.title}
              </div>
              {w.logo && (
                <div style={{ height: 32, marginBottom: 14 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.logo} alt={w.logoAlt} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
                </div>
              )}
              <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, color: 'rgba(23,23,26,0.7)', lineHeight: 1.6, marginBottom: 16, maxWidth: 520 }}>
                {w.desc}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {w.details.map((d) => (
                  <div key={d} style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, color: 'rgba(23,23,26,0.55)' }}>
                    — {d}
                  </div>
                ))}
              </div>
              {w.links && w.links.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
                  {w.links.map((lk) => (
                    <a
                      key={lk.href}
                      href={lk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', color: 'var(--em-crimson)', textDecoration: 'none', fontFamily: 'var(--f-work-sans)', fontSize: 13, fontWeight: 700 }}
                    >
                      {lk.label} &rarr;
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div style={{ order: w.flip ? 1 : 2, position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: w.aspect }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.src} alt={w.imgLabel} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        ))}
      </section>

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
