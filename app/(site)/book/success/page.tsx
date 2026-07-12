import type { Metadata } from 'next';
import { SuccessDownload } from '../../../_components/SuccessDownload';

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: false },
};

export default async function BookSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '90px 28px 140px', textAlign: 'center' }}>
      <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Order confirmed</p>
      <h1 style={{ margin: '0 0 20px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(34px,4.6vw,56px)', letterSpacing: '-.02em' }}>Thank you. Here&rsquo;s your copy.</h1>
      {reference ? (
        <SuccessDownload reference={reference} />
      ) : (
        <p style={{ fontFamily: "'Newsreader'", fontSize: 17, color: '#6E6455' }}>Missing order reference — if you just paid, check the email link from Paystack, or contact eugine.micah@outlook.com.</p>
      )}
    </main>
  );
}
