import React from 'react';
import type { Metadata } from 'next';
import { business, services } from '@/lib/config';

/**
 * Per-View Search Identity helpers: every route gets its own
 * title / description / canonical / OG. JSON-LD via <JsonLd />.
 */

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = new URL(path, business.siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${business.siteUrl}/#business`,
    name: business.name,
    url: business.siteUrl,
    telephone: business.phone,
    email: business.email,
    slogan: business.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: 'US',
    },
    areaServed: business.serviceArea,
    knowsAbout: services.map((s) => s.title),
  };
}

interface ServiceJsonLdInput {
  name: string;
  description: string;
  path: string;
}

export function serviceJsonLd({ name, description, path }: ServiceJsonLdInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: new URL(path, business.siteUrl).toString(),
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${business.siteUrl}/#business`,
      name: business.name,
      telephone: business.phone,
    },
    areaServed: business.serviceArea,
  };
}

/** Renders a JSON-LD script tag. Server-component safe (no JSX in .ts). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}
