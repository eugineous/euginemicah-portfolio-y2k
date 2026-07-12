import type { Metadata } from 'next';
import Link from 'next/link';
import { chairsData, editionIndexData, tvGuideData, articlesData, lettersData, productsData, bookProduct, fmtKES } from '@/content/em-site-data';
import { NewsletterForm } from '../_components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Front Page',
  description: 'Eugine Micah — Kenyan broadcast journalist, author, speaker, and curator of culture. Co-anchor of Urban News on PPP TV. Read the story, book him, or grab the book.',
  alternates: { canonical: '/' },
};

const homeArticles = articlesData.slice(1, 4);
const homeProducts = [bookProduct, ...productsData.slice(0, 3)];

export default function HomePage() {
  return (
    <main>
      {/* LEAD STORY */}
      <section style={{ maxWidth: 1420, margin: '0 auto', padding: '56px 28px 64px', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 52, alignItems: 'center', borderBottom: '2px solid #191613' }} className="max-[900px]:!grid-cols-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Front page · Section A</p>
          <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(52px,5.8vw,96px)', lineHeight: .96, letterSpacing: '-.02em' }}>Local boy refuses to be quiet.</h1>
          <p style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 'clamp(20px,1.8vw,26px)', lineHeight: 1.4, color: '#4A4237' }}>Twenty-five years in, the volume knob is still missing. The Republic of Kenya has learned to live with it — twice a week, at 7:30, on national television.</p>
          <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>By the Editor (also Eugine) · Nairobi Desk</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <Link href="/book-me" style={{ padding: '15px 28px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Hire the voice →</Link>
            <Link href="/story" style={{ padding: '15px 28px', border: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Read the story →</Link>
          </div>
        </div>
        <figure style={{ margin: 0, position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hq-assets/shoot-02.png" alt="Eugine Micah — press photo" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', alignItems: 'stretch' }}>
            <span style={{ background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', padding: '9px 14px', display: 'flex', alignItems: 'center' }}>Live</span>
            <span style={{ background: '#191613', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.08em', padding: '9px 16px', display: 'flex', alignItems: 'center', flex: 1 }}>EUGINE MICAH — definitely not reading an autocue</span>
          </span>
          <figcaption style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}><span>Photo: the good side (both are)</span><span>Press Office, Roylandz Media</span></figcaption>
          <span style={{ position: 'absolute', top: 18, right: -14, border: '3px solid #C03B22', color: '#C03B22', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', padding: '8px 14px', transform: 'rotate(8deg)', background: 'rgba(246,240,226,.85)' }}>Approved by Mum</span>
        </figure>
      </section>

      {/* IN THIS EDITION */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="max-[700px]:!grid-cols-1">
          {editionIndexData.map((ei) => (
            <Link key={ei.sec} href={ei.href} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '26px 22px', textAlign: 'left', borderRight: '1px solid #191613' }}>
              <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{ei.sec}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 19, lineHeight: 1.1 }}>{ei.title}</span>
              <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14.5, color: '#6E6455' }}>{ei.quip}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* THE MANY JOBS */}
      <section style={{ borderBottom: '2px solid #191613', background: '#EFE6D2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Section B</span>
            <span style={{ flex: 1, borderTop: '1px solid #191613', transform: 'translateY(-4px)' }} />
          </div>
          <h2 style={{ margin: '0 0 10px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(40px,4.6vw,72px)', letterSpacing: '-.02em' }}>The many jobs of one mouth.</h2>
          <p style={{ margin: '0 0 52px', fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 19, color: '#4A4237' }}>Occupational report: subject holds four positions simultaneously. Investigators found no off switch.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid #191613', background: '#F6F0E2' }} className="max-[900px]:!grid-cols-2 max-[560px]:!grid-cols-1">
            {chairsData.map((ch) => (
              <Link key={ch.no} href={ch.href} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '34px 26px 40px', textAlign: 'left', borderRight: '1px solid #191613', minHeight: 320 }}>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{ch.no}</span>
                <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 30, lineHeight: 1 }}>{ch.title}</span>
                <span style={{ fontFamily: "'Newsreader'", fontSize: 16, lineHeight: 1.6 }}>{ch.copy}</span>
                <span style={{ marginTop: 'auto', fontFamily: "'Spline Sans Mono'", fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{ch.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE BOOK */}
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
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621', fontWeight: 600 }}>Section C · Literature (allegedly)</p>
            <h2 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(40px,4.6vw,72px)', lineHeight: .98, letterSpacing: '-.02em' }}>&ldquo;You do not know me. Let me fix that.&rdquo;</h2>
            <p style={{ margin: 0, maxWidth: 600, fontFamily: "'Newsreader'", fontSize: 18, lineHeight: 1.75, color: '#CFC7B6' }}>Seven parts. Forty-five chapters. One boy carried from Kisumu to Lugari to a national newsroom by a mouth his teachers called a problem and his bank account now calls a strategy. It is funny because it is true, and it is true because I kept the receipts.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderLeft: '3px solid #C03B22', paddingLeft: 20 }}>
              <p style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 20, lineHeight: 1.5, color: '#F6F0E2' }}>&ldquo;We were not poor quietly. Even our poverty had a sound system.&rdquo;</p>
              <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#8B8272' }}>— Part One · The Kerosene Years</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginTop: 6 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26 }}>{fmtKES(bookProduct.price)} <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontWeight: 400, fontSize: 16, color: '#8B8272' }}>— pre-order, cheaper than therapy too</span></span>
              <Link href="/book" style={{ padding: '15px 28px', background: '#D9A621', color: '#191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Pre-order →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL FRONT */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Section D · The Journal</span>
            <span style={{ flex: 1, borderTop: '1px solid #191613', transform: 'translateY(-4px)' }} />
            <Link href="/journal" style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}>All entries →</Link>
          </div>
          <h2 style={{ margin: '0 0 52px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(40px,4.6vw,72px)', letterSpacing: '-.02em' }}>Op-eds from a man<br />with opinions to spare.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,.8fr)', gap: 0, border: '2px solid #191613' }} className="max-[900px]:!grid-cols-1">
            <Link href={`/journal/${articlesData[0].slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '44px 40px', textAlign: 'left', borderRight: '1px solid #191613', background: '#F6F0E2' }}>
              <span style={{ display: 'flex', gap: 14, fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase' }}><span style={{ color: '#C03B22', fontWeight: 600 }}>★ Featured · {articlesData[0].cat}</span><span style={{ color: '#6E6455' }}>{articlesData[0].date} · {articlesData[0].read} min</span></span>
              <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(28px,2.8vw,44px)', lineHeight: 1.02 }}>{articlesData[0].title}</span>
              <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 19, lineHeight: 1.5, color: '#4A4237' }}>{articlesData[0].deck}</span>
              <span style={{ marginTop: 'auto', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Read the whole thing →</span>
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {homeArticles.map((ar) => (
                <Link key={ar.slug} href={`/journal/${ar.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '24px 28px', textAlign: 'left', borderBottom: '1px solid #191613', flex: 1 }}>
                  <span style={{ display: 'flex', gap: 12, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase' }}><span style={{ color: '#C03B22', fontWeight: 600 }}>{ar.cat}</span><span style={{ color: '#6E6455' }}>{ar.read} min</span></span>
                  <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 19, lineHeight: 1.12 }}>{ar.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TV GUIDE */}
      <section style={{ borderBottom: '2px solid #191613', background: '#EFE6D2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Section E · Now Showing</span>
            <span style={{ flex: 1, borderTop: '1px solid #191613', transform: 'translateY(-4px)' }} />
            <Link href="/work" style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}>Full guide →</Link>
          </div>
          <h2 style={{ margin: '0 0 52px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(40px,4.6vw,72px)', letterSpacing: '-.02em' }}>Your programming,<br />interrupted regularly.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid #191613', background: '#F6F0E2' }}>
            {tvGuideData.map((tv) => (
              <Link key={tv.name} href="/work" style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr) minmax(0,1.4fr) auto', gap: 26, alignItems: 'center', padding: '22px 28px', borderBottom: '1px solid #191613', textAlign: 'left' }} className="max-[700px]:!grid-cols-1 max-[700px]:!gap-2">
                <span style={{ fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 14, letterSpacing: '.06em', color: '#C03B22' }}>{tv.slot}</span>
                <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 23 }}>{tv.name}</span>
                <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 16, color: '#4A4237' }}>{tv.quip}</span>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', border: '2px solid #191613', padding: '7px 12px', width: 'fit-content' }}>{tv.where}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FIELD REPORTS / TOUR */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'center' }} className="max-[900px]:!grid-cols-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Section F · Field Reports</p>
            <h2 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(40px,4.6vw,72px)', lineHeight: .98, letterSpacing: '-.02em' }}>Meanwhile, somewhere in Kenya, a school gets loud.</h2>
            <p style={{ margin: 0, maxWidth: 560, fontFamily: "'Newsreader'", fontSize: 18, lineHeight: 1.75, color: '#4A4237' }}>The Urban Gang Tour — co-founded with Lucy Ogunde — lands in a different school every week with talent showcases, mentorship pods, a runway, and a national broadcast. Teachers report the silence afterwards is &ldquo;unsettling.&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
              <Link href="/tour" style={{ padding: '15px 28px', background: '#2E5E48', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Full dispatch →</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <figure style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="/hq-assets/eugine-01.webp" alt="On stage" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: '50% 12%', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
              <figcaption style={{ marginTop: 6, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>Exhibit A: the noise, live</figcaption>
            </figure>
            <figure style={{ margin: '36px 0 0' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="/hq-assets/eugine-13.webp" alt="With students" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
              <figcaption style={{ marginTop: 6, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>Exhibit B: accomplices</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* LETTERS */}
      <section style={{ borderBottom: '2px solid #191613', background: '#EFE6D2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 52 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Section G · Letters to the Editor</span>
            <span style={{ flex: 1, borderTop: '1px solid #191613', transform: 'translateY(-4px)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, border: '2px solid #191613', background: '#F6F0E2' }} className="max-[900px]:!grid-cols-1">
            {lettersData.map((lt) => (
              <figure key={lt.name} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 16, padding: '36px 32px', borderRight: '1px solid #191613' }}>
                <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 40, lineHeight: 0, color: '#C03B22', height: 16 }}>&ldquo;</span>
                <blockquote style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 19, lineHeight: 1.55 }}>{lt.text}</blockquote>
                <figcaption style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 15 }}>{lt.name}</span>
                  <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#6E6455' }}>{lt.role}</span>
                  <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 13.5, color: '#C03B22' }}>{lt.editorNote}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSIFIEDS PREVIEW */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '90px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Section H · The Classifieds</span>
            <span style={{ flex: 1, borderTop: '1px solid #191613', transform: 'translateY(-4px)' }} />
            <Link href="/shop" style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}>All listings →</Link>
          </div>
          <h2 style={{ margin: '0 0 52px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(40px,4.6vw,72px)', letterSpacing: '-.02em' }}>For sale: noise,<br />in wearable form.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid #191613' }} className="max-[900px]:!grid-cols-2 max-[560px]:!grid-cols-1">
            {homeProducts.map((pr) => {
              const isBook = pr.id === 'book';
              return (
                <Link key={pr.id} href={isBook ? '/book' : '/shop'} style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #191613', background: '#F6F0E2' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={isBook ? bookProduct.cover : (pr as typeof productsData[number]).img} alt={pr.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderBottom: '1px solid #191613' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '20px 20px 24px' }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 17 }}>{pr.name}</span>
                    <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14, color: '#6E6455', lineHeight: 1.45 }}>{isBook ? 'Pre-order the memoir. Signed copies, first run.' : (pr as typeof productsData[number]).ad}</span>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span style={{ fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 14 }}>{fmtKES(pr.price)}</span>
                      <span style={{ padding: '9px 16px', border: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase' }}>{isBook ? 'Pre-order' : 'View'}</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section style={{ borderBottom: '2px solid #191613', background: '#2E5E48', color: '#F6F0E2' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '100px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
          <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621', fontWeight: 600 }}>The Dispatch · Weekly-ish</p>
          <h2 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(42px,5vw,80px)', lineHeight: .98, letterSpacing: '-.02em' }}>Subscribe. My mother reads this list.</h2>
          <p style={{ margin: 0, maxWidth: 520, fontFamily: "'Newsreader'", fontSize: 17, lineHeight: 1.7, color: '#CFE0D6' }}>New episodes, tour stops, book news, and the occasional opinion nobody asked for. Unsubscribing is allowed but frowned upon (by Mum).</p>
          <NewsletterForm />
        </div>
      </section>

    </main>
  );
}
