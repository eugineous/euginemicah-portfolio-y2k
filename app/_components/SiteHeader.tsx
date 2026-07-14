'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

// Exact nav order from the approved design source
// ("Celebrity website project/index.html"'s shared nav block).
const navLinks: [string, string][] = [
  ['Home', '/'],
  ['About', '/about'],
  ['Shows', '/shows'],
  ['Book', '/book'],
  ['Press', '/press'],
  ['Blog', '/blog'],
  ['Roylandz', '/roylandz'],
  ['Work with me', '/work'],
];

// Mobile breakpoint is 1180px — written as a literal Tailwind arbitrary
// value below (`max-[1180px]:...`) rather than interpolated, since
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
            fontWeight: 800,
            fontSize: 19,
            letterSpacing: '-0.3px',
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
          Eugine Micah
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              alignItems: 'center',
              columnGap: 16,
              rowGap: 6,
              fontWeight: 700,
              fontSize: 14,
              flexWrap: 'wrap',
            }}
            className="flex max-[1180px]:!hidden"
          >
            {navLinks.map(([label, href]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="emx-link"
                  style={{
                    color: active ? 'var(--a)' : 'var(--text)',
                    borderBottom: `3px solid ${active ? 'var(--a)' : 'transparent'}`,
                    paddingBottom: 2,
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/work#bookings"
              className="emx-link emx-cta"
              style={{
                display: 'inline-block',
                background: 'var(--a)',
                color: '#FAF4EA',
                border: '2.5px solid var(--text)',
                borderRadius: 999,
                padding: '8px 18px',
                boxShadow: '3px 3px 0 var(--text)',
              }}
            >
              Book me ↗
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="emx-icon-btn hidden max-[1180px]:!inline-flex"
            style={{
              alignItems: 'center',
              gap: 8,
              padding: '7px 12px',
              border: '2px solid var(--text)',
              borderRadius: 8,
              background: 'transparent',
              color: 'var(--text)',
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
          className="hidden max-[1180px]:!flex"
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
                  fontWeight: 700,
                  fontSize: 14,
                  color: active ? 'var(--a)' : 'var(--text)',
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/work#bookings"
            onClick={() => setMenuOpen(false)}
            className="emx-link"
            style={{ padding: '14px 24px', fontWeight: 800, color: 'var(--a)' }}
          >
            Book me ↗
          </Link>
        </div>
      )}
    </header>
  );
}
