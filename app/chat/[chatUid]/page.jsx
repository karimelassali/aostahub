import React from 'react'
import  Chat  from '@/components/component/chat'

export default function Page({params}) {
    const chatUid = params.chatUid;
  return (
    <>
        <Chat msgsId={chatUid} />

    </>
  )
}
