'use client';
import { useEffect, useState } from 'react'
import { User, Heart, UserPlus, Calendar, AlertTriangle, Settings, Mail, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


import {
  UserButton,
  ClerkLoaded
} from "@clerk/nextjs";
import { MdOutlineVerified } from "react-icons/md";
import NumberTicker from '@/components/ui/number-ticker'

import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { createClient } from "@/utils/supabase/client"
import { toast, Toaster } from 'sonner'

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

export default function UserAccountPage() {

  const [userData,setUserData] = useState([]);
  const [userLikes, setUserLikes] = useState(0);
  const [sentLikes, setSentLikes] = useState(0);
  const [friendRequests, setFriendRequests] = useState(0);
  const [messages, setMessages] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [totalFriends, setTotalFriends] = useState(0);


  const supabase = createClient()
  const { user } = useUser()
  const router = useRouter();
  


  // Mock user data
  // const user = {
  //   name: "John Doe",
  //   username: "@johndoe",
  //   joinDate: "January 15, 2023",
  //   likesReceived: 152,
  //   likesSent: 89,
  //   pendingFriendRequests: 5,
  //   unreadMessages: 3,
  //   notifications: 2,
  //   totalFriends: 230
  // }

 useEffect(() => {
  if(typeof window == 'undefined') return;
  
 },[user])

 const handleDelete = async (action) => {
  if (action === 'account') {
    const response = await fetch('/api/delete-user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      //send user id in request
      body: JSON.stringify({
        uid: user?.id
      })
    })

    if (response.ok) {
      toast.success('Account deleted successfully')
      router.push('/');
    }
  }
  if(action ===  'profile'){
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('uid', user?.id)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Profile deleted successfully')
      router.push('/');
    }
  }

 }

  useEffect(() => {
    if(typeof window == 'undefined') return;
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', user?.id)
        .single()
      if (error) {
        toast.error(error.message)
      } else {
        setUserData(data);
      }
    }

    fetchUser();


    //Tree functions each one slect data from db and return data - one for user likes one for friend requests-  one for messages
    const fetchUserLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('receiver', user?.id)
      if (error) {
        toast.error(error.message)
      } else {
        setUserLikes(data.length);
      }
    }
    const fetchFriendRequests = async () => {
      const { data, error } = await supabase
        .from('friend_requests')
        .select('*')
        .eq('receiver', user?.id)
      if (error) {
        toast.error(error.message)
      } else {
        setFriendRequests(data.length);
      }
    }
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('msgs')
        .select('*')
        .eq('msgReceiverUid', user?.id)
      if (error) {
        toast.error(error.message)
      } else {
        setMessages(data.length);
      }
    }


    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('receiver', user?.id)
      if (error) {
        toast.error(error.message)
      } else {
        setNotifications(data.length);
      }
    }

    const fetchTotalFriends = async () => {
      const { data, error } = await supabase
        .from('friends')
        .select('*')
        .eq('receiver', user?.id)
      if (error) {
        toast.error(error.message)
      } else {
        setTotalFriends(data.length);
      }
    }

    const fetchSentLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('sender', user?.id)
      if (error) {
        toast.error(error.message)      
      } else {
        setSentLikes(data.length);
      }}


    fetchSentLikes();
    fetchFriendRequests();
    fetchMessages();
    fetchNotifications();
    fetchTotalFriends();
    fetchUserLikes(); 

  },[user])

  return (
    
    (
      <ClerkLoaded>
         <div
      className={`min-h-screen ${ 'bg-gray-900 text-white' }`}>
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Account Overview</h1>
        </div>

        {
          userData && (
            <div className="grid gap-6 md:grid-cols-3">
          {/* User Info Card */}
          <Card className="md:col-span-2  dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-20 w-20">
                <AvatarImage src={user?.imageUrl || '/ass/logo.png'} alt={userData?.username || 'User'} />
                <AvatarFallback>{userData.username}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl flex items-center font-bold">{user.fullName || userData.fname + ' ' + userData.lname} {userData.verified == 1 && (<MdOutlineVerified size={30}  style={{ color: '#0284c7' }} className="ml-2 h-4 w-4" />)} </h2>
                  <p className="text-gray-500 dark:text-gray-400">@{user.username || userData.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Calendar className="inline mr-1 h-4 w-4" />
                    Joined {user?.createdAt ? new Date(user.createdAt).getDate() : 'N/A'
                    }
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 max-sm:grid max-sm:grid-cols-2 max-[320px]:grid-cols-1 ">
                <Button  size="sm" className="flex items-center">
                  <UserButton className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button  size="sm" className="flex hover:bg-secondary hover:text-black  items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Friend Requests
                  {
                    friendRequests > 0 ? (
                      <Badge variant="destructive" className="ml-2"><NumberTicker value={friendRequests} /></Badge>
                    ):(
                      <Badge variant="destructive" className="ml-2">0</Badge>
                    )
                    }
                </Button>
                <Button  size="sm" className="flex hover:bg-secondary hover:text-black  items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                  {
                    messages > 0 ? (
                      <Badge variant="destructive" className="ml-2"><NumberTicker value={messages} /></Badge>
                    ):(
                      <Badge variant="destructive" className="ml-2">0</Badge>
                    )
                  }
                </Button>
                <Button  size="sm" className="flex hover:bg-secondary hover:text-black  items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  {
                    notifications > 0 ? (
                      <Badge variant="destructive" className="ml-2"><NumberTicker value={notifications} /></Badge>
                    ):(
                      <Badge variant="destructive" className="ml-2">0</Badge>
                    )
                  }
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Overview Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Activity Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    Likes Received
                  </span>
                  {
                    userLikes > 0 ? (
                      <span className="font-bold"><NumberTicker value={userLikes || 0}/></span>
                    ) : (
                      <span className="font-bold">0</span>
                    )
                  }
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Heart className="h-5 w-5 text-blue-500 mr-2" />
                    Likes Sent
                  </span>
                  {
                    sentLikes > 0 ? (
                      <span className="font-bold"><NumberTicker value={sentLikes || 0}/></span>
                    ) : (
                      <span className="font-bold">0</span>
                    )
                  }
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <User className="h-5 w-5 text-green-500 mr-2" />
                    Total Friends
                  </span>
                  {
                    totalFriends > 0 ? (
                      <span className="font-bold"><NumberTicker value={totalFriends || 0}/></span>
                    ) : (
                      <span className="font-bold">0</span>
                    )
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card
            className="md:col-span-3 bg-white dark:bg-gray-800 shadow-lg border-red-200 dark:border-red-800 transition duration-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">Danger Zone</h3>
              <div className="flex flex-wrap gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex items-center bg-red-400 hover:bg-red-200 dark:hover:bg-red-700 transition duration-200"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Delete Profile
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your profile.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary text-black hover:text-white transition duration-200" >Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>{handleDelete('profile')}} className="hover:bg-red-200 bg-red-400  dark:hover:bg-red-700 transition duration-200">
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex bg-red-400 items-center hover:bg-red-200 dark:hover:bg-red-700 transition duration-200"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-secondary text-black hover:text-white transition duration-200" >Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>{handleDelete('account')}} className="hover:bg-red-200 bg-red-400  dark:hover:bg-red-700 transition duration-200">
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>  
          )
        }
      </div>
     
    </div>
      </ClerkLoaded>
   
    )
  );
}

