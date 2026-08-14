import type { Metadata } from 'next';
import Link from 'next/link';

// New page (2026-08 brand-platform pass). Net new route, no existing
// content or URL to conflict with. Deliberately does not duplicate
// /book's real checkout flow or /press's fact-checked bio — this page
// exists to frame Eugine as a writer/thinker and hand off to those two
// pages for the actual purchase and the actual facts.

export const metadata: Metadata = {
  title: 'Ideas',
  description:
    'Eugine Micah as a writer: Born Broke. Built Loud., his memoir, and his contribution to the Global Cyber Alliance’s work on journalist safety in Africa.',
  alternates: { canonical: '/ideas' },
};

const parts = [
  'The Land That Made Me',
  'Dust, Dung, and the Gone Parents',
  'The Township Years',
  'Murgusi',
  'Thika and the Wildcat',
  'The Screen',
  'Still Trying to Make It',
];

const alsoWritten = [
  {
    title: 'Protecting the Online Safety of Journalists in Africa',
    sub: 'Global Cyber Alliance, Africa Program',
    href: 'https://gcatoolkit.org/blog/protecting-the-online-safety-of-journalists-in-africa/',
  },
];

export default function IdeasPage() {
  return (
    <main>
      {/* HERO */}
      <header style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px 60px' }}>
        <div
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontStyle: 'italic',
            fontSize: 24,
            color: 'var(--c)',
            marginBottom: 12,
          }}
        >
          what he writes
        </div>
        <h1 className="emx-display" style={{ fontWeight: 400, fontSize: 'clamp(48px, 7vw, 100px)', lineHeight: 0.92, margin: '0 0 20px', maxWidth: 900 }}>
          Born Broke.
          <br />
          Built Loud.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 560, fontWeight: 500, margin: '0 0 26px' }}>
          Seven parts, forty-five chapters, from a kerosene-lit childhood in Lugari to the Urban News desk.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link
            href="/book"
            className="emx-cta"
            style={{ display: 'inline-block', fontWeight: 700, background: 'var(--a)', color: '#FAF4EA', border: '3px solid var(--text)', borderRadius: 14, padding: '13px 24px', boxShadow: '4px 4px 0 var(--text)' }}
          >
            Get the book
          </Link>
        </div>
      </header>

      {/* BOOK + PARTS */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '30px 28px 90px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'start' }}>
        <figure style={{ margin: 0, background: '#fff', border: '3px solid var(--text)', borderRadius: 12, padding: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/ideas/books.png"
            alt="Eugine Micah, portrait with books"
            style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 6, border: '2px solid #1B1714' }}
          />
        </figure>
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 500, margin: '0 0 24px' }}>
            Not a business-strategy book. The story of building a media career from nothing in Kenya, told in seven
            parts.
          </p>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {parts.map((part, i) => (
              <li
                key={part}
                style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '14px 0', borderBottom: '2px solid var(--text)' }}
              >
                <span style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 20, color: 'var(--a)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{part}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ALSO WRITTEN */}
      <section style={{ background: '#1B1714', padding: '80px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
          <figure style={{ margin: 0, background: '#fff', border: '3px solid var(--c)', borderRadius: 12, padding: 8, maxWidth: 320 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/ideas/reading.png"
              alt="Eugine Micah"
              style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 6 }}
            />
          </figure>
          <div>
            <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--c)', marginBottom: 12 }}>
              also written
            </div>
            {alsoWritten.map((w) => (
              <a
                key={w.title}
                href={w.href}
                target="_blank"
                rel="noopener"
                className="emx-link"
                style={{ display: 'block', color: '#FAF4EA' }}
              >
                <div style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.3 }}>{w.title}</div>
                <div style={{ fontSize: 14, opacity: 0.75, fontWeight: 500, marginTop: 6 }}>{w.sub} &#8599;</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 28px' }}>
        <div style={{ fontWeight: 800, fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-2px' }}>
          Next:{' '}
          <Link href="/press" className="emx-link" style={{ color: 'var(--a)' }}>
            the press kit &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
