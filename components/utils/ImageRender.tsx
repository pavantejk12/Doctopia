import React, { useState } from 'react'
import Image from 'next/image'

type Props = {
    node: any
    i: number
}

function ImageRender(Props: Props) {
  const { node, i } = Props
  const [image,setImage] = useState<string>()
  const [showi,setShowi] = useState(false)
  
  return (
    <div className=''>
          
          <div onClick={()=>{setShowi(!showi)}}  className='cursor-pointer w-[100px] h-[60px] border-[5px] border-indigo-600 rounded-md shadow-black shadow-lg'>
          <Image alt='Image' width={555} height={555} className=' w-full h-full' src={node.value.url} key={i}>
          </Image>
          </div>

          <div className={`${showi?'':'hidden'} fixed z-30  w-full h-full left-0 top-0 bg-black bg-opacity-60`}>

           <div className='w-10/12 h-fit mx-auto mt-20 mb-20 '>

           <div className='flex justify-between'>

            <div>

            </div>

            <div className='text-2xl text-white'>
                   <h1 className='cursor-pointer' onClick={()=>{setShowi(!showi)}}>X</h1>
            </div>

           </div>
           <div className='w-full lg:w-fit lg:h-[80vh]'>
           <Image alt='Image' width={555} height={555} className='w-full h-full' src={node.value.url} key={i}>
           </Image>
           </div>

           </div>
           
           
          
          </div>
          
    </div>
  )
}

export default ImageRender