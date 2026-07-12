import type { Metadata } from 'next';
import Link from 'next/link';
import { articlesData } from '@/content/em-site-data';

export const metadata: Metadata = {
  title: 'The Journal',
  description: 'Op-eds from a man with opinions to spare. Eugine Micah on the craft of live television, the climb from Lugari, the Urban Gang Tour, and everything unfiltered in between.',
  alternates: { canonical: '/journal' },
};

const categories = Array.from(new Set(articlesData.map((a) => a.cat)));

export default function JournalPage() {
  return (
    <main>
      {/* HEADER */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Journal · Opinions, Unsolicited</p>
          <h1 style={{ margin: '0 0 36px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(48px,6vw,100px)', lineHeight: .94, letterSpacing: '-.02em' }}>The op-ed desk.</h1>
          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', border: '2px solid #191613', width: 'fit-content' }}>
            {categories.map((cat) => (
              <span key={cat} style={{ padding: '11px 20px', background: '#F6F0E2', color: '#191613', borderRight: '1px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}>{cat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '64px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 0, border: '2px solid #191613' }} className="max-[700px]:!grid-cols-1">
            {articlesData.map((ar) => (
              <Link key={ar.slug} href={`/journal/${ar.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '38px 36px', textAlign: 'left', borderRight: '1px solid #191613', borderBottom: '1px solid #191613', background: '#F6F0E2', minHeight: 230 }}>
                <span style={{ display: 'flex', gap: 14, fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase' }}>
                  <span style={{ color: '#C03B22', fontWeight: 600 }}>{ar.cat}</span>
                  <span style={{ color: '#6E6455' }}>{ar.date} · {ar.read} min</span>
                </span>
                <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 27, lineHeight: 1.05 }}>{ar.title}</span>
                <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 16.5, lineHeight: 1.5, color: '#4A4237' }}>{ar.deck}</span>
                <span style={{ marginTop: 'auto', fontFamily: "'Spline Sans Mono'", fontSize: 11.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Read &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
