import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { RoleCycler } from '../_components/RoleCycler';

export const metadata: Metadata = {
  title: 'Eugine Micah | TV Presenter, Journalist, Founder & Author',
  description:
    "Official website of Eugine Micah: Kenyan TV presenter, journalist, founder of Roylandz Media, and author. Co-anchor of Urban News on PPP TV, host of Campus Xposure and the Nairobi Podcast, co-founder of the Urban Gang Tour.",
  alternates: { canonical: '/' },
};

// Small helper so inline style objects can carry a custom CSS property
// (`--sh`) alongside typed React.CSSProperties — read by the .emx-lane /
// .emx-strip-item / .emx-gallery-card hover rules in globals.css.
function withShadow(color: string, style: CSSProperties = {}): CSSProperties {
  return { ...style, ['--sh' as string]: color } as CSSProperties;
}

const lanes = [
  {
    href: '/about',
    icon: '◍',
    name: 'The story',
    desc: 'From a mud house in Manyonyi, Lugari to the face of youth news in Kenya.',
    cta: 'Read about Eugine',
    shadow: 'var(--a)',
  },
  {
    href: '/shows',
    icon: '▶',
    name: 'Shows & podcasts',
    desc: 'Urban News, Campus Xposure and the Nairobi Podcast.',
    cta: 'Press play',
    shadow: 'var(--b)',
  },
  {
    href: '/book',
    icon: '✎',
    name: 'The book',
    desc: 'Born Broke. Built Loud: the memoir. From a mud house in Lugari to a national screen.',
    cta: 'Get the book',
    shadow: 'var(--c)',
  },
  {
    href: '/work',
    icon: '✉',
    name: 'Work with me',
    desc: 'Roylandz Media, event hosting, keynotes, campaigns and press.',
    cta: 'Book Eugine',
    shadow: 'var(--a)',
  },
];

const strip = [
  { src: '/hq-assets/un-desk-02.jpg', alt: 'Eugine Micah on the Urban News desk, with Lucy Ogunde', shadow: 'var(--a)' },
  { src: '/hq-assets/gal-festival.jpg', alt: 'Eugine Micah live at the Urban Gang Tour', shadow: 'var(--b)' },
  { src: '/hq-assets/shoot-08.jpg', alt: 'Eugine Micah in studio, big thoughts loading', shadow: 'var(--c)' },
  { src: '/hq-assets/celeb-02.webp', alt: 'Eugine Micah out and about with a microphone', shadow: 'var(--a)' },
];

const stats = [
  { num: '4', label: 'shows & podcasts hosted', color: 'var(--c)' },
  { num: '200+', label: 'news stories written, EN & SW', color: 'var(--b)' },
  { num: '6', label: 'addresses, one direction', color: '#FAF4EA' },
  { num: '2024', label: 'valedictorian, TIBS', color: 'var(--c)' },
];

export default function HomePage() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      {/* HERO */}
      <header style={{ position: 'relative', padding: '64px 28px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          aria-hidden
          className="emx-float max-[700px]:!hidden"
          style={{
            position: 'absolute',
            top: -6,
            right: '26%',
            width: 54,
            height: 54,
            borderRadius: '50%',
            background: 'var(--c)',
            border: '3px solid var(--text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}
        >
          ☻
        </div>
        <div
          aria-hidden
          className="emx-float2 max-[700px]:!hidden"
          style={{ position: 'absolute', top: 10, left: '2%', fontSize: 44, color: 'var(--b)' }}
        >
          ✦
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <h1
              style={{
                fontWeight: 800,
                fontOpticalSizing: 'auto',
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontSize: 'clamp(56px, 8vw, 112px)',
                lineHeight: 0.92,
                letterSpacing: '-3px',
                margin: '22px 0 10px',
              }}
            >
              Eugine
              <br />
              <span style={{ color: 'var(--a)' }}>Micah</span>
            </h1>
            <div
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                fontSize: 'clamp(24px, 3vw, 36px)',
                margin: '14px 0 6px',
                minHeight: '1.2em',
              }}
            >
              the <RoleCycler />
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 480, margin: '18px 0 28px', fontWeight: 500 }}>
              Presenter. Journalist. Founder. Author. Kenya knows him as the face of Urban News. This is the man
              behind it: from a mud house in Manyonyi, Lugari, to the national screen, telling Kenya&rsquo;s stories
              and building the rooms they get told in.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontStyle: 'italic',
                fontSize: 19,
                color: 'var(--a)',
                maxWidth: 460,
                margin: '0 0 28px',
              }}
            >
              &ldquo;Not the story of a man who made it. The report of a man still climbing.&rdquo; ✦
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                href="/shows"
                className="emx-link emx-cta"
                style={{
                  display: 'inline-block',
                  fontWeight: 700,
                  background: 'var(--a)',
                  color: '#FAF4EA',
                  border: '3px solid var(--text)',
                  borderRadius: 14,
                  padding: '14px 26px',
                  boxShadow: '4px 4px 0 var(--text)',
                }}
              >
                Watch the shows
              </Link>
              <Link
                href="/book"
                className="emx-link emx-cta"
                style={{
                  display: 'inline-block',
                  fontWeight: 700,
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '3px solid var(--text)',
                  borderRadius: 14,
                  padding: '14px 26px',
                  boxShadow: '4px 4px 0 var(--text)',
                }}
              >
                The book →
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative', justifySelf: 'center' }}>
            <div
              className="emx-portrait-frame"
              style={{
                position: 'relative',
                transform: 'rotate(2.5deg)',
                background: '#fff',
                border: '3px solid var(--text)',
                borderRadius: 18,
                padding: '14px 14px 52px',
                boxShadow: '8px 10px 0 var(--b)',
                maxWidth: 380,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/eugine-micah.png"
                alt="Eugine Micah portrait"
                style={{ display: 'block', width: '100%', borderRadius: 8, border: '2px solid #1B1714' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontStyle: 'italic',
                  fontSize: 24,
                  color: '#1B1714',
                }}
              >
                born broke, built loud ✦
              </div>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -16,
                  left: 42,
                  width: 90,
                  height: 28,
                  background: 'var(--c)',
                  opacity: 0.9,
                  transform: 'rotate(-6deg)',
                  border: '1px solid rgba(27,23,20,0.25)',
                }}
              />
            </div>
            <div
              className="max-[500px]:!hidden"
              style={{
                position: 'absolute',
                bottom: 110,
                left: -26,
                background: 'var(--c)',
                color: '#1B1714',
                fontWeight: 800,
                fontSize: 13,
                padding: '9px 13px',
                border: '3px solid var(--text)',
                borderRadius: 12,
                transform: 'rotate(-7deg)',
              }}
            >
              PRESENTER · JOURNALIST · AUTHOR
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div style={{ background: 'var(--a)', borderTop: '3px solid var(--text)', borderBottom: '3px solid var(--text)', overflow: 'hidden', padding: '12px 0' }}>
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'em-marquee 28s linear infinite',
            fontWeight: 800,
            color: '#FAF4EA',
            fontSize: 20,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ paddingRight: 28 }}>
            URBAN NEWS ✦ CAMPUS XPOSURE ✦ THE NAIROBI PODCAST ✦ URBAN GANG TOUR ✦ ROYLANDZ MEDIA ✦ BORN BROKE, BUILT LOUD ✦&nbsp;
          </span>
          <span style={{ paddingRight: 28 }}>
            URBAN NEWS ✦ CAMPUS XPOSURE ✦ THE NAIROBI PODCAST ✦ URBAN GANG TOUR ✦ ROYLANDZ MEDIA ✦ BORN BROKE, BUILT LOUD ✦&nbsp;
          </span>
        </div>
      </div>

      {/* EXPLORE / PICK A LANE */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 26, color: 'var(--a)' }}>
            start here
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(36px, 4.5vw, 58px)', letterSpacing: '-1.5px', lineHeight: 1, margin: '8px 0 0' }}>
            Pick a lane
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22 }}>
          {lanes.map((lane) => (
            <Link
              key={lane.href}
              href={lane.href}
              className="emx-link emx-lane"
              style={withShadow(lane.shadow, {
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                background: '#fff',
                border: '3px solid var(--text)',
                borderRadius: 18,
                padding: 26,
                color: '#1B1714',
              })}
            >
              <div style={{ fontSize: 30 }}>{lane.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.5px' }}>{lane.name}</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, flex: 1, fontWeight: 500 }}>{lane.desc}</p>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--a)' }}>{lane.cta} →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ON STAGE & ON SCREEN */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px 90px' }}>
        <div style={{ marginBottom: 26 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--b)' }}>
            on stage & on screen
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {strip.map((s) => (
            <div
              key={s.src}
              className="emx-strip-item"
              style={withShadow(s.shadow, { border: '3px solid var(--text)', borderRadius: 14, overflow: 'hidden' })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={s.src} alt={s.alt} style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: '#1B1714', borderTop: '3px solid var(--text)', padding: '70px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {stats.map((st) => (
            <div
              key={st.label}
              className="emx-stat"
              style={{
                color: '#FAF4EA',
                border: '2.5px solid rgba(250,244,234,0.3)',
                borderRadius: 16,
                padding: 24,
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 42, letterSpacing: '-1px', color: st.color }}>{st.num}</div>
              <div style={{ fontWeight: 600, fontSize: 14, opacity: 0.85 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LET'S TALK */}
      <section style={{ background: '#1B1714', color: '#FAF4EA', padding: '96px 28px', borderBottom: '1px solid rgba(250,244,234,0.15)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 'clamp(44px, 8vw, 100px)', letterSpacing: '-3px', lineHeight: 0.95 }}>
            Let&rsquo;s <span style={{ color: 'var(--b)' }}>talk.</span>
          </div>
          <p style={{ margin: 0, maxWidth: 560, fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 19, color: 'rgba(250,244,234,0.75)' }}>
            Booking inquiries, press requests, or just saying hello — the mailroom is open.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/messages"
              className="emx-link emx-cta"
              style={{
                display: 'inline-block',
                fontWeight: 700,
                background: 'var(--c)',
                color: '#1B1714',
                border: '3px solid #FAF4EA',
                borderRadius: 14,
                padding: '14px 26px',
                boxShadow: '4px 4px 0 #FAF4EA',
              }}
            >
              Send a message
            </Link>
            <Link
              href="/work#bookings"
              className="emx-link emx-cta"
              style={{
                display: 'inline-block',
                fontWeight: 700,
                background: 'transparent',
                color: '#FAF4EA',
                border: '3px solid #FAF4EA',
                borderRadius: 14,
                padding: '14px 26px',
                boxShadow: '4px 4px 0 rgba(250,244,234,0.4)',
              }}
            >
              Book Eugine ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
