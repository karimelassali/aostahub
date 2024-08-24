'use client'
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image";
import { useState,useEffect } from "react";
import { createClient } from "@/utils/supabase/client";


export default function Explore() {
  const supabase = createClient();

  const [users,setUsers] = useState([]);
  
  useEffect(()=>{
      async function fetchUsers(){
        const {data,error} = await supabase.from('users').select('*');
        data ?  setUsers(data) : alert('no user');
      }
      fetchUsers();
  },[])
  return (
    (<div className="container  mx-auto px-4 py-8 md:px-6 lg:px-8">
       <div className="mb-6 flex bg-[#10B981] p-4 rounded-lg">
        <Image width={90} height={90} src={'/ass/logo.png'} />
        <h1 className="text-3xl font-bold">Explore Users</h1>
        {users.lname}
        <br />
      </div>
      <div className="mb-8">
      <p className="text-muted-foreground">Find new friends and connect with people in your community.</p>
        <Input
          placeholder="Search for users..."
          className="w-full max-w-md bg-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>
      {
        users.map(user=>(
          <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  rounded-lg p-4">
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <Link href="#" className="block" prefetch={false}>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="John Doe"
                width={400}
                height={400}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/400", objectFit: "cover" }} />
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">John Doe</h3>
                <p className="text-white text-sm">@johndoe</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground">
                Hi, I'm John Doe! I love exploring new places and meeting new people. Let's connect and share our
                adventures!
              </p>
              <div className="flex justify-center mt-4 gap-2">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                  prefetch={false}>
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                  prefetch={false}>
                  <InstagramIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                  prefetch={false}>
                  <PhoneIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </Link>
        </div>
       
        
       
        </div>
          </>
        ))
      }
      
        <Link href={'/create'}  className="fixed bottom-0 right-0 p-4 mr-2 mb-2 rounded-lg " style={{backgroundColor:'#10B981'}}>
          Create
        </Link>
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
