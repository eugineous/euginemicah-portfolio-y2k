import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How euginemicah.tech collects, uses, and protects the personal data of visitors, subscribers, and pre-order customers.',
  alternates: { canonical: '/privacy-policy' },
};

const h2 = { margin: '0 0 6px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 24, letterSpacing: '-.01em', color: '#191613' } as const;
const p = { margin: 0, fontFamily: "'Newsreader'", fontSize: 17, lineHeight: 1.75, color: '#33302A' } as const;

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F6F0E2', color: '#191613', fontFamily: "'Newsreader',Georgia,serif" }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 28px 100px' }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: 40, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6E6455' }}>← Back to the front page</Link>

        <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Legal</p>
        <h1 style={{ margin: '0 0 8px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(38px,5vw,58px)', lineHeight: 1.02, letterSpacing: '-.02em' }}>Privacy Policy</h1>
        <p style={{ margin: '0 0 48px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>Last updated July 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
          <p style={p}>
            euginemicah.tech is the personal-brand website of Eugine Micah, published in Nairobi, Kenya.
            This policy explains what personal data the site collects, why, and what happens to it. It is
            written to be read, not to be avoided — if anything here is unclear, write to us and we will
            fix the wording.
          </p>

          <div>
            <h2 style={h2}>What we collect</h2>
            <p style={p}>
              We collect only what you give us directly, through three forms on this site:
            </p>
            <ul style={{ ...p, margin: '14px 0 0', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><strong>Contact form (The Mailroom):</strong> your name, email address, and message. Submissions are delivered by formsubmit.co directly to our inbox — we do not run our own mail server.</li>
              <li><strong>Newsletter sign-up:</strong> your email address only, used to send occasional updates about the show, the tour, and the book.</li>
              <li><strong>Book pre-order form:</strong> your name, email, phone number, and an optional note. Pre-order records are stored in our Supabase database so we can notify you when the book ships.</li>
            </ul>
            <p style={{ ...p, marginTop: 14 }}>
              We do not use tracking pixels, third-party ad networks, or behavioural analytics cookies on
              this site. Standard hosting logs (IP address, browser type, pages visited) are retained
              briefly by our hosting provider for security and uptime purposes, as is normal for any website.
            </p>
          </div>

          <div>
            <h2 style={h2}>Why we collect it</h2>
            <p style={p}>
              Data is used strictly for the purpose you gave it to us: responding to your inquiry, sending
              the newsletter you subscribed to, and processing and communicating about a book pre-order.
              We do not use your contact details for anything you did not sign up for.
            </p>
          </div>

          <div>
            <h2 style={h2}>No payment processing, no sale of data</h2>
            <p style={p}>
              Book pre-orders on this site are interest registrations only — no payment is collected and no
              charge is made at any point during pre-order. We do not sell, rent, or trade your personal data
              to any third party, for marketing or any other purpose.
            </p>
          </div>

          <div>
            <h2 style={h2}>Where your data lives</h2>
            <p style={p}>
              Contact and newsletter submissions pass through formsubmit.co to reach our inbox and are not
              separately stored on our servers. Pre-order details are stored in Supabase, a hosted database
              provider, with access restricted to the team operating this site.
            </p>
          </div>

          <div>
            <h2 style={h2}>Your rights under Kenyan law</h2>
            <p style={p}>
              This is a Kenyan personal-brand site and, as such, we handle your data in line with the Kenya
              Data Protection Act, 2019. You have the right to know what data we hold about you, to request
              a correction, to request deletion, and to withdraw consent (such as unsubscribing from the
              newsletter) at any time. We will act on any such request within a reasonable time and without
              unnecessary formality.
            </p>
          </div>

          <div>
            <h2 style={h2}>Contact us about your data</h2>
            <p style={p}>
              For any question, correction, or deletion request relating to your personal data, email{' '}
              <a href="mailto:eugine.micah@outlook.com" style={{ color: '#C03B22' }}>eugine.micah@outlook.com</a>.
              We aim to respond within a few business days.
            </p>
          </div>

          <div>
            <h2 style={h2}>Changes to this policy</h2>
            <p style={p}>
              If this policy changes in a meaningful way, we will update the date at the top of this page.
              Continued use of the site after a change means you accept the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
