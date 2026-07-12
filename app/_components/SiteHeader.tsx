'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navDefs } from '@/content/em-site-data';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* TOP RULE BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '8px 28px', borderBottom: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase' }}>
        <span>Nairobi, Kenya</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C03B22', animation: 'em-blink 1.5s infinite' }} />
            On air at 7:30 · PPP TV
          </span>
          <Link href="/admin" style={{ padding: '4px 10px', border: '1px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase' }}>Control Room</Link>
        </span>
      </div>

      {/* MASTHEAD */}
      <div style={{ textAlign: 'center', padding: '30px 24px 22px', borderBottom: '2px solid #191613' }}>
        <p style={{ margin: '0 0 8px', fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: '#6E6455' }}>★ The Official Channel of ★</p>
        <Link href="/" style={{ padding: 0, display: 'inline-block' }}>
          <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(44px,6.4vw,92px)', lineHeight: .95, letterSpacing: '-.02em', display: 'block' }}>EUGINE MICAH</span>
        </Link>
        <p style={{ margin: '10px 0 0', fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 16, color: '#6E6455' }}>
          Journalist · Author · The loudest man on Kenyan television <span style={{ fontStyle: 'normal' }}>(self-certified)</span>
        </p>
      </div>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 200, background: '#F6F0E2', borderBottom: '3px double #191613' }}>
        <nav style={{ maxWidth: 1420, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '0 20px', height: 54 }}>
          <div style={{ alignItems: 'center', gap: 2, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase' }} className="flex max-[1250px]:!hidden">
            {navDefs.map(([label, href]) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{ padding: '8px 13px', fontWeight: active ? 700 : 400, color: active ? '#C03B22' : '#191613' }}>
                  {label}
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{ alignItems: 'center', gap: 8, padding: '8px 14px', border: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}
            className="hidden max-[1250px]:!inline-flex"
          >
            Index ☰
          </button>
          <span style={{ width: 1, height: 22, background: '#191613', margin: '0 10px' }} />
          <Link href="/book-me" style={{ marginLeft: 8, padding: '9px 16px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase' }}>Book Me</Link>
        </nav>
        {menuOpen && (
          <div style={{ borderTop: '2px solid #191613', background: '#F6F0E2', flexDirection: 'column' }} className="flex">
            {navDefs.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ padding: '14px 24px', borderBottom: '1px solid #E3DAC5', fontFamily: "'Spline Sans Mono'", fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', background: '#191613', color: '#F6F0E2', padding: '9px 0', borderBottom: '2px solid #191613' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'em-marquee 38s linear infinite', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          {[0, 1].map((i) => (
            <span key={i} style={{ paddingRight: 48 }}>
              <span style={{ color: '#C03B22', fontWeight: 600 }}>Breaking ★</span> Local boy still refusing to whisper &nbsp;&nbsp;·&nbsp;&nbsp;
              <span style={{ color: '#C03B22', fontWeight: 600 }}> Tour ★</span> Kagumo High braces for impact, July 25 &nbsp;&nbsp;·&nbsp;&nbsp;
              <span style={{ color: '#C03B22', fontWeight: 600 }}> Books ★</span> Born Broke. Built Loud. — pre-orders open &nbsp;&nbsp;·&nbsp;&nbsp;
              <span style={{ color: '#C03B22', fontWeight: 600 }}> Weather ★</span> Loud, with a chance of louder
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
