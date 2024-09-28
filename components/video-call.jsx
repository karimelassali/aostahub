'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Video, Phone } from 'lucide-react'

export default function VideoCall() {
  return (
    (<div
      className="flex items-center justify-center min-w-screen min-h-screen bg-[#fbfbfe] text-[#050315]">
      <Card className="w-full max-w-4xl p-6 shadow-lg rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-video bg-[#dedcff] rounded-xl overflow-hidden">
            <video className="w-full h-full object-cover" />
            <div
              className="absolute top-4 right-4 bg-[#2f27ce] text-white px-2 py-1 rounded-md text-sm font-medium">
              HD
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-avatar.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">John Doe</span>
            </div>
          </div>
          <div className="relative aspect-video bg-[#dedcff] rounded-xl overflow-hidden">
            <video className="w-full h-full object-cover" />
            <div
              className="absolute top-4 right-4 bg-[#2f27ce] text-white px-2 py-1 rounded-md text-sm font-medium">
              HD
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="/placeholder-avatar-you.jpg" alt="You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">You</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-[#dedcff] text-[#2f27ce] hover:bg-[#433bff] hover:text-white">
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-[#dedcff] text-[#2f27ce] hover:bg-[#433bff] hover:text-white">
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full bg-red-500 text-white hover:bg-red-600">
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>)
  );
}