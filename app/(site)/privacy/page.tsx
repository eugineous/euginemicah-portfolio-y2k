import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How euginemicah.tech collects, uses, and protects the personal data of visitors, message senders, and book buyers.',
  alternates: { canonical: '/privacy' },
};

const h2 = { margin: '0 0 12px', fontWeight: 800, fontSize: 20 } as const;
const p = { margin: 0, fontSize: 16, lineHeight: 1.7, fontWeight: 500 } as const;

const sections = [
  {
    id: 'sec1',
    n: 1,
    color: 'var(--a)',
    fg: '#FAF4EA',
    title: 'What we collect',
    body: (
      <>
        <p style={p}>We collect only what you give us directly, in two places on this site:</p>
        <ul style={{ ...p, margin: '14px 0 0', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>
            <strong>Buying the book:</strong> your name and email address. Card and M-Pesa details are entered
            directly on Paystack&rsquo;s own secure payment page — they never touch this site or get stored on
            our servers.
          </li>
          <li>
            <strong>Sending a message:</strong> your name, email address, and whatever you write to us — whether
            it&rsquo;s a general message, a booking inquiry, or a press request.
          </li>
        </ul>
        <p style={{ ...p, marginTop: 14 }}>
          Standard hosting logs (IP address, browser type, pages visited) are retained briefly by our hosting
          provider for security and uptime purposes, as is normal for any website.
        </p>
      </>
    ),
  },
  {
    id: 'sec2',
    n: 2,
    color: 'var(--b)',
    fg: '#FAF4EA',
    title: 'How we use it',
    body: (
      <p style={p}>
        Order details are used to confirm your purchase and generate the link to your digital download. Message
        details are used only to read and reply to what you sent us. We do not use your contact information for
        anything you did not sign up for, and we do not send marketing email today.
      </p>
    ),
  },
  {
    id: 'sec3',
    n: 3,
    color: 'var(--c)',
    fg: '#1B1714',
    title: 'Payment processing',
    body: (
      <p style={p}>
        Book purchases are processed by <strong>Paystack</strong>, a licensed payment processor covering card
        and M-Pesa payments. Paystack collects and stores your payment details on its own secure, PCI-compliant
        systems — we never see, enter, or store your card number or M-Pesa PIN anywhere on this site. Once
        Paystack confirms a successful payment through a cryptographically verified notification, we store your
        name, email, order reference, and amount paid, so we can deliver your download and help if something
        goes wrong.
      </p>
    ),
  },
  {
    id: 'sec4',
    n: 4,
    color: 'var(--a)',
    fg: '#FAF4EA',
    title: 'Where your data lives',
    body: (
      <p style={p}>
        Order and message records are stored in Supabase, a hosted database provider, with access restricted to
        the small team operating this site. Your book download is not a public file — after payment, we
        generate a signed link that expires 48 hours after checkout, so the PDF is never sitting at a guessable
        public URL.
      </p>
    ),
  },
  {
    id: 'sec5',
    n: 5,
    color: 'var(--b)',
    fg: '#FAF4EA',
    title: 'Sharing & sale of data',
    body: (
      <p style={p}>
        We do not sell, rent, or trade your personal data to anyone, for marketing or any other purpose. It is
        shared only with the processors strictly needed to run this site — Paystack for payment, and Supabase
        for secure storage of order and message records.
      </p>
    ),
  },
  {
    id: 'sec6',
    n: 6,
    color: 'var(--c)',
    fg: '#1B1714',
    title: 'Your rights under Kenyan law',
    body: (
      <p style={p}>
        This is a Kenyan personal-brand site and we handle your data in line with the Kenya Data Protection Act,
        2019. You have the right to know what data we hold about you, to request a correction, to request
        deletion, and to withdraw consent at any time. Send that request via{' '}
        <Link href="/messages" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
          the messages page
        </Link>{' '}
        or email — we will act on it within a reasonable time and without unnecessary formality.
      </p>
    ),
  },
  {
    id: 'sec7',
    n: 7,
    color: 'var(--a)',
    fg: '#FAF4EA',
    title: 'Cookies & local storage',
    body: (
      <p style={p}>
        This site uses local storage only to remember your light/dark theme preference. No third-party
        advertising or analytics tracking is active on this site today; if that changes in future, this policy
        will be updated first.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 28px 0' }}>
        <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--b)' }}>
          what we keep
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', margin: '8px 0 8px' }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, opacity: 0.6, fontWeight: 600, margin: '0 0 32px' }}>Last updated July 2026</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 44 }}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="emx-navdot emx-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                border: '2px solid var(--text)',
                borderRadius: 999,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: s.color,
                  color: s.fg,
                  fontSize: 10,
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {s.n}
              </span>
              {s.title}
            </a>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px 100px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        {sections.map((s) => (
          <div key={s.id} id={s.id}>
            <h2 style={h2}>
              {s.n}. {s.title}
            </h2>
            {s.body}
          </div>
        ))}

        <div style={{ borderTop: '2px solid var(--text)', paddingTop: 28 }}>
          <h2 style={h2}>Contact us about your data</h2>
          <p style={p}>
            For any question, correction, or deletion request relating to your personal data, write to us via{' '}
            <Link href="/messages" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
              /messages
            </Link>{' '}
            or email{' '}
            <a href="mailto:eugine.micah@outlook.com" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
              eugine.micah@outlook.com
            </a>
            . We aim to respond within a few business days. If this policy changes in a meaningful way, we&rsquo;ll
            update the date at the top of this page.
          </p>
        </div>
      </section>
    </main>
  );
}
