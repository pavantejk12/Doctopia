'use client'

import React from 'react'

//import Lottie from 'react-lottie-player'
// Alternatively:
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

//import lottieJson from '@/animation.json';

type prop={
  url?:string
}

export default function Lottief(prop:prop) {
  
  return (
    <div className='flex justify-center w-full  lg:-mt-24 lg:p-8'>
    <Lottie className='w-full h-full'
    
      loop
      path={prop.url}
      play

      style={{
        width:"100%",
        height:"100%"
      }}
      
    />
    </div>
  )
}