'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui';
import type { ApiFn } from './types';

type Stats = {
  newMessages: number;
  draftPosts: number;
  publishedPosts: number;
  draftShows: number;
  subscribers: number;
  orders: number;
};

// Landing tab -- a quick-glance summary before diving into any one table.
// Reuses the same list endpoints every other tab already calls (no new
// backend route) and just counts client-side; fine at this site's traffic.
export function OverviewTab({ api, onNavigate }: { api: ApiFn; onNavigate: (tab: string) => void }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [messages, blog, shows, newsletter, orders] = await Promise.all([
        api('/api/cms/messages'),
        api('/api/cms/blog'),
        api('/api/cms/shows'),
        api('/api/cms/newsletter'),
        api('/api/cms/book-purchases'),
      ]);
      if (cancelled) return;
      setStats({
        newMessages: (messages.data.messages || []).filter((m: { status: string }) => m.status === 'new').length,
        draftPosts: (blog.data.posts || []).filter((p: { status: string }) => p.status === 'draft').length,
        publishedPosts: (blog.data.posts || []).filter((p: { status: string }) => p.status === 'published').length,
        draftShows: (shows.data.shows || []).filter((s: { status: string }) => s.status === 'draft').length,
        subscribers: (newsletter.data.subscribers || []).length,
        orders: (orders.data.purchases || []).length,
      });
    })();
    return () => { cancelled = true; };
  }, [api]);

  const cards: { label: string; value: number | string; tab: string; tone?: 'warn' }[] = stats
    ? [
        { label: 'New messages', value: stats.newMessages, tab: 'messages', tone: stats.newMessages > 0 ? 'warn' : undefined },
        { label: 'Published posts', value: stats.publishedPosts, tab: 'blog' },
        { label: 'Draft posts', value: stats.draftPosts, tab: 'blog', tone: stats.draftPosts > 0 ? 'warn' : undefined },
        { label: 'Draft work items', value: stats.draftShows, tab: 'shows' },
        { label: 'Newsletter subscribers', value: stats.subscribers, tab: 'newsletter' },
        { label: 'Book orders', value: stats.orders, tab: 'orders' },
      ]
    : [];

  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 800 }}>Overview</h2>
      {!stats ? (
        <span style={{ opacity: 0.6, fontSize: 14 }}>Loading…</span>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          {cards.map((c) => (
            <Card
              key={c.label}
              style={{ padding: 18, cursor: 'pointer' }}
            >
              <button
                type="button"
                onClick={() => onNavigate(c.tab)}
                style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer' }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: c.tone === 'warn' ? '#C0392B' : 'var(--text)' }}>{c.value}</div>
                <div style={{ fontSize: 12.5, opacity: 0.65, marginTop: 4 }}>{c.label}</div>
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
