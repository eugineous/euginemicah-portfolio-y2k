'use client';

import Link from 'next/link';
import { useState } from 'react';

// 2026-08 rebrand: structure and copy from
// design_handoff_full_site_backend/site/SiteFooter.dc.html: brand blurb,
// Explore column, Elsewhere (socials) column, newsletter signup, bottom bar.
// Newsletter posts to the existing real backend (app/api/newsletter/route.ts,
// same service-role-bypasses-RLS pattern already used by /blog and /book):
// the design's own footer form is local-only ("needs real email delivery"
// per README's "Known limitation to fix in the rebuild"), so this wires it
// to the already-working route instead of leaving it fake.

const exploreLinks: [string, string][] = [
  ['Home', '/'],
  ['Profile', '/profile'],
  ['Work', '/work'],
  ['Build', '/build'],
  ['Ideas', '/ideas'],
  ['Now', '/now'],
  ['News', '/news'],
  ['Work With Eugine', '/work-with-eugine'],
];

const elsewhereLinks: [string, string][] = [
  ['LinkedIn', 'https://ke.linkedin.com/in/euginemicah'],
  ['Instagram', 'https://instagram.com/eugine.micah/'],
  ['X', 'https://x.com/eugineroylandz'],
  ['Muck Rack', 'https://muckrack.com/eugine-micah/portfolio'],
  ['euginemicah.tech', 'https://euginemicah.tech'],
];

const colHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--f-archivo)',
  fontWeight: 800,
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  opacity: 0.6,
  marginBottom: 14,
};

const linkStyle: React.CSSProperties = { fontFamily: 'var(--f-work-sans)', fontWeight: 500, fontSize: 15 };

function FooterNewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string) || '';
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      setStatus(res.ok ? 'done' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p style={{ margin: 0, fontFamily: 'var(--f-work-sans)', fontSize: 15, color: 'var(--em-crimson)' }}>You&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: 0, width: '100%', maxWidth: 340 }}>
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        style={{
          flex: 1,
          padding: '12px 14px',
          background: 'var(--em-near-black)',
          border: '2px solid var(--em-paper)',
          borderRight: 'none',
          color: 'var(--em-paper)',
          fontFamily: 'var(--f-work-sans)',
          fontSize: 14,
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          padding: '12px 18px',
          background: 'var(--em-crimson)',
          color: 'var(--em-paper)',
          border: '2px solid var(--em-paper)',
          fontFamily: 'var(--f-work-sans)',
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        {status === 'sending' ? '…' : status === 'error' ? 'Retry' : 'Sign up'}
      </button>
    </form>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--em-near-black)',
        color: 'var(--em-paper)',
        padding: '70px 32px 32px',
        borderTop: '3px solid var(--em-near-black)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1.2fr', gap: 32, marginBottom: 48 }}
          className="max-[900px]:!grid-cols-2 max-[560px]:!grid-cols-1"
        >
          <div>
            <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 18, textTransform: 'uppercase', marginBottom: 12 }}>
              Eugine Micah<span style={{ color: 'var(--em-crimson)' }}>.</span>
            </div>
            <p style={{ fontFamily: 'var(--f-work-sans)', fontSize: 14, lineHeight: 1.6, opacity: 0.8, maxWidth: 280, margin: 0 }}>
              Broadcaster, journalist, and founder building media, technology, and youth culture platforms out of
              Nairobi.
            </p>
          </div>
          <div>
            <div style={colHeadingStyle}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {exploreLinks.map(([label, href]) => (
                <Link key={href} href={href} className="emx-link" style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div style={colHeadingStyle}>Elsewhere</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {elsewhereLinks.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener" className="emx-link" style={linkStyle}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={colHeadingStyle}>Newsletter</div>
            <FooterNewsletterForm />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            borderTop: '1px solid rgba(250,247,242,0.2)',
            paddingTop: 24,
            fontFamily: 'var(--f-work-sans)',
            fontSize: 13,
            opacity: 0.75,
          }}
        >
          <div>© {year} Eugine Micah.</div>
          <div style={{ display: 'flex', gap: 18 }}>
            <Link href="/press" className="emx-link" style={{ color: 'var(--em-paper)' }}>
              Press
            </Link>
            <Link href="/privacy" className="emx-link" style={{ color: 'var(--em-paper)' }}>
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
