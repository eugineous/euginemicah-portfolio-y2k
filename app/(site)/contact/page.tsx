import type { Metadata } from 'next';
import { ContactForm } from '@/app/_components/ContactForm';

export const metadata: Metadata = {
  title: 'The Mailroom',
  description: 'Write to the editor. Business email, socials, and a direct line to the Nairobi desk.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '70px 28px' }}>
          <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>The Mailroom · Nairobi → The World</p>
          <h1 style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(48px,6vw,100px)', lineHeight: .94, letterSpacing: '-.02em' }}>Write to the editor.</h1>
        </div>
      </section>

      {/* FORM + INFO */}
      <section>
        <div style={{ maxWidth: 1420, margin: '0 auto', padding: '80px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 56, alignItems: 'start' }} className="max-[900px]:!grid-cols-1">
          <div style={{ border: '2px solid #191613', padding: 44, background: '#F6F0E2' }}>
            <ContactForm />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '2px solid #191613' }}>
            <div style={{ padding: '26px 30px', borderBottom: '1px solid #191613', background: '#F6F0E2' }}>
              <span style={{ display: 'block', fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: '#6E6455', marginBottom: 6 }}>Business email</span>
              <a href="mailto:eugine.micah@outlook.com" style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 19 }}>eugine.micah@outlook.com</a>
            </div>
            <div style={{ padding: '26px 30px', borderBottom: '1px solid #191613', background: '#F6F0E2', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: '#6E6455' }}>Platforms</span>
              <a href="https://instagram.com/eugine.micah" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 17 }}>Instagram — @eugine.micah →</a>
              <a href="https://tiktok.com/@eugine.micah" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 17 }}>TikTok — @eugine.micah →</a>
              <a href="https://youtube.com/@urbannewsgang" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 17 }}>YouTube — @urbannewsgang →</a>
              <a href="https://linkedin.com/in/euginemicah" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 17 }}>LinkedIn — euginemicah →</a>
            </div>
            <div style={{ padding: '26px 30px', background: '#191613', color: '#F6F0E2' }}>
              <span style={{ display: 'block', fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: '#D9A621', marginBottom: 6 }}>Headquarters</span>
              <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 19 }}>Nairobi, Kenya — on air at 7:30, loud by 7:31</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
