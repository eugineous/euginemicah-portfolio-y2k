'use client';

import { useState } from 'react';

// Chat-bubble visual style ported from the DCLogic mockup at
// "Celebrity website project/Messages.dc.html" (dark header bar, message
// bubbles, quick-reply pills, input+send bar) — but the mockup itself is a
// fake scripted chatbot with keyword-matched canned replies and NO name/
// email capture; its own on-page copy admits "This is a prototype inbox."
// This version keeps the chat-bubble look only for the static opening
// greeting, then is functionally a real one-way message form: name, email
// and body are required, submitted to POST /api/messages (which uses the
// service-role client server-side — RLS blocks a public client-side
// insert). After submit it shows a genuine confirmation panel, not a
// second fake "reply" bubble pretending a person just typed back.

type QuickReply = { label: string; prefill: string; source: 'contact' | 'booking' | 'roylandz' };

const quickReplies: QuickReply[] = [
  { label: 'Book event hosting / MC', prefill: "I'd like to book Eugine for event hosting / MC work.", source: 'booking' },
  { label: 'Keynote / speaking', prefill: "I'd like to invite Eugine to speak at our event.", source: 'booking' },
  { label: 'Brand partnership', prefill: "We're interested in a brand partnership with Roylandz Media.", source: 'roylandz' },
  { label: 'Something else', prefill: '', source: 'contact' },
];

const CONTACT_EMAIL = 'eugine.micah@outlook.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function MessagesClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [body, setBody] = useState('');
  const [source, setSource] = useState<QuickReply['source']>('contact');
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function pickQuick(q: QuickReply) {
    setActiveChip(q.label);
    setSource(q.source);
    if (q.prefill) setBody(q.prefill);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !body.trim()) return;

    const honeypot = (new FormData(e.currentTarget).get('hp_field') as string) || '';
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          body: body.trim(),
          hp_field: honeypot,
        }),
      });

      if (res.ok) {
        setStatus('sent');
        return;
      }

      const data = await res.json().catch(() => ({}) as { error?: string });
      if (res.status === 429) {
        setErrorMsg(`You've sent a few messages already — give it a bit and try again, or email ${CONTACT_EMAIL} directly.`);
      } else if (res.status === 503) {
        setErrorMsg(`Messaging isn't switched on yet — email ${CONTACT_EMAIL} directly instead.`);
      } else if (data?.error === 'name_email_and_message_required') {
        setErrorMsg('Please fill in your name, a valid email, and a message.');
      } else {
        setErrorMsg('Something went wrong — please try again.');
      }
      setStatus('error');
    } catch {
      setErrorMsg('Network error — please try again.');
      setStatus('error');
    }
  }

  function sendAnother() {
    setStatus('idle');
    setBody('');
    setActiveChip(null);
    setSource('contact');
  }

  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    background: '#FAF4EA',
    color: '#1B1714',
    border: '2.5px solid #1B1714',
    borderRadius: 12,
    fontFamily: 'inherit',
    fontSize: 15,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const firstName = name.trim().split(/\s+/)[0] || 'there';

  return (
    <main>
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 22, color: 'var(--a)' }}>
            slide into the DMs
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-1px', margin: '6px 0 0' }}>
            Talk to Eugine&rsquo;s team
          </h1>
        </div>

        {/* CHAT WINDOW */}
        <div
          style={{
            background: '#fff',
            border: '3px solid #1B1714',
            borderRadius: 20,
            boxShadow: '7px 7px 0 var(--a)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* HEADER BAR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '2.5px solid #1B1714', background: '#1B1714', color: '#FAF4EA', flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--c)', border: '2px solid #FAF4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B1714', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
              RM
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Roylandz Media</div>
              <div style={{ fontSize: 12, opacity: 0.7, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                Usually replies within a day
              </div>
            </div>
          </div>

          {/* MESSAGE AREA — a static greeting bubble, plus (once sent) the
              visitor's own message echoed back. No scripted "reply" bubble
              is ever rendered here. */}
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ maxWidth: '82%', padding: '11px 15px', borderRadius: 16, fontSize: 14.5, lineHeight: 1.45, fontWeight: 500, background: '#f0e9dc', color: '#1B1714' }}>
                Hey! Thanks for reaching out 👋 Tell us who you are and what you need — a real person reads every
                message and replies by email, usually within a day.
              </div>
            </div>

            {status === 'sent' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ maxWidth: '82%', padding: '11px 15px', borderRadius: 16, fontSize: 14.5, lineHeight: 1.45, fontWeight: 500, background: 'var(--a)', color: '#FAF4EA', whiteSpace: 'pre-wrap' }}>
                  {body}
                </div>
              </div>
            )}
          </div>

          {status !== 'sent' ? (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14, borderTop: '2.5px solid #1B1714', flexShrink: 0 }}>
              {/* Honeypot — hidden from real visitors, catches bots that fill
                  every field blindly. */}
              <input
                type="text"
                name="hp_field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
              />

              {/* QUICK REPLIES */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {quickReplies.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => pickQuick(q)}
                    style={{
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 700,
                      background: activeChip === q.label ? 'var(--c)' : '#fff',
                      border: '2px solid #1B1714',
                      borderRadius: 999,
                      padding: '8px 14px',
                      transition: 'background .15s',
                    }}
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="max-[420px]:!grid-cols-1">
                <input
                  required
                  aria-label="Your name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  required
                  type="email"
                  aria-label="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <input
                aria-label="Phone (optional)"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
              <textarea
                required
                rows={4}
                aria-label="Message"
                placeholder="Type a message…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  fontFamily: 'inherit',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  fontWeight: 800,
                  fontSize: 15,
                  background: 'var(--a)',
                  color: '#FAF4EA',
                  border: '2.5px solid #1B1714',
                  borderRadius: 999,
                  padding: '13px 20px',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>

              {status === 'error' && (
                <span style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 14, color: 'var(--b)' }}>
                  {errorMsg}
                </span>
              )}
            </form>
          ) : (
            /* GENUINE CONFIRMATION STATE — deliberately styled as a status
               panel, not another chat bubble, so it can't read as a person
               "replying". */
            <div style={{ padding: '22px 18px', borderTop: '2.5px solid #1B1714', background: 'var(--c)', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#1B1714', marginBottom: 4 }}>✓ Got it, {firstName}.</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1B1714', opacity: 0.85, marginBottom: 14 }}>
                The team will get back to you by email — usually within a day.
              </div>
              <button
                type="button"
                onClick={sendAnother}
                style={{
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 13,
                  background: 'transparent',
                  color: '#1B1714',
                  border: '2px solid #1B1714',
                  borderRadius: 999,
                  padding: '8px 16px',
                }}
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, opacity: 0.55, fontWeight: 600, marginTop: 18 }}>
          Real messages, read by a real person. Nothing here is a bot pretending to type back.
        </p>
      </section>
    </main>
  );
}
