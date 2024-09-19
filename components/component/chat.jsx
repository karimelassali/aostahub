"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { Toaster, toast } from "sonner";
import { MdDeleteSweep } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { SlOptionsVertical } from "react-icons/sl";
import { IoSendOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export function Chat() {
  const supabase = createClient();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    const chatContainer = document.querySelector(".chats");
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
        .from("users")
        .select()
        .order("id", { ascending: false });
      data ? setUsers(data) : toast.message("No online users now .");
    }
    fetchUsers();

    async function fetchMessages() {
      const { data, error } = await supabase
        .from("msgs")
        .select("*")
        .order("id", { ascending: true });
      data ? setMessages(data) : toast.message("No messages yet.");
    }
    fetchMessages();

    async function realTimeFetchMessages() {
      const { data, error } = await supabase
        .channel("msgListen")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "msgs" },
          (payload) => {
            console.log(payload)
            if(payload.new.msgSenderUid !== currentUserId && payload.new.msgSender !== currentUser){
              alert('your not the smae')
              const newMsgSound = new Audio("/ass/ann.wav");
              newMsgSound.play();
            }
            fetchMessages();
          }
        )
        .subscribe();
    }
    realTimeFetchMessages();
  }, []);

  async function sendMessage() {
    const msgInput = (document.getElementById("messageInput").value = "");
    if (message.length > 0 && currentUserId) {
      const { data, error } = await supabase.from("msgs").insert({
        msgSenderUid: currentUserId,
        message,
        msgSender: currentUser,
        msgSenderPicture: userProfile,
        // msgReceiverUid: users[0].id,
        // msgReceiver: users[0].fullName,
        // read: false,
        // delivered: false,

        // created_at: new Date().toISOString(),
      });
      const sA = new Audio("/ass/sent.wav");
      sA.play();
    } else {
      setMessage("");
      toast.message("Message cannot be empty");
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
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);
  return (
    <div className="w-full h-screen font-sura flex fixed">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative w-3/4 max-w-xs md:w-[30%] lg:w-[25%] h-full bg-background transition-all duration-300 ease-in-out ${
          sidebarOpen ? "left-0" : "-left-full"
        } md:left-0 z-20 flex flex-col`}
      >
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
            <div className="p-1 border-b cursor-pointer border-secondary text-accent hover:text-text transition-colors">
              All Users
            </div>
            <div className="p-1 border-b cursor-pointer border-secondary text-accent hover:text-text transition-colors">
              Favourites
            </div>
          </div>
          <div className="sectionSearch p-1">
            <div className="flex items-center justify-center gap-1 p-1">
              <input
                className="flex-grow p-1 border-b border-accent rounded text-sm"
                type="text"
                placeholder="Search"
              />
              <CiSearch
                className="relative hover:rotate-360 cursor-pointer transition-all text-accent"
                size={24}
              />
            </div>
          </div>
        </div>
        <div className="allUsers flex-grow overflow-y-auto pb-[10.5rem] p-1">
          {/* User list items */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="user border-b border-gray-500 flex mt-3 items-center justify-between p-2"
            >
              <div className="userInfo flex items-center">
                <Image
                  width={40}
                  height={40}
                  className="rounded-full border"
                  alt="userPicture"
                  src="/ass/logo.png"
                />
                <div className="flex flex-col pl-2">
                  <h4 className="text-sm">Karim El assali</h4>
                  <span className="text-xs text-gray-500">Hello</span>
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
              <Image
                width={40}
                height={40}
                className="rounded-full"
                alt="userPicture"
                src="/ass/logo.png"
              />
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

        <div className="chats flex-grow p-2 overflow-y-auto pb-[13.5rem] md:pb-[14rem]">
          {messages.map((msg) =>
            msg.msgSenderUid !== currentUserId ? (
              <div key={msg.id} className="mb-4 flex items-end">
                <Image
                  width={40}
                  height={40}
                  className="rounded-full mr-2 object-cover"
                  alt="userPicture"
                  src={msg.msgSenderPicture || "/ass/logo.png"}
                />
                <div className="p-3 rounded-tl-lg rounded-br-lg rounded-tr-lg  break-words max-w-[70%] md:max-w-[80%] bg-accent border border-secondary text-white overflow-hidden">
                  <div className="flex gap-5 items-center justify-between">
                    <h3 className="text-sm font-medium">
                      {msg.msgSenderName || "Karim El assali"}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {msg.timestamp || "11:12 pm"}
                    </span>
                  </div>
                  <p className="text-sm mt-1 break-words">{msg.message}</p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="mb-4 flex p-1 gap-2 items-end justify-end">
                <div className="p-3 rounded-tr-lg rounded-bl-lg  rounded-tl-lg break-words max-w-[70%] md:max-w-[80%] bg-background border border-secondary text-text overflow-hidden">
                  <div className="flex items-center gap-5 justify-between">
                    <h3 className="text-sm font-medium">
                      {msg.msgSenderName || "Karim El assali"}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {msg.timestamp || "11:12 pm"}
                    </span>
                  </div>
                  <p className="text-sm mt-1 break-words">{msg.message}</p>
                </div>
                <Image
                  width={20}
                  height={20}
                  className="rounded-full mr-2 object-cover"
                  alt="userPicture"
                  src={msg.msgSenderPicture || "/ass/logo.png"}
                />
              </div>
            )
          )}
        </div>

        <div className="inputArea p-1 border-t fixed bottom-0 w-full min-h-[50px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex justify-around  md:grid md:grid-cols-2  border border-secondary rounded gap-2 p-2 w-full"
          >
            <input
              id="messageInput"
              type="text"
              className="w-full md:w-[80%] p-2 rounded focus:outline-none focus:border-accent flex-grow "
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="w-full md:w-[20%] text-accent rounded-full p-2 hover:bg-opacity-80 transition-colors"
              onClick={sendMessage}
              type="button"
            >
              <IoSendOutline
                size={20}
                className="transform hover:scale-110 transition-all"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function MessageCircleIcon(props) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MoveVerticalIcon(props) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ThumbsDownIcon(props) {
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
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
