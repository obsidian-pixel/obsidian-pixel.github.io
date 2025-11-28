import * as React from 'react';
const { useEffect } = React;

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  type?: 'website' | 'article';
  image?: string;
  schema?: Record<string, any>;
}

/**
 * SEO Component - Manages meta tags, Open Graph, Twitter Cards, and structured data
 * Optimized for search engines and AI crawlers
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  path,
  type = 'website',
  image = 'https://obsidian-pixel.github.io/og-image.png',
  schema
}) => {
  const baseUrl = 'https://obsidian-pixel.github.io';
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = title.includes('RAIDUIX') ? title : `${title} | RAIDUIX Vault`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description);
    if (keywords.length > 0) {
      updateMeta('keywords', keywords.join(', '));
    }
    updateMeta('author', 'RAIDUIX / Obsidian Pixel');
    updateMeta('language', 'English');
    updateMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMeta('googlebot', 'index, follow');
    updateMeta('bingbot', 'index, follow');

    // Open Graph meta tags
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:image', image, true);
    updateMeta('og:site_name', 'RAIDUIX Vault', true);
    updateMeta('og:locale', 'en_US', true);

    // Twitter Card meta tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    updateMeta('twitter:site', '@ObsidianPixel');
    updateMeta('twitter:creator', '@ObsidianPixel');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Inject or update structured data
    if (schema) {
      let scriptTag = document.querySelector('script[type="application/ld+json"][data-seo]');
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('data-seo', 'true');
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, path, type, image, schema, fullTitle, fullUrl]);

  return null; // This component doesn't render anything
};
