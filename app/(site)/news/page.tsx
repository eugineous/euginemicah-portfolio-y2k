import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts, formatPostDate } from '@/lib/blog';

// New route, verbatim structure/copy from design_handoff_full_site_backend
// /site/News.dc.html. The design's own "from the blog" grid was client-side
// (fetched a static JSON file); this uses the same real Supabase-backed
// getPublishedPosts() the rest of the site already uses for /blog, as a
// server component, instead of porting the client-fetch pattern.

export const metadata: Metadata = {
  title: 'News: Eugine Micah',
  description: 'Press clips, publications, and writing from Eugine Micah.',
  alternates: { canonical: '/news' },
};

const clips = [
  {
    source: 'Citizen Digital',
    type: 'Byline',
    title: 'Mudavadi hands over ANC leadership to Lamu Governor Timamy',
    href: 'https://citizen.digital/news/mudavadi-hands-over-anc-leadership-to-lamu-governor-timamy-n309448',
  },
  {
    source: 'Global Cyber Alliance',
    type: 'Publication, 2021',
    title: 'Protecting the Online Safety of Journalists in Africa',
    href: 'https://gcatoolkit.org/',
  },
  {
    source: 'Muck Rack',
    type: 'Portfolio',
    title: 'Full journalist portfolio',
    href: 'https://muckrack.com/eugine-micah/portfolio',
  },
  {
    source: 'LinkedIn',
    type: 'Article',
    title: 'The Mentor I Never Expected, and the Message That Saved My Life',
    href: 'https://www.linkedin.com/pulse/mentor-i-never-expected-message-saved-my-life-eugine-micah-r7d6f',
  },
  {
    source: 'LinkedIn',
    type: 'Article, on LinkedIn',
    title: 'The Thing Joe Rogan Said That Changed How I See My Career',
    href: 'https://ke.linkedin.com/in/euginemicah',
  },
  {
    source: 'LinkedIn',
    type: 'Article, on LinkedIn',
    title: "Behind Every Successful Campaign: The Lessons They Don't Teach You",
    href: 'https://ke.linkedin.com/in/euginemicah',
  },
];

export default async function NewsPage() {
  const posts = (await getPublishedPosts()).slice(0, 4);

  return (
    <main>
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '70px 32px 40px' }}>
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
          News
        </div>
        <h1
          style={{
            fontFamily: 'var(--f-archivo)',
            fontWeight: 900,
            fontSize: 'clamp(34px, 5.5vw, 60px)',
            lineHeight: 0.98,
            letterSpacing: '-0.01em',
            color: 'var(--em-near-black)',
            margin: 0,
            maxWidth: 800,
          }}
        >
          In the press, and in his own words.
        </h1>
      </section>

      {/* CLIPS & MENTIONS */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px 70px' }}>
        <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 24, color: 'var(--em-near-black)', marginBottom: 24 }}>
          Clips &amp; mentions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {clips.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                padding: '18px 4px',
                borderTop: '2px solid var(--em-near-black)',
                textDecoration: 'none',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--f-work-sans)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--em-crimson)',
                    marginBottom: 4,
                  }}
                >
                  {c.source} &middot; {c.type}
                </div>
                <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 700, fontSize: 16, color: 'var(--em-near-black)' }}>{c.title}</div>
              </div>
              <div style={{ flex: 'none', fontFamily: 'var(--f-work-sans)', fontSize: 13, fontWeight: 700, color: 'var(--em-near-black)' }}>Read &rarr;</div>
            </a>
          ))}
          <div style={{ borderTop: '2px solid var(--em-near-black)' }} />
        </div>
      </section>

      {/* FROM THE BLOG */}
      <section style={{ background: 'var(--em-near-black)', padding: '70px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 900, fontSize: 24, color: 'var(--em-paper)', marginBottom: 24 }}>
            From the blog
          </div>
          {posts.length === 0 ? (
            <div style={{ fontFamily: 'var(--f-work-sans)', color: 'rgba(250,247,242,0.5)', fontSize: 15 }}>New posts coming soon.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, background: 'var(--em-paper)' }}>
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  style={{ display: 'flex', flexDirection: 'column', background: 'var(--em-near-black)', textDecoration: 'none' }}
                >
                  <div style={{ padding: 22 }}>
                    <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 12, color: 'rgba(250,247,242,0.5)', marginBottom: 8 }}>
                      {formatPostDate(p.published_at)}
                    </div>
                    <div style={{ fontFamily: 'var(--f-archivo)', fontWeight: 800, fontSize: 18, color: 'var(--em-paper)', marginBottom: 8 }}>{p.title}</div>
                    <div style={{ fontFamily: 'var(--f-work-sans)', fontSize: 13, color: 'rgba(250,247,242,0.6)', lineHeight: 1.5 }}>{p.excerpt}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
