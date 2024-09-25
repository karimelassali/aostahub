import React from 'react'
import UserProfile from '@/components/component/UserProfile';


function Page({params}) {
    
    const id = params.id;
    
  return (
    <>
      <UserProfile userId={id} />
    </>
  )
}

export default Page