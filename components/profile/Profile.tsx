import React, { useState } from 'react'
import getPayloadClient from '@/payload/payloadClient'
import {cookies} from 'next/headers'
import Payloaduser from '@/payload/Payloaduser'
import Image from 'next/image'
import { VscOutput } from "react-icons/vsc";
import Link from 'next/link'
import { CiLogout } from "react-icons/ci";
import Logout from './Logout'
import ProfileEditor from './ProfileEditor'
import { CiBookmarkCheck } from "react-icons/ci";

const getProfile = async (token:string) =>{

  const user:any =  Payloaduser(token)
  const payload = await getPayloadClient()

  if(user.id){
      const data = await payload.findByID({
        id:user.id,
        collection:'customers',
        user:user,
        overrideAccess: false,
      })
    
      return data
  }
  else{

      return {}
  }  

}

async function Profile() {
  const token = cookies().get("payload-token")
  const data:any = await getProfile(token!?.value??'')

  

  

  return (
    <div className=' flex justify-center w-full'>

      <div className='w-full flex justify-between'>

      <div className='w-4/12 bg-whitefir  lg:hidden md:hidden'>
        
        <div>

        {/* <div className=' pt-3 text-black text-2xl w-full flex justify-center'>
          <Link href={'/bookmarks'}>
          <CiBookmarkCheck></CiBookmarkCheck>
          </Link>
        </div>
        <div className='flex justify-center text-black'>
        <p className='pl-2 pr-2'>Bookmarks</p>
        </div> */}

        
        
        {/* <div className=' pt-3 text-black text-2xl w-full flex justify-center'>
          <Link href={'/results'}>
          <VscOutput></VscOutput>
          </Link>
        </div> */}

        {/* <div className='flex justify-center text-black'>
        <p className=''>Results</p>
        </div> */}

        <Logout></Logout>

        

        


        
         

        </div>

      </div>

      <ProfileEditor data={data}></ProfileEditor>




      
      
      
      
      </div>
      
    </div>
  )
}

export default Profile