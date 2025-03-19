import React from 'react'
import { getPayloadClient } from "@/payload/payloadClient";
import Link from 'next/link';
export const revalidate = 10


async function category(){
  
    const payload = await getPayloadClient();
  
    const category = await payload.find({
       collection: "category",
    
    });
   
    return category
   
}

async function Categories() {

  const data = await category()

  return (
    <div className=''>
      <div className='flex justify-center'>
        <div className='lg:w-5/6 w-11/12 '>
        <div className='no-scrollbar flex lg:gap-10 gap-3 overflow-hidden overflow-x-scroll  justify-between '>
      {
      data.docs.map((data,index)=>{
        return(
          <Link key={index} href={data.url}>
          <div key={index} className=''>
          <div className='flex justify-center pt-1 pb-1'>
          <div className='rounded-full h-12 w-12  bg-white shadow-md'>
          <img
          className="p-2 my-auto inline-block h-12 w-12 rounded-full "
          src={data.image.url}
          alt=""/>

          </div>
          </div>
         
          <h1 className='text-textsecound mt-1 text-sm'>{data.title}</h1>
        </div>
        </Link>
        
        )
      }) 
    }
    </div>
          
        </div>

      </div>
      
    </div>
  )
}

export default Categories