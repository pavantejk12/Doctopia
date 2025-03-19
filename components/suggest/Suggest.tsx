'use client'
import React, { useEffect, useState } from 'react'
import { useUrl } from '@/zustand/Cart'
import Link from 'next/link'
import { useSugges } from '@/zustand/Cart'



function Suggest() {

  //const [data,setData] = useState([])
  //const [prevUrlsLength, setPrevUrlsLength] = useState(0);

  //const urls = useUrl((state) => state.stringNumbers)
  const data = useSugges((state) => state.data)
 
  

  
  return (
    <div className='flex justify-center'>
        <div className='lg:w-5/6 w-11/12'>
        <div className='no-scrollbar flex overflow-hidden overflow-x-scroll gap-5  lg:gap-10 '>
        {
            data.map((data:any,index)=>{
                return(
                    <Link key={index} href={`/products/${data.search}`}>
                    <div className='w-[135px] lg:w-[180px]'>
                    
                    <div className='bg h-[135px] lg:h-[180px] w-[135px] lg:w-[180px] bg-white rounded-md shadow-md'>
                    <img className="h-[135px] lg:h-[180px] w-[135px] lg:w-[180px] rounded-md " src={data.image.url} alt="">
                    </img>
                    </div>

                    <h1 className='text-sm text-text mt-2 line-clamp-1'>{data.name}</h1>
                    <div className='flex justify-between text-sm'>
                        <h1 className='text-text'>Tk {data.pricesale}</h1>
                        <h1 className='text-textsecound pr-2 line-through'>Tk {data.priceoriginal}</h1>
                    </div>
                    </div>
                    </Link>
                )
            })
        }
        </div>
        </div>
    </div>

  )
}

export default Suggest