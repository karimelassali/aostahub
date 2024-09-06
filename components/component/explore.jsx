'use client'
import { Input } from "@/components/ui/input"
import { Cards } from "@/components/component/cards";
import Link from "next/link"
import Image from "next/image";
import { useState,useEffect } from "react";
import { Toaster, toast } from 'sonner'
import { useUser } from "@clerk/nextjs";
import { MdDeleteSweep } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import {motion} from 'framer-motion'









export default function Explore() {
  // console.log('clg me ' , cme );

  

  const [searchTerm, setSearchTerm] = useState('');
  


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

  //end search fuunc

  
  

 

  return (
    (
      <>
      <Cards />
      <footer className="flex justify-center p-4 w-full bg-gray-900 fixed bottom-0 " style={{}}>
      <div className="w-full max-w-4xl p-4 rounded-lg flex justify-center gap-8 rounded-sm" style={{ backdropFilter: 'blur(30px)' }}>
        <Link
       
        href={'/create'} className="flex items-center justify-center p-3 rounded-lg text-white font-semibold transition-colors duration-300 transform hover:bg-purple-600 hover:scale-105 hover:cursor-pointer" style={{ backgroundColor: '#38bdf8' }}>
          <IoCreateOutline size={24} />
          <span className="ml-2">Create</span>
        </Link>
        <Link
        href={'/profile'} className="flex items-center justify-center p-3 rounded-lg text-white font-semibold transition-colors duration-300 transform hover:bg-purple-600 hover:scale-105 hover:cursor-pointer" style={{ backgroundColor: '#38bdf8' }}>
          <IoChatboxOutline size={24} />
          <span className="ml-2">Profile</span>
        </Link>
      </div>
    </footer>
      </>
  )
    
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
