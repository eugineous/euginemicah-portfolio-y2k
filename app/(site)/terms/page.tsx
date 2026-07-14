import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for euginemicah.tech, covering the book checkout, booking inquiries, and content ownership.',
  alternates: { canonical: '/terms' },
};

const h2 = { margin: '0 0 12px', fontWeight: 800, fontSize: 20 } as const;
const p = { margin: 0, fontSize: 16, lineHeight: 1.7, fontWeight: 500 } as const;

const sections = [
  {
    id: 'sec1',
    n: 1,
    color: 'var(--a)',
    fg: '#FAF4EA',
    title: 'Using this site',
    body: (
      <p style={p}>
        This website shares information about Eugine Micah&rsquo;s media work, shows, book, and business,
        Roylandz Media. By browsing it, you agree to use it lawfully and not misrepresent, copy, or redistribute
        its content without permission.
      </p>
    ),
  },
  {
    id: 'sec2',
    n: 2,
    color: 'var(--b)',
    fg: '#FAF4EA',
    title: 'Content & intellectual property',
    body: (
      <p style={p}>
        All text, photography, show clips, the book &ldquo;Born Broke. Built Loud.,&rdquo; and related branding on
        this site are the property of Eugine Micah / Roylandz Media unless otherwise credited. You may share
        links to this site freely. You may not reproduce, republish, or commercially reuse any content from this
        site without prior written permission.
      </p>
    ),
  },
  {
    id: 'sec3',
    n: 3,
    color: 'var(--c)',
    fg: '#1B1714',
    title: 'Bookings & engagements',
    body: (
      <p style={p}>
        Messages sent via{' '}
        <Link href="/messages" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
          /messages
        </Link>{' '}
        or any booking inquiry elsewhere on this site are expressions of interest, not confirmed engagements. No
        keynote, hosting, panel, workshop, or Urban Gang Tour appointment is confirmed until both parties have
        agreed the date, fee, and scope of the engagement in writing.
      </p>
    ),
  },
  {
    id: 'sec4',
    n: 4,
    color: 'var(--a)',
    fg: '#FAF4EA',
    title: 'Book purchases',
    body: (
      <>
        <p style={p}>
          &ldquo;Born Broke. Built Loud.&rdquo; is sold as an instant digital download on{' '}
          <Link href="/book" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
            /book
          </Link>
          . Payment is processed by Paystack (card and M-Pesa); we never collect or store your payment details
          directly. On successful payment, a signed download link is issued and stays valid for 48 hours.
        </p>
        <p style={{ ...p, marginTop: 14 }}>
          Because the book is delivered digitally and instantly, purchases are generally final. If your download
          link expires or doesn&rsquo;t arrive within that window, contact us via{' '}
          <Link href="/messages" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
            /messages
          </Link>{' '}
          or email and we&rsquo;ll sort it out.
        </p>
      </>
    ),
  },
  {
    id: 'sec5',
    n: 5,
    color: 'var(--b)',
    fg: '#FAF4EA',
    title: 'No warranty',
    body: (
      <p style={p}>
        This site and its content are provided as-is. We work to keep information accurate and up to date but
        make no guarantee that every detail — schedules, availability, tour dates — is current at the moment you
        read it, and we are not liable for errors, omissions, or third-party content linked from this site
        (including social platforms).
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 28px 0' }}>
        <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 24, color: 'var(--a)' }}>
          the fine print
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', margin: '8px 0 8px' }}>Terms of Use</h1>
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
          <h2 style={h2}>Contact</h2>
          <p style={p}>
            Questions about these terms can be sent via{' '}
            <Link href="/messages" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
              /messages
            </Link>{' '}
            or email{' '}
            <a href="mailto:eugine.micah@outlook.com" style={{ color: 'var(--a)', fontWeight: 700 }} className="emx-link">
              eugine.micah@outlook.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
