'use client';

import { useState } from 'react';

// Interactive half of /work-with-eugine: the four category cards and the
// enquiry form below them. Split out from page.tsx (which stays a server
// component so it can export `metadata`) the same way MessagesClient.tsx is
// split out from app/(site)/messages/page.tsx.
//
// Real backend: POST /api/messages (see app/api/messages/route.ts), same
// service-role-bypasses-RLS pattern MessagesClient.tsx uses. That route's
// payload shape has no field for "category" — this form's four cards/chips
// have no equivalent in the old /messages form — so the selected category is
// carried in `meta.category` (lands in the admin Messages inbox's meta
// column) and also folded into the top of `body` as a bracketed prefix, so
// it's visible even to a plain-text read of the message.

export type Category = 'Appearances' | 'Partnerships' | 'Projects' | 'Conversations';

const CATEGORIES: { id: Category; title: string; blurb: string; placeholder: string }[] = [
  {
    id: 'Appearances',
    title: 'Appearances',
    blurb: 'Television, hosting, events and panels.',
    placeholder: "Tell us about the appearance, date, format, audience, and what you'd need from Eugine...",
  },
  {
    id: 'Partnerships',
    title: 'Partnerships',
    blurb: 'Brand campaigns, youth initiatives, live experiences.',
    placeholder: 'Tell us about the brand, the campaign or initiative, and the kind of partnership you have in mind...',
  },
  {
    id: 'Projects',
    title: 'Projects',
    blurb: 'Media, digital and production collaborations.',
    placeholder: 'Tell us about the project, what you’re building, your timeline, and where Eugine or Roylandz Media fits in...',
  },
  {
    id: 'Conversations',
    title: 'Conversations',
    blurb: 'Speaking, press and interviews.',
    placeholder: 'Tell us about the conversation, speaking slot, press piece or interview, and your deadline...',
  },
];

const CONTACT_EMAIL = 'eugine.micah@outlook.com';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function EnquiryForm() {
  const [category, setCategory] = useState<Category>('Appearances');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const active = CATEGORIES.find((c) => c.id === category)!;

  function pickCategory(id: Category) {
    setCategory(id);
    const form = document.getElementById('enquiry-form');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const honeypot = (new FormData(e.currentTarget).get('hp_field') as string) || '';
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'work_with_eugine',
          name: name.trim(),
          email: email.trim(),
          body: `[${category}] ${message.trim()}`,
          meta: { category, organization: organization.trim() || undefined },
          hp_field: honeypot,
        }),
      });

      if (res.ok) {
        setStatus('sent');
        return;
      }

      const data = await res.json().catch(() => ({}) as { error?: string });
      if (res.status === 429) {
        setErrorMsg(`You've sent a few enquiries already, give it a bit and try again, or email ${CONTACT_EMAIL} directly.`);
      } else if (res.status === 503) {
        setErrorMsg(`Enquiries aren't switched on yet, email ${CONTACT_EMAIL} directly instead.`);
      } else if (data?.error === 'name_email_and_message_required') {
        setErrorMsg('Please fill in your name, a valid email, and a message.');
      } else {
        setErrorMsg('Something went wrong, please try again.');
      }
      setStatus('error');
    } catch {
      setErrorMsg('Network error, please try again.');
      setStatus('error');
    }
  }

  function sendAnother() {
    setStatus('idle');
    setMessage('');
    setOrganization('');
  }

  const inputStyle: React.CSSProperties = {
    padding: '13px 16px',
    background: 'var(--em-paper)',
    color: 'var(--em-near-black)',
    border: '2px solid var(--em-near-black)',
    borderRadius: 10,
    fontFamily: 'var(--f-work-sans)',
    fontSize: 15,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <>
      {/* FOUR ROUTE CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 18,
          marginBottom: 60,
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => pickCategory(c.id)}
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: 'inherit',
              background: category === c.id ? 'var(--em-crimson)' : 'var(--em-paper)',
              color: category === c.id ? 'var(--em-paper)' : 'var(--em-near-black)',
              border: '2px solid var(--em-near-black)',
              borderRadius: 14,
              padding: '24px 22px',
              transition: 'background .15s ease, color .15s ease, transform .15s ease',
            }}
            className="emx-lane"
          >
            <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 19, marginBottom: 8 }}>
              {c.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--f-work-sans)',
                fontSize: 14,
                lineHeight: 1.5,
                opacity: category === c.id ? 0.92 : 0.7,
              }}
            >
              {c.blurb}
            </div>
          </button>
        ))}
      </div>

      {/* ENQUIRY FORM */}
      <div
        id="enquiry-form"
        style={{
          background: 'var(--em-paper)',
          color: 'var(--em-near-black)',
          border: '2px solid var(--em-near-black)',
          borderRadius: 20,
          padding: '36px 32px',
          scrollMarginTop: 100,
        }}
      >
        {status !== 'sent' ? (
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Honeypot */}
            <input
              type="text"
              name="hp_field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
            />

            <div>
              <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 10 }}>
                Category
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    style={{
                      fontFamily: 'var(--f-work-sans)',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 700,
                      background: category === c.id ? 'var(--em-crimson)' : 'transparent',
                      color: category === c.id ? 'var(--em-paper)' : 'var(--em-near-black)',
                      border: '2px solid var(--em-near-black)',
                      borderRadius: 999,
                      padding: '8px 16px',
                      transition: 'background .15s ease, color .15s ease',
                    }}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="max-[460px]:!grid-cols-1">
              <div>
                <label htmlFor="wwe-name" style={{ display: 'block', fontFamily: 'var(--f-work-sans)', fontSize: 12, fontWeight: 700, opacity: 0.6, marginBottom: 6 }}>
                  Name *
                </label>
                <input
                  id="wwe-name"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="wwe-email" style={{ display: 'block', fontFamily: 'var(--f-work-sans)', fontSize: 12, fontWeight: 700, opacity: 0.6, marginBottom: 6 }}>
                  Email *
                </label>
                <input
                  id="wwe-email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label htmlFor="wwe-org" style={{ display: 'block', fontFamily: 'var(--f-work-sans)', fontSize: 12, fontWeight: 700, opacity: 0.6, marginBottom: 6 }}>
                Organization (optional)
              </label>
              <input
                id="wwe-org"
                placeholder="Company, brand or organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="wwe-message" style={{ display: 'block', fontFamily: 'var(--f-work-sans)', fontSize: 12, fontWeight: 700, opacity: 0.6, marginBottom: 6 }}>
                Message *
              </label>
              <textarea
                id="wwe-message"
                required
                rows={5}
                placeholder={active.placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                fontFamily: 'var(--f-work-sans)',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                fontWeight: 800,
                fontSize: 15,
                background: 'var(--em-crimson)',
                color: 'var(--em-paper)',
                border: 'none',
                borderRadius: 999,
                padding: '15px 20px',
                opacity: status === 'sending' ? 0.7 : 1,
                marginTop: 6,
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>

            {status === 'error' && (
              <span style={{ fontFamily: 'var(--f-work-sans)', fontStyle: 'italic', fontSize: 14, color: 'var(--em-crimson)' }}>
                {errorMsg}
              </span>
            )}
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>
              Got it, {name.trim().split(/\s+/)[0] || 'thanks'}.
            </div>
            <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 15, opacity: 0.75, marginBottom: 20 }}>
              A real person reads every enquiry and will reply by email, usually within a few business days.
            </div>
            <button
              type="button"
              onClick={sendAnother}
              style={{
                fontFamily: 'var(--f-work-sans)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 13,
                background: 'transparent',
                color: 'var(--em-near-black)',
                border: '2px solid var(--em-near-black)',
                borderRadius: 999,
                padding: '9px 18px',
              }}
            >
              Send another enquiry
            </button>
          </div>
        )}
      </div>
    </>
  );
}
