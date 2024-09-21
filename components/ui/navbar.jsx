'use client'
import React, { useState } from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

  

 



export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-primary font-poppins w-full">
      <div className=" p-2 gap-2 ">
        <div className="relative flex h-16 items-center justify-center ">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image width={100} height={100} className="h-8 w-auto" src="/ass/logo.png" alt="Aostahub Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/explore" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Home</Link>
                <Link href="/create" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Create</Link>
                <Link href="/chat" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Chat</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <SignedOut>
              <Link
                href="/explore"
                className="bg-white rounded-md text-primary font-bold py-2 px-4 hover:cursor-pointer ml-4 max-sm:ml-1 "
                style={{ borderRadius: "5px" }}
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 max-sm:flex max-sm:justify-center">
          <Link href="/explore" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Home</Link>
          <Link href="/create" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Create</Link>
          <Link href="/chat" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Chat</Link>  
        </div>
      </div>
    </nav>
  )
}
