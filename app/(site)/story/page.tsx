import type { Metadata } from 'next';
import Link from 'next/link';
import { chaptersData, rulesData, factsData } from '@/content/em-site-data';

export const metadata: Metadata = {
  title: 'The Story',
  description: 'Kisumu → Lugari → Lumakanda → Murgusi → Thika → Nairobi. The full biography of Eugine Micah — six addresses, one volume setting.',
  alternates: { canonical: '/story' },
};

export default function StoryPage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 52, alignItems: 'center' }} className="max-[900px]:!grid-cols-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Story · Long Read</p>
            <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(48px,6vw,100px)', lineHeight: .94, letterSpacing: '-.02em' }}>Biography of a noise complaint.</h1>
            <p style={{ margin: 0, maxWidth: 580, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 21, lineHeight: 1.5, color: '#4A4237' }}>Kisumu → Lugari → Lumakanda → Murgusi → Thika → Nairobi. Six addresses, one volume setting.</p>
          </div>
          <figure style={{ margin: 0, position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src="/hq-assets/shoot-13.webp" alt="Eugine Micah" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
            <figcaption style={{ marginTop: 8, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>The subject, refusing anonymity</figcaption>
          </figure>
        </div>
      </section>

      {/* CHAPTERS */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1020, margin: '0 auto', padding: '80px 28px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {chaptersData.map((cp) => (
            <div key={cp.tag} style={{ display: 'grid', gridTemplateColumns: '170px minmax(0,1fr)', gap: 36, padding: '36px 0', borderBottom: '1px solid #191613' }} className="max-[600px]:!grid-cols-1 max-[600px]:!gap-2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{cp.tag}</span>
                <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 30, lineHeight: 1 }}>{cp.year}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h2 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 26 }}>{cp.title}</h2>
                <p style={{ margin: 0, fontFamily: "'Newsreader'", fontSize: 17.5, lineHeight: 1.75, color: '#33302A' }}>{cp.copy}</p>
                <p style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 15.5, color: '#C03B22' }}>{cp.aside}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROYLANDZ RULES SAMPLER */}
      <section style={{ borderBottom: '2px solid #191613', background: '#EFE6D2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 52, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Roylandz Rules · A Sampler</span>
            <span style={{ flex: 1, borderTop: '1px solid #191613', transform: 'translateY(-4px)' }} className="max-[560px]:!hidden" />
            <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 15, color: '#6E6455' }}>all 26 are in the book. these are the free ones.</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, border: '2px solid #191613', background: '#F6F0E2' }} className="max-[900px]:!grid-cols-1">
            {rulesData.map((rl) => (
              <div key={rl.no} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '32px 30px', borderRight: '1px solid #191613', borderBottom: '1px solid #191613' }}>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Rule {rl.no}</span>
                <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>{rl.rule}</span>
                <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 15.5, lineHeight: 1.55, color: '#4A4237' }}>{rl.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'center' }} className="max-[900px]:!grid-cols-1">
          <figure style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src="/hq-assets/eugine-15.webp" alt="With Lucy Ogunde" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
            <figcaption style={{ marginTop: 8, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>With co-host Lucy Ogunde, who fact-checks him for free</figcaption>
          </figure>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>For the record</p>
            <h2 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(34px,3.6vw,56px)', letterSpacing: '-.02em' }}>Facts the lawyers made us verify.</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {factsData.map((fc) => (
                <div key={fc.text} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, padding: '13px 0', borderBottom: '1px dotted #191613', alignItems: 'baseline' }}>
                  <span style={{ color: '#C03B22', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13 }}>★</span>
                  <span style={{ fontFamily: "'Newsreader'", fontSize: 17, lineHeight: 1.5 }}>{fc.text}</span>
                </div>
              ))}
            </div>
            <Link href="/shop" style={{ alignSelf: 'flex-start', marginTop: 10, padding: '15px 28px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>The unabridged version →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
