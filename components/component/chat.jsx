"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SendIcon,
  MenuIcon,
  MapPinIcon,
  UserPlusIcon,
  HeartIcon,
  XIcon,
  CoffeeIcon,
  MountainIcon,
  WineIcon,
  SearchIcon,
  ImageIcon,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Toaster, toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function Chat() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [friendFilter, setFriendFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const supabase = createClient();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const currentUserId = user?.id;
  const userProfile = user?.imageUrl;
  const currentUser = user?.fullName;

  const scrollAreaRef = useRef(null);

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
      data ? setMessages(data) : toast.message("No messages yet wait.");
      scrollToBottom(); // Call scrollToBottom after setting messages
    }
    fetchMessages();

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
  }, [currentUser, currentUserId, supabase]);

  async function sendMessage() {
    let time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (message.length > 0 && currentUserId) {
      const { data, error } = await supabase.from("msgs").insert({
        msgSenderUid: currentUserId,
        message,
        msgSender: currentUser,
        msgSenderPicture: userProfile,
        time,
        // msgReceiverUid: users[0].id,
        // msgReceiver: users[0].fullName,
        // read: false,
        // delivered: false,

        // created_at: new Date().toISOString(),
      });
      const sA = new Audio("/ass/sent.wav");
      sA.play();
      scrollToBottom();
      setMessage("");
    } else {
      setMessage("");
      toast.message("Message cannot be empty");
    }
  }

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setCurrentFriend({
        id: 1,
        name: "Sofia Rossi",
        age: 28,
        interests: ["Hiking", "Wine tasting", "Skiing"],
        lastSeen: "Just now",
        distance: "0.5 km",
        status: "online",
        favorite: true,
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredFriends = potentialFriends.filter((friend) => {
    const matchesFilter =
      friendFilter === "all" ||
      (friendFilter === "online" && friend.status === "online") ||
      (friendFilter === "favorites" && friend.favorite);
    const matchesSearch = friend.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
        
  return (
    <div className="flex h-screen bg-[#fbfbfe] text-[#050315]">
      {/* Aosta Friends List - Now always visible on large screens */}
      <div
        className={`
        w-full md:w-1/3 lg:w-1/4 
        bg-[#fbfbfe] border border-accent
        text-accent
        fixed md:relative inset-y-0 left-0 z-30 
        transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 
        transition-transform duration-300 ease-in-out
      `}
      >
        <div className="p-4 border-b border-[#dedcff] flex justify-between items-center font-poppins text-text">
          <h2 className="text-xl font-semibold first-letter:capitalize ">{currentUser}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-accent border border-accent hover:text-white "
          >
            <XIcon className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050315]" />
            <Input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#dedcff] text-[#050315]"
            />
          </div>
          <Tabs defaultValue="all" onValueChange={setFriendFilter}>
            <TabsList className="grid w-full grid-cols-3 bg-[#dedcff]">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#2f27ce] data-[state=active]:text-[#fbfbfe]"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="online"
                className="data-[state=active]:bg-[#2f27ce] data-[state=active]:text-[#fbfbfe]"
              >
                Online
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="data-[state=active]:bg-[#2f27ce] data-[state=active]:text-[#fbfbfe]"
              >
                Favorites
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ScrollArea className="h-[calc(100vh-13rem)]">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="p-4">
                    <Skeleton className="h-24 w-full rounded-lg" />
                  </div>
                ))
            : users.map((friend) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer border-[#dedcff]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/micah/svg?seed=${friend.name}`}
                            alt={friend.fullName}
                          />
                          <AvatarFallback>
                            {friend.fname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <h3 className="font-semibold">
                            {friend.fname}, {friend.age}
                          </h3>
                          <p className="text-sm text-[#050315] flex items-center">
                            {/* <MapPinIcon className="h-4 w-4 mr-1" />{" "} */}
                            {/* {friend.distance} */}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          friend.status === "online" ? "default" : "secondary"
                        }
                        className={
                          friend.status === "online"
                            ? "bg-[#433bff] text-[#fbfbfe]"
                            : "bg-[#dedcff] text-[#050315]"
                        }
                      >
                        {friend.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {/* {friend.interests.map((interest, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#dedcff] text-[#050315]"
                        >
                          {interest === "Hiking" && (
                            <MountainIcon className="h-3 w-3 mr-1" />
                          )}
                          {interest === "Wine tasting" && (
                            <WineIcon className="h-3 w-3 mr-1" />
                          )}
                          {interest === "Coffee" && (
                            <CoffeeIcon className="h-3 w-3 mr-1" />
                          )}
                          {interest}
                        </Badge>
                      ))} */}
                    </div>
                  </Card>
                </motion.div>
              ))}
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#dedcff] bg-[#fbfbfe] flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="mr-2 md:hidden text-[#050315]"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            
              <>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/micah/svg?seed=${currentUser}`}
                  />
                
                </Avatar>
                <div className="ml-4">
                  <h3 className="font-semibold">{currentUser}</h3>
                  <p className="text-sm text-[#050315]">
                    Just Now
                  </p>
                </div>
              </>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#dedcff] text-[#050315] hover:bg-[#433bff] hover:text-[#fbfbfe]"
            >
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Add Friend
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 p-4 border font-poppins border-secondary"
        >
          <div id="chats" className="flex flex-col grow min-h-full">
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`flex mb-4 ${
                        index % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                    >
                      <Skeleton
                        className={`h-16 w-64 rounded-lg ${
                          index % 2 === 0 ? "mr-12" : "ml-12"
                        }`}
                      />
                    </div>
                  ))
              : messages.map((msg, idx) => (
                
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex mb-4 ${
                      msg.msgSenderUid === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    // Attach ref to the last message
                    ref={idx === messages.length - 1 ? scrollAreaRef : null}
                  >
                    {
                      msg.msgSenderUid !== currentUserId && (
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/micah/svg?seed=${msg.msgSender}`}
                            alt={'woieh'}
                          />
                        </Avatar>
                      )
                    }
                    
                    <div
                      className={` flex gap-5 p-3 max-w-xs lg:max-w-md ${
                        msg.msgSenderUid === currentUserId
                          ? " bg-[#dedcff] text-black break-words rounded-tl-lg rounded-bl-lg rounded-tr-lg "
                          : " bg-[#2f27ce] text-white break-words  rounded-tl-lg rounded-br-lg rounded-tr-lg "
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p
                        className={`text-sm mt-1 ${
                          msg.msgSenderUid === currentUserId
                            ? "text-slate-800"
                            : "text-slate-500"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                    {
                      msg.msgSenderUid === currentUserId && (
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/micah/svg?seed=${msg.msgSender}`}
                            alt={'woieh'}
                          />
                        </Avatar>
                      )
                    }
                    
                  </motion.div>
                ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault(), sendMessage();
          }}
          className="p-4 bg-[#fbfbfe] border-t border-[#dedcff]"
        >
          <div className="flex items-center">
            <Input
              id="messageInput"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-[#dedcff] text-[#050315] border-[#dedcff]"
            />
            <Button
              type="button"
              size="icon"
              className="ml-2 bg-[#dedcff] text-[#050315] hover:bg-[#433bff] hover:text-[#fbfbfe]"
            >
              <ImageIcon className="h-5 w-5" />
              <span className="sr-only">Send image</span>
            </Button>
            <Button
              type="submit"
              size="icon"
              className="ml-2 bg-[#2f27ce] text-[#fbfbfe] hover:bg-[#433bff]"
            >
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Friend Suggestion Overlay */}
      <AnimatePresence>
        {!isLoading && showSuggestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 right-4 bg-[#fbfbfe] p-4 rounded-lg shadow-lg border border-[#dedcff]"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-[#050315]">
                New Friend Suggestion
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSuggestion(false)}
                className="text-[#050315]"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://api.dicebear.com/6.x/micah/svg?seed=Elena"
                  alt="Elena"
                />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="font-medium text-[#050315]">Elena, 27</p>
                <p className="text-sm text-[#050315]">
                  Loves hiking and local cuisine
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSuggestion(false)}
                className="border-[#dedcff] text-[#050315] hover:bg-[#dedcff]"
              >
                Skip
              </Button>
              <Button
                size="sm"
                className="bg-[#2f27ce] text-[#fbfbfe] hover:bg-[#433bff]"
              >
                <HeartIcon className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
