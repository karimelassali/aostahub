'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {useState,useEffect} from 'react'

export default function ShowModal({onClose,src,fileType}) {
    const [close,setClose] = useState(false)
  return (
    fileType == 'img' && (
        !onclose && !close  &&  (
        <motion.div
        initial={{
        opacity: 0,
        x: 1000,
        }}
        animate={{
        opacity: 1,
        x: 0,
        }}
        className='fixed top-0 left-0  inset-0  border border-red-500 flex items-center justify-center  ' style={{width:'100%',height:'100%',zIndex:'999',backdropFilter:'blur(30px)'}}  >
        <button onClick={()=>{setClose(true);onClose()}} >
            close
        </button>
        <Image
            className='min-w-max min-h-max rounded '
            width={200} 
            height={200}
            src={src}   // Thumbnail image URL
            alt={`${fileType}`}
        />
        </motion.div>
        
    )
    )
  )
}
