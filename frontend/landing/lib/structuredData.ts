/**
 * @module StructuredData
 * @description JSON-LD structured data schemas for SEO
 *
 * Provides:
 * - Organization schema
 * - Product schema
 * - WebSite schema with search action
 * - BreadcrumbList schema
 */

import type { Organization, Product, BreadcrumbList, WithContext } from 'schema-dts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://whisperapi.com';

/**
 * Organization schema for company information
 */
export function getOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WhisperAPI',
    description: 'Fast, affordable audio transcription powered by OpenAI Whisper on M4 Metal infrastructure',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/whisperapi',
      'https://github.com/whisperapi',
      'https://www.linkedin.com/company/whisperapi',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@whisperapi.com',
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  };
}

/**
 * Product schema for WhisperAPI service
 */
export function getProductSchema(): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'WhisperAPI',
    description: 'OpenAI Whisper API powered by M4 Metal. 80% cheaper than alternatives, 3x faster, with 60 free minutes per month.',
    brand: {
      '@type': 'Brand',
      name: 'WhisperAPI',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0.00',
      highPrice: '0.30',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/pricing`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: 127,
      bestRating: '5',
      worstRating: '1',
    },
    category: 'Audio Transcription API',
  };
}

/**
 * WebSite schema with search action
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WhisperAPI',
    description: 'Fast, affordable audio transcription powered by OpenAI Whisper',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WhisperAPI',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
}

/**
 * BreadcrumbList schema for navigation
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Get home page breadcrumb
 */
export function getHomePageBreadcrumb(): WithContext<BreadcrumbList> {
  return getBreadcrumbSchema([
    { name: 'Home', url: '/' },
  ]);
}

/**
 * Get pricing page breadcrumb
 */
export function getPricingPageBreadcrumb(): WithContext<BreadcrumbList> {
  return getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' },
  ]);
}

/**
 * Get documentation page breadcrumb
 */
export function getDocsPageBreadcrumb(): WithContext<BreadcrumbList> {
  return getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Documentation', url: '/docs' },
  ]);
}

/**
 * Helper to render JSON-LD script tag
 */
export function renderStructuredData(data: WithContext<Organization | Product | BreadcrumbList> | ReturnType<typeof getWebSiteSchema>) {
  return {
    __html: JSON.stringify(data),
  };
}
