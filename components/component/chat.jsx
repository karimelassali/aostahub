'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SendIcon, MenuIcon, MapPinIcon, UserPlusIcon, HeartIcon, XIcon, CoffeeIcon, MountainIcon, WineIcon, SearchIcon, Delete, BlocksIcon, ArrowBigDown, ArrowBigLeftIcon, DeleteIcon, ArrowBigLeft, UserX, Flag, EllipsisVertical } from "lucide-react"
import { FaArrowLeft } from "react-icons/fa";
import  Image  from 'next/image'
import { useUser } from "@clerk/nextjs";
import { Toaster, toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link'
import { VideoIcon } from 'lucide-react'
// import VideoCall from '@/components/component/videoCall'
import { ImEyeBlocked } from "react-icons/im";
import { useRouter } from 'next/navigation'
import VideoCall from '@/components/video-call'
import { MdBlock, MdOutlineVerified } from "react-icons/md";
import { MdAttachFile } from "react-icons/md";
import ShowModal from './showModal';
import { Switch } from '@/components/ui/switch'
import TypingAnimation from '@/components/ui/typing-animation'
import MediaThemeYt from 'player.style/yt/react';
import { IoClose } from 'react-icons/io5'
import { SiIrobot } from "react-icons/si";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RiDeleteBinLine } from "react-icons/ri";
import { BsPersonBadge } from 'react-icons/bs'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'




export default  function Chat({type,msgsId}) {
  
  const [lopen,setLopen] = useState(false);
  const [file,setFile] = useState('');

  const [chatFile,setchatFile] = useState(null);
  const [chatFileName,setchatFileName] = useState(null);
  const [chatFileFile,setchatFileFile] = useState(null);
  //end chat immg confige
  const router = useRouter();
  const pType = type ;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [myFriends, setMyFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [friendFilter, setFriendFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [me,setMe] = useState([]);
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [replyToMessage, setReplyToMessage] = useState('');
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [msgStatu,setMsgStatu] = useState(false);
  const [modalType,setModalType] = useState('');
  const [userSearch, setUserSearch] = useState('');
  //ai states
  const [aiClicked, setAiClicked] = useState(false);
  const [msgAiType,setMsgAiType] = useState('');
  const [emojiChecked, setEmojiChecked] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTimer,setAiTimer] = useState(0);
  const [aiResponse, setAiResponse] = useState(false);
  const [aiOutpout, setAiOutpout] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');
  //img input for ai
  const [imgPrompt, setImgPrompt] = useState('');
  const [imgPromptSrc,setImgPromptSrc] = useState('');
  //ai chat array
  // const [aiChatDb,setAiChatDb] = useState([]);

  //ai section

  const handleAiOption = (e)=>{
    setMsgAiType(e.target.value)
    console.log(e.target.value)
  }

 const timer = () => {
  if (aiResponse) {
    setAiTimer(5);
    const interval = setInterval(() => {
      setAiTimer(prev => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        setAiResponse(false);
        return 0;
      });
    }, 1000);
  }
};

useEffect(() => {
  timer();
}, [aiResponse]);



/**
 * Send a request to the gemini AI model to generate a response based on the
 * current user input and selected options.
 *
 * @param {string} aiPrompt The user's input to be sent to the AI model.
 * @param {boolean} emojiChecked Should emojis be used in the AI response?
 * @param {string} msgAiType The type of message to be generated by the AI model.
 * @param {string} imgPromptSrc The URL of the image to be sent to the AI model, if any.
 */
  /**
   * Sends a request to the Rosta AI model to generate a response based on the
   * user's input and selected options, then updates the state with the response.
   */
  async function handleAirequest() {
    // Save the current prompt for possible reuse
    setLastPrompt(aiPrompt);
    // Set loading state to true while waiting for response
    setAiLoading(true);

    // Send POST request to the AI API endpoint
    const response = await fetch('/api/rosta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Construct the prompt for the AI model
        prompt: ` "${aiPrompt ? aiPrompt : lastPrompt}". Use emojis: ${emojiChecked ? 'yes' : 'no'}, and make the message type: ${msgAiType || 'A man have 50 years old full of life experiences'}.and im currently chat with my friend ${currentFriend.fname}`,
        imgPrompt: imgPromptSrc
      })
    });

    if (response) {
      // Parse the JSON response from the server
      let data = await response.json();
      // Update state to reflect data received
      setAiLoading(false);
      setAiResponse(true);
      setAiOutpout(data.response);
      setAiPrompt('');
      setImgPrompt('');
      setImgPromptSrc('');
      // Optionally, you can save to memory or other state
      // setAiMemory(aiPrompt + aiOutpout);
    }
  }


      
  const imgsExtensions = [
    '.jpg','.jpeg','.png','.gif','.webp',
  ]
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
    
  }, [])

  function firstMessage(){
    const firstMessageDiv = document.getElementById('firstMessageDiv');
    if (firstMessageDiv){
      firstMessageDiv.scrollIntoView({behavior:'smooth'});
    }
    
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages,, scrollToBottom])

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 1000)

    return () => clearTimeout(timer);
  }, [scrollToBottom,messages])


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const filteredFriends = myFriends.filter(friend => {
    const matchesFilter = 
      (friendFilter === 'all') ||
      (friendFilter === 'online' && friend.status === 'online') ||
      (friendFilter === 'favorites' && friend.favorite)
    const matchesSearch = friend.userName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }
   //search function 
   async function search(){
    const {data,error} = await supabase
    .from('friends')
    .select('*')
    .textSearch('userName',userSearch)
  }
    //--------------

  useEffect(() => {
    async function fetchMe(){
      const {data,error} = await supabase.from('users').select().eq('uid',currentUserId);
      data ? setMe(data) : alert('You are not allowed to access this page.');
    }
    fetchMe();

   
    async function fetchMyFriends() { 
      const { data, error } = await supabase
        .from("friends")
        .select()
        .eq('requester',currentUserId)
        // .or(`requester.eq.${currentUserId},receiver.eq.${currentUserId}`)
        .eq('status','accept')
        .order("id", { ascending: false });
      data ? setMyFriends(data) : toast.message("No friends .");
    }
    fetchMyFriends();
    //fetch msg receiver 
    async function fetchCurrentFrien() {
      if (!currentUserId || !msgsId) {
        // toast.error("Invalid user IDs");
        return;
      }
    
      // Check if friendship exists
      const { data: chckFriend, error: chckFriendError } = await supabase
        .from('friends')
        .select()
        .eq('requester', currentUserId)
        .eq('receiver', msgsId)
        .eq('status', 'accept');
    
      console.log("Friendship check:", chckFriend, "Error:", chckFriendError);
    
      if (chckFriend && chckFriend.length > 0) {
        // toast.message('Friendship exists!');
        
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("uid", msgsId)
          .single();
    
        if (data) {
          setCurrentFriend(data);
          return; // Avoid unnecessary redirection
        } else {
          toast.error('User details not found!');
        }
      }
    
      // Redirect if no friendship exists
      router.push('/chat');
    }
    
  
    //end of fetchCurrentFriend
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("msgs")
        .select("*")
        // .eq('msgReceiverUid',msgsId)
        // .eq('msgSenderUid',currentUserId)
        .or(`and(msgReceiverUid.eq.${msgsId},msgSenderUid.eq.${currentUserId}),and(msgReceiverUid.eq.${currentUserId},msgSenderUid.eq.${msgsId})`).order("id", { ascending: true });
      data ? setMessages(data) : toast.message("No messages yet wait.");
      
      scrollToBottom(); // Call scrollToBottom after setting messages
    }
    msgsId ? fetchCurrentFrien() + fetchMessages() : null ;

    async function realTimeFetchMessages() {
      const { data, error } = await supabase
        .channel("msgListen")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "msgs" },
          (payload) => {
            console.log(payload);
            if (
              payload.new.msgSenderUid !== currentUserId &&
              payload.new.msgSender !== currentUser &&
              window.location.pathname === "/chat"
            ) {
              const newMsgSound = new Audio("/ass/ann.wav");
              newMsgSound.play();
            }
            fetchMessages();
          }
        )
        .subscribe();
    }
    realTimeFetchMessages();
    // setChatUid()
    // )
    currentFriend ? alert(me.id + currentFriend.id) : null ;
  },[currentUser,currentUserId,supabase] ); 

  

  async function sendMessage() {
    let time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if(chatFile){
      const {data,error} = await supabase.storage.from('images').upload(`chatFiles/${chatFileName}`,chatFileFile);
      setchatFile(null)
      data ? toast.success('img uploaded succes') + setchatFile(null) : toast.error(error);
    }
    // setAiClicked(false);
    if (message.length > 0 && currentUserId && currentFriend || chatFile ) {
     
      const { data, error } = await supabase.from("msgs").insert({
        msgSenderUid: currentUserId,
        message: message,
        msgSender: currentUser,
        msgSenderPicture: me.imgName ?  me.imgName : `https://api.dicebear.com/6.x/micah/svg?seed=${me.fname}`,
        time,
        msgReceiver:currentFriend.username,
        msgReceiverPicture: currentFriend.imgName,
        msgReceiverUid:currentFriend.uid,
        msgSenderVerification:'1',
        msgsId:msgsId,
        chatFile: chatFile ? chatFileName : null,
        replyTo: replyToMessage ? replyToMessage : null,
        // msgReceiverUid: users[0].id,
        // msgReceiver: users[0].fullName,
        // read: false,
        // delivered: false,

      });
      const sA = new Audio("/ass/sent.wav");
      sA.play();
      scrollToBottom();
      setMessage("");
      setMsgStatu(false)
      setReplyToMessage('');
      if (data) {
        //send a msg into notifications table
        const { data: noti, error: notierror } = await supabase
          .from('notifications')
          .insert([{
            sender: currentUserId,
            receiver: currentFriend.uid,
            type:`${me.username} sent you a msg: ${message}`
          }])
      }
      if (!error) {
        //send a msg into notifications table
        const { data: noti, error: notierror } = await supabase
          .from('notifications')
          .insert([{
            sender: currentUserId,
            senderName:currentUser,
            receiver: currentFriend.uid,
            type:`${currentUser} sent you a msg : ${message}`
          }])
      }
    } else {
      setMessage("");
      toast.message("Message cannot be empty");
    }
  }

  async function blockFriend(uid,name){
    const {data,error} = await supabase
    .from('friends')
    .delete()
    .eq('requester',currentUserId)
    .eq('receiver',uid)
    !error ? toast.success(`You suucefully blocked ${name}`) : toast.error(error)
    router.push('/chat');
  }


  const handleClose = ()=>{
    setLopen(false);
  }
  
  // const handleStopCall = ()=>{
  //   setIsVideoCall(false);
  // }

  const deleteMessage = async (id) => {
    const { data, error } = await supabase
      .from("msgs")
      .delete()
      .eq("id", id);
    if (!error) {
      toast.success("Message deleted");
    }
  };

  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleTyping = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    setIsTyping(true);
    
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000); // Hide typing indicator after 1 second of no typing
    
    setTypingTimeout(timeout);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    handleTyping();
  };

  return (
    <main aria-label="Chat Interface" className="flex flex-col h-screen bg-background">
      <header className="border-b p-4" role="banner">
        <nav className="flex items-center justify-between" aria-label="Chat navigation">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            {currentFriend && (
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentFriend.avatar_url} alt={`${currentFriend.full_name}'s avatar`} />
                  <AvatarFallback>{currentFriend.full_name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <h1 className="text-sm font-semibold">{currentFriend.full_name}</h1>
                  <p className="text-xs text-muted-foreground">{currentFriend.status}</p>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <ScrollArea className="flex-1 p-4" ref={messagesEndRef}>
        <section aria-label="Chat messages" className="space-y-4">
          {messages.map((message, index) => (
            <article
              key={message.id}
              className={`flex ${message.msgSenderUid === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col max-w-[70%]">
                <div className={`flex items-start gap-2 ${message.msgSenderUid === currentUserId ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={message.msgSenderUid === currentUserId ? me.avatar_url : currentFriend?.avatar_url} 
                      alt={`${message.msgSenderUid === currentUserId ? 'Your' : currentFriend?.full_name + "'s"} avatar`}
                    />
                    <AvatarFallback>
                      {message.msgSenderUid === currentUserId ? me.full_name?.[0] : currentFriend?.full_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.msgSenderUid === currentUserId
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <time className="text-xs opacity-70">
                      {new Date(message.time).toLocaleTimeString()}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {isTyping && currentFriend && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={currentFriend.avatar_url} 
                  alt={`${currentFriend.full_name}'s avatar`}
                />
                <AvatarFallback>{currentFriend.full_name?.[0]}</AvatarFallback>
              </Avatar>
              <span>{currentFriend.full_name} is typing...</span>
            </div>
          )}
        </section>
      </ScrollArea>

      <footer className="border-t p-4" role="contentinfo">
        <form onSubmit={(e)=>{e.preventDefault();sendMessage();setAiClicked(false)}} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessageChange}
            aria-label="Message input"
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon"
            aria-label="Send message"
            disabled={!message.trim()}
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </footer>
    </main>
  )
}