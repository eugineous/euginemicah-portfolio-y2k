import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/control-room', '/api/', '/uploads/'] },
    ],
    sitemap: 'https://euginemicah.tech/sitemap.xml',
  };
}
