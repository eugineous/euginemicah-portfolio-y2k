import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story of Eugine Micah: Kenyan TV presenter, journalist, founder of Roylandz Media and author. From a mud house in Lugari to the national screen.',
  alternates: { canonical: '/about' },
};

function withShadow(color: string, style: CSSProperties = {}): CSSProperties {
  return { ...style, ['--sh' as string]: color } as CSSProperties;
}

const storyColumns = [
  {
    n: 1,
    color: 'var(--a)',
    fg: '#FAF4EA',
    label: "Where I'm from",
    paras: [
      'Born on Christmas Eve at a Kisumu hospital everyone still calls &ldquo;Russia,&rdquo; to his teenage mother, Beverlyne, who got through those first days on boiled tea and borrowed arrowroots.',
      'Raised in Manyonyi village, Lugari: a grass-thatched mud house, no electricity, no glass in the windows, a floor resealed by hand with cow dung every week. His father, Joab — nicknamed the Lion — ran a nightly news quiz at home that built a journalist before any classroom did.',
      'His mother was raised not by her birth parents but by her aunt Gladys and David Zarembka, an American Quaker peace-worker who became, in every way but paperwork, Eugine&rsquo;s grandfather — and whose library first put a wider world within reach.',
    ],
  },
  {
    n: 2,
    color: 'var(--b)',
    fg: '#FAF4EA',
    label: 'How I got here',
    paras: [
      'At Mahemas Primary, a deputy headmistress named Madame Zipporah fed him tea and bread in a cramped library office — the first door anyone held open with no cane behind it. A classmate, Hassan Omar, once paid his 25-shilling exam fee out of his own pocket. Neither has been forgotten.',
      'English Literature teacher in Kakamega. Radio and TV host in Thika. Then a bilingual news writer in the Citizen TV newsroom — 200+ stories in Swahili and English, learning the floor of a newsroom from the floor up, literally, carrying cables as an intern before anyone let him near a script.',
      'Today he&rsquo;s the co-anchor of Urban News on PPP TV, alongside Lucy Ogunde, and Head of Digital at the station.',
    ],
  },
  {
    n: 3,
    color: 'var(--c)',
    fg: '#1B1714',
    label: 'What I build now',
    paras: [
      'He taught himself to code and shipped an automated news-to-social pipeline that runs part of the newsroom&rsquo;s social output.',
      'He founded Roylandz Media and co-founded the Urban Gang Tour with Lucy Ogunde — a school a week, a stage, mentorship pods, a runway, and a national broadcast.',
      'He is now an author: Born Broke, Built Loud.',
    ],
    quote: '&ldquo;Born broke. Built loud.&rdquo; ✦',
  },
];

const milestones = [
  { year: '2001', title: 'Born, Christmas Eve, Kisumu', sub: 'Raised in Manyonyi village, Lugari' },
  { year: '2020', title: 'English Literature teacher, Kakamega', sub: 'Secondary literature and civic education' },
  { year: '2020', title: 'Radio & TV host, TIBS Thika', sub: 'Rhumba Jouissance, The Overview Show' },
  { year: '2021', title: 'Global Cyber Alliance, Africa Program', sub: 'Journalist digital-safety toolkit contributor' },
  { year: '2022', title: 'Reporter, Citizen TV', sub: '200+ stories in Swahili and English' },
  { year: '2022 —', title: 'Co-anchor, Urban News', sub: 'With Lucy Ogunde; plus Campus Xposure and the Nairobi Podcast' },
  { year: '2023', title: 'Founded Roylandz Media', sub: 'Content strategy, social and production' },
  { year: '2024', title: 'Valedictorian, TIBS', sub: 'Diploma, Journalism and Mass Communication' },
  { year: '2024', title: "People's Choice Awards Kenya nominee", sub: 'Male TikToker of the Year' },
  { year: '2026', title: 'Author, &ldquo;Born Broke, Built Loud&rdquo;', sub: 'The memoir' },
];

const gallery = [
  { src: '/hq-assets/un-desk-02.jpg', alt: 'Eugine Micah on the Urban News desk, with Lucy Ogunde', cap: 'The Urban News desk, with Lucy', shadow: 'var(--a)' },
  { src: '/assets/about/grad-mum.webp', alt: 'Eugine Micah with his mother at his TIBS graduation', cap: 'Graduation day, with his mother', shadow: 'var(--b)' },
  { src: '/assets/about/grad-solo.webp', alt: 'Eugine Micah in graduation gown and sash', cap: 'Valedictorian, TIBS, class of 2024', shadow: 'var(--c)' },
  { src: '/assets/about/baby-zarembka.webp', alt: 'Eugine Micah as a boy with his grandfather David Zarembka', cap: 'As a boy, with his grandfather David', shadow: 'var(--a)' },
  { src: '/hq-assets/eugine-13.webp', alt: 'Eugine Micah with the Urban Gang Tour crew, school edition', cap: 'Urban Gang Tour, school edition', shadow: 'var(--b)' },
  { src: '/hq-assets/gal-crowning.jpg', alt: 'A winner being crowned at the Urban Gang Tour', cap: 'Urban Gang Tour, the crowning', shadow: 'var(--c)' },
];

export default function AboutPage() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      {/* HERO: FULL-BLEED */}
      <header style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', borderBottom: '3px solid var(--text)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/about/citizen-studio.webp"
          alt="Eugine Micah on the Citizen TV Nipashe set"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '65% 40%' }}
        />
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1B1714 12%, rgba(27,23,20,0.6) 48%, rgba(27,23,20,0.15) 78%)' }}
        />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 28px 56px', color: '#FAF4EA' }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--c)', marginBottom: 12 }}>
            who is this guy?
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-3px', lineHeight: 0.9, margin: 0 }}>
            Built from
            <br />
            nothing.
          </h1>
        </div>
      </header>

      {/* STORY */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
        {storyColumns.map((col) => (
          <div key={col.n} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: col.color,
                  color: col.fg,
                  fontWeight: 800,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {col.n}
              </span>
              <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.6 }}>{col.label}</span>
            </div>
            {col.paras.map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 500, margin: 0 }} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            {col.quote && (
              <p
                style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 22, color: 'var(--b)', margin: '8px 0 0' }}
                dangerouslySetInnerHTML={{ __html: col.quote }}
              />
            )}
          </div>
        ))}
      </section>

      {/* MILESTONES */}
      <section style={{ background: 'var(--a)', borderTop: '3px solid var(--text)', borderBottom: '3px solid var(--text)', padding: '90px 28px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--c)', marginBottom: 8 }}>
              the timeline
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-1.5px', color: '#FAF4EA', margin: 0 }}>Milestones</h2>
          </div>
          <div style={{ position: 'relative', paddingLeft: 2 }}>
            <div aria-hidden style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: 'rgba(250,244,234,0.25)' }} />
            {milestones.map((m, i) => (
              <div key={i} style={{ position: 'relative', padding: '0 0 40px 34px' }}>
                <div aria-hidden style={{ position: 'absolute', left: 0, top: 4, width: 15, height: 15, borderRadius: '50%', background: 'var(--c)', border: '3px solid var(--text)' }} />
                <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1.5, color: 'var(--c)', marginBottom: 6 }}>{m.year}</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#FAF4EA', lineHeight: 1.25 }} dangerouslySetInnerHTML={{ __html: m.title }} />
                <div style={{ fontSize: 14, opacity: 0.8, fontWeight: 500, color: '#FAF4EA', marginTop: 4 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--b)' }}>camera roll</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-1.5px', margin: '6px 0 0' }}>On set & off script</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="emx-gallery-card"
              style={withShadow(g.shadow, { margin: 0, background: '#fff', border: '3px solid var(--text)', borderRadius: 12, padding: 8 })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                src={g.src}
                alt={g.alt}
                style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 6, border: '2px solid #1B1714' }}
              />
              <figcaption style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: '#1B1714', textAlign: 'center' }}>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NEXT */}
      <section style={{ background: '#1B1714', color: '#FAF4EA', padding: '70px 28px', borderTop: '3px solid var(--text)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-2px' }}>
            Next:{' '}
            <Link href="/shows" className="emx-link" style={{ color: 'var(--c)' }}>
              the shows →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
