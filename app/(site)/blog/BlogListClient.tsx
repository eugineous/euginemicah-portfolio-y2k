'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { categoryStyle, formatPostDate, type BlogPost } from '@/lib/blog';

// List-view interactivity (search + category filter + tag cloud) as a thin
// client component wrapping the already-fetched, server-rendered post list.
// Structure/visual language ported from the DCLogic mockup at
// "Celebrity website project/Blog.dc.html" (list view) -- the mockup's
// `<sc-for>`/`{{ }}`/`onChange` bindings aren't portable code, this is a
// from-scratch React reimplementation of the same layout. The mockup's
// "stay in the loop" newsletter box is intentionally NOT reproduced here:
// newsletter_subscribers is Phase 4 scope (see the migration's comments),
// so this phase doesn't ship a signup form with nowhere real to submit to.
// It's swapped for a book promo card (links to the already-live /book) and
// a "have a story tip?" card (links to /messages, matching the same
// forward-link convention already used by press/page.tsx and
// roylandz/page.tsx for that not-yet-built route).

export function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return ['All', ...Array.from(counts.keys())].map((name) => ({
      name,
      count: name === 'All' ? posts.length : counts.get(name) || 0,
    }));
  }, [posts]);

  const tagCloud = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => (p.tag_chips || []).forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [posts]);

  const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);

  const isFiltering = query.trim() !== '' || activeCategory !== 'All';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tag_chips || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query, activeCategory]);

  const featured = !isFiltering ? posts[0] : null;
  const gridPosts = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <section
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 28px 100px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 300px',
        gap: 44,
        alignItems: 'start',
      }}
      className="max-[860px]:!grid-cols-1"
    >
      {/* MAIN COLUMN */}
      <div>
        <div style={{ position: 'relative', maxWidth: 440, marginBottom: 34 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, topics, tags…"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-bricolage), sans-serif',
              fontSize: 15,
              padding: '13px 18px',
              border: '2.5px solid var(--text)',
              borderRadius: 999,
              background: '#fff',
              color: '#1B1714',
            }}
          />
        </div>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="emx-lane"
            style={{
              ['--sh' as string]: 'var(--c)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              background: '#1B1714',
              color: '#FAF4EA',
              border: '3px solid #1B1714',
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 34,
            }}
          >
            <div style={{ padding: 34, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    background: 'var(--c)',
                    color: '#1B1714',
                    borderRadius: 999,
                    padding: '4px 12px',
                  }}
                >
                  Latest
                </span>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    background: 'rgba(250,244,234,0.15)',
                    borderRadius: 999,
                    padding: '4px 12px',
                  }}
                >
                  {featured.category}
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                {featured.title}
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 500, opacity: 0.85 }}>{featured.excerpt}</p>
              <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.6 }}>
                {formatPostDate(featured.published_at)} · {featured.read_time}
              </div>
            </div>
          </Link>
        )}

        <div id="categories" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 26 }}>
          {categories.map((cat) => {
            const active = activeCategory === cat.name;
            const swatch = cat.name === 'All' ? { bg: '#1B1714', color: '#FAF4EA' } : categoryStyle(cat.name);
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                style={{
                  cursor: 'pointer',
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontWeight: 700,
                  fontSize: 13.5,
                  background: active ? swatch.bg : '#fff',
                  color: active ? swatch.color : '#1B1714',
                  border: '2.5px solid #1B1714',
                  borderRadius: 999,
                  padding: '8px 16px',
                }}
              >
                {cat.name} <span style={{ opacity: 0.65 }}>({cat.count})</span>
              </button>
            );
          })}
        </div>

        {gridPosts.length === 0 && (
          <p style={{ fontSize: 15, fontWeight: 600, opacity: 0.6, padding: '30px 0' }}>
            No posts match{query.trim() ? ` "${query.trim()}"` : ' this filter'}. Try another search or clear the filter.
          </p>
        )}

        <div id="posts" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
          {gridPosts.map((post) => {
            const swatch = categoryStyle(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="emx-lane"
                style={{
                  ['--sh' as string]: swatch.bg,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  background: '#fff',
                  border: '3px solid #1B1714',
                  borderRadius: 18,
                  padding: 22,
                  color: '#1B1714',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 11,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      background: swatch.bg,
                      color: swatch.color,
                      border: '2px solid #1B1714',
                      borderRadius: 999,
                      padding: '4px 11px',
                    }}
                  >
                    {post.category}
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, opacity: 0.55 }}>{post.read_time}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', lineHeight: 1.15 }}>{post.title}</div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, fontWeight: 500, flex: 1, opacity: 0.8 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <time style={{ fontSize: 12.5, fontWeight: 600, opacity: 0.55 }}>{formatPostDate(post.published_at)}</time>
                  <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--a)' }}>Read →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SIDEBAR */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
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

        {tagCloud.length > 0 && (
          <div style={{ background: '#fff', border: '3px solid #1B1714', borderRadius: 16, padding: 22, boxShadow: '5px 5px 0 var(--b)' }}>
            <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.55, marginBottom: 14, color: '#1B1714' }}>
              Popular topics
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tagCloud.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  style={{
                    cursor: 'pointer',
                    fontFamily: 'var(--font-bricolage), sans-serif',
                    fontWeight: 600,
                    fontSize: 12.5,
                    background: 'var(--bg)',
                    color: '#1B1714',
                    border: '1.5px solid #1B1714',
                    borderRadius: 999,
                    padding: '6px 12px',
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ border: '2.5px dashed rgba(27,23,20,0.3)', borderRadius: 16, padding: 22, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6, color: '#1B1714' }}>Born Broke, Built Loud</div>
          <p style={{ fontSize: 13, fontWeight: 500, opacity: 0.7, margin: '0 0 14px', color: '#1B1714' }}>
            The memoir behind the headlines.
          </p>
          <Link
            href="/book"
            className="emx-link"
            style={{ display: 'inline-block', fontWeight: 700, fontSize: 13.5, background: '#1B1714', color: '#FAF4EA', borderRadius: 999, padding: '9px 18px' }}
          >
            Learn more →
          </Link>
        </div>

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
