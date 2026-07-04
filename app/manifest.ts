import type { MetadataRoute } from 'next';
import { business } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description:
      'Digital print, bindery, apparel, direct mail, and promotional production in the Capital Region.',
    start_url: '/',
    display: 'standalone',
    background_color: '#151515',
    theme_color: '#C8102E',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
