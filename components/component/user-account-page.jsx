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
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { createClient } from "@/utils/supabase/client"
import { toast, Toaster } from 'sonner'

export default function UserAccountPage() {

  const [userData,setUserData] = useState([]);

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
        return data.length;
      }
    }


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
                  <AvatarImage src={user.imageUrl} alt={userData.username} />
                  <AvatarFallback>{userData.username}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl flex items-center font-bold">{userData.fname + userData.lname} {userData.verified == 1 && (<MdOutlineVerified size={30}  style={{ color: '#0284c7' }} className="ml-2 h-4 w-4" />)} </h2>
                  <p className="text-gray-500 dark:text-gray-400">@{userData.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Calendar className="inline mr-1 h-4 w-4" />
                    Joined {user.createdAt.getDate()}/{user.createdAt.getMonth()}/{user.createdAt.getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button  size="sm" className="flex items-center">
                  <UserButton className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button  size="sm" className="flex hover:bg-secondary hover:text-black  items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Friend Requests
                  <Badge variant="destructive" className="ml-2">{user.pendingFriendRequests}</Badge>
                </Button>
                <Button  size="sm" className="flex hover:bg-secondary hover:text-black  items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                  <Badge variant="destructive" className="ml-2">{user.unreadMessages}</Badge>
                </Button>
                <Button  size="sm" className="flex hover:bg-secondary hover:text-black  items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  <Badge variant="destructive" className="ml-2">{user.notifications}</Badge>
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
                  <span className="font-bold">{fetchUserLikes()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Heart className="h-5 w-5 text-blue-500 mr-2" />
                    Likes Sent
                  </span>
                  <span className="font-bold">{user.likesSent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <User className="h-5 w-5 text-green-500 mr-2" />
                    Total Friends
                  </span>
                  <span className="font-bold">{user.totalFriends}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card
            className="md:col-span-3 bg-white dark:bg-gray-800 shadow-lg border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="destructive" className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Delete Profile
                </Button>
                <Button variant="destructive" className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
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

