'use client';

import { useState } from 'react';

// Real checkout: initializes a Paystack transaction server-side, then
// redirects to Paystack's hosted payment page. Price is set server-side
// (see app/api/checkout/route.ts) — never trusted from this form.
export function BuyBookForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get('name') as string) || '';
    const email = (data.get('email') as string) || '';
    if (!name || !email) return;

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.authorization_url) {
        window.location.href = body.authorization_url;
        return;
      }
      if (res.status === 503) {
        setErrorMsg('Checkout isn’t switched on yet — email eugine.micah@outlook.com to buy directly.');
      } else {
        setErrorMsg(body?.error || 'Something went wrong.');
      }
      setStatus('error');
    } catch {
      setErrorMsg('Network error — please try again.');
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: '14px 16px',
    background: '#fff',
    border: '2px solid #191613',
    fontFamily: "'Spline Sans Mono'",
    fontSize: 14,
    outline: 'none',
    width: '100%',
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input name="name" required placeholder="Your name" style={inputStyle} />
      <input type="email" name="email" required placeholder="Email — we'll send the download link here" style={inputStyle} />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ alignSelf: 'flex-start', padding: '15px 28px', background: '#D9A621', color: '#191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}
      >
        {status === 'sending' ? 'Redirecting to payment…' : 'Buy now →'}
      </button>
      {status === 'error' && (
        <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14, color: '#C03B22' }}>{errorMsg}</span>
      )}
      <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.06em', color: '#6E6455' }}>Secure payment via Paystack. Instant download after payment.</span>
    </form>
  );
}
