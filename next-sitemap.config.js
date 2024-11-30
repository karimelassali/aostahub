/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://aostahub.vercel.app',
  generateRobotsTxt: false, // we already have a custom robots.txt
  exclude: ['/server-sitemap.xml'], // exclude server-side generated pages
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  alternateRefs: [
    {
      href: 'https://aostahub.vercel.app/en',
      hreflang: 'en',
    },
    {
      href: 'https://aostahub.vercel.app/fr',
      hreflang: 'fr',
    },
  ],
  transform: async (config, path) => {
    // Custom transformation for dynamic routes
    return {
      loc: path, // page url
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs || [],
    }
  },
}
