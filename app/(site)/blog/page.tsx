import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog';
import { BlogListClient } from './BlogListClient';

// Blog list — structure/layout ported from the DCLogic mockup at
// "Celebrity website project/Blog.dc.html" (list view). Content is
// DB-driven (Supabase `blog_posts`, RLS-scoped to status = 'published'),
// not static, so this stays a plain server-fetched page rather than a
// build-time export -- ISR via `revalidate` below, refreshed further by
// Phase 4's admin `revalidatePath` calls on publish/edit. The table has no
// real rows yet until the migration + seed data in
// supabase/migrations/002_site_rebuild.sql are actually run against the
// live DB, and `getPublishedPosts()` fails soft (env vars unset, network
// error, or a genuinely empty table all return `[]`) -- so the empty state
// below is real, expected UI, not an error path.
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Eugine Micah writes on journalism, building Roylandz Media, Kenyan youth culture and the story behind his memoir Born Broke. Built Loud.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main>
      <header style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 28px 34px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, fontWeight: 600, opacity: 0.55, marginBottom: 16 }}>
          <Link href="/" className="emx-link">
            Home
          </Link>{' '}
          / <span>Blog</span>
        </nav>
        <div style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', fontSize: 26, color: 'var(--a)' }}>
          notes from the desk
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 'clamp(40px, 5.5vw, 68px)', letterSpacing: '-2px', lineHeight: 0.98, margin: '8px 0 16px' }}>
          The blog
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 560, fontWeight: 500, margin: 0 }}>
          Thoughts on journalism, building Roylandz Media, and what it takes to turn a story into a career, written
          between shows.
        </p>
      </header>

      {posts.length > 0 ? (
        <BlogListClient posts={posts} />
      ) : (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 120px' }}>
          <div
            style={{
              border: '3px solid var(--text)',
              borderRadius: 20,
              padding: '60px 40px',
              textAlign: 'center',
              background: 'var(--bg)',
              boxShadow: '6px 6px 0 var(--a)',
            }}
          >
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-1px', margin: '0 0 12px' }}>
              Nothing filed yet
            </h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                opacity: 0.75,
                margin: '0 auto 24px',
                maxWidth: 480,
              }}
            >
              The desk is still setting up. New posts on journalism, media and the book land here first — check back
              soon.
            </p>
            <Link
              href="/"
              className="emx-cta"
              style={{
                display: 'inline-block',
                fontWeight: 700,
                background: 'var(--a)',
                color: '#FAF4EA',
                border: '3px solid var(--text)',
                borderRadius: 14,
                padding: '13px 24px',
                boxShadow: '4px 4px 0 var(--text)',
              }}
            >
              Back home
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
