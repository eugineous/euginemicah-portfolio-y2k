import type { Metadata } from 'next';
import Link from 'next/link';

// New route under the brand IA, verbatim structure/copy from
// design_handoff_full_site_backend/site/Build.dc.html.
//
// Roylandz Media here is deliberately brief per the source ("a fuller
// company profile is in progress"): the existing app/(site)/roylandz/
// page.tsx already has that fuller, previously fact-checked profile
// (services, case studies, process, stats), so rather than lose it this
// section links out to it instead of duplicating or shortening it.
//
// The two "The Lab" GitHub links (ProPost, Figure It Out) both pointed to
// github.com/eugenius in the source. Checked for reachability per the
// client's explicit instruction ("verify... or remove the links if the
// repos aren't public"): the profile is real and reachable (HTTP 200) but
// shows zero public repositories, so the hyperlink is dropped here and only
// the descriptive text kept.

export const metadata: Metadata = {
  title: 'Build: Eugine Micah',
  description: 'What exists because he built it.',
  alternates: { canonical: '/build' },
};

const ugtSections = [
  { title: 'Format', desc: 'A touring talent showcase held at partner schools.' },
  { title: 'Who it serves', desc: 'High-school students across Kenya.' },
  { title: 'Crew & partnerships', desc: 'Growing, full listing in progress.' },
  { title: 'Status', desc: 'Active, running since January 2026.' },
];

const builds = [
  { status: 'In progress', title: 'ProPost', desc: 'An AI-agent content system for publishing workflows.' },
  { status: 'In progress', title: 'Figure It Out', desc: 'A second technical build, in development.' },
];

const buildJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', name: 'Roylandz Media', founder: { '@type': 'Person', name: 'Eugine Micah' } },
    {
      '@type': 'Organization',
      name: 'Urban Gang Tour',
      founder: { '@type': 'Person', name: 'Eugine Micah' },
      description: 'A talent tour for Kenyan high schools, running since January 2026.',
      email: 'admin@urbangangtour.co.ke',
    },
  ],
};

export default function BuildPage() {
  return (
    <main>
      {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd) }} />

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
          Build
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
          What exists because he built it.
        </h1>
      </section>

      {/* ROYLANDZ MEDIA */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 32px 56px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40,
          alignItems: 'center',
          borderBottom: '3px solid var(--em-near-black)',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: '3/4' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brand-2026-08/1 (10).webp"
            alt="Roylandz Media"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 12 }}>
            Company
          </div>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 28, color: 'var(--em-near-black)', marginBottom: 14 }}>
            Roylandz Media
          </div>
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, color: 'rgba(23,23,26,0.7)', lineHeight: 1.6, maxWidth: 480, marginBottom: 14 }}>
            The company that grew out of a personal brand Eugine built as a teenager. Currently the umbrella for his
            production and hosting work (a fuller company profile is in progress).
          </div>
          <Link href="/roylandz" style={{ fontFamily: 'var(--f-work-sans)', fontSize: 13, fontWeight: 700, color: 'var(--em-crimson)', textDecoration: 'none' }}>
            Full company profile &rarr;
          </Link>
        </div>
      </section>

      {/* URBAN GANG TOUR */}
      <section style={{ background: 'var(--em-near-black)', color: 'var(--em-paper)', padding: '56px 32px', borderBottom: '3px solid var(--em-near-black)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brand-2026-08/ugt-logo-v2.webp" alt="Urban Gang Tour logo" style={{ height: 64, width: 'auto', display: 'block', marginBottom: 16 }} />
            <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 12 }}>
              Founder
            </div>
            <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 34, marginBottom: 14 }}>Urban Gang Tour</div>
            <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, color: 'rgba(250,247,242,0.7)', lineHeight: 1.6, maxWidth: 560 }}>
              A talent tour for Kenyan high schools, giving students a stage and a camera. Co-run with Lucy, backed
              by Charles Luche of LUCH Production, and running since January 2026.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {ugtSections.map((s) => (
              <div key={s.title} style={{ borderTop: '2px solid var(--em-crimson)', paddingTop: 14 }}>
                <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 13, color: 'rgba(250,247,242,0.6)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <a
            href="https://urbangangtour.co.ke/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: 24, color: 'var(--em-crimson)', textDecoration: 'none', fontFamily: 'var(--f-work-sans)', fontSize: 13, fontWeight: 700 }}
          >
            Visit urbangangtour.co.ke &rarr;
          </a>
          <div style={{ marginTop: 8, fontFamily: 'var(--f-work-sans)', fontSize: 13, color: 'rgba(250,247,242,0.5)' }}>Contact: admin@urbangangtour.co.ke</div>
        </div>
      </section>

      {/* NAIROX / COLOR BLAST */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '56px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
          background: 'var(--em-near-black)',
        }}
      >
        <div style={{ background: 'var(--em-paper)', padding: 28 }}>
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 12 }}>
            Publishing
          </div>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 22, color: 'var(--em-near-black)', marginBottom: 12 }}>Nairox</div>
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, color: 'rgba(23,23,26,0.65)', lineHeight: 1.6 }}>
            Currently a magazine company. A future move into talent management is under consideration, not yet
            active.
          </div>
        </div>
        <div style={{ background: 'var(--em-paper)', padding: 28, opacity: 0.55 }}>
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 12 }}>
            Coming soon
          </div>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 22, color: 'var(--em-near-black)', marginBottom: 12 }}>Color Blast</div>
          <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, color: 'rgba(23,23,26,0.65)', lineHeight: 1.6 }}>Details to follow.</div>
        </div>
      </section>

      {/* THE LAB */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '56px 32px 90px' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 26, color: 'var(--em-near-black)', marginBottom: 24 }}>The Lab</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, background: 'var(--em-near-black)' }}>
          {builds.map((b) => (
            <div key={b.title} style={{ background: 'var(--em-paper)', padding: 26 }}>
              <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 10 }}>
                {b.status}
              </div>
              <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 20, color: 'var(--em-near-black)', marginBottom: 10 }}>{b.title}</div>
              <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, color: 'rgba(23,23,26,0.6)', lineHeight: 1.5 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
