'use client'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

import { MdOutlineLinkedCamera } from "react-icons/md";
import { FaCheck } from "react-icons/fa";



export const metadata = {
  title: 'create',
  description: 'Welcome to Next.js',
};

export default function Create() {
  

  
  
  
  
  
  function clickHandle(){
    document.getElementById('imgInp').click();
  }
  
  
  
  return (
    (
    <div className="container mx-auto max-w-md py-12 px-4 sm:px-6 lg:px-8">
      {
      inlist ? (
        null
      )  : (
        <></>
      )
    }
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Your Box Profile</h1>
          <p className="mt-2 text-muted-foreground">Fill out the form below to create your profile.</p>
        </div>
        <Card style={{
          boxShadow:'0 0 30px #a1a1aa',
          borderRadius:'30px'
        }}>
          <CardContent className="space-y-6">
            <form className="overflow-hidden " onSubmit={create}>
              <input type="file" id="imgInp" hidden onChange={handleImgInput}  />
              <br />
              <Button type="button" onClick={clickHandle}  className="flex p-2 items-center gap-2  text-sm hover:scale-150 " style={{width:'100%',backgroundColor:'transparent'}}>
                <MdOutlineLinkedCamera color="#06b6d4" size={100} />
              </Button>
              <br />
              <p className="text-center mt-3 font-semibold" style={{color:'#10b981'}}>
                {
                  bg === true ?  'Image selected' : <span style={{color:"#f87171"}}>Pleaze select a picture of you !</span>
                }
              </p>
              <br />
              <br />
            <div className="grid grid-cols-2 gap-4 p-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <div className="flex items-center gap-2">
                  <Input style={{borderRadius:"5px"}} required  onChange={(e)=>{setFname(e.target.value)}}   id="name" placeholder="Enter your name" />
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Last Name</Label>
                <div className="flex items-center gap-2">
                  <Input  
                  style={{borderRadius:"5px"}}
                  required onChange={(e)=>{setLname(e.target.value)}}  id="lastname" placeholder="Enter your last name" />
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <div className="flex items-center gap-2">
                <Input  
                style={{borderRadius:"5px"}}
                required onChange={(e)=>{setAge(e.target.value)}}  id="age" type="number" placeholder="Enter your age" />
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label  required htmlFor="description">Description</Label>
              <Textarea   
              style={{borderRadius:"5px"}}
              required
                id="description"
                placeholder="Tell us about yourself"
                className="min-h-[100px]" 
                onChange={(e)=>{setDescription(e.target.value)}} 
                />
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <div className="flex items-center gap-2">
                  <Input  
                  style={{borderRadius:"5px"}}
                  onChange={(e)=>{setInstagram(e.target.value)}}  id="instagram" placeholder="Enter your Instagram" className="w-full" />
                  <InstagramIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <p style={{color:'gray',fontSize:'10px'}} className="gap-2">Without @</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <div className="flex items-center p-2">
                  <Input  
                  style={{borderRadius:"5px"}}
                  onChange={(e)=>{setFacebook(e.target.value)}}  id="facebook" placeholder="Enter your Facebook" className="w-full" />
                  <FacebookIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center gap-2">
                  <Input  
                  style={{borderRadius:"5px"}}
                  onChange={(e)=>{setNumber(e.target.value)}}  id="phone" placeholder="Enter your Phone Number" className="w-full" />
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
            <CardFooter>
            <Button type="submit" style={{borderRadius:'4px',color:'white'}}  className="ml-auto mt-4 flex items-center justify-center gap-2 bg-accent text-secondary  p-2 rounded-sm text-l font-bold"  >Create <FaCheck />
            </Button>
          </CardFooter>   
            </form>
          </CardContent>
          
        </Card>
      </div>
    </div>)
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
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


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}
