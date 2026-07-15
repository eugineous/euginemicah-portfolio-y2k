import type { Metadata } from 'next';

// New, separate light admin CMS (Blog/Shows/Messages/Book Orders/Newsletter)
// -- unlinked from public nav (URL-only), noindex like /admin. Deliberately
// its own layout: not wrapped in app/(site)/layout.tsx's SiteHeader/Footer,
// same as how /admin stands alone today.
export const metadata: Metadata = {
  title: 'Eugine Micah — Control Room',
  description: 'Light admin CMS for euginemicah.tech — blog, shows, messages, book orders and newsletter.',
  robots: { index: false, follow: false },
};

export default function ControlRoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
