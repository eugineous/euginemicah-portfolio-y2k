import type { Metadata } from 'next';
import Link from 'next/link';
import { tourStopsData, tourGalleryData } from '@/content/em-site-data';

export const metadata: Metadata = {
  title: 'The Tour',
  description: 'The Urban Gang Tour — Kenya’s youth talent search, mentorship and awards concert tour, co-founded with Lucy Ogunde. A school a week: showcases, mentorship pods, a runway, and a national broadcast.',
  alternates: { canonical: '/tour' },
};

function statusColor(status: string) {
  if (status === 'Upcoming') return '#2E5E48';
  if (status === 'Tickets') return '#D9A621';
  return '#6E6455';
}

export default function TourPage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ borderBottom: '2px solid #191613', background: '#2E5E48', color: '#F6F0E2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '80px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 52, alignItems: 'center' }} className="max-[900px]:!grid-cols-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621', fontWeight: 600 }}>Field Reports · The Urban Gang Tour</p>
            <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(46px,5.8vw,96px)', lineHeight: .94, letterSpacing: '-.02em' }}>A school a week. A country at a time.</h1>
            <p style={{ margin: 0, maxWidth: 580, fontFamily: "'Newsreader'", fontSize: 18, lineHeight: 1.75, color: '#CFE0D6' }}>Kenya&rsquo;s youth talent search, mentorship, and awards concert tour &mdash; co-founded with Lucy Ogunde. Talent showcases, mentorship pods, a modelling runway, and a national Urban News broadcast from the school field. From potential to purpose, with a sound system.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="https://urbangangtour.co.ke" target="_blank" rel="noopener noreferrer" style={{ padding: '15px 26px', background: '#D9A621', color: '#191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', display: 'inline-block' }}>urbangangtour.co.ke &rarr;</a>
              <Link href="/contact" style={{ padding: '15px 26px', border: '2px solid #F6F0E2', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Summon the tour</Link>
            </div>
          </div>
          <figure style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" src="/hq-assets/eugine-02.webp" alt="On the tour stage" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
            <figcaption style={{ marginTop: 8, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9DBBAC' }}>Correspondent, on location, mid-noise</figcaption>
          </figure>
        </div>
      </section>

      {/* ITINERARY */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '80px 28px' }}>
          <h2 style={{ margin: '0 0 40px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(34px,4vw,60px)', letterSpacing: '-.02em' }}>The itinerary.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid #191613' }}>
            {tourStopsData.map((tp) => (
              <div key={`${tp.name}-${tp.month}-${tp.day}`} style={{ display: 'grid', gridTemplateColumns: '130px minmax(0,1fr) auto auto', alignItems: 'center', gap: 26, padding: '20px 26px', borderBottom: '1px solid #191613', background: '#F6F0E2' }} className="max-[700px]:!grid-cols-1 max-[700px]:!gap-2">
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 30 }}>{tp.day}</span>
                  <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{tp.month}</span>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 20 }}>{tp.name}</span>
                  <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14.5, color: '#6E6455' }}>{tp.kind}</span>
                </span>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#2E5E48', fontWeight: 600 }}>{tp.place}</span>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', border: `2px solid ${statusColor(tp.status)}`, color: statusColor(tp.status), padding: '7px 13px', width: 'fit-content' }}>{tp.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '80px 28px' }}>
          <h2 style={{ margin: '0 0 40px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(34px,4vw,60px)', letterSpacing: '-.02em' }}>Evidence, photographic.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="max-[900px]:!grid-cols-2 max-[560px]:!grid-cols-1">
            {tourGalleryData.map((tg) => (
              <figure key={tg.src} style={{ margin: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={tg.src} alt={tg.cap} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
                <figcaption style={{ marginTop: 6, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>{tg.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
