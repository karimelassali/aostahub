'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { getWebsiteSchema, getOrganizationSchema } from '@/utils/schema';

export default function MetaTags({ 
  title = 'AostaHub - Professional Translation Platform',
  description = 'Professional translation services with AI-powered accuracy. Get instant translations in multiple languages.',
  keywords = 'translation, AI translation, professional translation, language services, multilingual platform',
  ogImage = '/og-image.jpg'
}) {
  const pathname = usePathname();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;

  const structuredData = {
    website: getWebsiteSchema(),
    organization: getOrganizationSchema()
  };

  return (
    <>
      {/* Language Alternates */}
      <link rel="alternate" href={`${process.env.NEXT_PUBLIC_APP_URL}/en${pathname}`} hrefLang="en" />
      <link rel="alternate" href={`${process.env.NEXT_PUBLIC_APP_URL}/fr${pathname}`} hrefLang="fr" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Primary Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}${ogImage}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_URL}${ogImage}`} />

      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* PWA Meta Tags */}
      <meta name="application-name" content="AostaHub" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="AostaHub" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#2f27ce" />
    </>
  );
}
