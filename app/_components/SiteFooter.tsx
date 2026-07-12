import Link from 'next/link';

const footNav1: [string, string][] = [
  ['Front Page', '/'], ['The Story', '/story'], ['The Work', '/work'], ['The Tour', '/tour'], ['Journal', '/journal'],
];
const footNav2: [string, string][] = [
  ['Classifieds', '/shop'], ['The Book', '/book'], ['Darkroom', '/gallery'], ['Mailroom', '/contact'],
];

export function SiteFooter() {
  return (
    <footer style={{ background: '#191613', color: '#F6F0E2', borderTop: '2px solid #191613' }}>
      <div style={{ maxWidth: 1420, margin: '0 auto', padding: '72px 28px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) repeat(3,minmax(0,.7fr))', gap: 48, marginBottom: 52 }} className="max-[900px]:!grid-cols-2 max-[560px]:!grid-cols-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26, letterSpacing: '-.01em' }}>EUGINE MICAH<span style={{ color: '#C03B22' }}>.</span></span>
            <p style={{ margin: 0, maxWidth: 360, fontFamily: "'Newsreader'", fontSize: 15, lineHeight: 1.7, color: '#A79E8E' }}>
              The official channel — journalist, author, speaker, curator of culture. Printed in Nairobi, read everywhere. Born Broke. Built Loud.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621' }}>The Paper</span>
            {footNav1.map(([label, href]) => (
              <Link key={href} href={href} style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>{label}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621' }}>Engage</span>
            {footNav2.map(([label, href]) => (
              <Link key={href} href={href} style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>{label}</Link>
            ))}
            <Link href="/privacy-policy" style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>Terms</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D9A621' }}>Wires</span>
            <a href="https://instagram.com/eugine.micah" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>Instagram</a>
            <a href="https://tiktok.com/@eugine.micah" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>TikTok</a>
            <a href="https://youtube.com/@urbannewsgang" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>YouTube</a>
            <a href="https://linkedin.com/in/euginemicah" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>LinkedIn</a>
            <a href="mailto:eugine.micah@outlook.com" style={{ fontFamily: "'Newsreader'", fontSize: 15, color: '#DDD5C4' }}>Email</a>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, paddingTop: 24, borderTop: '1px solid #3A362E', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.14em', color: '#8B8272' }}>© MMXXVI · EUGINE MICAH · ALL RIGHTS RESERVED, LOUDLY</span>
            <Link href="/admin" style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.14em', color: '#D9A621', textTransform: 'uppercase' }}>★ Control Room</Link>
          </span>
          <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14, color: '#8B8272' }}>Printed on the internet, which explains the price.</span>
        </div>
      </div>
    </footer>
  );
}
