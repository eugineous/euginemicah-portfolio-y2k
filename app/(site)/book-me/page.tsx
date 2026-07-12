import type { Metadata } from 'next';
import { bookingTypesData, faqsData } from '@/content/em-site-data';
import { BookingForm } from '../../_components/BookingForm';

export const metadata: Metadata = {
  title: 'Book Me — Speaking & Hosting',
  description: 'Keynotes, MC & hosting, TV appearances, and workshops with Eugine Micah — English and Swahili, often in the same sentence. File a booking inquiry and hear back within 48 hours.',
  alternates: { canonical: '/book-me' },
};

export default function BookMePage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 52, alignItems: 'center' }} className="max-[900px]:!grid-cols-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Bookings · Situations Vacant (Yours)</p>
            <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(48px,6vw,100px)', lineHeight: .94, letterSpacing: '-.02em' }}>Rent the voice. Keep the echoes.</h1>
            <p style={{ margin: 0, maxWidth: 560, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 20, lineHeight: 1.5, color: '#4A4237' }}>Keynotes, MC &amp; hosting, TV appearances, workshops. English and Swahili &mdash; often in the same sentence, occasionally in the same word.</p>
          </div>
          <figure style={{ margin: 0, position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src="/hq-assets/celeb-01.webp" alt="Eugine with a mic, at night" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
            <span style={{ position: 'absolute', left: 0, bottom: 26, display: 'flex' }}>
              <span style={{ background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', padding: '8px 12px' }}>Live</span>
              <span style={{ background: '#191613', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.08em', padding: '8px 14px' }}>ZERO DEAD AIR SINCE 2022</span>
            </span>
          </figure>
        </div>
      </section>

      {/* BOOKING TYPES */}
      <section style={{ borderBottom: '2px solid #191613', background: '#EFE6D2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }} className="max-[900px]:!grid-cols-2 max-[560px]:!grid-cols-1">
          {bookingTypesData.map((bt) => (
            <div key={bt.no} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '34px 30px', border: '2px solid #191613', borderRightWidth: 0, background: '#F6F0E2', minHeight: 260 }}>
              <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{bt.no}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 24 }}>{bt.title}</span>
              <span style={{ fontFamily: "'Newsreader'", fontSize: 15.5, lineHeight: 1.65, color: '#33302A' }}>{bt.copy}</span>
              <span style={{ marginTop: 'auto', fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6E6455' }}>{bt.langs}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + FAQ */}
      <section>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '80px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 56, alignItems: 'start' }} className="max-[900px]:!grid-cols-1">
          <div style={{ border: '2px solid #191613', padding: 44, background: '#F6F0E2' }}>
            <h2 style={{ margin: '0 0 8px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(26px,2.8vw,40px)' }}>File an inquiry.</h2>
            <p style={{ margin: '0 0 30px', fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 15.5, color: '#6E6455' }}>
              Replies within 48 hours. Urgent? <a href="mailto:eugine.micah@outlook.com" style={{ color: '#C03B22', fontWeight: 500 }}>eugine.micah@outlook.com</a> &mdash; mark it URGENT and mean it.
            </p>
            <BookingForm />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 24px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(26px,2.8vw,40px)' }}>Fair questions.</h2>
            {faqsData.map((fq) => (
              <details key={fq.q} style={{ borderBottom: '1px solid #191613' }}>
                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '19px 4px', fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 17.5, cursor: 'pointer' }}>
                  {fq.q}
                </summary>
                <p style={{ margin: 0, padding: '0 4px 22px', fontFamily: "'Newsreader'", fontSize: 16.5, lineHeight: 1.7, color: '#33302A' }}>{fq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
