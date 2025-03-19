import React from 'react'
import {cookies} from 'next/headers'
import { getPayloadClient } from "@/payload/payloadClient";
export const revalidate = 10
import Category from '@/components/mcq/tests/Category';
import Payloaduser from '@/payload/Payloaduser'
import '@/css/nextjs/next.css'
async function getData(token:string){
  
  const payload = await getPayloadClient();
  const user:any =  Payloaduser(token)

  const  userlatest:any = await payload.findByID({
    collection: "customers",
    id: user.id
  })

  const category = await payload.find({
     collection: "category",
     depth:2,
     limit:100,
     where:{
      "or": [
       {
         "and": [
           {
             "courses": {
               "in": [
                 `${userlatest?.course?.id??''}`
               ]
             }
           }
         ]
       }
     ]
       
    },
     user:user,
     overrideAccess: false,
  
  });

  

  return category


}

async function page() {
  const token = cookies().get("payload-token")
  const data = await getData(token!?.value??'')
  return (
    <div>
    <h1 className='text-xl font-semibold text-black'>Tests</h1>
    <Category data={data}></Category>
    

    </div>
  )
}

export default page