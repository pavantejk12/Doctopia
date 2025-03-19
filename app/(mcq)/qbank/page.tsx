import {cookies} from 'next/headers'
import React from 'react'
import getPayloadClient from '@/payload/payloadClient'
import Image from 'next/image';
import Link from 'next/link';
import Payloaduser from '@/payload/Payloaduser';
export const revalidate = 1

async function getData(token:string){
  
  const payload = await getPayloadClient();
  const user:any =  Payloaduser(token)
  

  const  userlatest:any = await payload.findByID({
     collection: "customers",
     id: user.id
  })

  //console.log(JSON.stringify(userlatest?.course?.id??''))

  
  
  const subject = await payload.find({
     collection: "subjects",
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
        
     }
     
  
  });

  return subject
}

async function page() {
  const token = cookies().get("payload-token")
  //console.log(token)
  const data = await getData(token!?.value??'')
  return (
    <div>
      <h1 className='text-black text-xl'>Qbank</h1>
      <div className='grid lg:grid-cols-2 gap-3 grid-col-1 mt-3'>
        {data.docs.map((subject:any,index:number)=>{
          return (
            <Link className={`${subject.isqbank === 'True' ?'block':'hidden'}`}  key={index} href={`/qbank/${subject?.id??''}`}>
            <div  className={`${subject.isqbank === 'True' ?'block':'hidden'} cursor-pointer flex gap-3 border-[1px] text-black border-opacity-50 p-2 rounded-md`} >
              <div className='w-10 h-10 my-auto'>
              <Image alt={subject.title} width={444} height={444} src={subject.image.url}></Image>
              </div>

              <div className='my-auto'>
              <h1 className='my-auto text-[1.2rem]  text-black'>{subject.title}</h1>
              <p className='-mt-1 my-auto text-[1rem] opacity-50'>{subject?.topics?.length??0} Topics</p>
              </div>
            </div>
            </Link>
          )
        })
        
        }</div>

      <h1 className='text-black text-xl mt-3'>Subjects</h1>
      <div className='grid lg:grid-cols-2 gap-3 grid-col-1 mt-3'>
        {data.docs.map((subject:any,index:number)=>{
          return (
            <Link className={`${subject.isqbank === 'True' ?'hidden':'block'}`} key={index} href={`/qbank/${subject?.id??''}`}>
            <div  className={`${subject.isqbank === 'True' ?'hidden':'block'} cursor-pointer flex gap-3 border-[1px] text-black border-opacity-50 p-2 rounded-md`} >
              <div className='w-10 h-10 my-auto'>
              <Image alt={subject.title} width={444} height={444} src={subject.image.url}></Image>
              </div>

              <div className='my-auto'>
              <h1 className='my-auto text-[1.2rem]  text-black'>{subject.title}</h1>
              <p className='-mt-1 my-auto text-[1rem] opacity-50'>{subject?.topics?.length??0} Topics</p>
              </div>
            </div>
            </Link>
          )
        })
        
        }</div>

      <div className='h-24'></div>


    </div>
  )
}

export default page