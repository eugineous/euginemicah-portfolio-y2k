import type { Metadata } from 'next';
import Link from 'next/link';
import { BioCopyButton } from './BioCopyButton';

// Press kit — structure/layout ported from the DCLogic mockup at
// "Celebrity website project/Press.dc.html". Copy has been re-grounded
// against real sources (content/em-site-data.ts's factsData/chaptersData/
// tvGuideData/chairsData, plus independently web-searched corroboration —
// see the phase report). Anything the mockup stated that couldn't be
// verified (e.g. a specific weekly/daily viewership number — two
// independent sources disagreed, 2M weekly vs 3M daily) was left out
// rather than guessed at. The visit-counter/tab-title-trick from the
// mockup's componentDidMount is intentionally not ported (out of scope
// per the phase brief); the bio copy buttons are (see BioCopyButton.tsx).

export const metadata: Metadata = {
  title: 'Press Kit',
  description:
    'Media kit for Eugine Micah: bio, approved photos, brand marks and a fact sheet, cleared for editorial use.',
  alternates: { canonical: '/press' },
};

const PRESS_EMAIL = 'eugine.micah@outlook.com';

const facts: [string, string][] = [
  ['2022', 'co-anchoring Urban News, live'],
  ['4', 'shows & platforms hosted'],
  ['40+', 'schools toured, Urban Gang Tour'],
  ['2024', 'valedictorian, TIBS College'],
  ['EN / SW', 'hosts bilingually'],
  ['2024', "People's Choice Awards nominee"],
];

const photos: { src: string; alt: string; caption: string; shadow: string }[] = [
  { src: '/assets/press/citizen-studio.webp', alt: 'Eugine Micah in the Citizen TV newsroom', caption: 'Newsroom, Citizen TV', shadow: 'var(--a)' },
  { src: '/assets/press/shoot-1.jpg', alt: 'Eugine Micah studio portrait', caption: 'Studio portrait', shadow: 'var(--b)' },
  { src: '/assets/press/ppp-studio-3.webp', alt: 'Eugine Micah on the PPP TV set', caption: 'On set, PPP TV', shadow: 'var(--c)' },
  { src: '/assets/press/grad-solo-2.webp', alt: 'Eugine Micah in graduation gown', caption: 'Valedictorian, 2024', shadow: 'var(--a)' },
];

const logos: { src: string; alt: string; bg: string }[] = [
  { src: '/assets/press/em-logo-black.png', alt: 'Eugine Micah logo, black on cream', bg: '#FAF4EA' },
  { src: '/assets/press/em-logo-cream.png', alt: 'Eugine Micah logo, cream on black', bg: '#1B1714' },
];

const shortBio =
  'Eugine Micah is a Kenyan TV presenter, journalist, founder and author. He co-anchors Urban News on PPP TV with Lucy Ogunde, leads Roylandz Media, co-founded the Urban Gang Tour, and is the author of the memoir Born Broke. Built Loud.';

const longBio =
  "Born on Christmas Eve in Kisumu and raised in Manyonyi village, Lugari, Eugine Micah grew up with a kerosene lamp for a streetlight and a grandfather, Rev. Micah Ob'bayi, whose preaching voice needed no microphone. He interned at Citizen TV, hosted radio and TV at TIBS FM and TIBS TV in Thika, and graduated valedictorian from TIBS College (Journalism & Media), class of 2024. He now co-anchors Urban News on PPP TV with Lucy Ogunde — live, twice weekly, no script — and also hosts Campus Xposure and The Nairobi Podcast. He taught himself to code and built the newsroom's automated news-to-social pipeline, is a published contributor to the Global Cyber Alliance's work on journalist safety in Africa, founded Roylandz Media, co-founded the Urban Gang Tour, and is the author of the memoir Born Broke. Built Loud, available now.";

const railStops: [string, string, 'a' | 'b' | 'c'][] = [
  ['#facts', 'FACTS', 'a'],
  ['#bios', 'BIOS', 'b'],
  ['#photos', 'PHOTOS', 'c'],
  ['#logos', 'LOGOS', 'a'],
  ['#press-contact', 'CONTACT', 'b'],
];

const railBg: Record<'a' | 'b' | 'c', string> = { a: 'var(--a)', b: 'var(--b)', c: 'var(--c)' };
const railColor: Record<'a' | 'b' | 'c', string> = { a: '#FAF4EA', b: '#FAF4EA', c: '#1B1714' };

export default function PressPage() {
  return (
    <main>
      {/* ON-PAGE NAV */}
      <div
        className="hidden md:flex"
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 45,
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 10,
        }}
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
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              padding: '12px 7px',
              background: railBg[key],
              color: railColor[key],
              border: '2.5px solid var(--text)',
              borderRadius: '10px 0 0 10px',
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: 1.5,
              boxShadow: '-3px 3px 0 var(--text)',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* HERO */}
      <header
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '70px 28px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 44,
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B1714', color: '#FAF4EA', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 22 }}>
            FOR MEDIA &amp; PARTNERS
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '-2.5px', lineHeight: 0.96, margin: '0 0 20px' }}>
            Press kit
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 480, fontWeight: 500, margin: '0 0 26px' }}>
            Bios, approved photography, brand marks and a fact sheet, cleared for editorial use. Everything a
            producer, editor or booker needs in one place.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="#bios"
              className="emx-cta"
              style={{ display: 'inline-block', fontWeight: 700, background: 'var(--a)', color: '#FAF4EA', border: '3px solid var(--text)', borderRadius: 14, padding: '13px 24px', boxShadow: '4px 4px 0 var(--text)' }}
            >
              Jump to bios
            </Link>
            <Link
              href="/messages"
              className="emx-cta"
              style={{ display: 'inline-block', fontWeight: 700, background: 'var(--bg)', color: 'var(--text)', border: '3px solid var(--text)', borderRadius: 14, padding: '13px 24px', boxShadow: '4px 4px 0 var(--text)' }}
            >
              Media contact
            </Link>
          </div>
        </div>
        <div style={{ position: 'relative', justifySelf: 'center' }}>
          <div
            className="emx-portrait-frame"
            style={{ transform: 'rotate(2deg)', background: '#fff', border: '3px solid #1B1714', borderRadius: 18, padding: 12, boxShadow: '8px 10px 0 var(--a)', maxWidth: 340 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/press/shoot-1.jpg"
              alt="Eugine Micah press portrait"
              style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 8, border: '2px solid #1B1714' }}
            />
          </div>
          <div style={{ position: 'absolute', top: -16, right: -18, background: 'var(--c)', color: '#1B1714', fontWeight: 800, fontSize: 13, padding: '9px 15px', border: '3px solid #1B1714', borderRadius: 999, transform: 'rotate(6deg)' }}>
            HIGH-RES BELOW
          </div>
        </div>
      </header>

      {/* FACT SHEET STRIP */}
      <section id="facts" style={{ maxWidth: 1200, margin: '60px auto 0', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
        {facts.map(([num, label]) => (
          <div
            key={label}
            className="emx-stat"
            style={{ textAlign: 'center', border: '2.5px solid var(--text)', borderRadius: 14, padding: '18px 10px', background: 'var(--bg)' }}
          >
            <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: '-0.5px', color: 'var(--a)' }}>{num}</div>
            <div style={{ fontWeight: 600, fontSize: 12, opacity: 0.7, marginTop: 4, lineHeight: 1.35 }}>{label}</div>
          </div>
        ))}
      </section>

      {/* BIOS */}
      <section id="bios" style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px 70px' }}>
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--a)' }}>for the write-up</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-1.5px', margin: '8px 0 0' }}>Bios</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22 }}>
          <div className="emx-lane" style={{ ['--sh' as string]: 'var(--a)', background: 'var(--bg)', border: '3px solid var(--text)', borderRadius: 18, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>Short bio</div>
                <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.5, marginTop: 2 }}>~40 words</div>
              </div>
              <BioCopyButton text={shortBio} />
            </div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, fontWeight: 500, margin: 0, borderLeft: '3px solid var(--a)', paddingLeft: 16 }}>{shortBio}</p>
          </div>

          <div className="emx-lane" style={{ ['--sh' as string]: 'var(--b)', background: 'var(--bg)', border: '3px solid var(--text)', borderRadius: 18, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>Long bio</div>
                <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.5, marginTop: 2 }}>~120 words</div>
              </div>
              <BioCopyButton text={longBio} />
            </div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, fontWeight: 500, margin: 0, borderLeft: '3px solid var(--b)', paddingLeft: 16 }}>{longBio}</p>
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      <section id="photos" style={{ background: '#1B1714', padding: '80px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, flexWrap: 'wrap', marginBottom: 30 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--c)' }}>approved for use</div>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-1.5px', color: '#FAF4EA', margin: '8px 0 0' }}>Photos</h2>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(250,244,234,0.55)' }}>Credit: Roylandz Media</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {photos.map((p) => (
              <div key={p.src} className="emx-gallery-card" style={{ ['--sh' as string]: p.shadow, background: '#FAF4EA', border: '3px solid #1B1714', borderRadius: 14, padding: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={p.src} alt={p.alt} style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 6, border: '2px solid #1B1714', marginBottom: 10 }} />
                <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.65, marginBottom: 8, color: '#1B1714' }}>{p.caption}</div>
                <a href={p.src} download style={{ display: 'block', textAlign: 'center', fontWeight: 700, fontSize: 13, background: '#1B1714', color: '#FAF4EA', borderRadius: 8, padding: 9 }}>
                  Download ↓
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section id="logos" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px' }}>
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--b)' }}>brand marks</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-1.5px', margin: '8px 0 0' }}>Logos</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {logos.map((l) => (
            <div key={l.src} className="emx-gallery-card" style={{ ['--sh' as string]: 'var(--a)', border: '3px solid var(--text)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ background: l.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 44 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.alt} style={{ width: 96, height: 96, objectFit: 'contain' }} />
              </div>
              <a href={l.src} download style={{ display: 'block', width: '100%', textAlign: 'center', fontWeight: 700, fontSize: 13, background: '#1B1714', color: '#FAF4EA', padding: 10, boxSizing: 'border-box' }}>
                Download PNG ↓
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="press-contact" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px 100px' }}>
        <div style={{ background: 'var(--c)', border: '3px solid #1B1714', borderRadius: 24, padding: '60px 40px', textAlign: 'center', boxShadow: '8px 8px 0 #1B1714' }}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-1.5px', margin: '0 0 12px', color: '#1B1714' }}>Working on a feature?</h2>
          <p style={{ fontSize: 16, fontWeight: 500, margin: '0 0 24px', color: '#1B1714' }}>
            Reach the team directly at <strong>{PRESS_EMAIL}</strong>, or send it straight through.
          </p>
          <Link
            href="/messages"
            className="emx-cta"
            style={{ display: 'inline-block', fontWeight: 800, background: '#1B1714', color: '#FAF4EA', border: '3px solid #1B1714', borderRadius: 999, padding: '15px 32px', boxShadow: '4px 4px 0 rgba(27,23,20,0.3)' }}
          >
            Message the team ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
