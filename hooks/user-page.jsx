"use client";
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image"

export default function FriendsPage() {


  const supabase = createClient();
  const { user, isLoaded } = useUser();
  const currentUserUid = user?.id;
  const myName = user?.fullName;


  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [friendRequests, setFriendRequests] = useState([]);

  // Fetch friends from Supabase
  async function fetchFriends() {
    const { data, error } = await supabase
      .from('friends')
      .select('*')
      .eq('useruid', currentUserUid)
      .eq('status','accept')
      .order('id', { ascending: false });
    if (data) {
      setFriends(data);
    }
  }

  // Fetch friend requests from Supabase
  async function fetchFriendRequests() {
    if (!currentUserUid) return;  // Guard against undefined user id
    const { data, error } = await supabase
      .from('friends')
      .select('*')
      .eq('frienduid', currentUserUid)
      .eq('status', 'pending')
      .order('id', { ascending: false });
    if (data) {
      setFriendRequests(data);
    }
  }

  // Handle friend requests
  async function handleRequest(uuid, type) {
    if (type === 'accept') {
      const { error } = await supabase
        .from('friends')
        .update({ status: 'accept' })
        .eq('useruid', uuid)
        .eq('frienduid', currentUserUid);
      if (error) console.log(error);
    }
    if (type === 'reject') {
      const { error } = await supabase
        .from('friends')
        .update({ status: 'rejected' })
        .eq('useruid', uuid)
        .eq('frienduid', currentUserUid);
      if (error) console.log(error);
    }
  }

  // Real-time friendship updates
  async function friendshipsRealtime() {
    const { data, error } = await supabase
      .channel('listenInFriendshipsTable')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'friends' }, (payload) => {
        fetchFriendRequests();
        fetchFriends();
      })
      .subscribe();
    if (error) console.log(error);
  }

  // Use effect to fetch data only when user is loaded and ready
  useEffect(() => {
    if (isLoaded && currentUserUid) {
      fetchFriends();
      fetchFriendRequests();
      friendshipsRealtime();  // Start listening for real-time updates
    }
    // Cleanup on component unmount
    return () => {
      supabase.channel('listenInFriendshipsTable').unsubscribe();
    };
  }, [isLoaded, currentUserUid]);

  const removeFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id))
  }

  // useEffect(() => {
  //   setFilteredFriends(friends.filter(friend =>
  //     friend.userProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     friend.userAge.toString().includes(searchQuery) ||
  //     friend.userLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     friend.userSkill.toLowerCase().includes(searchQuery.toLowerCase())))
  // }, [searchQuery, friends])

  return (
    (<div className="min-h-screen font-poppins bg-[#fbfbfe] text-[#050315]">
      <div className="px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-[1920px] mx-auto break-words line-clamp-1 max-sm:text-sm ">
          <h1 className="text-4xl font-bold mb-2">Welcome, {myName} !</h1>
          <p className="text-lg text-[#050315]/70">Manage your friends and connections</p>
        </motion.header>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 xl:grid-cols-4 gap-8 max-w-[1920px] mx-auto max-sm:max-w-[100%] max-sm:text-sm ">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="xl:col-span-3 bg-white rounded-lg shadow-lg p-6 max-sm:p-1  ">
            <div className="grid grid-cols-2  justify-between items-center mb-6 max-sm:grid-col-1">
              <h2 className="text-md max-sm:text-sm font-semibold flex items-center">
                <UserPlus className="mr-2 text-[#2f27ce]" />
                Friend Requests
              </h2>
              <Badge
                variant="secondary"
                className="text-[#2f27ce] bg-[#dedcff] text-sm py-1 px-3">
                {friendRequests.length} new requests
              </Badge>
            </div>
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pr-4">
                <AnimatePresence>
                  {friends && friendRequests.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Avatar className="w-12 h-12 mr-4">
                          <Image width={40} height={40} alt={`${user.userName}`} src={user.userProfile} />
                        </Avatar>
                        <div className='p-2 mb-2' >
                          <h3 className="font-medium first-letter:capitalize  ">{user.userName}</h3>
                          <p className="text-sm text-[#050315]/70">{user.userAge} years • {user.userLocation}</p>
                          <p className="text-sm text-[#050315]/70">{user.userSkill}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={()=>{handleRequest(user.useruid,'accept')}}
                          variant="default"
                          size="sm"
                          className="bg-[#2f27ce] text-white hover:bg-[#433bff] flex-1">Accept</Button>
                        <Button
                        onClick={()=>{handleRequest(user.useruid,'reject')}}
                          variant="outline"
                          size="sm"
                          className="text-[#2f27ce] border-[#2f27ce] hover:bg-[#dedcff] flex-1">Decline</Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-3 max-sm:p-1 ">
            <div className="flex justify-between items-center mb-6 max-sm:flex-col">
              <h2 className="text-2xl font-semibold flex items-center">
                <Users className="mr-2 text-[#2f27ce]" />
                Friends
              </h2>
              <Badge
                variant="secondary"
                className="text-[#2f27ce] bg-[#dedcff] text-sm py-1 px-3">
                {friends.length} total
              </Badge>
            </div>
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050315]/50" />
              <motion.div
                initial={{ width: "100%" }}
                whileFocus={{ width: "102%" }}
                transition={{ duration: 0.3 }}>
                <Input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#dedcff] focus:border-[#2f27ce] focus:ring-[#2f27ce] transition-all duration-300 ease-in-out" />
              </motion.div>
            </div>
            <ScrollArea className="h-[calc(100vh-300px)] w-full pr-4">
              <AnimatePresence>
                {friends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between mb-4 p-2 hover:bg-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="w-10 h-10 mr-3">
                        <AvatarImage src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${friend.userProfile}`} />
                        <AvatarFallback>{friend.userName}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium">{friend.userName}</span>
                        <p className="text-xs text-[#050315]/70">{friend.userAge} years • {friend.userLocation  ? friend.userLocation : null} • {friend.userSkill ? friend.userSkill : null} </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFriend(friend.id)}
                      className="text-red-500 hover:text-red-700">
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </motion.div>
        </div>
      </div>
    </div>)
  );
}