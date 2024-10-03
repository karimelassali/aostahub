 'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {useState,useEffect} from 'react'
import { IoClose } from 'react-icons/io5'

export default function ShowModal({onClose,src,fileType}) {
    const [close,setClose] = useState(false)
  return (
    fileType == 'img' && (
        !onclose && !close  &&  (
        <motion.div
        initial={{
        size: 0,
        x: 1000,
        }}
        animate={{
        size: 1,
        x: 0,
        }}
        className='fixed top-0 left-0  inset-0  p-2   flex items-center justify-center  ' style={{width:'100%',height:'100%',zIndex:'999',backdropFilter:'blur(30px)'}}  >
        <button className='fixed top-0 right-0  '  onClick={()=>{setClose(true);onClose()}} >
           <IoClose className='size-10 text-accent cursor-pointer hover:rotate-200 hover:text-secondary transition-all  ' / >
        </button>
        <br />
        <div className='max-h-full overflow-y-scroll'  >
        <Image
            className='min-w-max min-h-max rounded bg-slate-900 '
            width={200} 
            height={200}
            src={src}   // Thumbnail image URL
            alt={`${fileType}`}
        />
            </div>
        </motion.div>
        
    )
    )
  )
}
