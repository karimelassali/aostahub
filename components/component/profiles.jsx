'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/modalProfile"
import { Suspense } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { PersonStandingIcon } from "lucide-react"
import { toast, Toaster } from 'sonner';
import ShowModal from "./showModal"


export default  function Profiles() {
  const router = useRouter();

  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [lopen,setLopen] = useState(false);
  const [file,setFile] = useState('');

  const [users,setUsers] = useState([]);

  const { user } = useUser();
  const currentUserId = user?.id;

async function like(liker, receiver) {
  if (liker === receiver) {
    toast.error('You cannot like yourself.');
    return;
  }
  const { data, error } = await supabase.from('likes').select('*').eq('liker', liker).eq('receiver', receiver);
  if (data.length > 0) {
    toast.error('You have already liked this user.');
  }else{
    const { data, error } = await supabase.from('likes').insert({
    liker: liker,
    receiver: receiver
  });
    const aud = new Audio('/ass/like.wav')
    if (error) {
      toast.error('Something went wrong.');
    } else {
      aud.play();
      toast.success('You liked this user.');
    }
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

  // Function to go to the previous slide
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  // Function to go to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  return (
    (<div className="w-full max-w-[800px]  mx-auto">
      {
        lopen && file && (
          <ShowModal src={file} fileType={'img'} onClose={() => setLopen(false)}   />
        )
      }
      <Toaster richColors />
      <Carousel className={`rounded-lg overflow-hidden `} useArrowKeys={true}>
        <CarouselContent>
        {
        users.map((user,index) => (
          <CarouselItem className={`${index == currentIndex ? 'block' : 'hidden'}}`}  key={user.id} >
          <div className="relative h-auto min-h-[60%] lg:h-[600px]">
            <img
              src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`}
              alt="Slide 1"
              width={800}
              height={600}
              className="w-full h-full object-cover bg-gradient-to-b from-black via-black to-transparent "
              style={{ aspectRatio: "800/600", objectFit: "cover" }} />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div
              className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex flex-col md:flex-col items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar onClick={()=>{
                    setLopen(true);
                    setFile(user.profilePic);
                  }}  className="w-12 h-12 md:w-16 md:h-16">
                  {
                    user.permission == "true" ? (
                      <Image width={100} height={100} src={user.profilePic} className="w-full h-full object-cover rounded-sm" style={{borderRadius:'4px'}}  alt="bgImage" />
                    )
                    :
                    (
                      <Image width={100} height={100} src={'/ass/logo.png'} className="w-full h-full object-cover rounded-sm" style={{borderRadius:'4px'}}  alt="bgImage" />
                    )
                  }                       
                  <AvatarFallback>cover image</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold flex justify-center items-center p-2 gap-x-2  text-white">{user.fname  +  user.lname} {user.verified == 1 && <MdOutlineVerified size={20} style={{ color: '#0284c7' }} />}
                    </h3>
                    <p className="text-sm text-gray-300">Cover, {user.age}</p>
                    <p className="text-sm text-gray-300 line-clamp-2 md:line-clamp-none">
                     {user.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rounded-sm p-1" style={{ backdropFilter: 'blur(30px)', border: '0.2px solid #e2e8f0',borderRadius:'4px' }}>
                  {user.instagram && (
                    <Link href={"https://www.instagram.com/"+user.instagram} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                      <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
                    </Link>
                  )}
                  {user.facebook && (
                    <Link href={"https://www.facebook.com/"+user.facebook} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                      <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
                    </Link>
                  )}
                  {user.number && (
                    <Link href={"tel:"+user.number} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                      <PhoneIcon className="w-5 h-5" style={{ color: '#4ade80' }} />
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button  className='text-white hover:text-red-400 cursor-pointer'  onClick={() => like(currentUserId,user.uid) }>
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </button>
                <Link href={`profile/${user.id}`}  variant="ghost" size="icon" className="text-white hover:text-green-300cursor-pointer">
                  <PersonStandingIcon className="w-6 h-6" />
                  <span className="sr-only">Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </CarouselItem>
        ))
      }
        </CarouselContent>
        <div className="flex justify-between items-center mt-4 px-4 sm:px-0">
          <button className="text-white hover:text-gray-300" onClick={goToPrevious}>
            <ChevronLeftIcon className="w-8 h-8" />
            <span className="sr-only">Previous</span>
          </button>
          <button className="text-white hover:text-gray-300" onClick={goToNext}>
            <ChevronRightIcon className="w-8 h-8" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </Carousel>
    </div>)
  );
}

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>)
  );
}


function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>)
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


function HeartIcon(props) {
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
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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
