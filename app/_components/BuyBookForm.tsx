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
    padding: '14px 18px',
    background: 'var(--bg)',
    color: 'var(--text)',
    border: '2.5px solid var(--text)',
    borderRadius: 12,
    fontFamily: 'inherit',
    fontSize: 16,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input name="name" required placeholder="Full name" className="emx-input" style={inputStyle} />
      <input type="email" name="email" required placeholder="Email — we'll send the download link here" className="emx-input" style={inputStyle} />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="emx-cta"
        style={{
          width: '100%',
          fontWeight: 800,
          fontSize: 16,
          cursor: status === 'sending' ? 'wait' : 'pointer',
          background: 'var(--a)',
          color: '#FAF4EA',
          border: '3px solid var(--text)',
          borderRadius: 14,
          padding: 16,
          boxShadow: '4px 4px 0 var(--text)',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        {status === 'sending' ? 'Redirecting to payment…' : 'Buy now →'}
      </button>
      {status === 'error' && (
        <span style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 15, color: 'var(--b)' }}>{errorMsg}</span>
      )}
      <span style={{ fontSize: 12.5, fontWeight: 600, opacity: 0.6 }}>Secure payment via Paystack. Instant download after payment.</span>
    </form>
  );
}
