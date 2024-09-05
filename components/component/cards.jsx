'use clien'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { Skeleton } from "../ui/skeleton"
import {motion} from 'framer-motion'
import Image from "next/image"
import { useRouter } from "next/navigation"

import { useUser } from "@clerk/nextjs";



export function Cards() {
  const router = useRouter();

  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [users,setUsers] = useState([]);

  const { user } = useUser();
  const currentUserId = user?.id;


  async function delAno(id) {
    try {
      const { data, error } = await supabase.from('users').delete().eq('id', id);
      if (error) throw error;
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
      toast.error('Failed to delete user');
    }
  }

  useEffect(()=>{
    async function fetchUsers(){
      setLoading(true);
      const {data,error} = await supabase.from('users').select('*').order('id',{ascending:false});
      
      if(data){
        setUsers(data) 
        setLoading(false);
      }
      else{
        setLoading(false);
        toast.error('No users found.');
      }
    }
    fetchUsers();

    async function realTimeFetchAnounces(){
      const {data,error} = await supabase.channel('annListen').on('postgres_changes',{event:'*',schema:'public',table:'users'},(payload)=>{
        const newCh = new Audio('/ass/ann.mp3');
        newCh.play();
        fetchUsers();
      })
      .subscribe();
      return () => {
        supabase.removeChannel(subscription); // Unsubscribe when the component unmounts
      };
    }
    realTimeFetchAnounces();
},[])



return (
  <>
  <div className="grid p-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {
      loading ? (
        // عرض الـ Skeleton Loader أثناء التحميل
        [...Array(4)].map((_, index) => (
          <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </motion.div>
        ))
      ) : (
        // عرض بيانات المستخدمين بعد انتهاء التحميل
        
        users.map(user => (
          <Card onClick={(e)=>{router.push('profile/'+user.id)  }} key={user.id} className="bg-background rounded-lg overflow-hidden shadow-lg">
            <div style={{ backdropFilter: 'blur(30px)' }}>
              {
                console.log(user.imgName)
              }
              <div className="relative h-32 flex items-end justify-end p-4" style={{ backgroundSize: 'cover' }}>
              <img  className="w-full h-full object-cover" style={{border:'1px solid red'}} src={user.profilePic} alt="bgImage" />
                <Avatar className="absolute top-[70%] left-4 w-20 h-20 border-4 border-background rounded-lg">
                  <AvatarImage className="hover:scale-150 hover:cursor-pointer" src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`} alt="User Avatar" />
                  <AvatarFallback>{user.id}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="p-6 pt-12 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl flex items-center gap-2 font-semibold">
                    {user.fname + user.lname} 
                    {user.verified == 1 && <MdOutlineVerified size={20} style={{ color: '#0284c7' }} />}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user.age} years old</p>
                </div>
                <div className="flex items-center space-x-3 rounded-sm p-1" style={{ backdropFilter: 'blur(30px)', border: '0.2px solid #e2e8f0' }}>
                  {user.instagram && (
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
                    </Link>
                  )}
                  {user.facebook && (
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
                    </Link>
                  )}
                  {user.number && (
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                      <PhoneIcon className="w-5 h-5" style={{ color: '#4ade80' }} />
                    </Link>
                  )}
                </div>
              </div>
              <hr />
              <p className="text-sm text-muted-foreground">
                {user.description}
              </p>
              <hr />
              {
                user.uid == currentUserId? (
                  <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.3 ,delay:3}}
                  className="flex items-center justify-end ">
                      <Button
                        style={{border:'1px solid red'}}  
                        variant="ghost"
                        size="icon"
                        className=" w-[50%]  0 text-white hover:bg-red-500" onClick={()=>delAno(user.id)}>
                          <TrashIcon className="w-5 h-5" style={{ color: '#e11d48' }} />
                        </Button>
                  </motion.div>
                ) : null  
              }
              {/* <div className="flex items-center justify-end ">
               {
                user.uid == currentUserId ? 
                <Button
                variant="ghost"
                size="icon"
                className=" w-[50%]  0 text-white" style={{border:'1px solid red'}}>
                <TrashIcon className="w-5 h-5" style={{ color: '#e11d48' }} />
              </Button> : null
               }
              </div> */}
            </CardContent>
          </Card>
        ))
      )
    }
  </div>
  </>
);

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


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}}
