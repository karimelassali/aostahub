import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
// import { Button } from "./components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { IconHome, IconNewSection } from "@tabler/icons-react";
import { IoCreateOutline } from "react-icons/io5";
import { IoChatboxOutline } from "react-icons/io5";
import GlassProvider from 'glass-js'

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
    <ClerkProvider>
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
        <body className="bg-background">
          <GlassProvider>
            {children}
          </GlassProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}
