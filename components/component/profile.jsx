
'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { color, motion } from 'framer-motion'
import { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import {ProfileSkeleton } from "@/components/component/profileSkeleton"
import { FiActivity } from "react-icons/fi";

import {sonner} from 'sonner'

export const metadata = {
  title: 'profile',
  description: 'Welcome to Next.js',

};




   
export default function Profile({userId}) {

  const supabase = createClient();
  const [user, setUser] = useState([]);

  useEffect(()=>{
        async function fetchUser(){
          const { data,error } = await supabase.from('users').select().eq('id', userId).single();
          data ? setUser(data) : alert('User not found');

      }
      fetchUser();
  },[userId])
  return (
    (<div className="flex flex-col min-h-[100dvh]">
      <ProfileSkeleton />
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        <img
          src={user.profilePic}
          alt="Cover Image"
          width={1920}
          height={500}
          className="h-full w-full object-contain"
          style={{ aspectRatio: "1920/500", objectFit: "cover" }} />
        <div
          className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-4 p-2 "   style={{backdropFilter:'blur(100px)',borderRadius:'9px'}}>
            <Avatar
              className="h-16 w-16 border-2  sm:h-20 sm:w-20 lg:h-40 lg:w-40 "  style={{borderRadius:'50%  '}}>
              <AvatarImage src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`} alt="@shadcn" />
              <AvatarFallback>{user.id}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-white" style={{color:'#0f172a'}}>
              <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">{user.fname + user.lname}</h1>
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{color:'#1f2937'}}>
                {user.age} - YEARS OLD
                <FiActivity />
                
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold" style={{color:'#1f2937'}}>
                <IoLocationOutline />
                - AOSTA
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">About</h2>
              <p className="mt-2 text-muted-foreground">
                {user.description}
                John Doe is a passionate designer and developer who loves creating beautiful and functional digital
                experiences. With over 10 years of experience in the industry, he has worked with a wide range of
                clients, from startups to large enterprises, helping them bring their ideas to life.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Social media</h2>
              <div className="mt-2 flex w-max flex-wrap p-2  gap-2" style={{border:'1px solid #0ea5e9',borderRadius:'5px'}}>
                {
                  user.instagram && (
                    <Link href={`https://www.instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer">
                      <InstagramIcon co className="h-5 w-5" style={{ color: '#c026d3' }}/>
                    </Link>
                  )
                }
                {
                  user.facebook && (
                    <Link href={`https://www.facebook.com/${user.facebook}`} target="_blank" rel="noopener noreferrer">
                      <FacebookIcon className="h-5 w-5" style={{ color: '#06b6d4' }} />
                    </Link>
                  )
                }
                {
                  user.number && (
                    <Link href={`https://www.twitter.com/${user.number}`} target="_blank" rel="noopener noreferrer">
                      <PhoneIcon className="h-5 w-5" style={{color:'#4ade80'}} />
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Similar Users</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Card className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-sm text-muted-foreground">Designer</div>
                  </div>
                </Card>
                <Card className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">Bob Smith</div>
                    <div className="text-sm text-muted-foreground">Developer</div>
                  </div>
                </Card>
                <Card className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Product Manager</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}

function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>)
  );
}


function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>)
  );
}
function PhoneIcon(props) {
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
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>)
  );
}
