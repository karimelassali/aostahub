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
import { SendIcon, MenuIcon, MapPinIcon, UserPlusIcon, HeartIcon, XIcon, CoffeeIcon, MountainIcon, WineIcon, SearchIcon, Delete, BlocksIcon, ArrowBigDown, ArrowBigLeftIcon } from "lucide-react"
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
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [msgStatu,setMsgStatu] = useState(false);
  const [modalType,setModalType] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [aiClicked, setAiClicked] = useState(false);
  const [msgAiType,setMsgAiType] = useState('');
  const [emojiChecked, setEmojiChecked] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const [aiResponse, setAiResponse] = useState('');

  //ai section
  const handleAiOption = (e)=>{
    setMsgAiType(e.target.value)
    console.log(e.target.value)
  }


async function handleAirequest() {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: `Hello im ${currentUser} and i want to create a message for my friend ${currentFriend.fname} This is my input: "${aiPrompt}". Please create a message suitable for a real user. Use emojis : ${emojiChecked ? 'yes' : 'no'} and set the message type as: ${msgAiType ? msgAiType : 'funny'}. Your response should be a simple yet creative message based on the input provided. Please respond in the same language as the request and avoid any extra definitions or explanations.`
    })
  });
  if(response){
    let data = await response.json();
    // setAiResponse(data.response)
    document.getElementById('aiResponse').innerHTML = data.response;  }
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
      const {data:chckFriend,error:chckFriendError} = await supabase
      .from('friends')
      .select()
      .or(`and(requester.eq.${msgsId},receiver.eq.${currentUserId}),and(requester.eq.${currentUserId},receiver.eq.${msgsId})`).eq('status','accept').order("id", { ascending: true });
      if(chckFriend){
        const { data, error } = await supabase
        .from("users")
        .select()
        .eq("uid",msgsId)
        .single();
       if (data) {
         setCurrentFriend(data);
       }
       else{
        router.push('/chat');
       }
      }
      else{
        toast.error('plz select a firend');
      }

     
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
    .eq('receiver',currentUserId)
    .eq('requester',uid)
    data ? toast.success(`${name} Is not your friend `) : toast.error(error)
  }


  const handleClose = ()=>{
    setLopen(false);
  }
  
  const handleStopCall = ()=>{
    setIsVideoCall(false);
  }

  return (
    (
      <div className="flex h-screen w-full transition-all  bg-[#fbfbfe] text-[#050315]">
        {
          aiClicked && (
            <div className='flex text-black p-3  bg-black justify-center items-center  bg-opacity-45  w-full h-full  z-40 absolute '  >
              <button className=' text-red-500  m-3 rounded  p-3 absolute top-0 right-0 '  onClick={()=>{setAiClicked(false)}}>
                  <IoClose className='h-10 w-10   hover:rotate-180 transition-all duration-300'  />
                </button>
             <div className='flex flex-col gap-4  min-w-[90%]   min-h-[50%] bg-white  rounded-lg p-4'>
                <h1 className='text-black flex '><SiIrobot className='w-5 h-5 '  /> </h1>
                <div className='flex flex-col justify-center w-full'>
                  {/* <h3 className='text-white text-center'>
                    AI Chat assistant 
                  </h3> */}
                  <div className="aiArea h-full gap-2  w-full flex flex-col ">
                    <div className='gap-2 flex justify-center  '>
                       <select className='rounded p-2 font-poppins bg-secondary  ' onChange={handleAiOption}>
                        <option value="funny">funny</option>
                        <option value="formal">formal</option>
                        <option value="informal">informal</option>
                        <option value="normal">normal</option>
                      </select>
                      <div className='flex bg-secondary  items-center gap-2  rounded text-black p-2 '  >
                          <h4 className=''>Emoji</h4>
                          <Switch checked={emojiChecked}   onCheckedChange={(e)=>{setEmojiChecked(e);console.log(e)}}  />
                      </div>
                    
                    </div>
                    <div className='aiResponse p-2 min-h-[150px] '>
                        <div className='flex items-start gap-2 min-h-[150px] overflow-y-scroll scrolllbar-hide  ' >
                            <Image width={20} height={20} alt={'ai icon'} src='/ass/ai.png' / >
                            <p id="aiResponse" className="text-black max-h-[200px] overflow-scroll">
                              {aiResponse ? (
                                aiResponse.response !== '' ? (
                                  <span>{aiResponse.response}</span>
                                ) : (
                                  <Image width={40} height={40} alt="AI icon" src="/ass/ai.gif" />
                                )
                              ) : (
                                'Hello, I’m your AI message assistant. How can I help you?'
                              )}
                            </p>
                      </div>
                      {
                        aiResponse && (
                              <div className='flex justify-between  gap-2 w-full '  >
                                <button onClick={()=>{setMessage(aiResponse),setAiClicked(false)}}  className='bg-green-500 w-[50%] p-2 rounded font-poppins text-white hover:bg-green-300 '  >Insert 👍</button>
                                <button onClick={() => { handleAirequest()}}  className='bg-red-500 w-[50%] p-2 rounded font-poppins text-white hover:bg-red-300 '  >Regenerate 👎</button>
                            </div>
                        )
                      }
                    </div>  
                    <div className='aiInput border border-secondary  flex relative bottom-0 rounded p-2 gap-4 w-full'>
                      <input type='text' placeholder={`How i can help you today ${currentUser} ?`} className='p-2 rounded border-none outline-none w-full flex  items-center  ' onChange={(e)=>setAiPrompt(e.target.value)}  />
                        <button className='rounded ' onClick={()=>{
                          handleAirequest()
                        }}  >
                          <Image width={40} height={40} alt={'ai icon'} src='/ass/ai.png' / >
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              </div>
          )
        }
       
       {
        lopen && (
          <ShowModal fileType={modalType} onClose={handleClose}  src={file}  />
        )
       }
       {
        isVideoCall && (
          <VideoCall onCloseCall={handleStopCall}  />
        )
       }
      {/* Potential Friends List */}
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{ x: 0, opacity: 1  }}
          exit="closed"
          variants={menuVariants}
          className={`w-full sm:w-1/3   lg:w-1/4 xl:w-1/5 bg-[#fbfbfe] border-r border-[#dedcff] fixed sm:relative inset-0 transition-all z-30 ${isMobileMenuOpen ? 'block' : 'hidden sm:block'}`}>
          <div
            className="p-4 border-b border-[#dedcff] flex justify-start gap-2   items-center bg-accent text-[#fbfbfe]">
              <Avatar className="h-8 w-8 ">
                    <AvatarImage src={userProfile} alt="You" />
                    <AvatarFallback>You</AvatarFallback>
              </Avatar>
            <h2 className="lg:text-xl flex items-center font-poppins font-semibold">{currentUser}  <span>{me.verified == 1 && <MdOutlineVerified size={30} style={{ color: '#0284c7' }} />}</span></h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="sm:hidden text-[#fbfbfe]">
              <XIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <div className="relative">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050315]" />
              <Input
                onChange={(e)=>{
                  setUserSearch(e.target.value);
                  search();
                }}
                type="text"
                placeholder="Search friends..."
                className="pl-10 border-[#dedcff] text-[#050315]" />
            </div>
            <Tabs defaultValue="all" onValueChange={setFriendFilter}>
              <TabsList className="grid w-full grid-cols-3 bg-[#dedcff]">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#2f27ce] data-[state=active]:text-[#fbfbfe]">All</TabsTrigger>
                <TabsTrigger
                  value="online"
                  className="data-[state=active]:bg-[#2f27ce] data-[state=active]:text-[#fbfbfe]">Online</TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="data-[state=active]:bg-[#2f27ce] data-[state=active]:text-[#fbfbfe]">Favorites</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ScrollArea className="h-[calc(100vh-13rem)]">
            {
              filteredFriends.map((friend) => (
                <Link
                  href={`/chat/${friend.frienduid}`}
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4">
                  <Card
                    className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer border-[#dedcff]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={friend.friendProfile}
                            alt={friend.friendName} />
                          <AvatarFallback>{friend.friendName}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 gap-3 ">
                          <h3 className="font-semibold flex items-center gap-x-1 ">{friend.friendName}{ friend.friendVerification == 1 && (<MdOutlineVerified size={15} style={{ color: '#0284c7' }} />)}, {friend.friendAge}</h3>
                          <p className="text-sm text-[#050315] flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" /> {friend.friendLocation}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={friend.status === 'online' ? 'default' : 'secondary'}
                        className={friend.status === 'online' ? 'bg-[#433bff] text-[#fbfbfe]' : 'bg-[#dedcff] text-[#050315]'}>{friend.status}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {
                        <Badge key={friend.id} variant="outline" className="bg-[#dedcff] gap-2 text-[#050315]">
                         {
                          
                            friend.friendInterests.split(/[,.:&;\s]|and/).filter(Boolean).map((int, index) => (
                              <Badge key={index} variant="outline" className="bg-[#dedcff] text-[#050315]">
                                {int}
                              </Badge>
                            ))
                          }
                        
                        </Badge>
                      }
                    </div>
                  </Card>
                </Link>
              )
            )}
          </ScrollArea>
        </motion.div>
      </AnimatePresence>
      {/* Chat Window */}
      {
        pType === 'mainPage'   ? (
          <div className='w-full h-full flex flex-col items-center justify-center  ' >
            <div className='border flex font-poppins flex-col items-center  gap-y-5 justify-center p-2 rounded' >
              <h1>Welcome to the Chat App!</h1>
              <p className='text-center' >Please select a friend from the left side to start a conversation.</p>
              <Button className='text-white' onClick={e=>{setIsMobileMenuOpen(true)}} >
                Pick a friend !
              </Button>
            </div>
          </div>
        )  : null }
        {
          currentFriend ? (
            <div className="flex-1 flex flex-col h-screen max-sm:w-full ">
                  {/* Chat Header */}
                  <div
                    className="p-4 max-sm:p-1 border-b border-[#dedcff] bg-[#fbfbfe] flex justify-between items-center ">
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        className="mr-2 sm:hidden text-[#050315]">
                        <MenuIcon className="h-6 w-6" />
                      </Button>
                      {currentFriend && (
                        <div className={'flex items-center justify-center p-2  cursor-pointer '}   >
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                            className={'cursor-pointer'}
                            onClick={()=>{setLopen(true);setModalType('img');setFile(`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${currentFriend.imgName}`)}}
                              src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${currentFriend.imgName}`}
                              alt={currentFriend.fname} />
                            <AvatarFallback>{currentFriend.fname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <Link href={`/profile/${currentFriend.uid}`}  className="ml-4">
                            <h3 className="font-semibold flex items-center gap-x-2 ">{currentFriend.fname + ' ' +   currentFriend.lname}{ currentFriend.verified == 1 && (<MdOutlineVerified size={15} style={{ color: '#0284c7' }} />)}</h3>
                            <div className="status grid grid-cols-2 max-sm:grid-cols-1 gap-1">
                              <p className="text-sm text-[#050315]  ">@{currentFriend.username}-</p>
                              <p className="text-sm text-[#050315]">now</p>
                            </div>
                            </Link>
                        </div >
                      )}
                    </div>
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-1 items-center ">
                          {
                            currentFriend && (
                              <Button
                                onClick={()=>{blockFriend(currentFriend.uid,currentFriend.username)}}
                                variant="outline"
                                size="sm"
                                className="border border-red-400 text-[#050315] text-sm line-clamp-1 w-full  flex hover:bg-red-400 hover:text-[#fbfbfe]">
                                <MdBlock className="h-4 w-4 mr-2" />
                                Block {currentFriend.username}
                              </Button>
                            )
                          }
                     
                      <Button
                      onClick={()=>{setIsVideoCall(true)}}
                        variant="outline"
                        size="sm"
                        className="bg-[#dedcff] text-[#050315] hover:bg-[#433bff] hover:text-[#fbfbfe]">
                          <VideoIcon className="h-4 w-4 mr-2" />
                          Video Call
                        </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4  ">
                      <div id='firstMessageDiv'  ></div>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-end mb-4  ${message.msgSenderUid === currentUserId ? 'justify-end' : 'justify-start'  }`}>
                          {message.msgSenderUid !== currentUserId && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                              src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${currentFriend.imgName}`}
                              alt={message.msgSender} />
                              <AvatarFallback>{message.msgSender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-3xl p-3 max-w-[80%] lg:max-w-md ${message.msgSenderUid === currentUserId ? 'bg-[#2f27ce] max-w-[80%]  text-[#fbfbfe] rounded-tl-lg rounded-bl-lg rounded-tr-lg break-words'  : 'bg-[#dedcff] max-w-[80%] text-text break-words  rounded-tl-lg rounded-br-lg rounded-tr-lg '}`}>
                              {
                                 message.chatFile != null && imgsExtensions.some(ext =>  message.chatFile.endsWith(ext)) &&  (
                                     <Image
                                        className='cursor-pointer  rounded max-h-[250px] min-h-[200px]  object-cover '
                                        width={200} 
                                        height={200}
                                        src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/chatFiles/${message.chatFile}`}   // Thumbnail image URL
                                        alt={`${message.mesage}`}
                                        onClick={()=>{setLopen(true);setFile(`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/chatFiles/${message.chatFile}`);setModalType('img')}}
                                    />  
                                 )
                              }
                              {
                              message.chatFile != null && message.chatFile.endsWith('.mp4') && (
                                  <MediaThemeYt>
                                  <video
                                     playsInline
                                     slot="media"
                                      crossOrigin
                                      onClick={()=>{setLopen(true);setFile(`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/chatFiles/${message.chatFile}`);setModalType('video')}}
                                       className='object-cover w-full h-24  max-h-[250px] min-h-[200px]  rounded-md'
                                       src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/chatFiles/${message.chatFile}`}
                                  />  
                                  </MediaThemeYt>
                               )
                              }
                            <p>
                            {message.message}
                            </p>
                            <p
                              className={`text-xs mt-1 ${message.msgSenderUid === currentUserId ? 'text-gray-300 text-sm ' : ' text-sm text-slate-700 '}`}>{message.time}</p>
                          </div>
                              {
                                message.msgSenderUid !== currentUserId  && message.message && (
                                  <Image width={20} height={20} alt={'ai icon'} src='/ass/ai.png' / >
                                )
                            }
                          {/* {message.msgSenderUid === currentUserId && (
                            // <Avatar className="h-8 w-8 ml-2">
                            //   <AvatarImage src={me.msgSenderPicture} alt="You" />
                            //   <AvatarFallback>You</AvatarFallback>
                            // </Avatar>
                          )} */}
                        </motion.div>
                      ))}
                    <div ref={messagesEndRef} />
                  </div>
                  {/* Message Input */}
                  <form
                    onSubmit={(e)=>{e.preventDefault();sendMessage()}} 
                    className="p-4 bg-[#fbfbfe] border-t border-[#dedcff]">
                     
                      {
                        msgStatu && (
                          <div className='w-full bg-red-500  p-2'  >
                              Sending...
                          </div>
                        )
                      }
                      {
                        chatFile && (
                          
                          <div className='flex gap-2 p-3 items-center'>
                            <Image src={chatFile} width={40} height={40} alt='img' className='w-20 h-20 rounded'  />
                          </div>
                        )
                      }
                      {/* <div className='w-full border border-red-400 p-2' >
                        <Image src={'/ass/logo.png'} width={40} height={40} alt='tst'  />
                      </div> */}
                    <div className="flex gap-2 border-b border-accent p-1  rounded  items-center">
                    <input onChange={(e)=>{
                      const img = e.target.files[0];
                      if(img){
                        const imgUrl = URL.createObjectURL(img);
                        setchatFileFile(img); 
                        setchatFileName(img.name);
                        setchatFile(imgUrl);
                      }
                    }} id='msgImg' type="file" hidden />

                    <div className='flex justify-between items-center '  >
                       <div className='flex justify-center  p-2 text-accent ' style={{
                        
                        transform : 'scale(1.5)',
                       }} >
                        {/* <ArrowBigDown  onClick={()=>{scrollToBottom()}}  className='w-5 h-5 border border-accent  rounded  cursor-pointer  ' size={100} /> */}
                      </div>
                    <Button
                        onClick={()=>{
                          document.getElementById('msgImg').click();
                        }}
                        type="button"
                        size="icon"
                        className="ml-2  bg-white text-accent border border-accent hover:text-white ">
                        <MdAttachFile className="h-5 w-5" />
                        <span className="sr-only">Send image</span>
                      </Button>
                      </div>
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 border-none text-md  focus:outline-none outline-none  " />
                        <div className='flex p-1 p-x-3 gap-2 '  >
                         {/* <div className='flex p-2 justify-center text-accent ' style={{
                          transform: 'scale(1.5)',
                         }} >
                        <ArrowBigLeftIcon onClick={()=>{firstMessage()}}  className='w-5 h-5 rotate-90 border border-accent  cursor-pointer  rounded  ' size={100}  />
                      </div> */}
                       <motion.button 
                      initial={{
                        opacity: 0,
                        x: -200
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 1.5,
                      }}
                      onClick={() => {
                        setAiClicked(true);
                      }}
                       >
                         <Image width={40} height={40} alt={'ai icon'} src='/ass/ai.png' / >
                      </motion.button>
                      <Button
                        type="submit"
                        size="icon"
                        className=" bg-[#2f27ce] text-[#fbfbfe] hover:bg-[#433bff]">
                        <SendIcon className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                      </Button>
                      </div>
                    </div>
                  </form>
                </div>
          ) : (
            <>
              {/* {
                type != 'mainPage' && (
                  <div className='flex p-2 rounded ' >
                    <h4 className='text-center text-red-400 h-min p-1 border border-red-400 rounded font-poppins ' >No Chat Avaialabel with this id</h4>
                    {
                      setTimeout(()=>{
                        router.push('/chat');
                      },2000)
                    }
                </div>
                )
              } */}
            </>
          )
      }
      
      
      {/* Friend Suggestion Overlay */}
      <AnimatePresence>
        {showSuggestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 right-4 bg-[#fbfbfe] p-4 rounded-lg shadow-lg border border-[#dedcff]">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-[#050315]">New Friend Suggestion</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSuggestion(false)}
                className="text-[#050315]">
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://api.dicebear.com/6.x/micah/svg?seed=Elena" alt="Elena" />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="font-medium text-[#050315]">Elena, 27</p>
                <p className="text-sm text-[#050315]">Loves hiking and local cuisine</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSuggestion(false)}
                className="border-[#dedcff] text-[#050315] hover:bg-[#dedcff]">
                Skip
              </Button>
              <Button size="sm" className="bg-[#2f27ce] text-[#fbfbfe] hover:bg-[#433bff]">
                <HeartIcon className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>)
  );
}