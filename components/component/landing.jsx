
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import { motion } from "framer-motion"

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function Landing() {
  const [language, setLanguage] = useState("en")
  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  return (
    
    (
      <>
      
    <motion.div
    initial={{
      opacity: 0,
      y: -50,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      delay: 0.5,
    }}
    className="flex flex-col min-h-[100dvh] bg-[#f5f5f5] text-[#333]">
      {/* <header
        className="bg-[#3B82F6] text-white py-6 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AsteriskIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold">AostaHub</h1>
        </div>
        
      </header> */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.9,
                ease:"easeIn"

              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "Connect and Share with AostaHub" : "Connetti e condividi con AostaHub"}
              </h2>
              <p className="text-lg text-[#555] mb-6">
                {language === "en"
                  ? "Securely connect and share your Instagram and other social profiles to make new friends."
                  : "Connetti in modo sicuro e condividi i tuoi profili Instagram e altri social per fare nuovi amici."}
              </p>
              <motion.p
                initial={{
                  opacity:0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 1.2,
                  ease:"easeIn"
                }}
                style={{color:'gray'}} className="text-xl font-semibold">
                Discover a unique way to connect in Aosta, Italy! Aosta Hub addresses the local trend of people sharing their social media and contacts on public walls and spaces by offering a safer and more organized platform. Start browsing now and make meaningful connections securely.
              </motion.p>
              <br />
              <hr />
              <br />
              <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 1.2,
                ease:"easeIn"
              }}

              className="flex gap-4">
                <Button className="bg-[#3B82F6] text-white hover:bg-[#00a185]">
                  {language === "en" ? "Sign Up" : "Iscriviti"}
                </Button>
                <Link
                  href={'/explore'}
                  variant="secondary"
                  style={{border:'1px solid gray'}}
                  className="rounded-lg p-2  text-black hover: hover:bg-[#00a185]">
                  {language === "en" ? "Start Exploring" : "Inizia a esplorare"}
                </Link>
              </motion.div>
            </motion.div>
            <div>
              <motion.img
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 1.4,
              }}
                src="/ass/aosta.jpg"
                width="550"
                height="400"
                alt="AostaHub"
                className="rounded-lg"
                style={{ aspectRatio: "550/400", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </main>
      <section className=" text-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === "en" ? "Key Features" : "Caratteristiche principali"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-[#3B82F6] rounded-lg p-6 flex flex-col items-center text-center">
              <SearchIcon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">
                {language === "en" ? "Discover New Connections" : "Scopri nuove connessioni"}
              </h3>
              <p className="text-lg text-gray-300 ">
                {language === "en"
                  ? "Easily find and connect with new friends who share your interests."
                  : "Trova e connetti facilmente con nuovi amici che condividono i tuoi interessi."}
              </p>
            </div>
            <div
              className="bg-[#3B82F6] rounded-lg p-6 flex flex-col items-center text-center">
              <ShareIcon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">
                {language === "en" ? "Securely Share Profiles" : "Condividi i profili in modo sicuro"}
              </h3>
              <p className="text-lg text-gray-300 ">
                {language === "en"
                  ? "Share your Instagram and other social profiles in a safe and controlled way."
                  : "Condividi i tuoi profili Instagram e altri social in modo sicuro e controllato."}
              </p>
            </div>
            <div
              className="bg-[#3B82F6] rounded-lg p-6 flex flex-col items-center text-center">
              <WebcamIcon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">{language === "en" ? "Connect and Chat" : "Connetti e chatta"}</h3>
              <p className="text-lg text-gray-300 ">
                {language === "en"
                  ? "Start conversations and build new friendships with like-minded individuals."
                  : "Avvia conversazioni e crea nuove amicizie con persone che condividono i tuoi interessi."}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* -----------for pictures ------------ */}
      <section className=" text-white py-12 md:py-20">
        <h1 className="text-center font-bold text-2xl ">New Friends <span className="text-3xl" style={{color:'#3B82F6'}}>=</span> New place to visit</h1>
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
            style={{border:'5px double gray'}}
              className=" rounded-lg p-6 flex flex-col items-center text-center">
              <Image src={'/ass/roman.jpg'} height={500} width={500} className=" rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">
                {language === "en" ? "Discover Aosta's Ancient Ruins" : "Scopri nuove connessioni"}
              </h3>
              <p className="text-lg text-left">
                {language === "en"
                  ? "Step back in time and explore the ancient ruins of Aosta. Discover the rich history and stunning landscapes of this beautiful region."
                  : "Trova e connetti facilmente con nuovi amici che condividono i tuoi interessi."}
              </p>
            </div>
            <div
            style={{border:'5px double gray'}}
              className=" rounded-lg p-6 flex flex-col items-center text-center">
              <Image src={'/ass/snow.jpg'} height={500} width={500} className=" rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">
                {language === "en" ? "Securely Share Your Alpine Adventures" : "Condividi i profili in modo sicuro"}
              </h3>
              <p className="text-lg text-left">
                {language === "en"
                  ? "Capture the breathtaking beauty of the Aosta Valley and share your experiences safely. Let others see the stunning views you've encountered on your journey."
                  : "Condividi i tuoi profili Instagram e altri social in modo sicuro e controllato."}
              </p>
            </div>
            <div
            style={{border:'5px double gray'}}
              className=" rounded-lg p-6 flex flex-col items-center text-center">
              <Image src={'/ass/lago.jpg'} width={400} height={400}  className=" rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">{language === "en" ? "Connect and Chat Amidst Aosta's Natural Wonders" : "Connetti e chatta"}</h3>
              <p className="text-lg text-left">
                {language === "en"
                  ? "Immerse yourself in the serene beauty of Aosta's mountains and lakes. Connect with others who appreciate the same scenic landscapes and start conversations that inspire."
                  : "Avvia conversazioni e crea nuove amicizie con persone che condividono i tuoi interessi."}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ---------- */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Join AostaHub Today" : "Unisciti ad AostaHub oggi"}
          </h2>
          <p className="text-lg text-[#555] mb-8">
            {language === "en"
              ? "Connect, share, and make new friends in a secure and friendly environment."
              : "Connetti, condividi e fai nuovi amici in un ambiente sicuro e amichevole."}
          </p>
          <Button className="bg-[#3B82F6] text-white hover:bg-[#00a185]">
           <Link href={'/explore'}>
            {language === "en" ? "Sign Up Now" : "Iscriviti ora"}
           </Link>

          </Button>
        </div>
      </section>
      <footer className="bg-[#3B82F6] text-white py-6 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AsteriskIcon className="h-6 w-6" />
            <span>&copy; 2024 AostaHub. All rights reserved.</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              {language === "en" ? "Privacy Policy" : "Informativa sulla privacy"}
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              {language === "en" ? "Terms of Service" : "Termini di servizio"}
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              {language === "en" ? "Contact Us" : "Contattaci"}
            </Link>
          </nav>
        </div>
      </footer>
    </motion.div>
    </>)
  );
}

function AsteriskIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 6v12" />
      <path d="M17.196 9 6.804 15" />
      <path d="m6.804 9 10.392 6" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function ShareIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>)
  );
}


function WebcamIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>)
  );
}
