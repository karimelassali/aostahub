'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, MapPin, Phone, Users , MessageCircle, BookmarkPlus, Edit, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MdBoy } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import  ProfileSkeleton from "@/components/component/profileSkeleton"
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserProfile, useUser } from "@clerk/nextjs";
import { BsBriefcase } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { toast, Toaster } from 'sonner';
import { IoTime } from "react-icons/io5"
import { IoSad } from "react-icons/io5"
import { IoRemove } from "react-icons/io5"
import {OctagonPause} from 'lucide-react'
import {useRouter} from "next/navigation"
import NumberTicker from "@/components/ui/number-ticker"
import ShowModal from "@/components/component/showModal"
import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progress-bar'




function Page({params}) {
  const id = params.id;
  const router =  useRouter();

  const supabase = createClient();
  const [userP, setUserP] = useState([]);
  const [isFriend, setIsFriend] = useState('');
  const [userAsUser , setUserAsUser] = useState([]);
  const [userAsfriend, setUserAsFriend] = useState([]);
  const [me, setMe] = useState([]);
  const [lopen, setLopen] = useState(false);
  const [file, setFile] = useState(false);
  const [modalType, setModalType] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [request, setRequest] = useState(false);
  const [matching,setMatching] = useState('');
  
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
        data ? setUserP(data) : alert('User not found') + router.push('/explore');

      }
      async function fetchSuggestedUsers(){
        const { data, error } = await supabase
          .rpc('get_suggested_users');
        if (data) {
            setSuggestedUsers(data)
        }
      }

      fetchUser();
      fetchMe();
      fetchSuggestedUsers();
    
},[id])

  
    async function handelFriendshipRequest(theUserUid) {
      const fname = user?.firstName;
      const theUserProfile = me.imgName ? `https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${me.imgName}` : `https://api.dicebear.com/6.x/micah/svg?seed=${fname}`;
      const { data, error } = await supabase.from('friends').insert({
        useruid:currentUserUid,
        userName:userName,
        userProfile:theUserProfile,
        userAge:me.age,
        userSkill:me.skill ? me.skill : 'No skill available',
        userLocation:me.location,
        userInterests:me.interests ? me.interests : 'No interest available',
        userVerification:me.verified,
        status:'pending',
        frienduid:theUserUid,
        friendName:userP.username,
        friendProfile:userP.profilePic ? `https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${userP.imgName}` : `https://api.dicebear.com/6.x/micah/svg?seed=${userP.userName}`,
        friendAge:userP.age,
        friendSkill:userP.skill ? userP.skill : 'No skill available',
        friendLocation:userP.location,
        friendInterests:userP.interests ? userP.interests : 'No interest available',
        friendVerification:userP.verified,
        requester:currentUserUid,
        receiver:theUserUid,
        receiverId:userP.id,

      });
      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        const {data,error} = await supabase.from('notifications').insert({
            sender:currentUserUid,
            senderName: userName,
          receiver: userP.uid,
          type:`${userName } Sent you a friend request .`
        })
        checkFriendshipStatus();
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
    async function stopRequest(theUserUid){
      const {data,error} = await supabase.from('friends').delete().eq('useruid',currentUserUid).eq('frienduid',theUserUid);
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

  const handleClose = ()=>{
    setLopen(false);
  }

    const calculeMatching = async () => {
      if (matching === '' && userP.interests) {
        const response = await fetch('/api/calculeMatching', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInterests: userP.interests,userAge:userP.age,userDesc:userP.description, meInterests: me.interests ,meAge:me.age,meDesc:me.description }),
        });

        if (response.ok) {
          const data = await response.json();
          setMatching(data.response);
        }
      }
    };


    useEffect(()=>{
      calculeMatching();
    },[userP.interests,me.interests])

  return (
    <>
      <div className="min-h-screen dark:bg-gray-900 dark:text-white font-poppins text-[#050315]">
        {
          lopen && (
            <ShowModal fileType={modalType} src={file} onClose={handleClose}  />
          )
        }
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
          className="absolute inset-0 bg-gradient-to-t frdark:bg-gray-900 dark:text-white to-transparent"></div>
      </div>
      {/* Profile Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 max-sm:px-1 ">
        <div className="relative z-10 dark:bg-gray-900 dark:text-white bg-white rounded-lg shadow-xl p-6 mb-6">
          <div
            className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <Image
            onClick={()=>{
                  setLopen(true);setFile(`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${userP.imgName}`,setModalType('img'))
            }}
              src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${userP.imgName}`}
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full border-4 borddark:bg-gray-900 dark:text-white cursor-pointer w-40 h-40  shadow-lg" />
            {/* userP Info */} 
            <div className="text-center md:text-left flex-grow">
              <div className="flex items-center max-sm:flex-col gap-2 max-sm:line-clamp-2" >
                <h1  className="text-3xl max-sm:text-md flex items-center  font-bold max-sm:font-extralight text-[#050315] dark:text-white mb-2">{userP.fname + userP.lname} <span>{userP.verified == 1 && <MdOutlineVerified size={30} style={{ color: '#0284c7' }} />}</span>,  </h1>
                <span className="text-3xl max-sm:font-extralight" >{userP.age}</span>
              </div>
              <p
                className="text-lg text-[#050315] dark:text-white flex items-center justify-center md:justify-start mb-4">
                <MapPin className="h-5 w-5 mr-2 text-[#2f27ce]" />
                {userP.location}
              </p>
              
              {
                //if userP === me.uid show (Read mode only)
                userP.uid == me.uid ? (
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    <Link
                      href={`/myprofile/edit/${userP.uid}`}
                      variant="outline"
                      className="border-[#2f27ce] text-[#2f27ce] flex rounded p-2  items-center hover:bg-[#2f27ce] hover:tedark:bg-gray-900 dark:text-white">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </div>
                ):(
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                {
                  isFriend == 'true' && (
                    <>
                    <Link
                      href={`/chat/${userP.uid}`}
                      variant="outline"
                      className="border-[#2f27ce] text-[#2f27ce] flex rounded p-2  items-center hover:bg-[#2f27ce] hover:tedark:bg-gray-900 dark:text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Link> 
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
                          <Button  disabled={isFriend == 'pending'} variant="outline" className="border-[#2f27ce]  text-[#2f27ce] hover:bg-[#2f27ce] hover:bg-gray-900 ">
                            <IoTime className="h-4 w-4 mr-2" />
                              Request Pending
                          </Button>
                          <button onClick={()=>{stopRequest()}} className="p-2 bg-red-400 text-white rounded flex items-center max-sm:p-1  hover:bg-red-300 transition-all cursor-pointer" >
                            <OctagonPause  className="h-4 w-4 mr-2" />
                            Pause Request
                          </button>   
                    </div>
                  )
                }
                {
                  isFriend == '0'  && (
                    <Button onClick={()=>{
                      handelFriendshipRequest(userP.uid);
                    }}  variant="outline" className="border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce]  hover:tedark:bg-gray-900 dark:text-white dark:bg-accent ">
                    <BsBriefcase className="h-4 w-4 mr-2" />
                      Add Friend
                    </Button> 
  
                  )
                }
                
                {/* <Button
                  variant="outline"
                  className="border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:tedark:bg-gray-900 dark:text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button> */}
                  </div>
                )
              }
             
            </div>
            {/* Stats */}
            <div className="flex flex-col gap-4 p-4 justify-center items-center text-center">
  {/* Matching and Friends Section */}
  <div className="flex flex-col items-center gap-6">
    {/* Matching Section */}
    {matching === '' ? (
      <div className="flex gap-2 items-center">
        <Image height={50} width={50} src="/ass/ai.gif" alt="Loading" />
        <p className="text-sm text-[#050315] dark:text-white">
          Calculating Your Matching With {userP.fname }
        </p>
      </div>
    ) : (
      <div className="flex flex-col items-center">
          <AnimatedCircularProgressBar
            className="w-16 h-16 text-md font-poppins font-semibold"
            max={100}
            min={0}
            value={matching}
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
        <p className="text-sm text-[#050315] dark:text-white mt-2">Matching</p>
      </div>
    )}

    {/* Friends Section */}
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold text-[#2f27ce]">
        <NumberTicker value={userAsfriend ? userAsfriend.length : 0} />
      </p>
      <p className="text-sm text-[#050315] dark:text-white mt-2">Friends</p>
    </div>
  </div>
</div>


          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <Card className="dark:bg-gray-900 dark:text-white border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white flex items-center">
                  <MdBoy style={{color:'#433bff'}} className="h-6 w-6 mr-2" />
                  About Me
                </h2>
                <p className="text-[#050315] dark:text-slate-400 first-letter:capitalize">
                  {userP.description} 
                </p>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="dark:bg-gray-900 dark:text-white border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black flex items-center">
                  <BookmarkPlus style={{color:'#433bff'}}  className="h-6 w-6 mr-2" />
                  Interests
                </h2>
                {/* <span>
                {
                  userP.interests
                }
                </span> */}
                <div className="flex flex-wrap gap-2">
                {
                  userP.interests &&  userP.interests !== 'No Interest available' ? (
                    userP.interests
                      .split(/[,./;:&\s]+|and/)
                      .filter((interest) => interest.trim() !== "") // Remove empty values
                      .map((interest, index) => (
                        <span
                          key={index}
                          className="bg-[#dedcff] flex items-center first-letter:capitalize text-text px-3 py-1 gap-2 margin-2 rounded-full text-md font-medium">
                          <img
                            width={30}
                            height={30}
                            src={`https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${interest}&backgroundColor=dedcff`}
                            alt={`icon for ${interest}`}
                          />
                          {interest}
                        </span>
                      ))
                  ) : (
                    <p className="text-gray-500 text-center">No Interest available</p>
                  )
                }


                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="dark:bg-gray-900 dark:text-white border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl dark:text-white font-semibold mb-4 text-text flex items-center">
                  <Phone  className="h-6 text-accent w-6 mr-2" />
                  Contact
                </h2>
                <div>
                {userP.instagram && (
                    <Link href={"https://www.instagram.com/"+userP.instagram} className="flex items-center p-2 gap-2 hover:size:40 text-muted-foreground hover:text-primary" prefetch={false}>
                      <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
                      {userP.instagram}
                    </Link>
                  )}
                  {userP.facebook && (
                    <Link href={"https://www.facebook.com/"+userP.facebook} className="flex items-center p-2 gap-2 hover:size:40 text-muted-foreground hover:text-primary" prefetch={false}>
                      <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
                      {userP.facebook}
                    </Link>
                  )}
                  {userP.number && (
                    <Link href={"tel:"+userP.number} className="flex items-center p-2 gap-2 hover:size:40 text-muted-foreground hover:text-primary" prefetch={false}>
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
                <Card className="dark:bg-gray-900 dark:text-white border border-[#dedcff] overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    {
                      userP.occupation && (
                        <div className="flex dark:text-white items-center text-[#050315]">
                          <BsBriefcase style={{color:'#433bff'}}  className="h-5 w-5 mr-3 text-[#2f27ce]" />
                          Occupation: {userP.occupation}
                        </div>
                      )
                    }
                    {
                      userP.personaleWebsite && (
                        <div className="flex items-center text-[#050315]">
                          <Link className="flex items-center text-blue-500 hover:text-blue-600" href={userP.personaleWebsite}>
                            <IoIosLink style={{color:'#433bff'}}  className="h-5 w-5 mr-3 " />
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
          <h2 className="flex text-2xl font-semibold mb-6  text-textflex items-center">
            <Users style={{color:'#433bff'}}  className="h-6 w-6 mr-2" />
            suggested Users
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {suggestedUsers.map((user) => (
              <Card
                onClick={() => { router.push(`/profile/${user.id}`) }}
                key={user.id}
                className="dark:bg-gray-900 dark:text-white border border-[#dedcff] overflow-hidden hover:shadow-lg transition-shadow"   >
                <CardContent className="p-6 flex flex-col items-center hover:cursor-pointer  text-center">
                  <Image
                   
                    src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`}
                    alt={`Similar userP ${user.id}`}
                    width={100}
                    height={100}
                    className="rounded-full h-20     w-20  mb-4" />
                  <h3 className="font-semibold dark:text-white text-[#050315] mb-1">{user.fname} {user.lname}</h3>
                  <p className="text-sm dark:text-slate-400 text-[#050315] mb-4">{user.age}</p>
                  <p className="text-sm   dark:text-slate-400 text-[#050315] mb-4">{user.location}</p>
                  {
                    request ? (
                       <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          stopRequest(user.uid);
                          setRequest(false);
                          }}
                        variant="outline"
                        size="sm"
                        className="w-full border-red-400 bg-red-400 text-white hover:bg-red-300 hover:tedark:bg-gray-900 dark:text-white">
                        <Users className="h-4 w-4 mr-2" />
                        Stop Request
                      </Button>
                    ):(
                       <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          handelFriendshipRequest(user.uid);
                          setRequest(true)
                          console.log(event)
                          }}
                        variant="outline"
                        size="sm"
                        className="w-full dark:bg-accent border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:tedark:bg-gray-900 dark:text-white">
                        <Users className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                    )
                  }
                 
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