import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "@/components/ui/theme-provider"

import { Neobrutalism } from '@clerk/themes'

// import { Button } from "./components/ui/button";



export const metadata = {
  title: "Welcome to Aosta Hub",
  description:
    "Discover Aosta Hub, a vibrant community platform where locals and visitors share their stories and experiences about the beautiful Valle di Aosta region.",
  keywords:
    "Aosta Hub, Story Sharing, Community, Valle di Aosta, local stories, storytelling, social platform, local community, travel, culture, adventure",
  icons: {
    icon: "/ass/logo.png",
  },
  openGraph: {
    title: "Welcome to Aosta Hub",
    description:
      "Discover Aosta Hub, a vibrant community platform where locals and visitors share their stories and experiences about the beautiful Valle di Aosta region.",
    url: "https://aostahub.vercel.app",
    images: {
      url: "/ass/logo.png",
      width: 800,
      height: 600,
    },
    site_name: "Aosta Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Aosta Hub",
    description:
      "Discover Aosta Hub, a vibrant community platform where locals and visitors share their stories and experiences about the beautiful Valle di Aosta region.",
    images: {
      url: "/ass/logo.png",
      width: 800,
      height: 600,
    },
    site: "@aostahub",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googlebot: "index,follow",
  },
  googleSiteVerification: "TFC9KKJST9sPJHv4r0wz0xnmUb09ZFJFC8crGzgUSnk",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: Neobrutalism,
    }} >
        <html lang="en">
        <head>
          <meta
            name="msvalidate.01"
            content="95C6FEA2336278D091BC03508F4221AF"
          />
          <meta
            name="google-site-verification"
            content="TFC9KKJST9sPJHv4r0wz0xnmUb09ZFJFC8crGzgUSnk"
          />
        </head>
        <body className="">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
      
    </ClerkProvider>
  );
}
