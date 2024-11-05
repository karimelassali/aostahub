'use client'
import { Input } from "@/components/ui/input"
import Profiles from "@/components/component/profiles.jsx";
import Link from "next/link"
import Image from "next/image";
import { useState,useEffect } from "react";
import { Toaster, toast } from 'sonner'
import { useUser } from "@clerk/nextjs";
import { MdDeleteSweep } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import {motion} from 'framer-motion'
import { Suspense } from 'react';
import  CardSkeleton from "@/components/ui/cardSkeleton";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import TopUsers from "./topUsers";

import { ConfettiButton } from "../ui/confetti";





export default function Explore() {
  // console.log('clg me ' , cme );

  

  const [searchTerm, setSearchTerm] = useState('');
  



  //Send welcoming email

  const welcomingEmailStatus = localStorage.getItem('Email');
  if(welcomingEmailStatus == 'true'){
    return;
  }else{
    localStorage.setItem('Email', 'true');
    sendWelcomingEmail();
  }

  //load email api request 
  const sendWelcomingEmail = async () => {
    const response = await fetch('/api/email',{
      method: 'POST',
    })
  }
  // search func
 async function search() {
  if (searchTerm.length > 0) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .like('fname', `%${searchTerm}%`);
    
    if (error) {
      console.error('Error fetching users:', error);
      alert('An error occurred while searching for users.');
    } else if (data == '') {
        toast.message('No user found.');
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('id', { ascending: false });
    } else {
      setUsers(data);
    }
  } else {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      alert('An error occurred while fetching users.');
    } else if (data.length === 0) {
      alert('No user found.');
    } else {
      setUsers(data);
    }
  }
}
useEffect(() => {
  const scrollToBottom = ()=>{
    const bottomDiv = document.getElementById('bottom');
    bottomDiv?.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToBottom();
},[])
  //end search fuunc

  /////
  

 

  return (
    <>
      <Suspense fallback={
        <div className="grid p-2 gap-6 justify-center items-center w-full h-full">

          {/* <CardSkeleton  /> */}

</div>
        }>
       <div className='flex  max-sm:flex-col h-1   lg:max-h-[400px] border border-red-100  justify-center max-md:p-1 max-md:justify-normal  w-full '  >
        <div className="profiles  w-full  "> 
          <Profiles />
         </div>    
        {/* <aside className='w-[30%] h-full  p-1 max-md:w-full max-md:h-[30%]  '  >
          <h1 className='flex gap-x-3 font-poppins  items-center justify-center text-2xl font-bold p-2 border-b border-gray-300  ' >Top Users  <Star className='h-5 w-5 animate-change   '  />  </h1>
          {/* <TopUsers   /> */}
         {/* </aside>  */} 
         <div id="bottom"></div>    
      </div> 

      </Suspense>
       <footer className="flex justify-center p-4 w-full bg-gray-900 fixed bottom-0 " style={{}}>
         {/* <FloatingDock  items={links} /> */}
        </footer> 
     <div className="pt-16"></div> 
    </>
    )};
  

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
