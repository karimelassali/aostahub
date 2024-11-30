import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from 'next';
import { i18n } from '../next-i18next.config';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'AostaHub - Your Professional Translation Platform',
    template: '%s | AostaHub'
  },
  description: 'Professional translation services with AI-powered accuracy. Get instant translations in multiple languages.',
  keywords: ['translation', 'AI translation', 'professional translation', 'language services', 'multilingual platform'],
  authors: [{ name: 'AostaHub Team' }],
  creator: 'AostaHub',
  publisher: 'AostaHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'AostaHub - Professional Translation Platform',
    description: 'Professional translation services with AI-powered accuracy. Get instant translations in multiple languages.',
    siteName: 'AostaHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AostaHub - Professional Translation Platform',
    description: 'Professional translation services with AI-powered accuracy. Get instant translations in multiple languages.',
    creator: '@aostahub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
