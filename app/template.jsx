'use client'
import { useEffect, useState } from 'react';
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    ClerkLoaded
  } from "@clerk/nextjs";
  import Image from "next/image";
  import Link from "next/link";
  import { IoMdHome } from "react-icons/io";
  import { IoIosCreate } from "react-icons/io";
  import { FaUserFriends } from "react-icons/fa";
  import { IoChatbox } from "react-icons/io5";
import { Bell } from 'lucide-react';
// import NotificationModal from '@/components/ui/notificationmodal';
import { createClient } from "../utils/supabase/client";
import { useUser } from '@clerk/nextjs';
import NotificationModalInfo from '../components/notification-modal';
export default function Template({ children }) {
    const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationss, setNotificationss] = useState([]);
  const supabase = createClient();
  const { user, isLoaded } = useUser();
  
  const currentUserUid = user?.id;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
};
  const [isClient, setIsClient] = useState(false);
  
     async function notifications() {
       const { data, error } = await supabase.from('notifications').select('*').eq('receiver', currentUserUid).order('created_at', { ascending: false });
       if (data) {
         setNotificationss(data);
       }
  }
    
   function realtime() {
    const { data, error } =  supabase
      .channel('notiReal')
      .on('postgres_changes', { event: '*', schemaa: 'public', table: 'notifications' }, (payload) => {
        if (payload.new.receiver === currentUserUid) {
            const newNotisound = new Audio('/ass/ann.wav');
            newNotisound.play();
            notifications();
        }
      
      }).subscribe();
  }
    useEffect(() => { 
      setIsClient(true);
      if(isLoaded && currentUserUid){
        notifications();
        realtime();
      }
    }, [currentUserUid,isLoaded]);

    
    return (
      <ClerkLoaded>
        <>
         <nav className="bg-primary font-poppins fixed top-0 left-0  z-50  w-full">
      <div className=" p-2 gap-2 ">
        <div className="relative flex h-16 items-center justify-center ">
          {
            isClient && window.location.pathname != '/' && (
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            )
          }
          <div className={`flex flex-1 items-center w-full ${window.location.pathname == '/' ? 'max-sm:justify-between' : 'justify-center'} sm:items-stretch sm:justify-start`}>
          <div className="flex flex-shrink-0  items-center">
              <Link href={'/'}>
                <Image width={150} height={150} className="h-8 w-auto" src="/ass/logo.png" alt="Aostahub Logo" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 w-full justify-center">
              {
                isClient && window.location.pathname  != '/' && (
                  <>
                  <Link href="/explore" className="rounded-md flex gap-1 items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Home <IoMdHome /></Link>
                  <Link href="/create" className="rounded-md flex gap-1  items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Create <IoIosCreate /></Link>
                  <Link href="/chat" className="rounded-md flex gap-1  items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Chat <IoChatbox /></Link>
                            <Link href="/friends" className="rounded-md flex gap-1  items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white  ">Friends  <FaUserFriends /></Link>
                            {
                              console.log(notificationss.length)
                            }
                  <button onClick={() => setIsNotificationOpen(true)} className={`rounded-md flex gap-1 items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white relative`}>
                    <span className={`relative`}>
                      <span>Notification</span>
                      </span>
                              <Bell />
              {notificationss.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{notificationss.length}</span>}

                  </button>

                  </>
                )
                      }
                      <div className='fixed top-0 right-0 flex flex-col items-center justify-center'  >
                         {
                              isNotificationOpen && <NotificationModal  onClose={() => setIsNotificationOpen(false)} />
                            }
                      </div>
                      
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <SignedOut>
              <Link
                href="/explore"
                className=" rounded-md text-white font-bold font-poppins  py-2 px-4 hover:cursor-pointer ml-4 max-sm:ml-1 hover:bg-white hover:text-accent transition-all ease-in-out "
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

      <div className={`sm:hidden transition-all ease-in-out ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className=" p-5  max-sm:flex max-sm:justify-center max-sm:items-center">
        {
          isClient && window.location.pathname  != '/' && (
            <>
              <Link href="/explore" className="rounded-md flex gap-1  items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Home <IoMdHome /></Link>
              <Link href="/create" className="rounded-md flex gap-1  items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Create <IoIosCreate /></Link>
              <Link href="/chat" className="rounded-md flex gap-1  items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Chat <IoChatbox /></Link> 
              <Link href="/friends" className="rounded-md flex gap-1  items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white">Friends <FaUserFriends /></Link> 

            </>
          )
        }
        </div>
      </div>
          </nav>
          
          <div className='mt-20'  >
            {
              children
            }
            {
              notificationss.length > 0  && notificationss[0] && (
                <NotificationModalInfo notificationText={notificationss[0].type} receiver={currentUserUid} />
              )
            }

          </div>

        </>
        </ClerkLoaded>
        
    );
}
