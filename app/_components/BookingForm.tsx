'use client';

import { useState } from 'react';

// Same formsubmit.co pattern as NewsletterForm.tsx — already CSP-allowlisted
// (connect-src https://formsubmit.co in vercel.json), no backend route needed.
export function BookingForm() {
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
        body: JSON.stringify({
          name,
          email,
          phone: data.get('phone') || '',
          eventType: data.get('eventType') || '',
          date: data.get('date') || '',
          budget: data.get('budget') || '',
          message,
          _subject: 'New booking inquiry — euginemicah.tech',
        }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
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
        <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26, color: '#C03B22' }}>★ Inquiry filed.</span>
        <span style={{ fontFamily: "'Newsreader'", fontSize: 16, lineHeight: 1.65 }}>You will hear back within 48 hours. The voice is warming up as we speak.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="max-[500px]:!grid-cols-1">
        <input name="name" required placeholder="Your name" style={inputStyle} />
        <input name="phone" placeholder="Phone (optional)" style={inputStyle} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="max-[500px]:!grid-cols-1">
        <input type="email" name="email" required placeholder="Email" style={inputStyle} />
        <input type="date" name="date" style={inputStyle} />
      </div>
      <select name="eventType" style={inputStyle} defaultValue="Keynote speech">
        <option>Keynote speech</option>
        <option>Hosting / MC</option>
        <option>TV appearance</option>
        <option>Workshop / mentorship</option>
        <option>Interview</option>
        <option>Brand partnership</option>
      </select>
      <input name="budget" placeholder="Budget range (e.g. KES 80,000 – 150,000)" style={inputStyle} />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="The event, the audience, the dream outcome."
        style={{ padding: '14px 16px', background: '#fff', border: '2px solid #191613', fontFamily: "'Newsreader'", fontSize: 16, outline: 'none', resize: 'vertical' }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ alignSelf: 'flex-start', padding: '15px 28px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase' }}
      >
        {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again →' : 'Send inquiry →'}
      </button>
      {status === 'error' && (
        <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 14, color: '#C03B22' }}>Something went wrong — email eugine.micah@outlook.com directly instead.</span>
      )}
    </form>
  );
}
