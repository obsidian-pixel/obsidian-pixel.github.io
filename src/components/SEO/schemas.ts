/**
 * Structured Data Schemas
 * Provides JSON-LD schema.org markup for enhanced search engine understanding
 */

const baseUrl = 'https://obsidian-pixel.github.io';

/**
 * Organization Schema - Identifies the organization behind the site
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RAIDUIX',
  alternateName: 'Obsidian Pixel',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description: 'Advanced AI Prompt Engineering Library and Development Tools',
  sameAs: ['https://github.com/obsidian-pixel'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Technical Support',
    url: 'https://github.com/obsidian-pixel',
  },
};

/**
 * WebSite Schema - Defines the website and search functionality
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RAIDUIX Vault',
  alternateName: 'RAIDUIX - AI Prompt Engineering Library',
  url: baseUrl,
  description:
    'Access 500+ premium AI prompts, autonomous agent frameworks, and cognitive architectures for next-generation AI development.',
  inLanguage: 'en-US',
  publisher: organizationSchema,
};

/**
 * SoftwareApplication Schema - For the RAIDUIX Vault application
 */
export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RAIDUIX Vault',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Advanced AI Prompt Engineering Library with 500+ premium prompts, autonomous agent frameworks, and cognitive architectures.',
  softwareVersion: '1.0.0',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
  author: organizationSchema,
};

/**
 * Create breadcrumb schema for a given path
 */
export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.url}`,
  })),
});

/**
 * Create ItemList schema for collections (e.g., prompt library)
 */
export const createItemListSchema = (name: string, description: string, items: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  description,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item,
  })),
});

/**
 * Combine multiple schemas into a single structured data object
 */
export const combineSchemas = (...schemas: Array<Record<string, any>>) => ({
  '@context': 'https://schema.org',
  '@graph': schemas,
});

/**
 * Create SoftwareApplication schema for apps
 */
export const createSoftwareApplicationSchema = (params: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    price: string;
    priceCurrency: string;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: params.name,
  applicationCategory: params.applicationCategory,
  operatingSystem: params.operatingSystem,
  offers: {
    '@type': 'Offer',
    price: params.offers.price,
    priceCurrency: params.offers.priceCurrency,
  },
  description: params.description,
  url: params.url,
  author: organizationSchema,
});
