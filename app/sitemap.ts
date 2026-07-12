import type { MetadataRoute } from 'next';
import { articlesData } from '@/content/em-site-data';

const SITE = 'https://euginemicah.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/story`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/tour`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/journal`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/shop`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE}/book`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/book-me`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/gallery`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articlesData.map((a) => ({
    url: `${SITE}/journal/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
