export const getWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AostaHub',
    description: 'Professional translation services with AI-powered accuracy',
    url: process.env.NEXT_PUBLIC_APP_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AostaHub',
    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/aostahub',
      'https://linkedin.com/company/aostahub'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      availableLanguage: ['English', 'French']
    }
  };
};

export const getTranslationServiceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AostaHub Translation Service',
    description: 'Professional AI-powered translation service for multiple languages',
    provider: {
      '@type': 'Organization',
      name: 'AostaHub'
    },
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'French'],
    serviceType: 'Translation Service'
  };
};
