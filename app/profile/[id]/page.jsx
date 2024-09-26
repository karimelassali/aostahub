'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, MapPin, Phone, Users, Mail, Cake, Heart, MessageCircle, BookmarkPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MdBoy } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import  ProfileSkeleton from "@/components/component/profileSkeleton"
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserProfile, useUser } from "@clerk/nextjs";
import {sonner} from 'sonner'
import { BsBriefcase } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { toast, Toaster } from 'sonner';
import { IoTime } from "react-icons/io5"
import { IoSad } from "react-icons/io5"
import { IoRemove } from "react-icons/io5"
import {OctagonPause} from 'lucide-react'




function Page({params}) {
  const id = params.id;


  const supabase = createClient();
  const [userP, setUserP] = useState([]);
  const [isFriend, setIsFriend] = useState('');
  const [userAsUser , setUserAsUser] = useState([]);
  const [userAsfriend, setUserAsFriend] = useState([]);
  const [me,setMe] = useState([]);
  
  const { user } = useUser();
  const currentUserUid = user?.id;
  const userName = user?.fullName;

    
  async function fetchMe(){
    const { data, error } = await supabase
     .from('users')
     .select('*')
     .eq('uid', currentUserUid)
     .single();
    if(data){
      setMe(data)
    }else{
      toast.error('User not found');
    }
  }

    useEffect(()=>{
      async function fetchUser(){
        const { data,error } = await supabase.from('users').select().eq('id', id).single();
        data ? setUserP(data) : alert('User not found');

    }
    fetchUser();
    fetchMe();
    
},[id])

  
    async function handelFriendshipRequest() {
      const { data, error } = await supabase.from('friends').insert({
        useruid:currentUserUid,
        userName:userName,
        userProfile:me.imgName,
        userAge:me.age,
        userSkill:me.skill,
        userLocation:me.location,
        frienduid:userP.uid,
        status:'pending',
      });
      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        checkFriendshipStatus();
        toast.success(`Friend request sent to ${userP.fname}`);
      }
    }
    // Fixing friendship status check
      async function checkFriendshipStatus() {
        const { data, error } = await supabase
          .from('friends')
          .select('*')
          .eq('useruid', currentUserUid)
          .eq('frienduid', userP.uid);

        if (error) {
          toast.error(error.message);
          return;
        }

        if (data && data.length > 0) {
          const status = data[0].status;
          if (status === 'accept') {
            setIsFriend('true');
          } else if (status === 'rejected') {
            setIsFriend('rejected');
          } else if (status === 'pending') {
            setIsFriend('pending');
          }
        } else {
          setIsFriend('0');
        }
      }
      async function getUserFriends(){
        const {data:userAsuser,error:userAsuserProbleme} = await supabase.from('friends').select('*').eq('frienduid', userP.uid).eq('status','accept');
        const {data:userAsfriend,error:userAsfriendProblem} = await supabase.from('friends').select('*').eq('frienduid', userP.uid).eq('status','accept');


        userAsuser  ? setUserAsUser(userAsuser) : console.log(userAsuserProbleme);
        userAsfriend  ? setUserAsFriend(userAsfriend) : console.log(userAsfriendProblem);

      }
    //remove removeFriendShip
    async function removeFriendShip(){
      const {data,error} = await supabase.from('friends').delete().eq('useruid',currentUserUid).eq('frienduid',userP.uid);
      data ? toast.success(`${userP.name} is not your friend anymore .`) : toast.error(error);
    }
    //stop request 
    async function stopRequest(){
      const {data,error} = await supabase.from('friends').delete().eq('useruid',currentUserUid).eq('frienduid',userP.uid);
      data ? toast.success(`${userP.name} will not get you request`) : console.log(error);
    }

    useEffect(()=>{
          getUserFriends()
          checkFriendshipStatus();
    },[currentUserUid,userP.uid,userP])

      async function friendshipsRealtime(){
        const {data,error} = await supabase.channel('listenInFriendshipsTable')
        .on('postgres_changes',{event:'*',schema:'public',table:'friends'},(payload)=>{
          console.log(payload)
          getUserFriends();
          checkFriendshipStatus();
        }).subscribe();
      }
      friendshipsRealtime();

  return (
    <>
        <div className="min-h-screen bg-[#fbfbfe] font-poppins text-[#050315]">
        <Toaster richColors />
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src={userP.permission == 'true' ? userP.profilePic : '/ass/logo.png'}
          alt="Cover"
          layout="fill"
          objectFit="cover"
          className="object-center" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#fbfbfe] to-transparent"></div>
      </div>
      {/* Profile Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="relative z-10 bg-[#fbfbfe] rounded-lg shadow-xl p-6 mb-6">
          <div
            className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <Image
              src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${userP.imgName}`}
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full border-4 border-[#fbfbfe] shadow-lg" />
            {/* userP Info */}
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-[#050315] mb-2">{userP.fname + userP.lname}, {userP.age}</h1>
              <p
                className="text-lg text-[#050315] flex items-center justify-center md:justify-start mb-4">
                <MapPin className="h-5 w-5 mr-2 text-[#2f27ce]" />
                {userP.location}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                {
                  isFriend == 'true' && (
                    <>
                    <Button
                      variant="outline"
                      className="border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-[#fbfbfe]">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button> 
                    <Button
                      onClick={()=>{removeFriendShip()}}
                      variant="outline"
                      className="bg-[#2f27ce] text-white hover:text-[#2f27ce] hover:bg-white border border-secondary hover:border-accent">
                      <IoRemove className="h-4 w-4 mr-2" />
                      Unfollow
                    </Button> 
                    </>
                    

                  )
                }
                {
                  isFriend =='rejected' && (
                    <p className="text-red-400 border border-red-400 rounded p-2 flex gap-x-1 items-center text-lg"><IoSad   className="h-4 w-4 mr-2" /> Friend request rejected</p>
                  )
                }
                {
                  isFriend == 'pending' && (
                    <div className="grid grid-cols-2 gap-2" >
                          <Button  disabled={isFriend == 'pending'} variant="outline" className="border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-[#fbfbfe]">
                            <IoTime className="h-4 w-4 mr-2" />
                              Request Pending
                          </Button>
                          <button onClick={()=>{stopRequest()}} className="p-2 bg-red-400 text-white rounded flex items-center gap-x-2 hover:bg-red-300 transition-all cursor-pointer" >
                            <OctagonPause  className="h-4 w-4 mr-2" />
                            Pause Request
                          </button>
                    </div>
                  )
                }
                {
                  isFriend == '0'  && (
                    <Button onClick={()=>{
                      handelFriendshipRequest();
                    }}  variant="outline" className="border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-[#fbfbfe]">
                    <BsBriefcase className="h-4 w-4 mr-2" />
                      Add Friend
                    </Button> 
  
                  )
                }
                
                {/* <Button
                  variant="outline"
                  className="border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-[#fbfbfe]">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button> */}
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-semibold text-[#2f27ce]">{userAsfriend.length}</p>
                <p className="text-[#050315]">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#2f27ce]">{userAsUser.length}</p>
                <p className="text-[#050315]">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <Card className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black flex items-center">
                  <MdBoy className="h-6 w-6 mr-2" />
                  About Me
                </h2>
                <p className="text-[#050315] first-letter:capitalize">
                  {userP.description} 
                </p>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black flex items-center">
                  <BookmarkPlus className="h-6 w-6 mr-2" />
                  Interests
                </h2>
                {/* <span>
                {
                  userP.interests
                }
                </span> */}
                <div className="flex flex-wrap gap-2">
                  {
                    userP.interests &&
                    userP.interests.split(/[,./;:&\s]|and/).map((interest) => (
                      <span
                        key={interest}
                        className="bg-[#dedcff] flex items-center first-letter:capitalize  text-text  px-3 py-1 gap-2   mqrgin-2 rounded-full text-md font-medium">
                        <img  width={30} height={30} src={`https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${interest}&backgroundColor=dedcff`} />
                        {interest}
                      </span>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-text flex items-center">
                  <Phone className="h-6 w-6 mr-2" />
                  Contact
                </h2>
                <div>
                {userP.instagram && (
                    <Link href={"https://www.instagram.com/"+userP.instagram} className="flex items-center p-2 gap-2 hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                      <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
                      {userP.instagram}
                    </Link>
                  )}
                  {userP.facebook && (
                    <Link href={"https://www.facebook.com/"+userP.facebook} className="flex items-center p-2 gap-2 hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                      <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
                      {userP.facebook}
                    </Link>
                  )}
                  {userP.number && (
                    <Link href={"tel:"+userP.number} className="flex items-center p-2 gap-2 hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                      <PhoneIcon className="w-5 h-5" style={{ color: '#4ade80' }} />
                      {userP.number}
                    </Link>
                  )}
                </div>
                
              </CardContent>
            </Card>

            {/* Additional Info */}
            {
              userP.occupation || userP.personaleWebsite || userP.skill ? (
                <Card className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    {
                      userP.occupation && (
                        <div className="flex items-center text-[#050315]">
                          <BsBriefcase className="h-5 w-5 mr-3 text-[#2f27ce]" />
                          Occupation: {userP.occupation}
                        </div>
                      )
                    }
                    {
                      userP.personaleWebsite && (
                        <div className="flex items-center text-[#050315]">
                          <Link className="flex items-center text-blue-500 hover:text-blue-600" href={userP.personaleWebsite}>
                            <IoIosLink className="h-5 w-5 mr-3 text-[#2f27ce]" />
                            Personal Website
                          </Link>
                        </div>
                      )
                    }
                    
                  </CardContent>
                </Card>
              ):null
            }
            
          </div>
        </div>

        {/* Similar Users */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-[#2f27ce] flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Similar Users
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((userP) => (
              <Card
                key={userP}
                className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=userP${userP}`}
                    alt={`Similar userP ${userP}`}
                    width={100}
                    height={100}
                    className="rounded-full mb-4" />
                  <h3 className="font-semibold text-[#050315] mb-1">userP {userP}</h3>
                  <p className="text-sm text-[#050315] mb-4">New York, USA</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-[#fbfbfe]">
                    <Users className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Page




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