import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export const metadata = {
  title: 'Welcome to aosta hub',
  description: 'aosta hub,aosta friends',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="msvalidate.01" content="95C6FEA2336278D091BC03508F4221AF" />
        </head>
        <body>
          <main>
          <header
              className="bg-[#382bf0] text-white py-6 px-4 md:px-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
              <Image alt='logo' width={220} height={220} src={'/ass/logo.png'} />
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
        </body>
      </html>
    </ClerkProvider>
  )
}
