import type { Metadata } from 'next';
import Link from 'next/link';
import { productsData, bookProduct, fmtKES } from '@/content/em-site-data';

export const metadata: Metadata = {
  title: 'The Classifieds',
  description: 'Urban Gang Tour merch — crewnecks, tees, jerseys, and headwear. The shop is warming up; the book is already open for pre-order.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <main>
      {/* HEADER */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Classifieds · All Sales Final-ish</p>
          <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(48px,6vw,100px)', lineHeight: .94, letterSpacing: '-.02em' }}>Commerce, but make it loud.</h1>
        </div>
      </section>

      {/* LEAD LISTING: THE BOOK */}
      <section style={{ borderBottom: '2px solid #191613', background: '#191613', color: '#F6F0E2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '80px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,.65fr) minmax(0,1.35fr)', gap: 56, alignItems: 'center' }} className="max-[900px]:!grid-cols-1">
          <div style={{ justifySelf: 'center' }}>
            <div style={{ width: 'min(260px,72vw)', aspectRatio: '2/3', background: '#D9A621', color: '#191613', border: '2px solid #F6F0E2', boxShadow: '14px 14px 0 rgba(192,59,34,.85)', transform: 'rotate(-2deg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 22, overflow: 'hidden', position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="/hq-assets/shoot-02.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .26, mixBlendMode: 'multiply' }} />
              <span style={{ position: 'relative', fontFamily: "'Spline Sans Mono'", fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase' }}>A memoir in seven parts</span>
              <span style={{ position: 'relative', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 36, lineHeight: .95, textTransform: 'uppercase' }}>Born<br />Broke.<br /><span style={{ color: '#F6F0E2', textShadow: '3px 3px 0 #191613' }}>Built<br />Loud.</span></span>
              <span style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={{ height: 9, background: 'repeating-linear-gradient(90deg,#B11226 0 12px,#191613 12px 24px,#1A7A3C 24px 36px,#F6F0E2 36px 48px)', border: '2px solid #191613' }} />
                <span style={{ fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase' }}>Eugine Micah</span>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621', fontWeight: 600 }}>Lead listing · The one that&rsquo;s actually live</p>
            <h2 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(34px,4vw,60px)', lineHeight: .98, letterSpacing: '-.02em' }}>FOR SALE: one childhood, thoroughly used, hilariously documented.</h2>
            <p style={{ margin: 0, maxWidth: 600, fontFamily: "'Newsreader'", fontSize: 17.5, lineHeight: 1.75, color: '#CFC7B6' }}>Born Broke. Built Loud. &mdash; the memoir. Seven parts, forty-five chapters, twenty-six Roylandz Rules, zero ghostwriters. Wit included at no extra charge. Pre-order now, no charge until it ships.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 24 }}>{fmtKES(bookProduct.price)}</span>
              <Link href="/book" style={{ padding: '15px 28px', background: '#D9A621', color: '#191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Pre-order &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP OPENING SOON BANNER + MERCH GRID */}
      <section>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', border: '2px solid #191613', background: '#C03B22', color: '#F6F0E2', padding: '18px 24px', marginBottom: 44 }}>
            <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(20px,2.2vw,30px)' }}>THE SHOP IS WARMING UP.</span>
            <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 15, maxWidth: 480 }}>Merch drops soon &mdash; follow the socials in the footer for the release date, or email to reserve a piece before it goes live.</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid #191613' }} className="max-[900px]:!grid-cols-2 max-[560px]:!grid-cols-1">
            {productsData.map((pr) => (
              <div key={pr.id} style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #191613', borderBottom: '1px solid #191613', background: '#F6F0E2' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={pr.img} alt={pr.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderBottom: '1px solid #191613' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '20px 20px 24px' }}>
                  <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#6E6455' }}>{pr.cat}</span>
                  <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 17 }}>{pr.name}</span>
                  <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14, color: '#6E6455', lineHeight: 1.45 }}>{pr.ad}</span>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span style={{ fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 14 }}>{fmtKES(pr.price)}</span>
                    <span style={{ padding: '5px 10px', border: '1px solid #6E6455', color: '#6E6455', fontFamily: "'Spline Sans Mono'", fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase' }}>Coming soon</span>
                  </span>
                  <a
                    href={`mailto:eugine.micah@outlook.com?subject=${encodeURIComponent(`Inquiry: ${pr.name}`)}&body=${encodeURIComponent(`Hi Eugine,\n\nI'd like to inquire about the ${pr.name} (${fmtKES(pr.price)}) once the shop opens.\n\n`)}`}
                    style={{ marginTop: 4, padding: '9px 16px', border: '2px solid #191613', textAlign: 'center', fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase' }}
                  >
                    Email to inquire
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
