import type { Metadata } from 'next';
import Link from 'next/link';

// HOMEPAGE — 2026-08 rebrand full replace.
//
// Ported verbatim from the design handoff's Home.dc.html (Pages/Home.dc.html
// in the "Eugine Micah — Full Site Rebuild" bundle, found locally at
// "Downloads/eugine micah brand new website" — the DesignSync MCP tool
// named in this phase's brief was not available in this session, so the
// bundle's own copy of the .dc.html source file was used directly instead;
// its README.md confirms it as the same content-final, ground-truth handoff
// — "every page has final copy, final colors, final typography... none of
// it is lorem ipsum"). Every heading, kicker, card description and proof
// point below is copied as-is from that file's renderVals() block, not
// paraphrased.
//
// Routes: Urban News / Campus Xposure / The Nairobi Podcast point at /work,
// Urban Gang Tour / Roylandz Media point at /build, the hero CTA points at
// /profile, and the closing CTA points at /work-with-eugine — matching the
// nav map already wired up in SiteHeader.tsx for this same rebrand phase.
//
// Testimonials: the source renders this section's shell with
// hasTestimonials:false / testimonials:[] — i.e. intentionally empty until
// real quotes exist (see the handoff README's "Known gaps" list). Kept as
// an empty shell here too — no invented quotes.
export const metadata: Metadata = {
  title: 'Eugine Micah — Broadcaster, Journalist, Founder',
  description:
    'Broadcaster, journalist, and founder building media, technology, and youth culture platforms across Kenya.',
  alternates: { canonical: '/' },
};

const ticker = ['Broadcast', 'Journalism', 'Live Hosting', 'Digital', 'Founder'];
const tickerDouble = [...ticker, ...ticker];

// The site had zero Person/identity structured data before this -- only
// /ideas (Book), /build (Organization), /work-with-eugine (FAQPage) and
// /blog/[slug] (Article) carried any JSON-LD. Adding the canonical Person
// entity here, on the homepage, since Google recommends one authoritative
// instance rather than repeating it per page. sameAs links are the same
// real, already-verified URLs used in SiteFooter.tsx.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Eugine Micah',
  url: 'https://euginemicah.tech',
  jobTitle: 'Broadcaster, Journalist, Founder',
  description: 'Broadcaster, journalist, and founder building media, technology, and youth culture platforms across Kenya.',
  image: 'https://euginemicah.tech/assets/brand-2026-08/1 (11).webp',
  worksFor: [
    { '@type': 'Organization', name: 'Roylandz Media' },
    { '@type': 'Organization', name: 'Urban Gang Tour' },
  ],
  sameAs: [
    'https://ke.linkedin.com/in/euginemicah',
    'https://instagram.com/eugine.micah/',
    'https://x.com/eugineroylandz',
    'https://muckrack.com/eugine-micah/portfolio',
  ],
};

const background = ['Citizen TV', 'Royal Media Services', 'PPP TV — Urban News', 'Global Cyber Alliance'];

const properties: { kicker: string; title: string; desc: string; href: string }[] = [
  { kicker: 'Broadcast', title: 'Urban News', desc: 'Co-hosted current affairs and culture coverage.', href: '/work' },
  { kicker: 'Campus', title: 'Campus Xposure', desc: 'Student culture and innovation across Kenyan universities.', href: '/work' },
  { kicker: 'Audio', title: 'The Nairobi Podcast', desc: 'Conversations recorded around the city.', href: '/work' },
  { kicker: 'Founder', title: 'Urban Gang Tour', desc: 'A high-school talent tour reaching schools across Kenya.', href: '/build' },
  { kicker: 'Company', title: 'Roylandz Media', desc: 'The media company built from an early personal brand.', href: '/build' },
];

const currently: { label: string; desc: string }[] = [
  { label: 'On air', desc: 'Co-hosting Urban News' },
  { label: 'Hosting', desc: 'Campus Xposure across Kenyan campuses' },
  { label: 'Building', desc: "Urban Gang Tour's next school tour" },
];

const proof: { title: string; sub: string; href?: string }[] = [
  { title: 'Co-host, Urban News', sub: 'Broadcast journalism' },
  { title: 'Founder, Urban Gang Tour', sub: 'Youth talent platform, since 2024' },
  { title: 'Contributor, Global Cyber Alliance', sub: 'Editorial writing' },
  { title: 'Journalist portfolio', sub: 'Published clips on Muck Rack', href: 'https://muckrack.com/eugine-micah/portfolio' },
];

export default function HomePage() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      {/* Scoped motion rules — kept local to this file (page.tsx is the only
          file this phase may touch). Reuses globals.css's existing
          `em-marquee` keyframe (translateX 0 → -50%, already shipped for
          the pre-rebrand homepage's own ticker) rather than declaring a
          duplicate. Everything here respects prefers-reduced-motion. */}
      <style>{`
        .em-hp-marquee-track { animation: em-marquee 22s linear infinite; }
        @keyframes em-hp-scroll-bounce { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(8px); opacity: 1; } }
        .em-hp-scroll-cue { animation: em-hp-scroll-bounce 2s ease-in-out infinite; }
        .em-hp-cta-solid { transition: background 0.2s ease; }
        .em-hp-cta-solid:hover { background: var(--em-near-black) !important; }
        .em-hp-speaking-img { transition: transform 0.5s cubic-bezier(.2,.8,.2,1); }
        .em-hp-speaking-img:hover { transform: scale(1.06); }
        @media (prefers-reduced-motion: reduce) {
          .em-hp-marquee-track, .em-hp-scroll-cue { animation: none !important; }
          .em-hp-cta-solid, .em-hp-speaking-img { transition: none !important; }
        }
      `}</style>

      {/* HERO — full-bleed portrait, dark gradient, headline bottom-aligned */}
      <section style={{ position: 'relative', minHeight: '86vh', overflow: 'hidden', background: 'var(--em-near-black)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/brand-2026-08/1 (11).webp"
          alt="Portrait of Eugine Micah"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,23,26,0.1) 0%, rgba(23,23,26,0.85) 100%)' }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1400,
            margin: '0 auto',
            padding: '150px 32px 80px',
            boxSizing: 'border-box',
            minHeight: '86vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--f-archivo)',
              fontWeight: 900,
              fontSize: 'clamp(48px, 10vw, 144px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: 'var(--em-paper)',
              margin: '0 0 24px',
            }}
          >
            EUGINE
            <br />
            MICAH
            <span style={{ color: 'var(--em-crimson)' }}>.</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
            <p
              style={{
                fontSize: 'clamp(15px, 1.8vw, 20px)',
                color: 'var(--em-paper)',
                maxWidth: 560,
                lineHeight: 1.5,
                margin: 0,
                fontFamily: 'var(--f-work-sans)',
              }}
            >
              Broadcaster, journalist, and founder building media, technology, and youth culture platforms across
              Kenya.
            </p>
            <Link
              href="/profile"
              className="em-hp-cta-solid"
              style={{
                flex: 'none',
                background: 'var(--em-crimson)',
                color: 'var(--em-paper)',
                padding: '16px 28px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'var(--f-work-sans)',
              }}
            >
              Full profile →
            </Link>
          </div>
        </div>
        <div
          aria-hidden
          className="em-hp-scroll-cue"
          style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', zIndex: 2, width: 1, height: 26, background: 'var(--em-paper)', opacity: 0.7 }}
        />
      </section>

      {/* MARQUEE TICKER */}
      <div style={{ background: 'var(--em-crimson)', overflow: 'hidden', padding: '14px 0' }}>
        <div className="em-hp-marquee-track" style={{ display: 'flex', width: 'max-content' }}>
          {tickerDouble.map((label, i) => (
            <div key={`${label}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 32px', whiteSpace: 'nowrap' }}>
              <span
                style={{
                  fontFamily: 'var(--f-archivo)',
                  fontWeight: 900,
                  fontSize: 16,
                  color: 'var(--em-near-black)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </span>
              <span style={{ width: 6, height: 6, background: 'var(--em-paper)', flex: 'none' }} />
            </div>
          ))}
        </div>
      </div>

      {/* BROADCAST & EDITORIAL BACKGROUND STRIP */}
      <div style={{ borderBottom: '3px solid var(--text)', padding: '22px 32px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text)', opacity: 0.45 }}>
            Broadcast &amp; editorial background
          </span>
          {background.map((name) => (
            <span key={name} style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* FIVE THINGS, ONE NAME */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '90px 32px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 10 }}>
          What&rsquo;s under the name
        </div>
        <h2
          style={{
            fontFamily: 'var(--f-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: 'var(--text)',
            margin: '0 0 44px',
          }}
        >
          Five things,
          <br />
          one name.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, background: 'var(--text)' }}>
          {properties.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="emx-link"
              style={{
                background: 'var(--bg)',
                padding: 26,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                textDecoration: 'none',
                minHeight: 170,
                boxSizing: 'border-box',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--em-crimson)' }}>
                {p.kicker}
              </div>
              <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 21, color: 'var(--text)', lineHeight: 1.15 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text)', opacity: 0.65, lineHeight: 1.5, flex: 1 }}>{p.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* RIGHT NOW */}
      <section style={{ background: 'var(--em-near-black)', color: 'var(--em-paper)', padding: '90px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 10 }}>
            Right now
          </div>
          <h2
            style={{
              fontFamily: 'var(--f-archivo)',
              fontWeight: 900,
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              margin: '0 0 48px',
              maxWidth: 800,
            }}
          >
            On air, on tour, and building.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 36 }}>
            {currently.map((c) => (
              <div key={c.label} style={{ borderTop: '3px solid var(--em-crimson)', paddingTop: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 10 }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 17, lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ON THE RECORD */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '90px 32px', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text)', marginBottom: 36 }}>
          On the record
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
          {proof.map((pr) =>
            pr.href ? (
              <a
                key={pr.title}
                href={pr.href}
                target="_blank"
                rel="noopener"
                className="emx-link"
                style={{ borderTop: '2px solid var(--text)', paddingTop: 16, textDecoration: 'none', display: 'block' }}
              >
                <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>
                  {pr.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)', opacity: 0.55 }}>{pr.sub}</div>
              </a>
            ) : (
              <div key={pr.title} style={{ borderTop: '2px solid var(--text)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>
                  {pr.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)', opacity: 0.55 }}>{pr.sub}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* WHAT PEOPLE SAY — shell only. Source renders this with
          hasTestimonials:false / testimonials:[]; no quotes exist yet, so
          none are invented here. Remove the "More to come." note and map
          over real entries once testimonials are supplied. */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px 90px', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text)', marginBottom: 36 }}>
          What people say
        </div>
        <div style={{ fontSize: 14, color: 'var(--text)', opacity: 0.5 }}>More to come.</div>
      </section>

      {/* WORK WITH EUGINE — closing CTA */}
      <section style={{ background: 'var(--em-near-black)' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '100px 32px',
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 16 }}>
              Work with Eugine
            </div>
            <h2
              style={{
                fontFamily: 'var(--f-archivo)',
                fontWeight: 900,
                fontSize: 'clamp(30px, 4.5vw, 52px)',
                lineHeight: 1.05,
                color: 'var(--em-paper)',
                maxWidth: 520,
                margin: '0 0 28px',
              }}
            >
              Appearances, partnerships, projects, conversations.
            </h2>
            <Link
              href="/work-with-eugine"
              className="em-hp-cta-solid"
              style={{
                display: 'inline-block',
                background: 'var(--em-crimson)',
                color: 'var(--em-paper)',
                padding: '16px 28px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'var(--f-work-sans)',
              }}
            >
              Get in touch →
            </Link>
          </div>
          <div style={{ position: 'relative', justifySelf: 'center', width: '100%', maxWidth: 340 }}>
            <div aria-hidden style={{ position: 'absolute', top: 20, left: -20, width: '100%', height: '100%', background: 'var(--em-crimson)' }} />
            <div style={{ position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: '3/4' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand-2026-08/1 (14).webp"
                alt="Eugine Micah, editorial portrait"
                className="em-hp-speaking-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
