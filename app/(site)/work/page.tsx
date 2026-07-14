import type { Metadata } from 'next';
import Link from 'next/link';

// "Work with me" — this route previously showed Eugine's "shows I host"
// content; that content is moving to a future /shows page sourced from
// content/em-site-data.ts's tvGuideData (owned by a later phase, not this
// one). This is a full replace with the new booking/hire page, structure
// ported from the DCLogic mockup at
// "Celebrity website project/Work.dc.html". The mockup's own "Press &
// recognition" list (Global Cyber Alliance, People's Choice Awards,
// TIBS valedictorian, IMDb) was independently corroborated via web search
// before being kept here — see the phase report for sourcing notes. The
// mockup's press-contact address (a gmail.com address) was swapped for
// the real one already used sitewide (privacy policy, terms, checkout
// success page): eugine.micah@outlook.com.

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Book Eugine Micah for event hosting, keynotes, panels, brand campaigns and media training. Founder of Roylandz Media: content strategy, social media and production.',
  alternates: { canonical: '/work' },
};

const CONTACT_EMAIL = 'eugine.micah@outlook.com';

const helpCards: { title: string; desc: React.ReactNode; shadow: string }[] = [
  { title: 'Book Eugine', desc: 'Hosting, keynotes, panels, MC work for your event.', shadow: 'var(--a)' },
  {
    title: 'Hire Roylandz Media',
    desc: (
      <>
        Strategy, social and production for your brand.{' '}
        <Link href="/roylandz" style={{ color: 'var(--a)', fontWeight: 700 }}>
          See the portfolio →
        </Link>
      </>
    ),
    shadow: 'var(--b)',
  },
  {
    title: 'Media & press',
    desc: (
      <>
        Interviews and features.{' '}
        <Link href="/press" style={{ color: 'var(--a)', fontWeight: 700 }}>
          Grab the press kit →
        </Link>
      </>
    ),
    shadow: 'var(--c)',
  },
];

const gigs = ['Event Hosting & MC', 'Keynotes & Panels', 'Brand Campaigns', 'Media Training'];

const press: { year: string; title: string; sub: string; href: string }[] = [
  { year: '2025', title: 'Global Cyber Alliance Toolkit', sub: 'Published contributor: protecting the online safety of journalists in Africa', href: 'https://gcatoolkit.org/blog/protecting-the-online-safety-of-journalists-in-africa/' },
  { year: '2024', title: "People's Choice Awards Kenya, 3rd Edition", sub: 'Nominee: Male TikToker of the Year', href: 'https://www.peopleschoiceawards.africa/' },
  { year: '2024', title: 'Valedictorian, Class of 2024', sub: 'Thika Institute of Business Studies: Journalism & Media', href: 'https://ke.linkedin.com/in/euginemicah' },
  { year: 'Now', title: 'IMDb', sub: 'Listed media personality', href: 'https://www.imdb.com/name/nm17515385/bio/' },
];

const socials: [string, string][] = [
  ['Instagram', 'https://www.instagram.com/eugine.micah/'],
  ['TikTok', 'https://www.tiktok.com/@eugine.micah'],
  ['X / Twitter', 'https://x.com/eugineroylandz'],
  ['YouTube', 'https://www.youtube.com/channel/UC3ED9wyUawELS4tQx99u48Q'],
  ['LinkedIn', 'https://ke.linkedin.com/in/euginemicah'],
  ['IMDb', 'https://www.imdb.com/name/nm17515385/bio/'],
];

const railStops: [string, string, 'a' | 'b' | 'c'][] = [
  ['#services', 'SERVICES', 'a'],
  ['#bookings', 'BOOKINGS', 'b'],
  ['#press', 'PRESS', 'c'],
  ['#contact', 'CONTACT', 'a'],
];

const railBg: Record<'a' | 'b' | 'c', string> = { a: 'var(--a)', b: 'var(--b)', c: 'var(--c)' };
const railColor: Record<'a' | 'b' | 'c', string> = { a: '#FAF4EA', b: '#FAF4EA', c: '#1B1714' };

export default function WorkPage() {
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
      <header style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px 60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B1714', color: '#FAF4EA', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 22 }}>
          AVAILABLE FOR BOOKINGS
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(44px, 6.5vw, 88px)', letterSpacing: '-2.5px', lineHeight: 0.96, margin: '0 0 20px', maxWidth: 900 }}>
          Work with me
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 560, fontWeight: 500, margin: '0 0 26px' }}>
          Event hosting, keynotes, panels, brand campaigns and media training &mdash; plus Roylandz Media for
          content strategy, social and production. For brands, media houses and event organizers across East
          Africa and beyond.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="#bookings" className="emx-cta" style={{ display: 'inline-block', fontWeight: 700, background: 'var(--a)', color: '#FAF4EA', border: '3px solid var(--text)', borderRadius: 14, padding: '13px 24px', boxShadow: '4px 4px 0 var(--text)' }}>
            Send a booking inquiry
          </Link>
          <Link href="/roylandz" className="emx-cta" style={{ display: 'inline-block', fontWeight: 700, background: 'var(--bg)', color: 'var(--text)', border: '3px solid var(--text)', borderRadius: 14, padding: '13px 24px', boxShadow: '4px 4px 0 var(--text)' }}>
            See Roylandz Media
          </Link>
        </div>
      </header>

      {/* SERVICES QUICK GRID */}
      <section id="services" style={{ maxWidth: 1200, margin: '0 auto', padding: '30px 28px 70px' }}>
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--a)' }}>how we help</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-1.5px', margin: '8px 0 0' }}>Three ways to work together</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {helpCards.map((c) => (
            <div key={c.title} className="emx-lane" style={{ ['--sh' as string]: c.shadow, background: 'var(--bg)', border: '3px solid var(--text)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 500, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKINGS */}
      <section id="bookings" style={{ background: 'var(--c)', borderTop: '3px solid #1B1714', borderBottom: '3px solid #1B1714', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(38px, 5vw, 68px)', letterSpacing: '-2px', lineHeight: 0.98, margin: 0, color: '#1B1714' }}>
              Put Eugine on<br />
              <span style={{ background: '#1B1714', color: 'var(--c)', padding: '0 16px', display: 'inline-block', transform: 'rotate(-1.5deg)' }}>your stage</span>
            </h2>
            <p style={{ fontSize: 17, maxWidth: 540, margin: '20px auto 0', lineHeight: 1.6, fontWeight: 500, color: '#1B1714' }}>
              Event hosting, MC work, keynotes, panels, brand campaigns and media training, for brands, media
              houses and event organizers across East Africa and beyond.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 44 }}>
            {gigs.map((g) => (
              <div key={g} className="emx-strip-item" style={{ ['--sh' as string]: '#1B1714', background: '#FAF4EA', border: '3px solid #1B1714', borderRadius: 16, padding: 22, textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 17, color: '#1B1714' }}>{g}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/messages"
              className="emx-cta"
              style={{ display: 'inline-block', fontWeight: 800, fontSize: 18, background: 'var(--a)', color: '#FAF4EA', border: '3px solid #1B1714', borderRadius: 999, padding: '18px 40px', boxShadow: '5px 5px 0 #1B1714' }}
            >
              SEND A BOOKING INQUIRY ↗
            </Link>
            <div style={{ marginTop: 14 }}>
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 22, color: '#1B1714' }}>
                or email the team →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section id="press" style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 26, color: 'var(--b)' }}>receipts ✦</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(34px, 4.5vw, 56px)', letterSpacing: '-1.5px', lineHeight: 1, margin: '8px 0 0' }}>Press &amp; recognition</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {press.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener"
              className="emx-link"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '22px 10px', borderTop: '2.5px solid var(--text)', color: 'var(--text)', flexWrap: 'wrap' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1, minWidth: 260 }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--a)', minWidth: 44 }}>{item.year}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{item.title}</div>
                  <div style={{ fontSize: 14, opacity: 0.75, fontWeight: 500 }}>{item.sub}</div>
                </div>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18 }}>↗</span>
            </a>
          ))}
          <div style={{ borderTop: '2.5px solid var(--text)' }} />
        </div>
      </section>

      {/* CONTACT TRANSITION */}
      <section id="contact" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 28px 90px' }}>
        <div style={{ fontWeight: 800, fontSize: 'clamp(40px, 7vw, 90px)', letterSpacing: '-3px', lineHeight: 0.95, marginBottom: 20 }}>
          Let&rsquo;s <span style={{ color: 'var(--b)' }}>talk.</span>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/messages" className="emx-cta" style={{ display: 'inline-block', fontWeight: 700, background: 'var(--a)', color: '#FAF4EA', border: '3px solid var(--text)', borderRadius: 14, padding: '13px 24px', boxShadow: '4px 4px 0 var(--text)' }}>
            Send a message
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="emx-link" style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 20 }}>
            {CONTACT_EMAIL} →
          </a>
        </div>
      </section>
    </main>
  );
}
