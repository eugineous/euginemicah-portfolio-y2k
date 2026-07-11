import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://euginemicah.tech'),
  title: 'Eugine Micah — Control Room',
  description: 'Admin control room for euginemicah.tech — content calendar, LinkedIn audit and auto-poster.',
  robots: { index: false, follow: false },
  icons: { icon: '/assets/em-monogram.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
