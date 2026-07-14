import type { Metadata } from 'next';
import Link from 'next/link';

// Roylandz Media — structure/layout ported from the DCLogic mockup at
// "Celebrity website project/Roylandz.dc.html". The "cow dung floor"
// origin metaphor and Thika-founding claim are confirmed real per the
// phase brief and kept as-is. The mockup's "Selected work" grid included
// a case study naming L'Oréal/Tecno/Infinix as clients — that could not
// be corroborated by web search (unlike the other three, see the phase
// report), so it's been dropped rather than published as an invented
// client credit; "Brand Campaigns" survives only as a generic service
// line, per the phase brief's guidance on Work.dc.html's booking
// categories being safe as generic offerings.

export const metadata: Metadata = {
  title: 'Roylandz Media',
  description:
    'Roylandz Media, founded by Eugine Micah: content strategy, social media management and production for brands that want to earn attention, not rent it.',
  alternates: { canonical: '/roylandz' },
};

const stats: [string, string][] = [
  ['3', 'Core disciplines, one studio'],
  ['40+', 'Schools reached, Urban Gang Tour'],
  ['1', 'Co-founded live tour: Urban Gang Tour'],
  ['Thika → Nairobi', 'Founded, based today'],
];

const principles: { title: string; desc: string; shadow: string }[] = [
  { title: 'Fewer, sharper posts', desc: "We'll tell a client to post less if that's what respects the audience. Noise is not a strategy.", shadow: 'var(--a)' },
  { title: 'Strategy and production, one roof', desc: 'A great script shot badly is still a bad video. We think and make under the same team.', shadow: 'var(--b)' },
  { title: 'Trust over the brief', desc: 'We turn down work that requires dishonesty. Youth audiences can tell the difference instantly.', shadow: 'var(--c)' },
];

const services: { tag: string; name: string; desc: string; items: string[] }[] = [
  { tag: 'STRATEGY', name: 'Content Strategy', desc: 'Digital-first content plans built for a short, vertical, video-first audience, grounded in who is actually on the other end.', items: ['Audience & platform strategy', 'Editorial calendars & campaign arcs', 'Brand voice & positioning'] },
  { tag: 'CHANNELS', name: 'Social Media Management', desc: 'Full-stack channel management that drives real results, not vanity metrics, across the platforms your audience actually uses.', items: ['Day-to-day channel management', 'Community & creator partnerships', 'Brand campaigns & endorsements'] },
  { tag: 'MAKING', name: 'Production', desc: 'Studio and field production for shows, campaigns and branded series, from concept to final cut.', items: ['Studio & location shoots', 'Branded series & documentary', 'Edit, sound & motion'] },
];

const caseStudies: { title: string; type: string; img: string; desc: string; result: string; tagBg: string; tagColor: string; shadow: string }[] = [
  { title: 'Urban Gang Tour', type: 'Live Events · Co-founded', img: '/assets/roylandz/ugt-stage.webp', desc: 'Co-founded a live culture and talent-search tour used to pressure-test content in front of real Nairobi crowds before it ever reaches a feed.', result: 'A live-tested content standard, carried into client work.', tagBg: 'var(--a)', tagColor: '#FAF4EA', shadow: 'var(--a)' },
  { title: "PPP TV's automated news-to-social pipeline", type: 'Product & Automation', img: '/assets/roylandz/urban-news-set-2.jpeg', desc: 'Built the tooling that turns a broadcast story into a formatted social post automatically, closing the gap between airtime and the feed.', result: 'Less manual repackaging, more consistent posting.', tagBg: 'var(--b)', tagColor: '#FAF4EA', shadow: 'var(--c)' },
  { title: 'Campus Xposure production', type: 'Branded Series', img: '/assets/roylandz/campus-rave.webp', desc: 'Field production for a touring series spotlighting student life and talent across Kenyan university campuses.', result: 'An ongoing, multi-city branded series.', tagBg: '#1B1714', tagColor: '#FAF4EA', shadow: 'var(--a)' },
];

const process: { num: string; title: string; desc: string }[] = [
  { num: '01', title: 'Listen first', desc: 'Tell us the brand, the goal, the audience. We ask more questions than we answer at this stage.' },
  { num: '02', title: 'Strategy', desc: 'A point of view before a posting plan. We shape the idea before we shape the content calendar.' },
  { num: '03', title: 'Production', desc: 'Studio or field, shot and edited in-house, so nothing gets lost in a handoff between teams.' },
  { num: '04', title: 'Live-test & ship', desc: 'Where it fits, we test with a real audience first. Then it ships, and we report on what actually happened.' },
];

const socials: [string, string][] = [
  ['Instagram', 'https://www.instagram.com/eugine.micah/'],
  ['TikTok', 'https://www.tiktok.com/@eugine.micah'],
  ['X / Twitter', 'https://x.com/eugineroylandz'],
  ['YouTube', 'https://www.youtube.com/channel/UC3ED9wyUawELS4tQx99u48Q'],
  ['LinkedIn', 'https://ke.linkedin.com/in/euginemicah'],
  ['Facebook', 'https://www.facebook.com/61577896555140/'],
];

const railStops: [string, string, 'a' | 'b' | 'c'][] = [
  ['#philosophy', 'PHILOSOPHY', 'a'],
  ['#services', 'SERVICES', 'b'],
  ['#work', 'WORK', 'c'],
  ['#process', 'PROCESS', 'a'],
];

const railBg: Record<'a' | 'b' | 'c', string> = { a: 'var(--a)', b: 'var(--b)', c: 'var(--c)' };
const railColor: Record<'a' | 'b' | 'c', string> = { a: '#FAF4EA', b: '#FAF4EA', c: '#1B1714' };

export default function RoylandzPage() {
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
      <header style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '80px 28px 60px' }}>
        <div
          aria-hidden
          className="emx-float hidden sm:block"
          style={{ position: 'absolute', top: 50, right: '5%', width: 46, height: 46, borderRadius: '50%', background: 'var(--c)', border: '3px solid var(--text)' }}
        />
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B1714', color: '#FAF4EA', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 22 }}>
            FOUNDED IN THIKA · NAIROBI TODAY
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(48px, 7vw, 96px)', letterSpacing: '-3px', lineHeight: 0.95, margin: '0 0 22px' }}>
            Roylandz<br /><span style={{ color: 'var(--a)' }}>Media</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, maxWidth: 620, fontWeight: 500, margin: '0 0 30px' }}>
            A content strategy, social and production studio built on one belief: nothing is waste in the hands of
            someone resourceful enough to use it. We treat a brand&rsquo;s story the way our founder once treated
            cow dung on a Friday morning &mdash; as raw material for something worth building.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/messages" className="emx-cta" style={{ display: 'inline-block', fontWeight: 700, background: 'var(--a)', color: '#FAF4EA', border: '3px solid var(--text)', borderRadius: 14, padding: '14px 26px', boxShadow: '4px 4px 0 var(--text)' }}>
              Start a project
            </Link>
            <Link href="#work" className="emx-cta" style={{ display: 'inline-block', fontWeight: 700, background: 'var(--bg)', color: 'var(--text)', border: '3px solid var(--text)', borderRadius: 14, padding: '14px 26px', boxShadow: '4px 4px 0 var(--text)' }}>
              See the work
            </Link>
          </div>
        </div>
      </header>

      {/* STAT STRIP */}
      <section style={{ background: '#1B1714', padding: '50px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
          {stats.map(([num, label]) => (
            <div key={label} className="emx-stat" style={{ color: '#FAF4EA', border: '2.5px solid rgba(250,244,234,0.3)', borderRadius: 16, padding: 22, textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: '-1px', color: 'var(--c)' }}>{num}</div>
              <div style={{ fontWeight: 600, fontSize: 13, opacity: 0.85, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 26, color: 'var(--b)' }}>the origin</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-1.5px', lineHeight: 1.05, margin: '8px 0 20px' }}>
            Named in Thika, built on a floor of dung and patience
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 500, margin: '0 0 18px' }}>
            Long before Roylandz had an office, it had a name and a young broadcaster with a borrowed studio in
            Thika. The philosophy underneath it goes back further than that, to a Friday ritual in a mud-walled
            classroom in Manyonyi, where a village learned to turn cow dung into a floor because cement was never
            coming.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 500, margin: 0 }}>
            That is the whole strategy in one line: the world had decided that material was worthless, and someone
            resourceful decided otherwise. Every brand that works with Roylandz gets that same eye turned on their
            story, their archive, their &ldquo;boring&rdquo; internal data, their overlooked audience &mdash;
            looking for the floor everyone else stepped over.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {principles.map((p) => (
            <div key={p.title} className="emx-lane" style={{ ['--sh' as string]: p.shadow, background: 'var(--bg)', border: '3px solid var(--text)', borderRadius: 16, padding: 22 }}>
              <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, fontWeight: 500, opacity: 0.85 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: '#1B1714', padding: '90px 28px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden className="emx-float" style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'var(--a)', opacity: 0.25 }} />
        <div aria-hidden className="emx-float2" style={{ position: 'absolute', bottom: -40, left: '8%', width: 120, height: 120, borderRadius: '50%', background: 'var(--b)', opacity: 0.25 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--c)' }}>what we do</div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-1.5px', color: '#FAF4EA', margin: '8px 0 0' }}>Three disciplines, one studio</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {services.map((svc) => (
              <div key={svc.name} style={{ border: '2.5px solid rgba(250,244,234,0.35)', borderRadius: 18, padding: 28, color: '#FAF4EA', background: 'rgba(250,244,234,0.04)' }}>
                <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: 1.5, color: 'var(--c)', marginBottom: 10 }}>{svc.tag}</div>
                <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>{svc.name}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.65, color: 'rgba(250,244,234,0.8)', fontWeight: 500, marginBottom: 16 }}>{svc.desc}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {svc.items.map((it) => (
                    <div key={it} style={{ display: 'flex', gap: 10, fontSize: 13.5, fontWeight: 600 }}>
                      <span style={{ color: 'var(--c)' }}>→</span>
                      {it}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 28px' }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 26, color: 'var(--a)' }}>selected work</div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-1.5px', lineHeight: 1, margin: '8px 0 0' }}>A few things we&rsquo;ve built</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          {caseStudies.map((cs) => (
            <div
              key={cs.title}
              className="emx-lane"
              style={{ ['--sh' as string]: cs.shadow, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, background: '#fff', border: '3px solid #1B1714', borderRadius: 20, overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', minHeight: 240 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={cs.img} alt={cs.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                <span style={{ position: 'absolute', top: 16, left: 16, fontWeight: 800, fontSize: 12, background: cs.tagBg, color: cs.tagColor, border: '2px solid #1B1714', borderRadius: 999, padding: '5px 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {cs.type}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 30, justifyContent: 'center', color: '#1B1714' }}>
                <h3 style={{ fontWeight: 800, fontSize: 'clamp(22px, 2.6vw, 28px)', letterSpacing: '-0.5px', margin: 0 }}>{cs.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 500, opacity: 0.85 }}>{cs.desc}</p>
                <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--a)', letterSpacing: '0.3px', marginTop: 4 }}>{cs.result}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, opacity: 0.5, margin: '22px 0 0' }}>
          Selected engagements and productions. Brand campaign and endorsement work available on request.
        </p>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ background: 'var(--c)', borderTop: '3px solid #1B1714', borderBottom: '3px solid #1B1714', padding: '90px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-1.5px', margin: 0, color: '#1B1714' }}>How a project runs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {process.map((step) => (
              <div key={step.num} style={{ background: '#FAF4EA', border: '3px solid #1B1714', borderRadius: 16, padding: 24, color: '#1B1714' }}>
                <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 32, color: 'var(--a)', marginBottom: 10 }}>{step.num}</div>
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 500, opacity: 0.8 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '100px 28px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.5, margin: '0 0 24px' }}>
          &ldquo;We would rather turn down a brief that requires dishonesty than deliver a campaign that burns the
          trust it took years to build. If a segment would not hold a room in Nairobi on a Friday night, it is not
          good enough for a feed either.&rdquo;
        </p>
        <div style={{ fontWeight: 800, fontSize: 15 }}>Eugine Micah</div>
        <div style={{ fontWeight: 600, fontSize: 13, opacity: 0.6 }}>Founder, Roylandz Media</div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px 70px', textAlign: 'center' }}>
        <div style={{ background: '#1B1714', borderRadius: 24, padding: '70px 40px' }}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-1.5px', color: '#FAF4EA', margin: '0 0 16px' }}>
            Have a brief for us?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(250,244,234,0.75)', fontWeight: 500, maxWidth: 480, margin: '0 auto 28px' }}>
            Tell us the brand, the goal, and the audience. We&rsquo;ll tell you honestly whether we&rsquo;re the
            right fit.
          </p>
          <Link href="/messages" className="emx-cta" style={{ display: 'inline-block', fontWeight: 800, background: 'var(--c)', color: '#1B1714', border: '3px solid #FAF4EA', borderRadius: 999, padding: '16px 36px', boxShadow: '5px 5px 0 rgba(250,244,234,0.3)' }}>
            Start a project ↗
          </Link>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 32 }}>
            {socials.map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener"
                className="emx-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, color: '#FAF4EA', border: '2px solid rgba(250,244,234,0.4)', borderRadius: 999, padding: '8px 16px' }}
              >
                {name} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT TRANSITION */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px 90px' }}>
        <div style={{ fontWeight: 800, fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-2px' }}>
          Next: <Link href="/work#bookings" className="emx-link" style={{ color: 'var(--a)' }}>book Eugine →</Link>
        </div>
      </section>
    </main>
  );
}
