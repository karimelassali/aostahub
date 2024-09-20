"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    
      <>
        {
          window.location.pathname == '/' ? null : (
            <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 100, // Changed from -100 to 100
        }}
        animate={{
          y: visible ? 0 : 100, // Changed from -100 to 100
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        style={{borderRadius:'0.5rem',}}
        className={cn(
          "flex max-w-fit scale-150 rounded-md fixed p-5 bottom-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2]   bg-accent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 py-2  gap-5 items-center justify-center space-x-4 ",
          className
        )}>
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}>
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {/* <Link
        href={'/chat'}
          className="border text-sm rounded-md font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Chat</span>
          <span
            className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-secondary to-transparent  h-px" />
        </Link> */}
      </motion.div>
      </AnimatePresence>
          )
        }
       
      </>
   
  );
};
