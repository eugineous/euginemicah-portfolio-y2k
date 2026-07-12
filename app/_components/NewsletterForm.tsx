'use client';

import { useState } from 'react';

// Reuses the formsubmit.co endpoint already allowlisted in vercel.json's CSP
// (connect-src https://formsubmit.co) — no backend route needed for a simple
// email capture. See HANDOFF.md: "Newsletter form -> Resend/Gmail list or
// existing subscriber store" — formsubmit.co forwards straight to the inbox.
export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string) || '';
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/eugine.micah@outlook.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'New Dispatch subscriber — euginemicah.tech' }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p style={{ margin: 0, fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 22, color: '#D9A621' }}>★ Welcome aboard. Mum says hello.</p>;
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: 0, width: '100%', maxWidth: 520 }}>
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        style={{ flex: 1, padding: '16px 18px', background: '#F6F0E2', border: '2px solid #191613', borderRight: 'none', color: '#191613', fontFamily: "'Spline Sans Mono'", fontSize: 14, outline: 'none' }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ padding: '16px 24px', background: '#D9A621', color: '#191613', border: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}
      >
        {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again →' : 'Sign me up'}
      </button>
    </form>
  );
}
