'use client'
import React from 'react'
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { motion } from 'framer-motion'
import { useState, useEffect } from "react";
import {sonner} from 'sonner'

export const metadata = {
  title: 'profile',
  description: 'Welcome to Next.js',

};



function Profile({userId}) {

    const supabase = createClient();


    const [user, setUser] = useState();

    async function fetchUser(){
        const { data,error } = await supabase.from('users').select('*').eq('id', userId);
        data ? setUser(data) : alert('User not found');

    }
    fetchUser();

    useEffect(()=>{
        
    },[])
  return (
    <div>{user.fname}</div>
  )
}

export default Profile