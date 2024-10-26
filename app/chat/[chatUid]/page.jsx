import React from 'react'
import  Chat  from '@/components/component/chat'

export default async  function Page({params}) {
    const chatUid = await  params.chatUid;
  return (
    <>
        <Chat msgsId={chatUid} />

    </>
  )
}
