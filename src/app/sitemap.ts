import type { MetadataRoute } from 'next'
import { WORLDS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://euginemicah.com'

  return WORLDS.map((world) => ({
    url: `${baseUrl}${world.route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: world.slug === 'portal' ? 1.0 : 0.8,
  }))
}
