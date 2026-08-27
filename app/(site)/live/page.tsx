import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eugine Micah Live',
  description:
    'Eugine Micah Live is the media & outreach command brand of Eugine Micah — Kenyan TV presenter, journalist and founder. It powers his live shows, brand outreach and the Urban Gang Tour.',
  alternates: { canonical: '/live' },
};

const h2 = { margin: '0 0 14px', fontWeight: 900, fontSize: 26, letterSpacing: '-0.02em' } as const;
const p = { margin: '0 0 14px', fontSize: 17, lineHeight: 1.75, fontWeight: 500, color: 'var(--ink-mute)' } as const;
const kicker = { fontFamily: 'var(--f-work-sans)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--em-crimson)', marginBottom: 14 } as const;

const sections: { id: string; color: string; fg: string; kickerFg: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'broadcast',
    color: 'var(--em-crimson)',
    fg: 'var(--em-paper)',
    kickerFg: 'rgba(250,247,242,0.7)',
    title: 'Broadcast',
    body: (
      <>
        <p style={{ ...p, color: 'rgba(250,247,242,0.92)' }}>
          Eugine Micah anchors <strong>Urban News</strong> on PPP TV live with Lucy Ogunde, twice weekly, no
          script, and hosts <strong>Campus Xposure</strong> and <strong>The Nairobi Podcast</strong>. He hosts
          bilingually — English and Swahili — and brings a decade of newsroom craft to every broadcast.
        </p>
      </>
    ),
  },
  {
    id: 'outreach',
    color: 'var(--em-near-black)',
    fg: 'var(--em-paper)',
    kickerFg: 'var(--em-gold)',
    title: 'Outreach',
    body: (
      <>
        <p style={{ ...p, color: 'rgba(250,247,242,0.85)' }}>
          Behind the scenes, <strong>Eugine Micah Live</strong> runs the personal media&nbsp;&amp; outreach
          command suite: drafting, scheduling and sending brand partnership pitches, career outreach and event
          invitations on his behalf, so every opportunity is followed up consistently and with care.
        </p>
        <p style={{ ...p, color: 'rgba(250,247,242,0.85)' }}>
          It is operated as a single-owner service tied to his own Google account, used to prepare and send
          email from his Gmail on his explicit instruction. It does not publish to any social account, charge
          users, or offer public sign-up.
        </p>
      </>
    ),
  },
  {
    id: 'ugt',
    color: 'var(--em-tan)',
    fg: 'var(--em-near-black)',
    kickerFg: 'var(--em-crimson)',
    title: 'Urban Gang Tour',
    body: (
      <>
        <p style={{ ...p, color: 'var(--ink-soft)' }}>
          A flagship programme of the brand: Eugine &amp; the Urban Gang Tour team tour schools — over 40 so far
          across Kenya — delivering talks, mentorship and live entertainment to students. Teams, schools and
          partners can reach the tour through the press contact below.
        </p>
      </>
    ),
  },
];

export default function LivePage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '110px 32px 80px' }}>
        <div style={kicker}>Live · Season 2026</div>
        <h1 style={{ fontSize: 56, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 22px' }}>
          Eugine Micah <span style={{ color: 'var(--em-crimson)' }}>Live</span>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, fontWeight: 500, maxWidth: 720, color: 'var(--ink-mute)' }}>
          The live media &amp; outreach brand of Eugine Micah — broadcaster, journalist, founder, author of
          <em> Born Broke. Built Loud.</em>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
          <a href="#what" style={chip('var(--em-crimson)', 'var(--em-paper)')}>What it is</a>
          <a href="#broadcast" style={chip('var(--em-near-black)', 'var(--em-paper)')}>Broadcast</a>
          <a href="#outreach" style={chip('var(--em-gold)', 'var(--em-near-black)')}>Outreach</a>
          <a href="#contact" style={chip('var(--em-tan)', 'var(--em-near-black)')}>Contact</a>
        </div>
      </section>

      {/* What it is */}
      <section id="what" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px 100px' }}>
        <div style={kicker}>About</div>
        <h2 style={h2}>What Eugine Micah Live is</h2>
        <p style={p}>
          Eugine Micah Live is the public media &amp; outreach command brand under which Eugine prepares and
          runs his live shows, brand partnerships, career outreach and the Urban Gang Tour school programme.
          The OAuth identity behind the dashboard is tied to his own Google account and sends email from his own
          Gmail on his explicit instruction.
        </p>
        <p style={p}>
          Everything here — the broadcasts, the pitches, the tour — is run personally by Eugine and his small
          team. There is no external marketplace, no public sign-up and no user data collected beyond what is
          needed to read and reply to the messages he receives.
        </p>
        <p style={p}>
          For the full background, credits and biography, see the{' '}
          <Link href="/press" style={{ color: 'var(--em-crimson)', textDecoration: 'underline' }}>press kit</Link>{' '}
          and <Link href="/profile" style={{ color: 'var(--em-crimson)', textDecoration: 'underline' }}>profile</Link>.
        </p>
      </section>

      {/* Three pillars */}
      <div>
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} style={{ background: s.color, color: s.fg, padding: '90px 32px', marginTop: i === 0 ? 0 : 3 }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div style={{ ...kicker, color: s.kickerFg }}>{s.title}</div>
              <h2 style={h2}>{s.title}</h2>
              {s.body}
            </div>
          </section>
        ))}
      </div>

      {/* Contact */}
      <section id="contact" style={{ maxWidth: 900, margin: '0 auto', padding: '90px 32px 120px' }}>
        <div style={kicker}>Contact</div>
        <h2 style={h2}>Partnerships, press &amp; the tour</h2>
        <p style={p}>
          For brand partnerships, broadcast bookings, press enquiries or to invite the Urban Gang Tour to your
          school, email{' '}
          <a href="mailto:eugine.micah@outlook.com" style={{ color: 'var(--em-crimson)', textDecoration: 'underline', fontWeight: 700 }}>
            eugine.micah@outlook.com
          </a>
          . For the consent &amp; data handling behind the dashboard, see the{' '}
          <Link href="/privacy" style={{ color: 'var(--em-crimson)', textDecoration: 'underline' }}>privacy policy</Link>{' '}
          and{' '}
          <Link href="/terms" style={{ color: 'var(--em-crimson)', textDecoration: 'underline' }}>terms</Link>.
        </p>
      </section>
    </main>
  );
}

function chip(bg: string, fg: string): React.CSSProperties {
  return {
    display: 'inline-block',
    background: bg,
    color: fg,
    padding: '12px 20px',
    fontSize: 14,
    fontWeight: 800,
    borderRadius: 999,
    textDecoration: 'none',
    letterSpacing: '0.02em',
  } as const;
}
