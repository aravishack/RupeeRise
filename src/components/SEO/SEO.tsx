import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function SEO({
  title = 'RupeeRise - Track Your Wealth, Plan Your Future',
  description = 'Privacy-first net worth tracker for India. Track assets with SIP, manage loans with EMI, and see 30-year projections—all with AI-powered insights.',
  keywords = 'net worth tracker, india, wealth management, SIP calculator, EMI calculator, financial planner, portfolio tracker, asset management, liability tracker',
  ogTitle,
  ogDescription,
  ogImage = 'https://myrupeerise.netlify.app/og-image.png'
}: SEOProps) {
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };
    
    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, 'property');
    updateMetaTag('og:description', ogDescription || description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'RupeeRise', 'property');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#10b981'); // Rupee green color
    
  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);
  
  return null; // This component doesn't render anything
}
