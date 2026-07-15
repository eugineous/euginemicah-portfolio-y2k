import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryStyle, formatPostDate, getPostBySlug, getPublishedPosts } from '@/lib/blog';
import { ShareButton } from './ShareButton';

// Blog post detail — structure/typography ported from the DCLogic mockup at
// "Celebrity website project/Blog.dc.html" (post view). Content is
// DB-driven and can change without a redeploy, so `generateStaticParams`
// isn't viable here -- this is a dynamic/ISR route instead, refreshed
// further by Phase 4's admin `revalidatePath` calls on publish/edit.
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  const recentPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 5);
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const swatch = categoryStyle(post.category);

  return (
    <section
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '60px 28px 100px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 300px',
        gap: 44,
        alignItems: 'start',
      }}
      className="max-[860px]:!grid-cols-1"
    >
      <article>
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, fontWeight: 600, opacity: 0.55, marginBottom: 24 }}>
          <Link href="/" className="emx-link">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/blog" className="emx-link">
            Blog
          </Link>{' '}
          / <span>{post.category}</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              background: swatch.bg,
              color: swatch.color,
              border: '2px solid #1B1714',
              borderRadius: 999,
              padding: '4px 12px',
            }}
          >
            {post.category}
          </span>
          <time style={{ fontSize: 13, fontWeight: 600, opacity: 0.6 }}>{formatPostDate(post.published_at)}</time>
          <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.6 }}>· {post.read_time}</span>
        </div>

        <h1 style={{ fontWeight: 800, fontSize: 'clamp(32px, 4.2vw, 50px)', letterSpacing: '-1.5px', lineHeight: 1.05, margin: '0 0 26px' }}>
          {post.title}
        </h1>

        <div style={{ fontSize: 17, lineHeight: 1.8, fontWeight: 500 }}>
          {post.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: '0 0 20px' }}>
              {p}
            </p>
          ))}
        </div>

        {post.tag_chips.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '30px 0' }}>
            {post.tag_chips.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  background: 'var(--bg)',
                  border: '1.5px solid #1B1714',
                  borderRadius: 999,
                  padding: '6px 13px',
                  color: 'var(--text)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            padding: '24px 0',
            borderTop: '2px solid var(--text)',
            borderBottom: '2px solid var(--text)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 44,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAF4EA',
                fontWeight: 800,
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              EM
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>Eugine Micah</div>
              <div style={{ fontSize: 12.5, opacity: 0.6, fontWeight: 600 }}>Presenter · Journalist · Founder</div>
            </div>
          </div>
          <ShareButton />
        </div>

        {relatedPosts.length > 0 && (
          <>
            <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.55, marginBottom: 18 }}>
              More on {post.category}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  style={{
                    display: 'block',
                    background: 'var(--bg)',
                    border: '2.5px solid var(--text)',
                    borderRadius: 14,
                    padding: 18,
                    color: 'var(--text)',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 15.5, lineHeight: 1.3, marginBottom: 8 }}>{rel.title}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.55 }}>{formatPostDate(rel.published_at)}</div>
                </Link>
              ))}
            </div>
          </>
        )}

        <Link href="/blog" className="emx-link" style={{ display: 'inline-block', marginTop: 40, fontWeight: 700, fontSize: 14, color: 'var(--a)' }}>
          ← Back to the blog
        </Link>
      </article>

      <aside style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {recentPosts.length > 0 && (
          <div style={{ background: '#fff', border: '3px solid #1B1714', borderRadius: 16, padding: 22, boxShadow: '5px 5px 0 var(--a)' }}>
            <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.55, marginBottom: 14, color: '#1B1714' }}>
              Recent posts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {recentPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="emx-link" style={{ display: 'block', color: '#1B1714' }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.35 }}>{rp.title}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.55, marginTop: 3 }}>{formatPostDate(rp.published_at)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <Link
          href="/messages"
          className="emx-link"
          style={{ display: 'block', background: '#1B1714', color: '#FAF4EA', borderRadius: 16, padding: 22, textAlign: 'center' }}
        >
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6 }}>Have a story tip?</div>
          <div style={{ fontSize: 13, opacity: 0.75, fontWeight: 500 }}>Get in touch →</div>
        </Link>
      </aside>
    </section>
  );
}
