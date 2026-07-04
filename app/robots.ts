import type { MetadataRoute } from 'next';
import { business } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const base = business.siteUrl.replace(/\/$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
