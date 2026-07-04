import type { MetadataRoute } from 'next';
import { business } from '@/lib/config';

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/printing-bindery', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/apparel', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/mugs-sublimation', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/direct-mail', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/promotional-products', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/political-printing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/quote', priority: 0.95, changeFrequency: 'monthly' },
  { path: '/quote/thank-you', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/rush', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/upload', priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl.replace(/\/$/, '');
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path === '/' ? '' : path}` || base,
    lastModified,
    changeFrequency,
    priority,
  }));
}
