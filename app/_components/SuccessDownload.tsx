'use client';

import { useEffect, useState } from 'react';

export function SuccessDownload({ reference }: { reference: string }) {
  const [state, setState] = useState<'checking' | 'ready' | 'pending' | 'error'>('checking');
  const [url, setUrl] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function poll(attempt: number) {
      try {
        const res = await fetch(`/api/book-download?reference=${encodeURIComponent(reference)}`);
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setUrl(data.url);
          setState('ready');
          return;
        }
        if (res.status === 402 && attempt < 8) {
          // Webhook may not have landed yet — Paystack redirects the browser
          // faster than it fires the webhook sometimes. Retry for ~20s.
          setState('pending');
          setTimeout(() => poll(attempt + 1), 2500);
          return;
        }
        setState('error');
      } catch {
        if (!cancelled) setState('error');
      }
    }
    poll(0);
    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (state === 'checking' || state === 'pending') {
    return <p style={{ fontFamily: "'Newsreader'", fontSize: 17, color: '#6E6455' }}>Confirming your payment…</p>;
  }
  if (state === 'error') {
    return (
      <p style={{ fontFamily: "'Newsreader'", fontSize: 17, color: '#6E6455' }}>
        We couldn&rsquo;t confirm this payment automatically. If you were charged, email{' '}
        <a href="mailto:eugine.micah@outlook.com" style={{ color: '#C03B22' }}>eugine.micah@outlook.com</a> with your order reference: <code>{reference}</code>
      </p>
    );
  }
  return (
    <a
      href={url}
      style={{ display: 'inline-block', padding: '17px 34px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 14, letterSpacing: '.12em', textTransform: 'uppercase' }}
    >
      Download your copy →
    </a>
  );
}
