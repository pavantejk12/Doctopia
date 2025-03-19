import React from 'react'
import {cookies} from 'next/headers'
import Payloaduser from '@/payload/Payloaduser'
import Link from 'next/link'
import getPayloadClient from '@/payload/payloadClient'

import Image from 'next/image'

async function  getOrders(token:string){
    const payload = await getPayloadClient()
    const user:any =  Payloaduser(token)
  
    const puser = await payload.findByID({
        collection: "customers",
        id: user.id
    })
    
    
    const data = await payload.find({
        collection:'results',
        user:puser,
        overrideAccess: false,
    })

    return data



}


async function Orders() {
    const token = cookies().get("payload-token")
    const data = await getOrders(token!?.value??'')
    //console.log(data)


  return (
    <div className=''>
    <h1 className='text-xl font-semibold text-black'>Results</h1>
    <div className='flex flex-col gap-5 lg:w-full md:w-full w-full mt-3'>
    {
        data.docs.map((item:any,index)=>{
            return(
                <Link className={`${item.test.name?'':'hidden'}`} href={'/results/'+item?.id??''}>
                <div key={index} className='bg-yellow shadow-sm p-3 flex rounded-md justify-between'>
                <div>
                   <h1 className='text-xl'>{item?.test?.name??''}</h1>

                   <div className='flex gap-2'>
                    <div className='w-5 h-5 flex justify-center my-auto'>
                    <Image className='my-auto' alt='clock' width={444} height={444} src={'/clock.svg'}></Image>
                    </div>
                    <p className='text-black opacity-50'>{item?.test?.duration??''} Min</p>

                    <div className='h-5 w-[1px] bg-black opacity-50'></div>
                    <p className='text-black opacity-50'>{item?.score?.nofquestion??''} Qus</p>

                   </div>

                </div>

                <div className='flex justify-center my-auto'>

                    <div className='w-5 h-5'>

                        <Image alt='arrow' height={444}  width={444} src={'/arrow.svg'}></Image>

                    </div>

                </div>
                
                

                </div>
                </Link>
            )
        })
    }
    </div>
    </div>
  )
}

export default Orders