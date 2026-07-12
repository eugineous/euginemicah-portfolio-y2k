import type { Metadata } from 'next';
import Link from 'next/link';
import { workDetailData } from '@/content/em-site-data';

export const metadata: Metadata = {
  title: 'The Work',
  description: 'Four chairs, one mouth: Urban News on PPP TV, Campus Xposure, the Nairobi Podcast, and the Urban Gang Tour.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Work · Programming Guide</p>
          <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(48px,6vw,100px)', lineHeight: .94, letterSpacing: '-.02em' }}>Now showing,<br />whether you like it or not.</h1>
        </div>
      </section>

      {/* WORK DETAIL */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px', display: 'flex', flexDirection: 'column', gap: 44 }}>
          {workDetailData.map((wd) => (
            <div key={wd.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.85fr) minmax(0,1.15fr)', gap: 0, border: '2px solid #191613' }} className="max-[900px]:!grid-cols-1">
              <figure style={{ margin: 0, position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={wd.img} alt={wd.name} style={{ width: '100%', height: '100%', minHeight: 340, objectFit: 'cover', borderRight: '1px solid #191613', filter: 'grayscale(.85) sepia(.18) contrast(1.06)' }} className="max-[900px]:!border-r-0" />
                <span style={{ position: 'absolute', left: 0, bottom: 24, display: 'flex' }}>
                  <span style={{ background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', padding: '8px 12px' }}>{wd.badge}</span>
                  <span style={{ background: '#191613', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.08em', padding: '8px 14px' }}>{wd.chyron}</span>
                </span>
              </figure>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, padding: '48px 44px', background: '#F6F0E2' }}>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11.5, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>{wd.tag}</span>
                <h2 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(30px,3.4vw,50px)', lineHeight: .98 }}>{wd.name}</h2>
                <p style={{ margin: 0, maxWidth: 560, fontFamily: "'Newsreader'", fontSize: 17, lineHeight: 1.72, color: '#33302A' }}>{wd.copy}</p>
                <p style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 15.5, color: '#C03B22' }}>{wd.aside}</p>
                <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6E6455' }}>{wd.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AS SEEN ON */}
      <section style={{ borderBottom: '2px solid #191613', background: '#EFE6D2' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <p style={{ margin: 0, fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#6E6455' }}>As seen on · heard on · built with</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hq-assets/logo-ppptv.png" alt="PPP TV" style={{ height: 40, background: '#F6F0E2', border: '2px solid #191613', padding: '8px 16px' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hq-assets/ugt-logo.png" alt="Urban Gang Tour" style={{ height: 48, background: '#F6F0E2', border: '2px solid #191613', padding: '8px 16px' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hq-assets/logo-synapse.png" alt="Synapse Models" style={{ height: 36, background: '#F6F0E2', border: '2px solid #191613', padding: '8px 16px' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hq-assets/logo-xphub.png" alt="XP Hub" style={{ height: 36, background: '#F6F0E2', border: '2px solid #191613', padding: '8px 16px' }} />
          </div>
          <Link href="/book-me" style={{ padding: '15px 30px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}>Commission the voice →</Link>
        </div>
      </section>
    </main>
  );
}
