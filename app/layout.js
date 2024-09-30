import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IconHome, IconNewSection } from "@tabler/icons-react";
import { IoCreateOutline } from "react-icons/io5";
import { IoChatboxOutline } from "react-icons/io5";

export const metadata = {
  title: "Welcome to Aosta Hub",
  description:
    "Discover Aosta Hub, a unique hub where people come together to share their stories",
  keywords:
    "Aosta Hub, Story Sharing, Community, Valle di Aosta, amici, storytelling, social platform, local community",
  icons: {
    icon: "/ass/logo.png",
  },
  openGraph: {
    title: "Welcome to Aosta Hub",
    description:
      "Discover Aosta Hub, a unique hub where people come together to share their stories",
    url: "https://aostahub.vercel.app",
    images: {
      url: "/ass/logo.png",
      width: 800,
      height: 600,
    },
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
            {children }
          <footer className="flex justify-center  w-full rounded-md  ">
            {/* <div className="w-full max-w-4xl p-4 rounded-lg flex justify-center gap-8 rounded-sm" style={{ backdropFilter: 'blur(30px)' }}>
                <Link
              
                href={'/create'} className="flex items-center justify-center p-3 rounded-lg text-white font-semibold transition-colors duration-300 transform hover:bg-purple-600 hover:scale-105 hover:cursor-pointer" style={{ backgroundColor: '#38bdf8' }}>
                  <IoCreateOutline size={24} />
                  <span className="ml-2">Create</span>
                </Link>
                <Link
                href={'/profile'} className="flex items-center justify-center p-3 rounded-lg text-white font-semibold transition-colors duration-300 transform hover:bg-purple-600 hover:scale-105 hover:cursor-pointer" style={{ backgroundColor: '#38bdf8' }}>
                  <IoChatboxOutline size={24} />
                  <span className="ml-2">Profile</span>
                </Link>
              </div> */}
            {/* <div className="p-2 w-full flex   justify-center  rounded-lg sm:justify-end" style={{backdropFilter:'blur(20px)',borderRadius:'5px'}}> */}
            
            {/* </div> */}
          </footer>
        </body>
        <script async src="https://automatic.chat/embed.js" id="cm1nplcpf007ggfpj4hgrt0sr" ></script>
      </html>
    </ClerkProvider>
  );
}
