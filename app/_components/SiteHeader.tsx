'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

// 2026-08 rebrand — nav order from design_handoff_full_site_backend/README.md
// (SiteHeader.dc.html): Home, Profile, Work, Build, Ideas, Now, News, with
// "Work With Eugine" as the CTA. Replaces the 2026-07 About/Shows/Book/Press
// /Blog/Roylandz/Work with me set — those routes 301-redirect (see
// next.config.mjs) to their new equivalents.
const navLinks: [string, string][] = [
  ['Profile', '/profile'],
  ['Work', '/work'],
  ['Build', '/build'],
  ['Ideas', '/ideas'],
  ['Now', '/now'],
  ['News', '/news'],
];

// Mobile breakpoint is 900px per the design tokens (README.md), written as a
// literal Tailwind arbitrary value below rather than interpolated, since
// Tailwind's compiler statically scans source text and can't see a
// runtime-interpolated class name.
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '3px solid var(--text)',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '14px 28px',
        }}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="emx-link"
          style={{
            fontFamily: 'var(--f-archivo)',
            fontWeight: 800,
            fontSize: 19,
            letterSpacing: '-0.3px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            color: 'var(--text)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/em-monogram.png"
            alt="Eugine Micah logo"
            width={30}
            height={30}
            className="emx-logo-mark"
            style={{ objectFit: 'contain' }}
          />
          Eugine Micah<span style={{ color: 'var(--em-crimson)' }}>.</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              alignItems: 'center',
              columnGap: 16,
              rowGap: 6,
              fontFamily: 'var(--f-work-sans)',
              fontWeight: 700,
              fontSize: 14,
              flexWrap: 'wrap',
            }}
            className="flex max-[900px]:!hidden"
          >
            {navLinks.map(([label, href]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="emx-link"
                  style={{
                    color: active ? 'var(--em-crimson)' : 'var(--text)',
                    borderBottom: `3px solid ${active ? 'var(--em-crimson)' : 'transparent'}`,
                    paddingBottom: 2,
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/work-with-eugine"
              className="emx-link emx-cta"
              style={{
                display: 'inline-block',
                background: 'var(--em-crimson)',
                color: 'var(--em-paper)',
                border: '2.5px solid var(--text)',
                borderRadius: 999,
                padding: '8px 18px',
                boxShadow: '3px 3px 0 var(--text)',
              }}
            >
              Work With Eugine
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="emx-icon-btn hidden max-[900px]:!inline-flex"
            style={{
              alignItems: 'center',
              gap: 8,
              padding: '7px 12px',
              border: '2px solid var(--text)',
              borderRadius: 8,
              background: 'transparent',
              color: 'var(--text)',
              fontFamily: 'var(--f-work-sans)',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Menu ☰
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {menuOpen && (
        <div
          className="hidden max-[900px]:!flex"
          style={{ borderTop: '2px solid var(--text)', background: 'var(--bg)', flexDirection: 'column' }}
        >
          {navLinks.map(([label, href]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="emx-link"
                style={{
                  padding: '14px 24px',
                  borderBottom: '1px solid var(--text)',
                  fontFamily: 'var(--f-work-sans)',
                  fontWeight: 700,
                  fontSize: 14,
                  color: active ? 'var(--em-crimson)' : 'var(--text)',
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/work-with-eugine"
            onClick={() => setMenuOpen(false)}
            className="emx-link"
            style={{ padding: '14px 24px', fontFamily: 'var(--f-work-sans)', fontWeight: 800, color: 'var(--em-crimson)' }}
          >
            Work With Eugine
          </Link>
        </div>
      )}
    </header>
  );
}
