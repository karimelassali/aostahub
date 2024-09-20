"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { color, motion } from "framer-motion";
import AOS from "aos";
import { A } from "../ui/background-beams-with-collision";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { ButtonBo } from "../ui/moving-border";
import { InfiniteMovingCards } from "../ui/cardsmoving";
import { FocusCards } from "../ui/focusimg";
import { FlipWords } from "../ui/flipWords";
import { ShootingStars } from "../ui/stars";
import { BackgroundBeams } from "../ui/beams";

import {
  FaCompass,
  FaChat,
  FaUtensils,
  FaLandmark,
  FaTree,
  FaCalendar,
} from "react-icons/fa";

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

const content = [
  {
    title: "Discover Aosta's Ancient Ruins",
    description:
      "Step back in time and explore the ancient ruins of Aosta. Discover the rich history and stunning landscapes of this beautiful region.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-black">
        <Image
          style={{ borderRadius: "8px" }}
          src={"/ass/roman.jpg"}
          width={300}
          height={300}
          className="h-full w-full object-cover rounded-md"
          alt="ruins"
        />
      </div>
    ),
  },

  {
    title: "Securely Share Your Alpine Adventures",
    description:
      "Capture the breathtaking beauty of the Aosta Valley and share your experiences safely. Let others see the stunning views you've encountered on your journey.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-black">
        <Image
          style={{ borderRadius: "5px" }}
          src={"/ass/snow.jpg"}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Connect and Chat Amidst Aosta's Natural Wonders",
    description:
      "Immerse yourself in the serene beauty of Aosta's mountains and lakes. Connect with others who appreciate the same scenic landscapes and start conversations that inspire.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-black">
        <Image
          style={{ borderRadius: "5px" }}
          src={"/ass/lago.jpg"}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

//for infos comp

const infos = [
  {
    quote:
      "Discover hidden gems and breathtaking landscapes in the heart of the Alps.",
    name: "Aosta Valley Explorer",
    title: "Adventure Awaits",
    icon: "compass", // or 'mountain'
  },
  {
    quote:
      "Share your stories, connect with locals, and experience the true spirit of Aosta.",
    name: "Aosta Storyteller",
    title: "Unforgettable Moments",
    icon: "chat", // or 'users'
  },
  {
    quote:
      "Indulge in the rich flavors of Aosta's culinary heritage, from traditional dishes to innovative creations.",
    name: "Aosta Food Lover",
    title: "A Gastronomic Journey",
    icon: "utensils", // or 'pizza'
  },
  {
    quote:
      "Explore ancient castles, Roman ruins, and charming villages that whisper tales of the past.",
    name: "Aosta History Buff",
    title: "Timeless Wonders",
    icon: "landmark", // or 'castle'
  },
  {
    quote:
      "Find serenity amidst stunning natural beauty, from snow-capped peaks to lush valleys.",
    name: "Aosta Nature Enthusiast",
    title: "Peaceful Escapes",
    icon: "tree", // or 'leaf'
  },
  {
    quote:
      "Embrace the vibrant energy of Aosta's festivals and events, celebrating culture and community.",
    name: "Aosta Festivity Seeker",
    title: "Joyful Celebrations",
    icon: "calendar", // or 'music'
  },
];

//for focus images annimation

const focusImages = [
  {
    title: "Parco del gran paradiso",
    src: "/ass/parcopa.jpg",
    alt: "parcopa",
  },
  {
    title: "Architecture",
    src: "/ass/aostaarch.jpg",
    alt: "arch",
  },
  {
    title: "Aosta Chruch",
    src: "/ass/aostacath.jpg",
    alt: "chruch",
  },
];
// for uinue vsit aosta words
const aostaWords = ["storica", "panoramica", "affascinante", "avventurosa"];

export default function Landing() {
  const [language, setLanguage] = useState("en");
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <>
      <div className={`flex flex-col overflow-hidden font-poppins `}></div>
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
        className="flex flex-col min-h-[100dvh] bg-[#f5f5f5] text-[#333]"
      >
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
                  ease: "easeIn",
                }}
              >
                <h2 className="text-3xl md:text-4xl font-poppins mb-4">
                  {language === "en"
                    ? "Connect and Share with "
                    : "Connetti e condividi con "}
                  <span
                    style={{ fontWeight: "bold" }}
                    className="text-primary font-body "
                  >
                    AostaHub
                  </span>
                </h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.1,
                    delay: 1.2,
                    ease: "easeIn",
                  }}
                  className="text-xl text-text font-poppins "
                >
                  Discover a unique way to connect in Aosta, Italy! Aosta Hub
                  addresses the local trend of people sharing their social media
                  and contacts on public walls and spaces by offering a safer
                  and more organized platform. Start browsing now and make
                  meaningful connections securely.
                </motion.p>
                <br />
                <p className="text-xl  mb-6 font-open">
                  {language === "en"
                    ? "Securely connect and share your Instagram and other social profiles to make new friends."
                    : "Connetti in modo sicuro e condividi i tuoi profili Instagram e altri social per fare nuovi amici."}
                </p>
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
                    ease: "easeIn",
                  }}
                  className="flex gap-4"
                >
                  <Button
                    style={{ borderRadius: "4px" }}
                    containerClassName="rounded-full"
                    as="button"
                    className="p-3 font-open  rounded-md bg-secondary w-max md:w-40 text-text text-lg hover:text-white"
                  >
                    <Link href={"/explore"}>Sign up </Link>
                  </Button>

                  <Button
                    style={{ borderRadius: "4px" }}
                    duration={1}
                    containerClassName="rounded-full"
                    as="button"
                    className="p-3  font-open rounded-md bg-primary w-max md:w-40 text-secondary text-lg"
                  >
                    <Link href={"/explore"}>Explore </Link>
                  </Button>
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
                  style={{
                    aspectRatio: "550/400",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>
          </div>
        </main>
        {/* <div  className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      
    </div> */}
        <div className="h-[10rem] pb-9 flex justify-center items-center px-4">
          <div
            className="text-4xl mx-auto text-black   font-poppins dark:text-neutral-800"
            style={{ gap: "3rem" }}
          >
            Esplora
            <FlipWords className="font-open" words={aostaWords} />
            Di Aosta
          </div>
        </div>
        <FocusCards style={{ borderRadius: "9px" }} cards={focusImages} />
        {/* <section className=" text-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === "en" ? "Key Features" : "Caratteristiche principali"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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
              duration: 0.3,
              delay: 0.6,
              ease:"easeIn"
            }}
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
            </motion.div>
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
      </section> */}
        {/* -----------for pictures ------------ */}
        <h1 className="text-center font-poppins font-bold mt-9 text-3xl ">
          Perche <span className="text-accent">Aosta Hub</span> ?
        </h1>
        <StickyScroll contentClassName={'font-poppins'} content={content} />
        <br />
        <br />
        <InfiniteMovingCards
          style={{
            marginTop: "1.4rem",
          }}
          items={infos}
          direction="right"
          speed="slow"
        />
        {/* <motion.section
      dropping="in"
      className=" text-white py-12 md:py-20">
        <h1 className="text-center font-bold text-2xl ">New Friends <span className="text-3xl" style={{color:'#3B82F6'}}>=</span> New place to visit</h1>
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
            style={{border: '1px solid black'}}
              className=" rounded-lg p-6 flex flex-col items-center text-center">
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
            style={{border: '1px solid black'}}
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
            style={{border: '1px solid black'}}
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
      </motion.section> */}
        {/* ---------- */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <div>
                <ShootingStars
                  minDelay={1}
                  minSpeed={1}
                  className={" mt-20 -z-2 font-poppins "}
                />
              </div>
              {language === "en"
                ? `Join AostaHub Today`
                : "Unisciti ad AostaHub oggi"}
            </h2>
            <p className="text-xl font-open text-center text-gray-500 mb-8">
              {language === "en"
                ? "Discover new connections and friendships in a safe and welcoming space."
                : "Scopri nuove connessioni e amicizie in uno spazio sicuro e accogliente."}
            </p>

            <Button
              style={{ color: "white", borderRadius: "5px" }}
              className=" bg-accent   text-white hover:bg-secondary hover:text-text"
            >
              <Link
                className="text-background  font-open text-lg hover:text-text"
                href={"/explore"}
              >
                {language === "en" ? "Sign Up Now" : "Iscriviti ora"}
              </Link>
            </Button>
          </div>
        </section>
        <section className="bg-accent text-white py-6 px-4 md:px-8">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AsteriskIcon className="h-6 w-6 text-background" />
              <span className="text-background">
                &copy; 2024 AostaHub. All rights reserved.
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="#"
                className="hover:underline text-[#ccc]"
                prefetch={false}
              >
                {language === "en"
                  ? "Privacy Policy"
                  : "Informativa sulla privacy"}
              </Link>
              <Link
                href="#"
                className="hover:underline text-[#ccc]"
                prefetch={false}
              >
                {language === "en" ? "Terms of Service" : "Termini di servizio"}
              </Link>
              <Link
                href="#"
                className="hover:underline text-[#ccc]"
                prefetch={false}
              >
                {language === "en" ? "Contact Us" : "Contattaci"}
              </Link>
            </nav>
          </div>
        </section>
      </motion.div>
    </>
  );
}

function AsteriskIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v12" />
      <path d="M17.196 9 6.804 15" />
      <path d="m6.804 9 10.392 6" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function WebcamIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  );
}
