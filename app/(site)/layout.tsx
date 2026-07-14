import { SiteHeader } from '../_components/SiteHeader';
import { SiteFooter } from '../_components/SiteFooter';
import { ScrollChrome } from '../_components/ScrollChrome';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-bricolage), sans-serif',
      }}
    >
      <ScrollChrome />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
