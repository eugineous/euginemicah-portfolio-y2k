import { getPublishedPosts } from '@/lib/blog';

// RSS 2.0 feed for the blog -- suggested in the original design handoff's
// "worth adding" list, never built. Real published posts only, same data
// source as /blog and sitemap.ts. force-dynamic for the same reason as
// every other DB-backed route on this deployment: see app/(site)/work/
// page.tsx's comment for why static/ISR caching doesn't reliably
// invalidate here.
export const dynamic = 'force-dynamic';

const SITE = 'https://euginemicah.tech';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getPublishedPosts();

  const items = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const pubDate = p.published_at ? new Date(p.published_at).toUTCString() : new Date().toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Eugine Micah: Blog</title>
    <link>${SITE}/blog</link>
    <description>Writing from Eugine Micah, broadcaster, journalist, and founder.</description>
    <language>en-ke</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
