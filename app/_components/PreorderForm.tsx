'use client';

import { useState } from 'react';

// Free interest-capture pre-order — POSTs to /api/preorder (built separately
// by a teammate). No payment is taken; see book/page.tsx copy.
export function PreorderForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') as string) || '';
    const email = (data.get('email') as string) || '';
    if (!name || !email) return;

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: (data.get('phone') as string) || '',
          note: (data.get('note') as string) || '',
        }),
      });
      if (res.ok) {
        setStatus('done');
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body?.error || 'Something went wrong.');
        setStatus('error');
      }
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

  if (status === 'done') {
    return (
      <div style={{ padding: 34, border: '3px double #191613', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26, color: '#C03B22' }}>★ You&rsquo;re on the list.</span>
        <span style={{ fontFamily: "'Newsreader'", fontSize: 16, lineHeight: 1.65 }}>First copies ship the moment it&rsquo;s printed. No charge today &mdash; we&rsquo;ll email when it&rsquo;s time.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="max-[500px]:!grid-cols-1">
        <input name="name" required placeholder="Your name" style={inputStyle} />
        <input name="phone" placeholder="Phone (optional)" style={inputStyle} />
      </div>
      <input type="email" name="email" required placeholder="Email" style={inputStyle} />
      <textarea
        name="note"
        rows={3}
        placeholder="Anything else? (optional)"
        style={{ padding: '14px 16px', background: '#fff', border: '2px solid #191613', fontFamily: "'Newsreader'", fontSize: 16, outline: 'none', resize: 'vertical' }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ alignSelf: 'flex-start', padding: '15px 28px', background: '#D9A621', color: '#191613', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}
      >
        {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again →' : 'Reserve my copy →'}
      </button>
      {status === 'error' && (
        <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14, color: '#C03B22' }}>{errorMsg || 'Something went wrong.'} Or email eugine.micah@outlook.com directly.</span>
      )}
      <span style={{ fontFamily: "'Spline Sans Mono'", fontSize: 11, letterSpacing: '.06em', color: '#6E6455' }}>Free to reserve. No payment is taken now.</span>
    </form>
  );
}
