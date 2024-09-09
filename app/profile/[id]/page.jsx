import React from 'react'
import Profile from '@/components/component/profile';


function Page({params}) {
    
    const id = params.id;
    
  return (
    <>
      <Profile userId={id} />
    </>
  )
}

export default Page