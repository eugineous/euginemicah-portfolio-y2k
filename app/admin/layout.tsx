import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eugine Micah — Control Room',
  description: 'Admin control room for euginemicah.tech — content calendar, LinkedIn audit and auto-poster.',
  robots: { index: false, follow: false },
  icons: { icon: '/assets/em-monogram.png' },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
