import { MetadataRoute } from 'next';
import { CALCULATORS, CATEGORIES } from '@/data/calculator-directory';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculator-hub-eosin-one.vercel.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.5,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const calculatorRoutes: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes];
}
