import { MetadataRoute } from 'next';
import { dogParks } from '@/data/dogParks';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dogrunnearme.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/parks`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/dog-rules`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/questions`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/trails`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/swimming`, changeFrequency: 'weekly', priority: 0.6 },
  ];

  const parkRoutes: MetadataRoute.Sitemap = dogParks.map((p) => ({
    url: `${baseUrl}/park/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...parkRoutes];
} 