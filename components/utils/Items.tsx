"use client"

import React from 'react'
//import {useShopcart} from '@/zustand/Cart'
import { useShopwish } from '@/zustand/Cart'

import { Card } from '@/components/ui/card'
import { AspectRatio } from '../ui/aspect-ratio'

import Image from 'next/image'
import { AiOutlineDelete } from 'react-icons/ai'

import Link from 'next/link'
import { TbMoodEmpty } from 'react-icons/tb'

function Items() {
  const Items = useShopwish((state) => state.carts)
  const remove = useShopwish((state) => state.remove)

  return (
    <div className='flex justify-center'>
    <div className='lg:w-5/6 md:w-5/6 w-11/12'>
    <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 lg:gap-5 md:gap-5 gap-[2px]  '>

{    
    Items?.length > 0 ?  Items?.map((items:any,index:number)=>(

            <Link key={index} href={'/products/'+items?.search??'/'}>

             <div key={index} className='bg-white bg-opacity-10 backdrop-blur-sm  shadow-md'>
                <AspectRatio ratio={16 / 16} className="bg-muted">
                <Image
                src={items.image}
                alt="Product"
                fill
                className=" object-cover"/>
                </AspectRatio>
                <div className='m-2'>
                <h1 className='pt-1 text-textprime font-semibold'>{items?.brand}</h1>
                <h1 className='pt-1 text-sm text-textpost  line-clamp-1'>{items.name}</h1>
                {/* <h1>{items?.categories[0].title}</h1> */}
                
                <div className='flex justify-between'>
                    <h1 className='pt-1 '>{"৳ "+items.price}</h1>
                    <div className='my-auto text-2xl cursor-pointer' onClick={(e)=>{
                      e.preventDefault();
                      
                      remove(index)
                      

                      

                    }} ><AiOutlineDelete></AiOutlineDelete></div>
                    


                </div>
                </div>

             </div> 
             </Link>                            
          ))??"":<div className='flex col-span-full justify-center  '>
          <div className='flex justify-center gap-2 text-xl '>
            <div className='my-auto'><TbMoodEmpty></TbMoodEmpty></div>
            <h1>No Item saved !</h1>
          </div>
    </div>    
        
}
     </div>

      </div>
    </div>
  )
}

export default Items