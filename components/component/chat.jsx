'use client'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect , useRef} from "react";


import { useRouter } from "next/router"
import { useUser } from "@clerk/nextjs"
import { Toaster, toast } from "sonner"
import { MdDeleteSweep } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { SlOptionsVertical } from "react-icons/sl";
import { IoSendOutline } from "react-icons/io5";
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';

export function Chat() {
  const supabase = createClient();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    // This will scroll to the bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    
    async function fetchUsers() {
      const { data, error } = await supabase
       .from('users')
       .select()
       .order('id', { ascending: false });
      data? setUsers(data) : toast.message('No online users now .');
    }
    fetchUsers();

    async function fetchMessages() {
      const { data, error } = await supabase
       .from('msgs')
       .select('*')
       .order('id', { ascending: true });
      data? setMessages(data) : toast.message('No messages yet.');
    }
    fetchMessages();

    async function realTimeFetchMessages() {
      const { data, error } = await supabase
       .channel('msgListen')
       .on('postgres_changes', { event: '*', schema: 'public', table:'msgs' }, (payload) => {
          fetchMessages();
        })
       .subscribe();
    }
    realTimeFetchMessages();
  },[])

  async function sendMessage() {
    if (message) {
      const {data,error} = await supabase
       .from('msgs')
       .insert({
          msgSenderUid: currentUserId,
          message,
          msgSender: currentUser,
          msgSenderPicture : userProfile,
          // msgReceiverUid: users[0].id,
          // msgReceiver: users[0].fullName,
          // read: false,
          // delivered: false,

          // created_at: new Date().toISOString(),
        });
        const sA = new Audio('/ass/sent.wav');
        sA.play();
        setMessage('');
    }
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
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
  return (
    <div className="w-full h-screen font-sura flex relative">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden blur-2xl "  onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div ref={sidebarRef} className={`fixed rounded md:relative w-3/4 max-w-xs md:w-[30%] lg:w-[25%] h-full overflow-y-auto scroll-smooth font-poppins border-r border-secondary bg-background transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-full'} md:left-0 z-20`}>
        <div className="sectionHeader p-2">
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
        <div className="allUsers p-1 overflow-y-auto border-t border-secondary">
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
      <div className="main flex-grow flex flex-col h-screen pb-10">
        <div className="mainHeader flex justify-between items-center p-3 border-b border-gray-400">
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

        <div className="chats flex-grow overflow-y-auto p-4">
          {/* Chat messages */}
          <div className="newMsg mb-4">
            <div className="flex items-end gap-2">
              <Image width={30} height={32} className="rounded-full" alt='userPicture' src='/ass/logo.png' />
              <div className="p-2 border border-secondary bg-accent rounded max-w-[70%]">
                <div className="msgHeader flex justify-between text-white text-xs gap-5 ">
                  <h3>Karim El assali</h3>
                  <span>11:12 pm</span>
                </div>
                <div className="msgHeaderInfo text-white mt-1">
                  <h5 className="text-sm">Hey!</h5>
                </div>
              </div>
            </div>
          </div>

          {/* My messages */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="myMsg mb-4 flex justify-end">
              <div className="flex items-end gap-2">
              <div className="p-2 border border-accent bg-background rounded max-w-[70%]">
                  <div className="msgHeader flex justify-between text-text text-xs gap-5">
                    <span>11:12 pm</span>
                  </div>
                  <div className="msgHeaderInfo text-text mt-1">
                    <h5 className="text-sm">Hey lorem*4 !</h5>
                  </div>
                </div>
                <Image width={30} height={32} className="rounded-full border border-accent " alt='userPicture' src='/ass/logo.png' />
              </div>
            </div>
          ))}
        </div>

        <div className="inputArea p-4 border-t fixed bottom-0 left-0 w-full  md:left-[30%] lg:left-[25%] border-gray-400" style={{backdropFilter:'blur(30px)'}}>
          <form className="flex items-center gap-2">
            <input type="text" className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:border-accent" placeholder="Type a message..." />
            <button className="bg-accent  animate-spin-slow text-white rounded-full p-2 hover:bg-opacity-80 transition-colors">
              <IoSendOutline size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

  

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
