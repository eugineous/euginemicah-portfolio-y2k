import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Serif } from 'next/font/google';
import './globals.css';

// New brand system (2026-07 rebuild, Phase 0). Self-hosted via next/font
// instead of the mockup's runtime Google Fonts <link> — avoids an extra
// render-blocking network round trip. Bricolage Grotesque is a variable
// font (weights 400-800), so no `weight` array is needed. Both expose a
// CSS variable that SiteHeader/SiteFooter/(site)/layout.tsx read via
// `var(--font-bricolage)` / `var(--font-instrument-serif)` — the old,
// not-yet-migrated marketing pages under app/(site)/{story,tour,...} are
// untouched and keep loading Newsreader/Spline Sans Mono/Bricolage
// Grotesque from the runtime @import in globals.css until later phases
// replace their content.
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// Render-blocking theme bootstrap: applies the persisted dark-mode
// preference to <html> before first paint, so toggling in ThemeToggle.tsx
// never causes a flash of the wrong theme. Key ('em_theme') matches what
// ThemeToggle.tsx writes to localStorage.
const themeInitScript = `(function(){try{if(localStorage.getItem('em_theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL('https://euginemicah.tech'),
  title: {
    default: 'Eugine Micah — The Official Channel',
    template: '%s — Eugine Micah',
  },
  description:
    'Eugine Micah — Kenyan broadcast journalist, author of Born Broke. Built Loud., speaker, and curator of culture. Co-anchor of Urban News on PPP TV, founder of Roylandz Media, co-founder of the Urban Gang Tour.',
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Eugine Micah — The Official Channel',
    locale: 'en_KE',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
