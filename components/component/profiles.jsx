'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, X, MessageCircle, Coffee, Music, Camera, Plane, Eye } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { createClient } from "@/utils/supabase/client"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { ConfettiButton } from '../ui/confetti'

// const profiles = [
//   {
//     id: '1',
//     name: 'Alex Johnson',
//     age: 28,
//     city: 'New York',
//     description: 'Adventure seeker and coffee enthusiast. Always up for trying new restaurants!',
//     coverImage: '/placeholder.svg?height=400&width=600',
//     profileImage: '/placeholder.svg?height=200&width=200',
//     interests: ['Coffee', 'Travel', 'Food'],
//   },
//   {
//     id: '2',
//     name: 'Sam Lee',
//     age: 24,
//     city: 'Los Angeles',
//     description: 'Aspiring filmmaker with a passion for storytelling. Looking for someone to share popcorn with.',
//     coverImage: '/placeholder.svg?height=400&width=600',
//     profileImage: '/placeholder.svg?height=200&width=200',
//     interests: ['Movies', 'Photography', 'Art'],
//   },
//   {
//     id: '3',
//     name: 'Taylor Swift',
//     age: 31,
//     city: 'Nashville',
//     description: 'Music lover and cat person. Probably writing a song about you right now.',
//     coverImage: '/placeholder.svg?height=400&width=600',
//     profileImage: '/placeholder.svg?height=200&width=200',
//     interests: ['Music', 'Cats', 'Songwriting'],
//   },
// ]

const interestIcons = {
  Coffee: <Coffee />,
  Travel: <Plane />,
  Food: <Coffee />,
  Movies: <Camera />,
  Photography: <Camera />,
  Art: <Coffee />,
  Music: <Music />,
  Cats: <Coffee />,
  Songwriting: <Music />,
}

const Profiles = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
    const [isLiked, setIsLiked] = useState(false)


  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const nextProfile = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length)
    setIsLiked(false)
  }

  const prevProfile = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length)
    setIsLiked(false)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevProfile()
      } else if (event.key === 'ArrowRight') {
        nextProfile()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [])
    
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [profiles, setProfiles] = useState([])
  const currentProfile = profiles[currentProfileIndex]
  const { user } = useUser()
  const currentUserId = user?.id
    const router = useRouter();
  async function like(liker , receiver) {
    if (liker === receiver) {
      toast.error('You cannot like yourself.')
      return
    }
    const { data, error } = await supabase.from('likes').select('*').eq('liker', liker).eq('receiver', receiver)
    if (data && data.length > 0) {
      toast.error('You have already liked this user.')
    } else {
      const { error } = await supabase.from('likes').insert({
        liker: liker,
        receiver: receiver
      })  
        const confetti = document.getElementById('confetti');
        if (confetti) {
            confitty.click();
        }
      const aud = new Audio('/ass/like.wav')
      if (error) {
        toast.error('Something went wrong.')
      } else {
        aud.play()
        toast.success('You liked this user.')
      }
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      const { data, error } = await supabase.from('users').select('*').order('id', { ascending: false })
      
      if (data) {
        setProfiles(data)
        setLoading(false)
      } else {
        setLoading(false)
        toast.error('No users found.')
      }
    }
    fetchUsers()

    const subscription = supabase.channel('annListen')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        const newCh = new Audio('/ass/ann.mp3')
        newCh.play()
        fetchUsers()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }

   

  }, [])
  const bottom = () => {
      const bottomDiv = document.getElementById('bottom');
      if (bottomDiv) {
        bottomDiv.scrollIntoView({ behavior: 'smooth' });
      }
    }
    bottom();
  return (
      (
          
        profiles && profiles.length > 0 && (
           <div className="flex items-center justify-center min-h-[40%]   p-4">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
          <img
           src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${currentProfile.imgName}`} 
            alt=""
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          {
            currentProfile.permission ? (
            <Image width={100} height={100} src={currentProfile.profilePic} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white rounded "   alt="bgImage" />
            ) : (
            <Image width={100} height={100} src={'/ass/logo.png'}            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white rounded "   alt="bgImage" />
            )
          }
        </div>
        <div
          className="flex-grow flex flex-col justify-between p-4 sm:p-6 pt-12 sm:pt-16">
          <div>
            <h2 id='bottom'  className="text-xl sm:text-2xl font-bold text-center mb-2">
              {currentProfile.fname} {currentProfile.lname}, {currentProfile.age}
            </h2>
            <p className="text-gray-600 text-center mb-2 sm:mb-4">{currentProfile.location}</p>
            <p className="text-gray-800 text-center text-sm sm:text-base mb-4 sm:mb-6">{currentProfile.description}</p>
          </div>
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
            <div className="flex justify-center space-x-4 mt-4">
              {currentProfile.instagram && (
                <Link href={`https://www.instagram.com/${currentProfile.instagram}`} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                  <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
                </Link>
              )}
              {currentProfile.facebook && (
                <Link href={`https://www.facebook.com/${currentProfile.facebook}`} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                  <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
                </Link>
              )}
              {currentProfile.number && (
                <Link href={`tel:${currentProfile.number}`} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                  <PhoneIcon className="w-5 h-5" style={{ color: '#4ade80' }} />
                </Link>
              )}
              </div>
          </div>
        </div>
        <div className="p-4 bg-secondary flex justify-around">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
            onClick={prevProfile}>
            <X className="text-accent" />
          </motion.button>
                <motion.button
                onClick={()=>like(currentUserId, currentProfile.uid)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center ${
                  isLiked ? 'bg-accent' : 'bg-white'
                }`}
            >
                              <Heart className={isLiked ? 'text-white' : 'text-accent'} />
                              <ConfettiButton id='confetti' className='hidden'  > ok  </ConfettiButton>
                          </motion.button>
                          
          <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
                              onClick={() => { router.push(`/profile/${currentProfile.id}`) }}
            >
            <Eye className="text-accent" />
                          </motion.button>
                      </div>
                  {/* <div id='bottom' ></div> */}
          </div>
          <Toaster />
           </div>)
        )
          
      
  );
}

export default Profiles




function FacebookIcon(props) {
  return (
    <svg
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
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg
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
    </svg>
  )
}

function PhoneIcon(props) {
  return (
    <svg
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
    </svg>
  )
}