import { SiteHeader } from '../_components/SiteHeader';
import { SiteFooter } from '../_components/SiteFooter';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F6F0E2', color: '#191613', fontFamily: "'Newsreader',Georgia,serif" }}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
