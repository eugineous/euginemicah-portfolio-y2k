import type { Metadata } from 'next';
import { galleryData } from '@/content/em-site-data';

export const metadata: Metadata = {
  title: 'The Darkroom',
  description: 'Contact sheets — on set, on tour, on camera. A running photo record of Eugine Micah.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Darkroom · Contact Sheets</p>
          <h1 style={{ margin: '0 0 10px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(48px,6vw,100px)', lineHeight: .94, letterSpacing: '-.02em' }}>Every frame tells on him.</h1>
          <p style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 18, color: '#6E6455' }}>A running contact sheet — on set, on tour, on camera.</p>
        </div>
      </section>

      {/* GRID */}
      <section>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '56px 28px 90px' }}>
          <div style={{ columnCount: 3, columnGap: 22 }} className="max-[900px]:[column-count:2] max-[560px]:[column-count:1]">
            {galleryData.map((gi, i) => (
              <figure key={gi.src} style={{ margin: '0 0 22px', breakInside: 'avoid' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={gi.src} alt={gi.cap} style={{ width: '100%', display: 'block', border: '2px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} />
                <figcaption style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 6, fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>
                  <span>{gi.cap}</span>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
