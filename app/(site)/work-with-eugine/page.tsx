import type { Metadata } from 'next';
import Link from 'next/link';
import { EnquiryForm } from './EnquiryForm';

// /work-with-eugine: the new brand IA's single enquiry hub, replacing the
// old scattered /work, /roylandz "book a session" CTAs as the one place the
// header's primary CTA and SiteFooter link point to (see SiteHeader.tsx,
// SiteFooter.tsx). Structure per the 2026-08 design handoff: an H1, four
// category cards ("four ways in"), one enquiry form, and an FAQ, all
// verbatim from design_handoff_full_site_backend/site/WorkWithEugine.dc.html
// (including its FAQPage JSON-LD, ported below), fetched directly via
// DesignSync. An earlier pass wrote plausible-but-invented FAQ copy after
// hitting the same tool from inside a subagent that doesn't have DesignSync
// access: that content has been replaced with the real source text.

export const metadata: Metadata = {
  title: 'Work With Eugine',
  description:
    'Four ways to work with Eugine Micah: appearances, brand partnerships, media and production projects, or speaking and press conversations.',
  alternates: { canonical: '/work-with-eugine' },
};

// force-dynamic -- see app/(site)/work/page.tsx's comment for why every
// rebrand page needs this on this deployment.
export const dynamic = 'force-dynamic';

const faqs: { q: string; a: string }[] = [
  {
    q: 'What kind of speaking and hosting does Eugine do?',
    a: 'Live hosting, MC work, panel moderation, and on-air appearances, from school events to brand activations and panels.',
  },
  {
    q: 'Does Eugine do brand partnerships?',
    a: 'Yes. Campaigns, youth-focused initiatives and live activations are considered case by case: send details through the Partnerships category above.',
  },
  {
    q: 'Can Eugine speak on journalism, media or digital strategy?',
    a: 'Yes: interviews, panels and talks on broadcast journalism, content strategy and digital publishing fall under the Conversations route.',
  },
  {
    q: 'Is Eugine available for digital or content strategy projects?',
    a: 'Selectively, through the Projects route: share scope, timeline and budget range and the team will follow up.',
  },
  {
    q: "What's the availability and lead time?",
    a: 'It varies by format and season. Earlier outreach, especially for event dates, gets a faster answer.',
  },
  {
    q: "What's the booking process?",
    a: "Pick a category above, share the details requested, and Eugine's team will follow up directly. No fixed rates are published: every request is scoped individually.",
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function WorkWithEuginePage() {
  return (
    <main>
      {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 0' }}>
        <div
          style={{
            fontFamily: 'var(--f-work-sans)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--em-crimson)',
            marginBottom: 14,
          }}
        >
          Work with Eugine
        </div>
        <h1
          style={{
            fontFamily: 'var(--f-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(38px, 6vw, 64px)',
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            color: 'var(--em-near-black)',
            margin: '0 0 20px',
          }}
        >
          Four ways in.
        </h1>
        <p
          style={{
            fontFamily: 'var(--f-work-sans)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'rgba(23,23,26,0.75)',
            margin: '0 0 56px',
            maxWidth: 620,
          }}
        >
          Pick the category closest to what you need, then send the details below. A real person reads every
          enquiry.
        </p>
      </section>

      {/* CARDS + FORM (client-interactive) */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 90px' }}>
        <EnquiryForm />
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--em-near-black)', padding: '90px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--f-work-sans)',
              fontStyle: 'italic',
              fontSize: 22,
              color: 'var(--em-tan)',
              marginBottom: 12,
            }}
          >
            before you send it
          </div>
          <h2
            style={{
              fontFamily: 'var(--f-archivo)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '-1px',
              color: 'var(--em-paper)',
              margin: '0 0 40px',
            }}
          >
            Frequently asked.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {faqs.map((f, i) => (
              <div
                key={f.q}
                style={{
                  padding: '26px 0',
                  borderTop: i === 0 ? '1px solid rgba(250,247,242,0.2)' : undefined,
                  borderBottom: '1px solid rgba(250,247,242,0.2)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--f-archivo)',
                    fontWeight: 800,
                    fontSize: 18,
                    color: 'var(--em-paper)',
                    margin: '0 0 10px',
                  }}
                >
                  {f.q}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--f-work-sans)',
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    color: 'rgba(250,247,242,0.8)',
                    margin: 0,
                  }}
                >
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT NUDGE */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '70px 32px' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-1px' }}>
          Just want to say hello?{' '}
          <Link href="/messages" style={{ color: 'var(--em-crimson)' }}>
            Send a message &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
