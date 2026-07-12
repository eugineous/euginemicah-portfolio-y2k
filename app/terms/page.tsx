import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for euginemicah.tech, covering book pre-orders, booking inquiries, and content ownership.',
  alternates: { canonical: '/terms' },
};

const h2 = { margin: '0 0 6px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 24, letterSpacing: '-.01em', color: '#191613' } as const;
const p = { margin: 0, fontFamily: "'Newsreader'", fontSize: 17, lineHeight: 1.75, color: '#33302A' } as const;

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F6F0E2', color: '#191613', fontFamily: "'Newsreader',Georgia,serif" }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 28px 100px' }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: 40, fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6E6455' }}>← Back to the front page</Link>

        <p style={{ margin: '0 0 14px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C03B22', fontWeight: 600 }}>Legal</p>
        <h1 style={{ margin: '0 0 8px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(38px,5vw,58px)', lineHeight: 1.02, letterSpacing: '-.02em' }}>Terms</h1>
        <p style={{ margin: '0 0 48px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6E6455' }}>Last updated July 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
          <p style={p}>
            euginemicah.tech is the personal and editorial website of Eugine Micah — journalist, author,
            speaker, and curator of culture. By using this site, you agree to the terms below.
          </p>

          <div>
            <h2 style={h2}>Book pre-orders</h2>
            <p style={p}>
              &ldquo;Born Broke. Built Loud.&rdquo; has not yet been published. Submitting the pre-order form
              registers your interest only — it is not a purchase. No payment is taken and no charge is
              made at any point during pre-order. Because the book is not yet published, we cannot guarantee
              a delivery date; pre-order registrants will be contacted with updates as they become available.
            </p>
          </div>

          <div>
            <h2 style={h2}>Booking and speaking inquiries</h2>
            <p style={p}>
              Messages sent through the contact form or booking inquiries elsewhere on this site are
              expressions of interest, not confirmed engagements. No keynote, hosting, panel, workshop, or
              Urban Gang Tour appointment is confirmed until both parties have signed a separate written
              agreement setting out the date, fee, and scope of the engagement.
            </p>
          </div>

          <div>
            <h2 style={h2}>Content ownership</h2>
            <p style={p}>
              All articles, photographs, video, and other content on this site are copyrighted to Eugine
              Micah and Roylandz Media unless otherwise credited. You may share links to this site freely.
              You may not reproduce, republish, or commercially reuse any content from this site without
              prior written permission.
            </p>
          </div>

          <div>
            <h2 style={h2}>Merchandise and other listings</h2>
            <p style={p}>
              Product listings on this site describe items associated with the Urban Gang Tour and are
              subject to availability. Details of any purchase, including payment and delivery, are handled
              through the checkout process shown at the time of order, not through this page.
            </p>
          </div>

          <div>
            <h2 style={h2}>No warranty</h2>
            <p style={p}>
              This site and its content are provided as-is. We work to keep information accurate and
              up to date but make no guarantee that every detail — schedules, tour dates, availability — is
              current at the moment you read it.
            </p>
          </div>

          <div>
            <h2 style={h2}>Contact</h2>
            <p style={p}>
              Questions about these terms can be sent to{' '}
              <a href="mailto:eugine.micah@outlook.com" style={{ color: '#C03B22' }}>eugine.micah@outlook.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
