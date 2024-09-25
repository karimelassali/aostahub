'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, UserPlus, UserMinus, Check, X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/utils/supabase/client";




export default function FriendManagement() {
  const supabase = createClient();
  const { user , isLoaded } = useUser();
  const currentUserUid = user?.id;

  const [friends, setFriends] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [activeTab, setActiveTab] = useState('friends')
  const [searchTerm, setSearchTerm] = useState('')


  const handleAccept = (id) => {
    // const acceptedFriend = pendingRequests.find(request => request.id === id)
    if (acceptedFriend) {
      // setFriends([...friends, { ...acceptedFriend, status: 'online' }])
      // setPendingRequests(pendingRequests.filter(request => request.id !== id))
    }
  }

  const handleReject = (id) => {
    // setPendingRequests(pendingRequests.filter(request => request.id !== id))
  }

  const handleDelete = (id) => {
    // setFriends(friends.filter(friend => friend.id !== id))
  }

  // const filteredFriends = friends.filter(friend => 
  //   friend.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // const filteredRequests = pendingRequests.filter(request => 
  //   request.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFriends(prevFriends => 
  //       prevFriends.map(friend => ({
  //         ...friend,
  //         status: Math.random() > 0.7 ? 'online' : (Math.random() > 0.5 ? 'offline' : 'away')
  //       })))
  //   }, 5000)
  //   return () => clearInterval(interval);
  // }, [])

  async function countFriends(){
    const {data,error} = await supabase.from('friendships').select('*').eq('useruid',currentUserUid).eq('status','accept');
    data ? setFriends(data) : alert(error);
  }
  async function countPending(){
    const {data,error} = await supabase.from('friendships').select('*').eq('useruid',currentUserUid).eq('status','pending');
    data ? setPendingRequests(data) : alert('Please select');
  }

  useEffect(()=>{
    if(isLoaded && user){
      countFriends();
      countPending(); 
    }
    
  },[user,isLoaded])
  return (
    (<div
      className="min-h- text-text  p-2 md:p-8">
      <div className="max-w-full  border border-accent rounded mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Friend Sphere</h1>
        
        <Card
          className="bg-white/10 backdrop-blur-lg border-none shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 bg-white/20 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Friends Overview</h2>
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold">{friends.length}</p>
                      <p className="text-sm opacity-80">Total Friends</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold">{pendingRequests.length}</p>
                      <p className="text-sm opacity-80">Pending</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button
                      className={`w-full justify-start ${activeTab === 'friends' ? 'bg-white text-[#2f27ce]' : 'bg-transparent hover:bg-white/20'}`}
                      onClick={() => setActiveTab('friends')}>
                      <Users className="mr-2 h-4 w-4" /> Friends
                    </Button>
                    <Button
                      className={`w-full justify-start ${activeTab === 'requests' ? 'bg-white text-[#2f27ce]' : 'bg-transparent hover:bg-white/20'}`}
                      onClick={() => setActiveTab('requests')}>
                      <UserPlus className="mr-2 h-4 w-4" /> Requests
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full bg-white/20 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'friends' && (
                    <motion.div
                      key="friends"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}>
                      <h3 className="text-xl font-semibold mb-4">Your Friends</h3>
                      <ScrollArea className="h-[400px] w-full pr-4">
                        {friends.map((friend) => (
                          <div
                            key={friend.id}
                            className="flex items-center justify-between py-3 border-b border-white/20 last:border-b-0">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={friend.avatar} alt={friend.name} />
                                  {/* <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
                                </Avatar>
                                <span
                                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                    friend.status === 'online' ? 'bg-green-500' :
                                    friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                                  }`}></span>
                              </div>
                              <div>
                                <span className="font-medium">{friend.frienduid}</span>
                                <p className="text-xs opacity-70">{friend.status}</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-red-500/20 hover:text-red-500"
                              onClick={() => handleDelete(friend.id)}>
                              <UserMinus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </ScrollArea>
                    </motion.div>
                  )}
                  {activeTab === 'requests' && (
                    <motion.div
                      key="requests"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}>
                      <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
                      <ScrollArea className="h-[400px] w-full pr-4">
                        {filteredRequests.map((request) => (
                          <div
                            key={request.id}
                            className="flex items-center justify-between py-3 border-b border-white/20 last:border-b-0">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={request.avatar} alt={request.name} />
                                {/* <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
                              </Avatar>
                              <span className="font-medium">{request.name}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleAccept(request.id)}>
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-500/20"
                                onClick={() => handleReject(request.id)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}