"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Heart, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { toast, Toaster } from 'sonner'
import { createClient } from "@/utils/supabase/client"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const downHandler = ({ key }) => key === targetKey && setKeyPressed(true)
    const upHandler = ({ key }) => key === targetKey && setKeyPressed(false)

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}

export default function Profiles() {
  const [dragStart, setDragStart] = useState(0)
  const [dragEnd, setDragEnd] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sliderRef = useRef(null)
  const leftPress = useKeyPress('ArrowLeft')
  const rightPress = useKeyPress('ArrowRight')

  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [users, setUsers] = useState([])

  const { user } = useUser()
  const currentUserId = user?.id

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
        setUsers(data)
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

  const scrollToBottom = () => {
    const bottom = document.getElementById('bottom');
    if (bottom) {
      bottom.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToBottom();

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [isAnimating, users.length])

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [isAnimating, users.length])

  useEffect(() => {
    if (leftPress) prevSlide()
    if (rightPress) nextSlide()
  }, [leftPress, rightPress, prevSlide, nextSlide])

  const handleDragStart = (e) => {
    if ('touches' in e) {
      setDragStart(e.touches[0].clientX)
    } else {
      setDragStart(e.clientX)
    }
  }

  const handleDragMove = (e) => {
    if (dragStart === 0) return
    if ('touches' in e) {
      setDragEnd(e.touches[0].clientX)
    } else {
      setDragEnd(e.clientX)
    }
  }

  const handleDragEnd = () => {
    if (dragStart === 0) return
    const dragThreshold = 50
    if (dragStart - dragEnd > dragThreshold) {
      nextSlide()
    } else if (dragEnd - dragStart > dragThreshold) {
      prevSlide()
    }
    setDragStart(0)
    setDragEnd(0)
  }

  return (
    <div className="container mx-auto px-4 py-6 h-screen flex flex-col justify-center  ">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">User Profiles</h1> */}
      <div className="flex-grow flex flex-col lg:flex-row gap-6">
        <div
          className="w-full lg:w-2/3 relative overflow-hidden"
          ref={sliderRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}>
          <div
            className="flex transition-transform duration-300 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {users.map((user) => (
              <div key={user.id} className="w-full flex-shrink-0">
                <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                  <div className="relative h-40 lg:h-48">
                    <img src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`} alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      {user.permission === "true" ? (
                        <Image width={100} height={100} src={user.profilePic} className="w-full h-full object-cover rounded-sm" style={{borderRadius:'4px'}} alt="bgImage" />
                      ) : (
                        <Image width={100} height={100} src={'/ass/logo.png'} className="w-full h-full object-cover rounded-sm" style={{borderRadius:'4px'}} alt="bgImage" />
                      )}   
                    </div>
                  </div>
                  <div className="pt-12 lg:pt-16 px-4 lg:px-6 pb-4 lg:pb-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-center">{user.fname}</h2>
                      <p className="text-sm lg:text-base text-muted-foreground text-center">{user.age} • {user.location}</p>
                      <p className="mt-2 lg:mt-4 text-sm lg:text-base text-center">{user.description}</p>
                      <div className="flex justify-center space-x-4 mt-4">
                        {user.instagram && (
                          <Link href={`https://www.instagram.com/${user.instagram}`} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                            <InstagramIcon className="w-5 h-5" style={{ color: '#c026d3' }} />
                          </Link>
                        )}
                        {user.facebook && (
                          <Link href={`https://www.facebook.com/${user.facebook}`} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                            <FacebookIcon className="w-5 h-5" style={{ color: '#06b6d4' }} />
                          </Link>
                        )}
                        {user.number && (
                          <Link href={`tel:${user.number}`} className="hover:scale-110 text-muted-foreground hover:text-primary" prefetch={false}>
                            <PhoneIcon className="w-5 h-5" style={{ color: '#4ade80' }} />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4 lg:mt-6">
                      <Button variant="outline" size="sm" onClick={() => like(currentUserId, user.id)}>
                        <Heart className="w-4 h-4 mr-2" />
                        Like
                      </Button>
                      <Button variant="default" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
            <Button onClick={prevSlide} variant="outline" size="icon" className="bg-background/80">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button onClick={nextSlide} variant="outline" size="icon" className="bg-background/80">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
      <div id="bottom"></div>
    </div>
  )
}

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