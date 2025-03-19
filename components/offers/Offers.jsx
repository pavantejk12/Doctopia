import React from 'react'
import { getPayloadClient } from "@/payload/payloadClient";
import Link from 'next/link';
export const revalidate = 10


async function offers(){
  
    const payload = await getPayloadClient();
  
    const offers = await payload.find({
       collection: "offers",
    
    });
   
    return offers
   
}

async function Offers() {

  const data = await offers()

  //console.log(data)

  return (
    <div className='flex justify-center'>
        <div className='lg:w-5/6 w-11/12'>
        <div className='no-scrollbar flex overflow-hidden overflow-x-scroll gap-5  lg:gap-10  justify-between'>
        {

          data.docs.map((data1,index)=>{
            return(
            data1.offers.map((data2,index)=>{
               return(
                  <div key={index} className='h-40 w-[290px] lg:w-[400px] bg-white shadow-md rounded-2xl mt-1 mb-1 ml-[1px]'>
                  <div className='w-[290px] lg:w-[400px] h-40'>
                    <div className='flex'>
                      
                       <div className='w-1/2 h-40 flex flex-col justify-center'>
                          
                          <div className='my-auto ml-5'>
                          <h1 className='text-sm mb-1 text-textsecound'>Up to</h1>
                          <h1 className='font-semibold text-xl text-textprime'>{data2.percentage} % OFF</h1>
                          <h1 className='text-sm mb-1 text-textsecound '>For your fast Order</h1>
                          <Link href={`/products/${data2.product.search}`}>
                          <div className='rounded-md w-fit pl-2 pr-2 bg-textprime text-white'>Shop Now</div>
                          </Link>
                          </div>
                         
                       
                       </div>

                       <div className='w-1/2 h-40 flex'>
                           <div className='my-auto mx-auto'>
                              <img className="inline-block h-28 w-28 rounded-xl ring-2 ring-slate-100" src={data2.product.image.url} alt="">
                           </img>
                            
                           </div>

                       </div>
                    </div>
                  </div>
                  </div>
               )
            })
            )


          })
        // [1,2,3].map((data,index)=>{ 
        //     return(
        //     <div key={index} className='h-40 w-[240px] lg:w-[400px] bg-gray-100 '>
        //        <div className='w-[240px] lg:w-[400px]'></div>
        //     </div>
        //     )
        // })
        }
        </div>
        </div>
    </div>
  )
}

export default Offers