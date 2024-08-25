'use client'
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image";
import { useState,useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Toaster, toast } from 'sonner'
import { useUser } from "@clerk/nextjs";


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
    (<div style={{backgroundColor:''}} className="container  mx-auto px-4 py-8 md:px-6 lg:px-8">
       {/* <div className="mb-6 flex bg-[#10B981] p-4 rounded-lg">
        {users.lname}
        <br />
      </div> */}
      <Toaster />
      <div className="mb-8">
      <p className="text-muted-foreground">Find new friends and connect with people in your community.</p><br />
        <Input
          placeholder="Search for users..."
          className="w-full max-w-md bg-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
      </div>

      <div
            style={{boxShadow:'0 0 40px gray'}}
            className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  rounded-lg p-4">

{
        users.map(user=>(
          <>
          
            <div key={user.id} className="bg-background rounded-lg shadow-md overflow-hidden">
              <Link href="#" className="block" prefetch={false}>
                <div className="relative">
                  <Image
                    src={user.profilePic}
                    alt={user.lname}
                    width={400}
                    height={400}
                    className=" object-cover"
                    style={{ aspectRatio: "400/400", objectFit: "cover" }} />
                  <div
                  style={{backdropFilter:'blur(20px)'}}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 style={{color:'#F2EFDC'}} className=" font-semibold text-lg">{user.lname} {user.fname}</h3>
                    <p style={{color:'#A79986'}} className=" text-sm">@{user.fname + user.lname} - {user.age} years old   </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground">
                    {user.description}
                  </p>
                  <br />
                  <hr />
                  <div className="flex justify-between mt-4 gap-2">
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
          </>
        ))
      }

      </div>        
     
      
        <Link href={'/create'}  className="fixed bottom-0 right-0 p-4 mr-2 mb-2 rounded-md text-white w-30 font-semibold" style={{backgroundColor:'#382bf0',color:'white',width:'10%'}}>
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
