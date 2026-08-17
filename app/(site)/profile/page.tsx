import type { Metadata } from 'next';
import Link from 'next/link';

// "Profile": the new brand IA's dedicated profile/CV page (design_handoff_
// full_site_backend/site/Profile.dc.html). Copy below is carried over
// verbatim from that source file.
//
// Documents section (CV / Cover Letter / References) is a new addition not
// present in Profile.dc.html itself: the design handoff's own README flags
// these three real documents as needing a placement decision on the site,
// and suggests this page. Placed here, as a small section of its own,
// between "Working principles" and the book callout.

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Journalist and broadcaster, across TV, digital and live.',
  alternates: { canonical: '/profile' },
  openGraph: {
    title: 'Profile: Eugine Micah',
    description: 'Journalist and broadcaster, across TV, digital and live.',
    images: ['/assets/brand-2026-08/1 (2).webp'],
    type: 'profile',
  },
};

// force-dynamic -- see app/(site)/work/page.tsx's comment for why every
// rebrand page needs this on this deployment.
export const dynamic = 'force-dynamic';

const roles = [
  { org: 'Urban News', role: 'Host, broadcast journalism and culture coverage' },
  { org: 'Campus Xposure', role: 'Host, student culture and innovation across Kenyan campuses' },
  { org: 'The Nairobi Podcast', role: 'Host' },
  { org: 'Urban Gang Tour', role: 'Founder and Host, high-school talent tour' },
  { org: 'Roylandz Media', role: 'Founder' },
];

const stages = [
  { n: '1', text: 'Started in radio and broadcast journalism, building interviewing and reporting fundamentals.' },
  { n: '2', text: 'Worked across Citizen TV and Royal Media Services, and wrote editorially for Global Cyber Alliance.' },
  { n: '3', text: 'Moved into digital: SEO, publishing workflows, and AI-assisted content systems.' },
  { n: '4', text: 'Built a broadcast presence: hosting Urban News, hosting Campus Xposure and The Nairobi Podcast.' },
  { n: '5', text: 'Turned founder, built Roylandz Media and launched Urban Gang Tour for Kenyan high schools.' },
];

const skills = [
  'Broadcast journalism',
  'Digital publishing',
  'Content strategy',
  'Video editing',
  'Interviewing',
  'SEO & web',
  'AI-assisted workflows',
  'Event hosting & MC',
];

const principles = [
  'Verify before publishing, even when the story is your own.',
  'Build platforms, not just posts.',
  'Say the specific thing, not the safe thing.',
];

const documents = [
  { label: 'Download CV', href: '/assets/brand-2026-08/documents/Eugine-Micah-CV.docx' },
  { label: 'Download cover letter', href: '/assets/brand-2026-08/documents/Eugine-Micah-Cover-Letter.docx' },
  { label: 'Download references', href: '/assets/brand-2026-08/documents/Eugine-Micah-References.docx' },
];

export default function ProfilePage() {
  return (
    <main>
      {/* HERO */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '70px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 48,
          alignItems: 'center',
        }}
      >
        <div>
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
            Profile
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-archivo)',
              fontWeight: 900,
              fontSize: 'clamp(34px, 5vw, 58px)',
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              color: 'var(--em-near-black)',
              margin: '0 0 24px',
            }}
          >
            Journalist and broadcaster, across TV, digital and live.
          </h1>
          <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 16, lineHeight: 1.65, color: 'rgba(23,23,26,0.7)', margin: '0 0 16px' }}>
            Eugine Micah works across broadcast journalism, digital media, and live hosting. He hosts Urban News,
            hosts Campus Xposure and The Nairobi Podcast, and founded Urban Gang Tour, a talent tour for Kenyan high
            schools.
          </p>
          <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 16, lineHeight: 1.65, color: 'rgba(23,23,26,0.7)', margin: 0 }}>
            His background spans radio, digital publishing, and communications work, including editorial writing for
            Global Cyber Alliance and building AI-assisted publishing workflows for newsroom teams.
          </p>
        </div>
        <div style={{ position: 'relative', justifySelf: 'center', width: '100%', maxWidth: 420 }}>
          <div style={{ position: 'absolute', top: 24, left: -24, width: '100%', height: '100%', background: 'var(--em-crimson)' }} />
          <div style={{ position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: '3/4' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand-2026-08/1 (2).webp"
              alt="Portrait of Eugine Micah"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* CURRENT ROLES */}
      <section style={{ background: 'var(--em-near-black)', color: 'var(--em-paper)', padding: '70px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 26, marginBottom: 28 }}>Current roles</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {roles.map((r) => (
              <div
                key={r.org}
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: '22px 0',
                  borderTop: '1px solid rgba(250,247,242,0.15)',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    flex: 'none',
                    width: 190,
                    fontFamily: 'var(--f-work-sans)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--em-crimson)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {r.org}
                </div>
                <div style={{ flex: 1, minWidth: 200, fontFamily: 'var(--f-work-sans)', fontSize: 16 }}>{r.role}</div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(250,247,242,0.15)' }} />
          </div>
        </div>
      </section>

      {/* HOW HE GOT HERE */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '70px 32px 0' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 24, color: 'var(--em-near-black)', marginBottom: 28 }}>
          How he got here
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {stages.map((st) => (
            <div key={st.n} style={{ display: 'flex', gap: 24, padding: '20px 0', borderTop: '1px solid rgba(23,23,26,0.12)', flexWrap: 'wrap' }}>
              <div
                style={{
                  flex: 'none',
                  width: 28,
                  height: 28,
                  background: 'var(--em-crimson)',
                  color: 'var(--em-paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--f-archivo)',
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {st.n}
              </div>
              <div style={{ flex: 1, minWidth: 220, fontFamily: 'var(--f-work-sans)', fontSize: 15, lineHeight: 1.5, color: 'var(--em-near-black)' }}>
                {st.text}
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(23,23,26,0.12)' }} />
        </div>
      </section>

      {/* SKILLS + PRINCIPLES */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '70px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48,
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 24, color: 'var(--em-near-black)', marginBottom: 20 }}>
            Areas of expertise
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  border: '2px solid var(--em-near-black)',
                  padding: '9px 16px',
                  fontFamily: 'var(--f-work-sans)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--em-near-black)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 24, color: 'var(--em-near-black)', marginBottom: 20 }}>
            Working principles
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {principles.map((p) => (
              <div
                key={p}
                style={{
                  fontFamily: 'var(--f-work-sans)',
                  fontSize: 16,
                  lineHeight: 1.5,
                  borderLeft: '3px solid var(--em-crimson)',
                  paddingLeft: 16,
                  color: 'var(--em-near-black)',
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS: CV, cover letter, references */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px 70px' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 24, color: 'var(--em-near-black)', marginBottom: 20 }}>
          Documents
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {documents.map((d) => (
            <a
              key={d.href}
              href={d.href}
              style={{
                border: '2px solid var(--em-near-black)',
                padding: '14px 20px',
                fontFamily: 'var(--f-work-sans)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.03em',
                color: 'var(--em-near-black)',
                textDecoration: 'none',
              }}
            >
              {d.label} &rarr;
            </a>
          ))}
        </div>
      </section>

      {/* AUTHOR CALLOUT */}
      <section style={{ background: 'var(--em-tan)', padding: '70px 32px', borderTop: '3px solid var(--em-near-black)' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--f-work-sans)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--em-crimson)',
                marginBottom: 10,
              }}
            >
              Author
            </div>
            <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 26, color: 'var(--em-near-black)' }}>
              Born Broke, Built Loud: his first book, out now.
            </div>
          </div>
          <Link
            href="/ideas"
            style={{
              borderBottom: '2px solid var(--em-near-black)',
              color: 'var(--em-near-black)',
              textDecoration: 'none',
              fontFamily: 'var(--f-work-sans)',
              fontSize: 14,
              fontWeight: 700,
              paddingBottom: 2,
            }}
          >
            Get the book &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
