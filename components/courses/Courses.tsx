export const revalidate = 1
import React from 'react'

import Image from 'next/image';
import Link from 'next/link';
import getPayloadClient from '@/payload/payloadClient';
import Preferences from './Preferences';

async function getData() {
  const payload = await getPayloadClient();

  const data = await payload.find({ collection: 'courses' })

  return data
}

async function Courses() {
  const data = await getData();

  return (
    <div className='login bg-white  flex flex-col h-screen'>
      <div className='flex justify-center'>
        <div className='header w-10/12 lg:w-9/12 h-20  flex justify-between'>
          <div className="flex justify-center my-auto">
            <div className="w-48 h-20 flex justify-center">
              <Link className="my-auto" href={'/'}>
                <Image className="my-auto" alt="Doctopia" src={`/logo.svg`} width={444} height={4444}></Image>
              </Link>
            </div>
          </div>

          <div className='sharebtn h-full flex justify-center '>
            <div className='my-auto h-10  gap-5 w-full flex justify-between'>
              <div className='w-10 h-10'>
                <Image className="my-auto" alt="instagram" src={`/instagram.svg`} width={444} height={4444}></Image>
              </div>

              <div className='w-10 h-10'>
                <Image className="my-auto" alt="share" src={`/share.svg`} width={444} height={4444}></Image>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='content flex justify-center flex-grow '>
        <div className='lg:w-9/12 w-10/12'>
          <h1 className='mt-10 lg:text-2xl text-xl text-black'>
            Give us a little info about you
          </h1>

          {/* <p className='text-gray-400 '>Lorem ipsum dolor sit amet consectetur.</p> */}

          <h1 className='mt-5 lg:text-2xl text-xl text-black'>
            Which exam you are preparing for?
          </h1>

          <Preferences data={data}></Preferences>
        </div>
      </div>
    </div>
  )
}

export default Courses
