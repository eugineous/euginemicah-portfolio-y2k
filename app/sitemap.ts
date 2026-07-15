import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/blog';

const SITE = 'https://euginemicah.tech';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/shows`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/book`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/press`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/roylandz`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/work`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/messages`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  // Blog posts are DB-backed and change without a redeploy, so pull the
  // live published list at build/revalidate time instead of a static
  // import. Graceful fallback (empty array) if Supabase env vars aren't
  // set, so sitemap generation never fails the build.
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
