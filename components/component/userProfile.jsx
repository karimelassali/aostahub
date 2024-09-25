'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, MapPin, Phone, Users, Mail, Cake, Heart, MessageCircle, BookmarkPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { MdOutlineVerified } from "react-icons/md";
import  ProfileSkeleton from "@/components/component/profileSkeleton"
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import {sonner} from 'sonner'



export default function UserProfile({userId}) {
  
  const supabase = createClient();
  const [user, setUser] = useState([]);

  useEffect(()=>{
        async function fetchUser(){
          const { data,error } = await supabase.from('users').select().eq('id', userId).single();
          data ? setUser(data) : alert('User not found');

      }
      fetchUser();
  },[userId])
  
  return (
    (<div className="min-h-screen bg-[#fbfbfe] text-[#050315]">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src={user.permission == true ? user.profilePic : '/ass/logo.png'}
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
              src={`https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/images/imgs/${user.imgName}`}
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full border-4 border-[#fbfbfe] shadow-lg" />
            {/* User Info */}
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-[#050315] mb-2">{user.fname + user.lname}</h1>
              <p
                className="text-lg text-[#050315] flex items-center justify-center md:justify-start mb-4">
                <MapPin className="h-5 w-5 mr-2 text-[#2f27ce]" />
                {user.location}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <Button className="bg-[#2f27ce] hover:bg-[#433bff] text-[#fbfbfe]">
                  <Users className="h-4 w-4 mr-2" />
                  Add Friend
                </Button>
                <Button
                  variant="outline"
                  className="border-[#2f27ce] text-[#2f27ce] hover:bg-[#2f27ce] hover:text-[#fbfbfe]">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-semibold text-[#2f27ce]">1.5K</p>
                <p className="text-[#050315]">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#2f27ce]">500</p>
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
                <h2 className="text-2xl font-semibold mb-4 text-[#2f27ce] flex items-center">
                  <Heart className="h-6 w-6 mr-2" />
                  About Me
                </h2>
                <p className="text-[#050315]">
                  {user.description}
                </p>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-[#2f27ce] flex items-center">
                  <BookmarkPlus className="h-6 w-6 mr-2" />
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["Photography", "Travel", "Cooking", "Music", "Sports"].map((interest) => (
                    <span
                      key={interest}
                      className="bg-[#dedcff] text-[#2f27ce] px-3 py-1 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-[#2f27ce] flex items-center">
                  <Phone className="h-6 w-6 mr-2" />
                  Contact
                </h2>
                <Link
                  href="#"
                  className="flex items-center text-[#050315] hover:text-[#433bff] transition-colors">
                  <Mail className="h-5 w-5 mr-3 text-[#2f27ce]" />
                  johndoe@example.com
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-[#050315] hover:text-[#433bff] transition-colors">
                  <Instagram className="h-5 w-5 mr-3 text-[#2f27ce]" />
                  @johndoe
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-[#050315] hover:text-[#433bff] transition-colors">
                  <Facebook className="h-5 w-5 mr-3 text-[#2f27ce]" />
                  John Doe
                </Link>
                <div className="flex items-center text-[#050315]">
                  <Phone className="h-5 w-5 mr-3 text-[#2f27ce]" />
                  +1 (555) 123-4567
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-[#2f27ce] flex items-center">
                  <Cake className="h-6 w-6 mr-2" />
                  Additional Info
                </h2>
                <div className="flex items-center text-[#050315]">
                  <Cake className="h-5 w-5 mr-3 text-[#2f27ce]" />
                  Born on January 1, 1990
                </div>
                <div className="flex items-center text-[#050315]">
                  <Users className="h-5 w-5 mr-3 text-[#2f27ce]" />
                  Joined on March 15, 2020
                </div>
              </CardContent>
            </Card>
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
            {[1, 2, 3, 4].map((user) => (
              <Card
                key={user}
                className="bg-[#fbfbfe] border border-[#dedcff] overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=User${user}`}
                    alt={`Similar User ${user}`}
                    width={100}
                    height={100}
                    className="rounded-full mb-4" />
                  <h3 className="font-semibold text-[#050315] mb-1">User {user}</h3>
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
    </div>)
  );
}