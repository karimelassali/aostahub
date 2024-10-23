import React from 'react'
import NotificationChart from '@/components/component/NotificationChart'
function Page() {
  return (
      <div className='w-full h-full flex flex-col items-center justify-center' >
          <h1>Notifications </h1>
          <div className='w-full h-full flex justify-center items-center  '>
              <NotificationChart />
          </div>
     </div>
  )
}

export default Page