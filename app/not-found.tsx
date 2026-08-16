import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from './_components/SiteHeader';
import { SiteFooter } from './_components/SiteFooter';

// Global Next.js 404 — verbatim content from design_handoff_full_site_backend
// /site/NotFound.dc.html. Placed at app/not-found.tsx (not app/(site)/) so
// it also covers unmatched routes outside the (site) group; it renders its
// own Header/Footer to match the (site) layout's shell since a route-group
// layout doesn't wrap the root not-found boundary.

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--f-work-sans)' }}>
      <SiteHeader />
      <main>
        <section
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            maxWidth: 1400,
            margin: '0 auto',
            padding: '90px 32px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--f-archivo)',
              fontWeight: 900,
              fontSize: 'clamp(80px, 16vw, 220px)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: 'var(--em-near-black)',
              margin: '0 0 16px',
            }}
          >
            404<span style={{ color: 'var(--em-crimson)' }}>.</span>
          </div>
          <p style={{ fontSize: 17, color: 'rgba(23,23,26,0.65)', margin: '0 0 32px', maxWidth: 480 }}>
            This page doesn&rsquo;t exist, or it&rsquo;s moved.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: 'var(--em-crimson)',
              color: 'var(--em-paper)',
              padding: '16px 28px',
              fontFamily: 'var(--f-work-sans)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Back to home &rarr;
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
