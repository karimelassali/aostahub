import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link';
import { FloatingDock } from '@/components/ui/floatingNavbar';
import {
  IconHome,
  IconNewSection,
} from "@tabler/icons-react";
import { IoCreateOutline } from "react-icons/io5";
import { IoChatboxOutline } from "react-icons/io5";




export const metadata = {
  title: 'Welcome to aosta hub',
  description: 'aosta hub,aosta friends',
};



const links = [
  {
    title:'Home',
    icon:(
      <IconHome className="h-full w-full text-black " />
    ),
    href:'/explore'
  }
  ,{
    title:'Create',
    icon:(
      <IoCreateOutline className="h-full w-full text-black " />
    ),
    href:'/create'
  },
  {
    title:'Chat',
    icon:(
      <IoChatboxOutline className="h-full w-full text-black " />
    ),
    href:'/chat'
  }

]

export default function RootLayout({ children }) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="msvalidate.01" content="95C6FEA2336278D091BC03508F4221AF" />
          <meta name="google-site-verification" content="TFC9KKJST9sPJHv4r0wz0xnmUb09ZFJFC8crGzgUSnk" />
        </head>
        <body className='bg-background'>
          <main>
          <header
          style={{zIndex:'999'}}
              className="bg-accent text-white py-3 px-4 md:px-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Image  alt='logo' width={220} height={220} src={'/ass/logo.png'} />
                </Link>
              </div>
              {/* <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    className={`text-white hover:bg-[#00a185] ${language === "en" ? "font-bold" : ""}`}
                    onClick={() => handleLanguageChange("en")}>
                    English
                  </Button>
                  <Button
                    variant="ghost"
                    className={`text-white hover:bg-[#00a185] ${language === "it" ? "font-bold" : ""}`}
                    onClick={() => handleLanguageChange("it")}>
                    Italiano
                  </Button>
                </div> */}
              <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </header>
            {children}
            </main>
            <footer className="flex justify-center p-4 w-full  fixed bottom-0  rounded-md  " >
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
              <div className="p-2  rounded-lg" style={{backdropFilter:'blur(20px)',borderRadius:'5px'}}>
                <FloatingDock mobileClassName='inset-x-0 p-4  ' style={{gap:'20 ',color:'black'}} items={links} />
              </div>
            </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
