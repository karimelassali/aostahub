'use client'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react";


import { useRouter } from "next/router"
import { useUser } from "@clerk/nextjs"
import { Toaster, toast } from "sonner"
import { MdDeleteSweep } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { SlOptionsVertical } from "react-icons/sl";

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
  return (
    (
      <div className="w-screen h-screen  flex">
        <div className="w-[30%] " style={{border:'1px solid red'}}>
            <div className="sectionHeader">
              <div className="sectionHeaderInfo flex justify-between items-center p-2 gap-1">
                <div className="flex gap-1 p-1 items-center">
                  <Image style={{borderRadius:'50px'}} height={50} width={50} className="rounded-full" alt='userPicture' src={'/ass/logo.png'}  />
                    <div className="sectionHeaderFullName flex ">
                      <h4>Karim El assali</h4>
                    </div>
                </div>

                  <div className="sectionHeaderOptions">
                    <div className="flex gap-1">
                      <SlOptionsVertical />
                    </div>
                </div>
              </div>
                <div className=" p-2 "></div>
               <div className="sectionSearch p-1">
                <div className="flex items-center justify-center gap-1 p-1">
                  <CiSearch className="relative" size={30} />
                  <input style={{borderRadius:'5px'}} className="flex justify-start p-1 w-full border border-gray-400 rounded"  type="text" placeholder={`Search` }  />
                </div>
               
              </div>
              <div className="availableChats">
                <div className="chatsOptions flex justify-between p-2 gap-2">
                    <div className='p-1 border-b border-b-3 cursor-pointer border-secondary '>All Users</div>
                    <div className='p-1 border-b border-b-3 cursor-pointer border-secondary '>Favourites</div>
                </div>
                <div className="allUsers p-1  h-52 overflow-y-auto border  " >
                  <div className="user border-b border-gray-500 flex mt-3 items-center justify-between ">
                    <div className="userInfo flex flex-col items-center p-1">
                      <div className="flex p-1">
                        <Image style={{borderRadius:'50%'}} height={50} width={40} className="rounded-full border " alt='userPicture' src={'/ass/logo.png'}  />
                        <div className="flex flex-col pl-1">
                          <h4>Karim El assali</h4>
                          <span className='text-sm text-gray-500' >Hello</span>
                        </div>
                      </div>
                    </div>  
                    <span className="text-gray-500 text-sm">Tue</span>
                  </div>
                  <div className="user border-b border-gray-500 flex mt-3 items-center justify-between ">
                    <div className="userInfo flex flex-col items-center p-1">
                      <div className="flex p-1">
                        <Image style={{borderRadius:'50%'}} height={50} width={40} className="rounded-full border " alt='userPicture' src={'/ass/logo.png'}  />
                        <div className="flex flex-col pl-1">
                          <h4>Karim El assali</h4>
                          <span className='text-sm text-gray-500' >Hello</span>
                        </div>
                      </div>
                    </div>  
                    <span className="text-gray-500 text-sm">Tue</span>
                  </div>
                  <div className="user border-b border-gray-500 flex  items-center justify-between ">
                    <div className="userInfo flex flex-col items-center p-1">
                      <div className="flex p-1">
                        <Image style={{borderRadius:'50%'}} height={50} width={40} className="rounded-full border " alt='userPicture' src={'/ass/logo.png'}  />
                        <div className="flex flex-col pl-1">
                          <h4>Karim El assali</h4>
                          <span className='text-sm text-gray-500' >Hello</span>
                        </div>
                      </div>
                    </div>  
                    <span className="text-gray-500 text-sm">Tue</span>
                  </div><div className="user border-b border-gray-500 flex  items-center justify-between ">
                    <div className="userInfo flex flex-col items-center p-1">
                      <div className="flex p-1">
                        <Image style={{borderRadius:'50%'}} height={50} width={40} className="rounded-full border " alt='userPicture' src={'/ass/logo.png'}  />
                        <div className="flex flex-col pl-1">
                          <h4>Karim El assali</h4>
                          <span className='text-sm text-gray-500' >Hello</span>
                        </div>
                      </div>
                    </div>  
                    <span className="text-gray-500 text-sm">Tue</span>
                  </div>
                  <div className="user border-b border-gray-500 flex  items-center justify-between ">
                    <div className="userInfo flex flex-col items-center p-1">
                      <div className="flex p-1">
                        <Image style={{borderRadius:'50%'}} height={50} width={40} className="rounded-full border " alt='userPicture' src={'/ass/logo.png'}  />
                        <div className="flex flex-col pl-1">
                          <h4>Karim El assali</h4>
                          <span className='text-sm text-gray-500' >Hello</span>
                        </div>
                      </div>
                    </div>  
                    <span className="text-gray-500 text-sm">Tue</span>
                  </div>
                  <div className="user border-b border-gray-500 flex  items-center justify-between ">
                    <div className="userInfo flex flex-col items-center p-1">
                      <div className="flex p-1">
                        <Image style={{borderRadius:'50%'}} height={50} width={40} className="rounded-full border " alt='userPicture' src={'/ass/logo.png'}  />
                        <div className="flex flex-col pl-1">
                          <h4>Karim El assali</h4>
                          <span className='text-sm text-gray-500' >Hello</span>
                        </div>
                      </div>
                    </div>  
                    <span className="text-gray-500 text-sm">Tue</span>
                  </div>
                </div>
              </div>
            </div>
        </div>  
        <div className="main w-full flex flex-col">
          <div className="mainHeader w-full flex justify-between items-center p-3 border-b border-gray-400 " >
            <div className="userInfo flex ">
              <Image height={50} width={50} className="rounded-full" alt='userPicture' src={'/ass/logo.png'} />
              <div className="fullName flex flex-col">
                <h4>Karim El assali</h4>
                <span className="text-sm ">Active Now</span>
              </div>
            </div>
            <div className="mainOptions flex gap-2">
              <div className="rounded-full bg-secondary cursor-pointer  w-[30px] h-[30px] p-1 flex items-center justify-center hover:scale-150 " style={{borderRadius:'50%'}} ><CiStar /></div>
              <div className="rounded-full bg-secondary cursor-pointer  w-[30px] h-[30px] p-1 flex items-center justify-center hover:scale-150 " style={{borderRadius:'50%'}} ><CiShare2 /></div>
              {/* <div className="rounded-full bg-gray-600 w-[30px] h-[30px] p-1 flex items-center justify-center" style={{borderRadius:'50%'}} ></div> */}
            </div>
          </div>
         
        </div>
      </div>
  ));
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
