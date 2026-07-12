'use client';

import { useState } from 'react';

// Same formsubmit.co pattern as NewsletterForm — no backend route needed for
// a simple contact capture. See vercel.json's CSP (connect-src https://formsubmit.co).
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') as string) || '';
    const email = (data.get('email') as string) || '';
    const message = (data.get('message') as string) || '';
    if (!name || !email || !message) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/eugine.micah@outlook.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: 'New message from euginemicah.tech — The Mailroom' }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div style={{ padding: 34, border: '3px double #191613', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26, color: '#C03B22' }}>★ Delivered to the desk.</span>
        <span style={{ fontFamily: "'Newsreader'", fontSize: 16, lineHeight: 1.65 }}>You&apos;ll hear back soon. Complaints are read aloud in the office for morale.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input
        name="name"
        required
        placeholder="Your name"
        style={{ padding: '14px 16px', background: '#fff', border: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 14, outline: 'none' }}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        style={{ padding: '14px 16px', background: '#fff', border: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 14, outline: 'none' }}
      />
      <textarea
        name="message"
        required
        rows={6}
        placeholder="Say it. Loudly if possible."
        style={{ padding: '14px 16px', background: '#fff', border: '2px solid #191613', fontFamily: "'Newsreader'", fontSize: 16, outline: 'none', resize: 'vertical' }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ alignSelf: 'flex-start', padding: '15px 28px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}
      >
        {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again →' : 'Post it →'}
      </button>
    </form>
  );
}
