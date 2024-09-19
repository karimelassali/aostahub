'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { SlOptionsVertical } from "react-icons/sl";
import { IoSendOutline } from "react-icons/io5";
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { CiStar, CiShare2, CiSearch } from "react-icons/ci";

export function Chat() {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Fetch users and messages logic (unchanged)
  }, []);

  async function sendMessage() {
    // Send message logic (unchanged)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);


  useEffect(()=>{
    function scrollBottomFunction(){
      const messagesContainer = document.querySelector('.chats');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    scrollBottomFunction();
  },[])
  return (
    <div className="w-full h-screen font-sura flex fixed">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div ref={sidebarRef} className={`fixed md:relative w-3/4 max-w-xs md:w-[30%] lg:w-[25%] h-full bg-background transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-full'} md:left-0 z-20 flex flex-col`}>
        <div className="sectionHeader p-2 border-b border-secondary">
          <div className="sectionHeaderInfo border border-secondary rounded flex justify-between items-center p-2 gap-1">
            <div className="flex gap-1 p-1 items-center">
              <h4 className="text-sm md:text-base">Karim El assali</h4>
            </div>
            <div className="sectionHeaderOptions flex items-center">
              <div className="flex gap-1 cursor-pointer transition-all hover:rotate-90">
                <SlOptionsVertical className="text-accent" />
              </div>
              <button onClick={closeSidebar} className="ml-2 md:hidden">
                <IoMdClose size={24} className="text-accent" />
              </button>
            </div>
          </div>
          <div className="chatsOptions flex justify-between p-2 gap-2 text-sm">
            <div className='p-1 border-b cursor-pointer border-secondary text-accent hover:text-text transition-colors'>All Users</div>
            <div className='p-1 border-b cursor-pointer border-secondary text-accent hover:text-text transition-colors'>Favourites</div>
          </div>
          <div className="sectionSearch p-1">
            <div className="flex items-center justify-center gap-1 p-1">
              <input className="flex-grow p-1 border-b border-accent rounded text-sm" type="text" placeholder="Search" />
              <CiSearch className="relative hover:rotate-360 cursor-pointer transition-all text-accent" size={24} />
            </div>
          </div>
        </div>
        <div className="allUsers flex-grow overflow-y-auto pb-[10.5rem] p-1">
          {/* User list items */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="user border-b border-gray-500 flex mt-3 items-center justify-between p-2">
              <div className="userInfo flex items-center">
                <Image width={40} height={40} className="rounded-full border" alt='userPicture' src='/ass/logo.png' />
                <div className="flex flex-col pl-2">
                  <h4 className="text-sm">Karim El assali</h4>
                  <span className='text-xs text-gray-500'>Hello</span>
                </div>
              </div>
              <span className="text-gray-500 text-xs">Tue</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main border relative   border-secondary flex-grow flex flex-col ">
        <div className="mainHeader flex justify-between items-center p-2 border-b border-gray-400">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-2 md:hidden">
              <HiMenuAlt2 size={24} />
            </button>
            <div className="userInfo flex items-center">
              <Image width={40} height={40} className="rounded-full" alt='userPicture' src='/ass/logo.png' />
              <div className="fullName flex flex-col ml-2">
                <h4 className="text-sm md:text-base">Karim El assali</h4>
                <span className="text-xs">Active Now</span>
              </div>
            </div>
          </div>
          <div className="mainOptions flex gap-2">
            <div className="rounded-full bg-secondary cursor-pointer w-8 h-8 flex items-center justify-center hover:scale-110 transition-all">
              <CiStar className="text-lg" />
            </div>
            <div className="rounded-full bg-secondary cursor-pointer w-8 h-8 flex items-center justify-center hover:scale-110 transition-all">
              <CiShare2 className="text-lg" />
            </div>
          </div>
        </div>

        <div className="chats flex-grow p-2 overflow-y-auto pb-[13.5rem]">
          {/* Chat messages */}
          <div className="newMsg mb-4">
            <div className="flex items-end w-full gap-2">
              <Image width={30} height={32} className="rounded-full" alt='userPicture' src='/ass/logo.png' />
              <div className="p-2 border border-secondary bg-accent rounded max-w-[70%] break-words">
                <div className="msgHeader flex justify-between text-white text-xs gap-5 ">
                  <h3 className='flex-shrink-0' >Karim El assali</h3>
                  <span className='text-sm text-slate-500 whitespace-nowrap ' >11:12 pm</span>
                </div>
                <div className="msgHeaderInfo text-white mt-1">
                  <h5 className="text-sm"> lorem*7 </h5>
                </div>
              </div>
            </div>
          </div>

          {/* My messages */}
          {[...Array(4)].map((_, index) => (
            <div className="Mymsgs mb-4">
              <div className="flex items-end justify-end w-full gap-2">
                <div className="p-2 border border-secondary bg-background rounded max-w-[70%] break-words">
                  <div className="msgHeader flex justify-between text-text text-xs gap-5 ">
                    <h3 className='flex-shrink-0' >Karim El assali</h3>
                    <span className='text-sm text-slate-500 whitespace-nowrap ' >11:12 pm</span>
                  </div>
                  <div className="msgHeaderInfo text-white mt-1">
                    <h5 className="text-sm text-text "> lorem*7 </h5>
                  </div>
                </div>
                <Image width={30} height={32} className="rounded-full" alt='userPicture' src='/ass/logo.png' />
              </div>
          </div>
          ))}
        </div>

        <div className="inputArea p-1 border-t fixed bottom-0 w-full min-h-[50px]">          
<form className="flex flex-col md:flex-row border border-secondary rounded gap-2 p-2 w-full">
  <input 
    type="text" 
    className="w-full md:w-[80%] p-2 rounded focus:outline-none focus:border-accent" 
    placeholder="Type a message..." 
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <button 
    className="w-full md:w-[20%] text-accent rounded-full p-2 hover:bg-opacity-80 transition-colors"
    onClick={sendMessage}
    type="button"
  >
    <IoSendOutline size={20} className='transform hover:scale-110 transition-all' />
  </button>
</form>

        </div>

      </div>
    </div>
  );
}
  

function MessageCircleIcon(props) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>)
  );
}


function MoveVerticalIcon(props) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>)
  );
}


function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>)
  );
}


function SettingsIcon(props) {
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
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}


function ThumbsDownIcon(props) {
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
      <path d="M17 14V2" />
      <path
        d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>)
  );
}


function ThumbsUpIcon(props) {
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
      <path d="M7 10v12" />
      <path
        d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>)
  );
}
