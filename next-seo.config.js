const defaultSEOConfig = {
  defaultTitle: 'AostaHub - Professional Translation Platform',
  titleTemplate: '%s | AostaHub',
  description: 'Professional translation services with AI-powered accuracy. Get instant translations in multiple languages.',
  canonical: process.env.NEXT_PUBLIC_APP_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'AostaHub',
    title: 'AostaHub - Professional Translation Platform',
    description: 'Professional translation services with AI-powered accuracy. Get instant translations in multiple languages.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'AostaHub - Professional Translation Platform',
      },
    ],
  },
  twitter: {
    handle: '@aostahub',
    site: '@aostahub',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'translation, AI translation, professional translation, language services, multilingual platform, translation app, language translation, online translation',
    },
    {
      name: 'author',
      content: 'AostaHub',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/icon-192x192.png',
      sizes: '192x192',
    },
  ],
};

export default defaultSEOConfig;
