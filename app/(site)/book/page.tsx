import type { Metadata } from 'next';
import { chaptersData, bookProduct, fmtKES } from '@/content/em-site-data';
import { PreorderForm } from '../../_components/PreorderForm';

export const metadata: Metadata = {
  title: 'Born Broke. Built Loud. — Pre-order the Memoir',
  description: 'Pre-order Born Broke. Built Loud., Eugine Micah’s memoir — seven parts, forty-five chapters, from a kerosene-lit childhood in Lugari to the Urban News desk. Free to reserve, no charge until it ships.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <main>
      {/* HERO / COVER */}
      <section style={{ borderBottom: '2px solid #191613', background: '#191613', color: '#F6F0E2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '96px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,.72fr) minmax(0,1.28fr)', gap: 64, alignItems: 'center' }} className="max-[900px]:!grid-cols-1">
          <div style={{ justifySelf: 'center', position: 'relative' }}>
            <div style={{ width: 'min(300px,78vw)', aspectRatio: '2/3', background: '#D9A621', color: '#191613', border: '2px solid #F6F0E2', boxShadow: '16px 16px 0 rgba(192,59,34,.85)', transform: 'rotate(-2deg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 26, overflow: 'hidden', position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="/hq-assets/shoot-02.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .26, mixBlendMode: 'multiply' }} />
              <span style={{ position: 'relative', fontFamily: "'Spline Sans Mono'", fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase' }}>A memoir in seven parts</span>
              <span style={{ position: 'relative', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 42, lineHeight: .95, textTransform: 'uppercase' }}>Born<br />Broke.<br /><span style={{ color: '#F6F0E2', textShadow: '3px 3px 0 #191613' }}>Built<br />Loud.</span></span>
              <span style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ height: 10, background: 'repeating-linear-gradient(90deg,#B11226 0 14px,#191613 14px 28px,#1A7A3C 28px 42px,#F6F0E2 42px 56px)', border: '2px solid #191613' }} />
                <span style={{ fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase' }}>Eugine Micah</span>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621', fontWeight: 600 }}>The Memoir · Pre-order now</p>
            <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(44px,5.6vw,84px)', lineHeight: .98, letterSpacing: '-.02em' }}>Born Broke. Built Loud.</h1>
            <p style={{ margin: 0, maxWidth: 600, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 19, lineHeight: 1.6, color: '#CFC7B6' }}>{bookProduct.subtitle}</p>
            <p style={{ margin: 0, maxWidth: 600, fontFamily: "'Newsreader'", fontSize: 18, lineHeight: 1.75, color: '#CFC7B6' }}>Seven parts. Forty-five chapters. One boy carried from Kisumu to Lugari to a national newsroom by a mouth his teachers called a problem and his bank account now calls a strategy. It is funny because it is true, and it is true because I kept the receipts.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderLeft: '3px solid #C03B22', paddingLeft: 20 }}>
              <p style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 20, lineHeight: 1.5, color: '#F6F0E2' }}>&ldquo;We were not poor quietly. Even our poverty had a sound system.&rdquo;</p>
              <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#8B8272' }}>&mdash; Part One · The Kerosene Years</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginTop: 6 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26 }}>{fmtKES(bookProduct.price)} <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontWeight: 400, fontSize: 16, color: '#8B8272' }}>— expected price, pre-order is free to reserve</span></span>
              <a href="#preorder" style={{ padding: '15px 28px', background: '#D9A621', color: '#191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Reserve my copy &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER TEASERS */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Contents</span>
            <span style={{ flex: 1, borderTop: '1px solid #191613', transform: 'translateY(-4px)' }} />
          </div>
          <h2 style={{ margin: '0 0 52px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(36px,4.4vw,60px)', letterSpacing: '-.02em' }}>Chapter by chapter.</h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {chaptersData.map((ch) => (
              <div key={ch.tag} style={{ display: 'grid', gridTemplateColumns: '170px minmax(0,1fr)', gap: 30, padding: '34px 0', borderBottom: '1px solid #191613' }} className="max-[700px]:!grid-cols-1 max-[700px]:!gap-2">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{ch.tag}</span>
                  <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14.5, color: '#6E6455' }}>{ch.year}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 25, lineHeight: 1.1 }}>{ch.title}</span>
                  <span style={{ fontFamily: "'Newsreader'", fontSize: 16.5, lineHeight: 1.7, color: '#33302A' }}>{ch.copy}</span>
                  <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11.5, letterSpacing: '.06em', color: '#6E6455', borderLeft: '2px solid #D9A621', paddingLeft: 12 }}>{ch.aside}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRE-ORDER */}
      <section id="preorder" style={{ background: '#EFE6D2' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ border: '2px solid #191613', padding: 44, background: '#F6F0E2' }}>
            <p style={{ margin: '0 0 10px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Pre-order · Free to reserve</p>
            <h2 style={{ margin: '0 0 8px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(28px,3vw,42px)' }}>Get first dibs on the first print run.</h2>
            <p style={{ margin: '0 0 30px', fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 16, lineHeight: 1.6, color: '#4A4237' }}>
              This is an interest list, not a checkout &mdash; no payment is taken today. Reserve your spot and you&rsquo;ll be emailed the moment copies are ready, at the expected price of {fmtKES(bookProduct.price)}.
            </p>
            <PreorderForm />
          </div>
        </div>
      </section>
    </main>
  );
}
