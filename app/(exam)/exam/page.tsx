import React from 'react'

import { getPayloadClient } from "@/payload/payloadClient";
export const revalidate = 10
import Category from '@/components/mcq/tests/Category';
import '@/css/nextjs/next.css'


async function page() {
  //const data = await getData()
  return (
    <div>
    <h1 className='text-xl font-semibold text-black'>Exam</h1>

    </div>
  )
}

export default page