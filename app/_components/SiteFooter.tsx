'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const pagesLinks: [string, string][] = [
  ['Home', '/'],
  ['About', '/about'],
  ['Shows', '/shows'],
  ['Book', '/book'],
  ['Press', '/press'],
  ['Blog', '/blog'],
];

const connectLinks: [string, string][] = [
  ['Send a message', '/messages'],
  ['Roylandz Media', '/roylandz'],
  ['Work with me', '/work'],
  ['Book Eugine', '/work#bookings'],
];

const legalLinks: [string, string][] = [
  ['Terms of use', '/terms'],
  ['Privacy policy', '/privacy'],
];

function useNairobiClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-KE', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Africa/Nairobi',
        })
      );
    }
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const colHeadingStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: 1,
  opacity: 0.55,
  marginBottom: 14,
  color: '#FAF4EA',
};

const linkStyle: React.CSSProperties = { color: '#FAF4EA', fontWeight: 600, fontSize: 15 };

export function SiteFooter() {
  const nairobiTime = useNairobiClock();
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <footer
      style={{
        background: '#1B1714',
        color: '#FAF4EA',
        padding: '64px 28px 32px',
        borderTop: '1px solid rgba(250,244,234,0.15)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))', gap: 32, marginBottom: 48 }}
          className="max-[560px]:!grid-cols-1"
        >
          <div>
            <div style={colHeadingStyle}>PAGES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pagesLinks.map(([label, href]) => (
                <Link key={href} href={href} className="emx-link" style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div style={colHeadingStyle}>CONNECT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {connectLinks.map(([label, href]) => (
                <Link key={href} href={href} className="emx-link" style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div style={colHeadingStyle}>LEGAL</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {legalLinks.map(([label, href]) => (
                <Link key={href} href={href} className="emx-link" style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            borderTop: '1px solid rgba(250,244,234,0.2)',
            paddingTop: 24,
            fontSize: 13,
            color: 'rgba(250,244,234,0.6)',
          }}
        >
          <div>
            © {year} Eugine Micah · Roylandz Media
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span>Nairobi {nairobiTime}</span>
            <button
              type="button"
              onClick={copyLink}
              className="emx-icon-btn"
              style={{
                cursor: 'pointer',
                fontFamily: 'var(--font-bricolage), sans-serif',
                fontWeight: 700,
                fontSize: 12,
                background: 'transparent',
                color: 'rgba(250,244,234,0.7)',
                border: '1px solid rgba(250,244,234,0.3)',
                borderRadius: 999,
                padding: '5px 12px',
              }}
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 19, color: 'var(--c)' }}>
            born broke, built loud ✦
          </div>
        </div>
      </div>
    </footer>
  );
}
