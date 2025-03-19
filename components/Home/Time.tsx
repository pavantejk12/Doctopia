'use client'

import { useSession } from "next-auth/react"

export default function Time() {
  const { data: session, } = useSession()
  

  return (
    <div className=''>
      {(() => {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 6) {
            return(
              <div className=" w-full h-24 rounded-md flex justify-left p-3 "
              style={{
                backgroundImage: `url('/night.png')`,
                backgroundSize: 'cover',
                   
              }}
              >
                <div className="my-auto">
                <h1 className=" text-xl lg:text-2xl  text-white ">Good Night, {session?.user?.name??''}</h1>
                <p className="text-base text-white">Let’s guide you through your learning process</p>
                </div>
              
  
              </div>
              )

        } else if (curHr < 12) {
            return (
              <div className=" w-full h-24 rounded-md flex justify-left p-3 "
              style={{
                backgroundImage: `url('/morning.png')`,
                backgroundSize: 'cover',
                   
              }}
              >
                <div className="my-auto">
                <h1 className=" text-xl lg:text-2xl  text-white ">Good Morning, {session?.user?.name??''}</h1>
                <p className="text-base text-white">Let’s guide you through your learning process</p>
                </div>
              
  
              </div>
              )
        } else if (curHr < 14) {
            return (
              <div className=" w-full h-24 rounded-md flex justify-left p-3 "
              style={{
                backgroundImage: `url('/afternoon.png')`,
                backgroundSize: 'cover',
                   
              }}
              >
                <div className="my-auto">
                <h1 className=" text-xl lg:text-2xl  text-white ">Good noon, {session?.user?.name??''}</h1>
                <p className="text-base text-white">Let’s guide you through your learning process</p>
                </div>
              
  
              </div>
              )
        } else if (curHr < 18) {
            return (
              <div className=" w-full h-24 rounded-md flex justify-left p-3 "
              style={{
                backgroundImage: `url('/afternoon.png')`,
                backgroundSize: 'cover',
                   
              }}
              >
                <div className="my-auto">
                <h1 className=" text-xl lg:text-2xl  text-white ">Good Afternoon, {session?.user?.name??''}</h1>
                <p className="text-base text-white">Let’s guide you through your learning process</p>
                </div>
              
  
              </div>
              )
        } else if (curHr < 22) {
            return (
              <div className=" w-full h-24 rounded-md flex justify-left p-3 "
              style={{
                backgroundImage: `url('/evening.png')`,
                backgroundSize: 'cover',
                   
              }}
              >
                <div className="my-auto">
                <h1 className=" text-xl lg:text-2xl  text-white ">Good Evening, {session?.user?.name??''}</h1>
                <p className="text-base text-white">Let’s guide you through your learning process</p>
                </div>
              
  
              </div>
              )
        } else {
            return (
              <div className=" w-full h-24 rounded-md flex justify-left p-3 "
              style={{
                backgroundImage: `url('/night.png')`,
                backgroundSize: 'cover',
                   
              }}
              >
                <div className="my-auto">
                <h1 className=" text-xl lg:text-2xl  text-white ">Good Night, {session?.user?.name??''}</h1>
                <p className="text-base text-white">Let’s guide you through your learning process</p>
                </div>
              
  
              </div>
              )
        }
      })()}
      
 
    </div>
    
  )
}
