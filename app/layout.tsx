import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://euginemicah.tech'),
  title: {
    default: 'Eugine Micah — The Official Channel',
    template: '%s — Eugine Micah',
  },
  description:
    'Eugine Micah — Kenyan broadcast journalist, author of Born Broke. Built Loud., speaker, and curator of culture. Co-anchor of Urban News on PPP TV, founder of Roylandz Media, co-founder of the Urban Gang Tour.',
  robots: { index: true, follow: true },
  icons: { icon: '/assets/em-monogram.png' },
  openGraph: {
    type: 'website',
    siteName: 'Eugine Micah — The Official Channel',
    locale: 'en_KE',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
