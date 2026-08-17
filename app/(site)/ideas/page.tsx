import type { Metadata } from 'next';
import Link from 'next/link';
import { chaptersData } from '@/content/em-site-data';
import { BuyBookForm } from '../../_components/BuyBookForm';

// "Ideas": the new brand IA's book landing page, replacing /book as the
// canonical nav destination (design_handoff_full_site_backend/site/
// Ideas.dc.html). /book itself is untouched and still works (see
// next.config.mjs for the redirect); its real Paystack checkout
// (BuyBookForm, /api/checkout, /api/paystack-webhook, /api/book-download)
// is reused here unmodified rather than dropped, since the design mockup
// only shows an Amazon CTA and doesn't know this site already has a working
// on-site purchase flow.
//
// Amazon link discrepancy, resolved rather than guessed at: Ideas.dc.html's
// verified copy points to https://www.amazon.com/dp/B0H954PD7T labelled
// "Paperback". The existing, previously-confirmed-live /book page instead
// links to https://www.amazon.com/dp/B0H8WM3HFX, noted in project history
// as "Kindle only, no paperback listed yet" as of 2026-07-15, and "confirm
// the paperback KDP listing goes live" was an open owner action item from
// that same session. The new handoff's paperback ASIN reads as that
// confirmation having happened since, not a conflicting/wrong link, so
// both are kept, labelled by format, rather than one silently overwriting
// the other.

const AMAZON_PAPERBACK_URL = 'https://www.amazon.com/dp/B0H954PD7T';
const AMAZON_KINDLE_URL = 'https://www.amazon.com/dp/B0H8WM3HFX';
const ISBN = '979-8-1870-0005-0';

export const metadata: Metadata = {
  title: 'Born Broke, Built Loud: Eugine Micah’s memoir',
  description: 'Born Broke, Built Loud: Eugine Micah’s memoir. Out now, independently published.',
  alternates: { canonical: '/ideas' },
  openGraph: {
    title: 'Born Broke, Built Loud: Eugine Micah',
    description: 'The true story of a boy who was smuggled into the world and had to talk his way through it.',
    images: ['/assets/brand-2026-08/book-cover-paperback.webp'],
    type: 'book',
  },
};

// force-dynamic -- see app/(site)/work/page.tsx's comment for why every
// rebrand page needs this on this deployment.
export const dynamic = 'force-dynamic';

const topics = ['Media', 'Technology', 'Youth culture', 'Business'];
const chapterShadows = ['var(--em-crimson)', 'var(--em-tan)', 'var(--em-crimson)'];

const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Born Broke, Built Loud',
  author: { '@type': 'Person', name: 'Eugine Micah' },
  description: 'The true story of a boy who was smuggled into the world and had to talk his way through it.',
  isbn: ISBN,
  publisher: { '@type': 'Organization', name: 'Roylandz Media' },
  genre: 'Memoir',
  url: AMAZON_PAPERBACK_URL,
};

export default function IdeasPage() {
  return (
    <main>
      {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />

      {/* HERO */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '70px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--f-work-sans)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--em-crimson)',
              marginBottom: 14,
            }}
          >
            First book &middot; Out now
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-archivo)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              color: 'var(--em-near-black)',
              margin: '0 0 18px',
            }}
          >
            Born Broke,
            <br />
            Built Loud.
          </h1>
          <p
            style={{
              fontFamily: 'var(--f-work-sans)',
              fontStyle: 'italic',
              fontSize: 17,
              lineHeight: 1.5,
              color: 'rgba(23,23,26,0.75)',
              margin: '0 0 20px',
              maxWidth: 440,
            }}
          >
            The true story of a boy who was smuggled into the world and had to talk his way through it.
          </p>
          <div
            style={{
              fontFamily: 'var(--f-work-sans)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(23,23,26,0.5)',
              marginBottom: 28,
            }}
          >
            Host of Urban News &middot; PPP TV
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
            <a
              href={AMAZON_PAPERBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--em-crimson)',
                color: 'var(--em-paper)',
                padding: '16px 28px',
                fontFamily: 'var(--f-work-sans)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Buy the paperback on Amazon &rarr;
            </a>
            <a
              href={AMAZON_KINDLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--f-work-sans)',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--em-near-black)',
                textDecoration: 'underline',
              }}
            >
              Get the Kindle edition &rarr;
            </a>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            justifySelf: 'center',
            width: '100%',
            maxWidth: 340,
            padding: '16px 16px 44px',
            background: 'var(--em-paper)',
            boxShadow: '0 20px 44px rgba(23,23,26,0.22)',
            transform: 'rotate(-3deg)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: '971/1500' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand-2026-08/book-cover-paperback.webp"
              alt="Born Broke, Built Loud book cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* EXCERPT */}
      <section style={{ background: 'var(--em-near-black)', color: 'var(--em-paper)', padding: '80px 32px', borderTop: '3px solid var(--em-near-black)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--f-archivo)',
              fontWeight: 900,
              fontSize: 'clamp(26px, 4vw, 38px)',
              lineHeight: 1.1,
              margin: '0 0 32px',
            }}
          >
            You do not know me.
            <br />
            Let me fix that.
          </h2>
          <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 17, lineHeight: 1.7, color: 'rgba(250,247,242,0.85)', margin: '0 0 22px' }}>
            Eugine Micah arrived owing money, born on Christmas Eve in a hospital named after a country that
            had already collapsed, to a teenage mother who survived those first days on sugar water. He was an
            accomplice to a family crime before he could speak.
          </p>
          <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 17, lineHeight: 1.7, color: 'rgba(250,247,242,0.85)', margin: '0 0 22px' }}>
            What follows is red dust and cow-dung floors. The mathematics of hunger. A white American grandfather
            who built him on purpose, in the dark, without applause. Two coffins, seven days apart. A billboard, a
            borrowed uniform, a library that did not judge his grammar, and the loud, improbable climb from a
            grass-thatched mud house in Lugari to a national television screen.
          </p>
          <p style={{ fontFamily: 'var(--f-work-sans)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.7, color: 'rgba(250,247,242,0.75)', margin: 0 }}>
            This is not the story of a man who made it. It is the report of a man still climbing, out of
            breath, pointing back down the slope, saying: can you believe a person starts there.
          </p>
        </div>
      </section>

      {/* AUTHOR BLURB */}
      <section
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '56px 32px',
          display: 'flex',
          gap: 20,
          alignItems: 'flex-start',
          borderBottom: '3px solid var(--em-near-black)',
        }}
      >
        <div style={{ flex: 'none', width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brand-2026-08/1 (15).webp"
            alt="Eugine Micah"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, lineHeight: 1.65, color: 'rgba(23,23,26,0.75)', margin: 0, maxWidth: 600 }}>
          <strong style={{ color: 'var(--em-near-black)' }}>Eugine Micah</strong> hosts Urban News on PPP TV, live to
          more than two million Kenyans every week. Valedictorian, TIBS class of &rsquo;24. Founder of Roylandz Media
          and co-founder of the Urban Gang Tour. This is his first book.
        </p>
      </section>

      {/* FACTS ROW */}
      <section
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: 32,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px 28px',
          fontFamily: 'var(--f-work-sans)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'rgba(23,23,26,0.5)',
        }}
      >
        <span>Memoir</span>
        <span>Roylandz Media &middot; euginemicah.tech</span>
        <span>Independently published</span>
        <span>ISBN {ISBN}</span>
      </section>

      {/* CHAPTER BY CHAPTER: real content already live on /book, carried
          forward here since /ideas is now the canonical book page. */}
      <section style={{ background: 'var(--em-near-black)', padding: '90px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--f-work-sans)', fontStyle: 'italic', fontSize: 24, color: 'var(--em-tan)' }}>
              seven parts, one climb
            </div>
            <h2
              style={{
                fontFamily: 'var(--f-archivo)',
                fontWeight: 800,
                fontSize: 'clamp(30px, 4vw, 46px)',
                letterSpacing: '-1.5px',
                color: 'var(--em-paper)',
                margin: '8px 0 0',
              }}
            >
              Chapter by chapter.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {chaptersData.map((ch, i) => {
              const accent = chapterShadows[i % chapterShadows.length];
              return (
                <div
                  key={ch.tag}
                  style={{ border: '2.5px solid rgba(250,247,242,0.3)', borderRadius: 16, padding: 26, color: 'var(--em-paper)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 12 }}>
                    <span style={{ fontFamily: 'var(--f-work-sans)', fontWeight: 800, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
                      {ch.tag}
                    </span>
                    <span style={{ fontFamily: 'var(--f-work-sans)', fontStyle: 'italic', fontSize: 14, opacity: 0.6 }}>{ch.year}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 22, lineHeight: 1.15, margin: '0 0 10px' }}>{ch.title}</h3>
                  <p style={{ fontFamily: 'var(--f-work-sans)', margin: '0 0 14px', fontSize: 15, lineHeight: 1.6, opacity: 0.85 }}>{ch.copy}</p>
                  <p
                    style={{
                      fontFamily: 'var(--f-work-sans)',
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.5,
                      opacity: 0.7,
                      borderLeft: `2px solid ${accent}`,
                      paddingLeft: 12,
                    }}
                  >
                    {ch.aside}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUY: real, working instant-download checkout, unchanged */}
      <section id="buy" style={{ padding: '90px 32px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'var(--f-work-sans)', fontStyle: 'italic', fontSize: 22, color: 'var(--em-crimson)' }}>get the book</div>
            <h2 style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', margin: '8px 0 0' }}>
              Read it tonight.
            </h2>
            <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, lineHeight: 1.6, opacity: 0.75, margin: '14px 0 0' }}>
              Instant PDF download after payment via Paystack (card or M-Pesa), or buy the paperback or Kindle
              edition on Amazon above.
            </p>
          </div>
          <BuyBookForm />
        </div>
      </section>

      {/* MORE WRITING */}
      <section style={{ background: 'var(--em-tan)', padding: '70px 32px', borderTop: '3px solid var(--em-near-black)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 24, color: 'var(--em-near-black)', marginBottom: 16 }}>
            More writing
          </div>
          <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 16, lineHeight: 1.65, color: 'rgba(23,23,26,0.7)', maxWidth: 600, margin: '0 0 28px' }}>
            Commentary and essays on media, technology and youth culture in Kenya. Selected writing: coming
            soon.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {topics.map((t) => (
              <span
                key={t}
                style={{
                  border: '2px solid var(--em-near-black)',
                  padding: '9px 16px',
                  fontFamily: 'var(--f-work-sans)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--em-near-black)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '70px 32px' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 44px)', letterSpacing: '-1px' }}>
          Next:{' '}
          <Link href="/work-with-eugine" style={{ color: 'var(--em-crimson)' }}>
            work with Eugine &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
