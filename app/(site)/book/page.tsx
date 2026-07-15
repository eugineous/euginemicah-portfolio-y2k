import type { Metadata } from 'next';
import Link from 'next/link';
import { chaptersData, bookProduct, fmtKES } from '@/content/em-site-data';
import { BuyBookForm } from '../../_components/BuyBookForm';

// Re-skin of the real, working /book checkout page — structure/layout ported
// from the DCLogic mockup at "Celebrity website project/Book.dc.html" (hero,
// chapter/parts teaser, buy section) and Checkout.dc.html's step-1 "your
// details" visual (order-summary card next to a name/email form) — copy tone
// and layout only, none of that file's code is portable. The real flow is
// unchanged: BuyBookForm posts name+email to POST /api/checkout and the
// browser is redirected to Paystack's own hosted page (handles card + M-Pesa
// for Kenya) — no second in-app payment-method screen is built here, and no
// address/card-number/expiry/CVC fields exist on this page (PCI: never build
// our own card form). Cover art is the real KDP front-cover file (Amazon
// listing "Born Broke, Built Loud: A Memoir" uses a comma; this page keeps
// the site's existing period punctuation, "Born Broke. Built Loud.", for
// consistency with press/shows/about copy already shipped).

const AMAZON_KINDLE_URL = 'https://www.amazon.com/dp/B0H8WM3HFX';

export const metadata: Metadata = {
  title: 'Born Broke. Built Loud. — Buy the Memoir',
  description:
    'Born Broke. Built Loud., Eugine Micah’s memoir — seven parts, forty-five chapters, from a kerosene-lit childhood in Lugari to the Urban News desk. Instant PDF download after payment, or get the Kindle edition on Amazon.',
  alternates: { canonical: '/book' },
};

const railStops: [string, string, 'a' | 'b' | 'c'][] = [
  ['#inside', 'CONTENTS', 'a'],
  ['#photos', 'PHOTOS', 'b'],
  ['#buy', 'BUY', 'c'],
];

const railBg: Record<'a' | 'b' | 'c', string> = { a: 'var(--a)', b: 'var(--b)', c: 'var(--c)' };
const railColor: Record<'a' | 'b' | 'c', string> = { a: '#FAF4EA', b: '#FAF4EA', c: '#1B1714' };
const chapterShadows = ['var(--a)', 'var(--b)', 'var(--c)'];

// Real photos already verified elsewhere on the site (about/press/roylandz
// pages) — reused here as the memoir's "photo plates," not new/unverified
// images. Captions echo the DCLogic mockup's tone for this section without
// forcing a 1:1 tie to a specific numbered chapter (some of these — e.g. the
// Zarembka photo — sit alongside chapters they're not literally captioned
// under, so they're presented as standalone plates instead, same as the
// mockup did).
const photoPlates: { src: string; alt: string; caption: string; shadow: string }[] = [
  { src: '/assets/about/baby-zarembka.webp', alt: 'Eugine Micah as a boy with his grandfather David Zarembka', caption: 'the beginning', shadow: 'var(--a)' },
  { src: '/assets/press/citizen-studio.webp', alt: 'Eugine Micah in the Citizen TV newsroom', caption: 'baptism by broadcast', shadow: 'var(--b)' },
  { src: '/assets/about/grad-mum.webp', alt: 'Eugine Micah with his mother at his TIBS graduation', caption: 'the valedictorian', shadow: 'var(--c)' },
  { src: '/assets/roylandz/ugt-stage.webp', alt: 'Eugine Micah on stage at the Urban Gang Tour', caption: 'the road show', shadow: 'var(--a)' },
];

export default function BookPage() {
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
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 28px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'center' }}>
          <div style={{ justifySelf: 'center' }}>
            <div
              className="emx-portrait-frame"
              style={{ position: 'relative', width: 'min(300px, 78vw)', background: '#1B1714', border: '3px solid #1B1714', borderRadius: '6px 16px 16px 6px', boxShadow: '10px 10px 0 var(--a)', transform: 'rotate(-3deg)', overflow: 'hidden' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/book/front-cover-kdp.webp"
                alt="Born Broke. Built Loud. book cover — Eugine Micah"
                style={{ display: 'block', width: '100%', aspectRatio: '900/1400', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/book/barcode-isbn.png" alt="ISBN barcode 979-8-1870-0005-0" style={{ height: 26 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.55, textTransform: 'uppercase' }}>
                Memoir &middot; Roylandz Media
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--a)' }}>
              a memoir &middot; out now
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '-2.5px', lineHeight: 0.98, margin: '10px 0 20px' }}>
              Born Broke. Built Loud.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 560, fontWeight: 500, margin: '0 0 16px' }}>{bookProduct.subtitle}.</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 560, fontWeight: 500, opacity: 0.85, margin: '0 0 22px' }}>
              Seven parts. Forty-five chapters. One boy carried from Kisumu to Lugari to a national newsroom by a mouth
              his teachers called a problem and his bank account now calls a strategy. It is funny because it is true,
              and it is true because he kept the receipts.
            </p>
            <div style={{ borderLeft: '3px solid var(--b)', paddingLeft: 20, margin: '0 0 30px' }}>
              <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 21, lineHeight: 1.5, margin: 0 }}>
                &ldquo;We were not poor quietly. Even our poverty had a sound system.&rdquo;
              </p>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, margin: '10px 0 0' }}>
                &mdash; Part One &middot; The Kerosene Years
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: 26 }}>{fmtKES(bookProduct.price)}</span>
              <Link
                href="#buy"
                className="emx-cta"
                style={{ display: 'inline-block', fontWeight: 700, background: 'var(--a)', color: '#FAF4EA', border: '3px solid var(--text)', borderRadius: 14, padding: '13px 24px', boxShadow: '4px 4px 0 var(--text)' }}
              >
                Buy now &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER BY CHAPTER */}
      <section id="inside" style={{ background: '#1B1714', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--c)' }}>
              seven parts, one climb
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-1.5px', color: '#FAF4EA', margin: '8px 0 0' }}>
              Chapter by chapter.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {chaptersData.map((ch, i) => {
              const accent = chapterShadows[i % chapterShadows.length];
              return (
                <div
                  key={ch.tag}
                  className="emx-lane"
                  style={{ ['--sh' as string]: accent, border: '2.5px solid rgba(250,244,234,0.3)', borderRadius: 16, padding: 26, color: '#FAF4EA' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 12 }}>
                    <span style={{ fontWeight: 800, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>{ch.tag}</span>
                    <span style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 14, opacity: 0.6 }}>{ch.year}</span>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.15, margin: '0 0 10px' }}>{ch.title}</h3>
                  <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.6, opacity: 0.85 }}>{ch.copy}</p>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, opacity: 0.7, borderLeft: `2px solid ${accent}`, paddingLeft: 12 }}>{ch.aside}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHOTO PLATES */}
      <section id="photos" style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--a)' }}>
            the photo plates
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-1.5px', margin: '8px 0 0' }}>
            A few images from the memoir
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 22 }}>
          {photoPlates.map((p) => (
            <div key={p.src} className="emx-gallery-card" style={{ ['--sh' as string]: p.shadow, background: '#fff', border: '3px solid #1B1714', borderRadius: 14, padding: '10px 10px 16px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={p.src} alt={p.alt} style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 6, border: '2px solid #1B1714' }} />
              <div style={{ textAlign: 'center', fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 17, color: '#1B1714', marginTop: 10 }}>
                {p.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BUY */}
      <section id="buy" style={{ padding: '90px 28px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--a)' }}>
              buy &middot; {fmtKES(bookProduct.price)}
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-1.5px', margin: '8px 0 0' }}>
              Read it tonight.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
            {/* ORDER SUMMARY */}
            <div style={{ background: 'var(--bg)', border: '3px solid var(--text)', borderRadius: 18, padding: 26, boxShadow: '6px 6px 0 var(--a)' }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/book/front-cover-kdp.webp"
                  alt="Born Broke. Built Loud. book cover"
                  style={{ width: 84, aspectRatio: '900/1400', objectFit: 'cover', borderRadius: 6, border: '2px solid var(--text)', flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 19, lineHeight: 1.15 }}>Born Broke. Built Loud.</div>
                  <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 15, opacity: 0.7, marginTop: 4 }}>
                    by Eugine Micah
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.6, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Memoir &middot; Digital download
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15, fontWeight: 600, borderTop: '2px solid var(--text)', opacity: 0.9, paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.65 }}>Book (PDF)</span>
                  <span>{fmtKES(bookProduct.price)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.65 }}>Delivery</span>
                  <span>Instant download</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18, borderTop: '2px solid var(--text)', paddingTop: 10, marginTop: 4 }}>
                  <span>Total</span>
                  <span>{fmtKES(bookProduct.price)}</span>
                </div>
              </div>
            </div>

            {/* FORM + AMAZON FALLBACK */}
            <div>
              <p style={{ margin: '0 0 22px', fontSize: 16, lineHeight: 1.65, fontWeight: 500, opacity: 0.8 }}>
                Instant PDF download after payment &mdash; the link lands on the next screen and stays valid for 48
                hours. Secure payment via Paystack (card or M-Pesa).
              </p>
              <BuyBookForm />
              <div style={{ marginTop: 26, paddingTop: 22, borderTop: '2px dashed var(--text)', opacity: 0.95 }}>
                <p style={{ fontSize: 13, fontWeight: 600, opacity: 0.65, margin: '0 0 12px', lineHeight: 1.5 }}>
                  Prefer Kindle, or already have an Amazon account? The download above is cheaper and instant — but
                  the Kindle edition is also live.
                </p>
                <a
                  href={AMAZON_KINDLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="emx-cta"
                  style={{ display: 'inline-block', fontWeight: 700, fontSize: 14, background: 'var(--bg)', color: 'var(--text)', border: '2.5px solid var(--text)', borderRadius: 14, padding: '11px 20px' }}
                >
                  Get the Kindle edition on Amazon &#8599;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT TRANSITION */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 28px' }}>
        <div style={{ fontWeight: 800, fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-2px' }}>
          Next: <Link href="/work" className="emx-link" style={{ color: 'var(--a)' }}>work with me &rarr;</Link>
        </div>
      </section>
    </main>
  );
}
