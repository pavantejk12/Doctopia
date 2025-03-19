'use client'
import React from 'react'
import { CiLogout } from "react-icons/ci";
import Link from 'next/link'

function Logout() {
  return (
    <div>
        <div onClick={async()=>{
                    const req = await fetch('/api/customers/logout') 
                    if(req.ok){
                      window.location.href = '/login';
                    }
                 }} className=' pt-3 text-black text-2xl w-full flex justify-center'>
          <Link href={'/results'}>
          <CiLogout></CiLogout>
          </Link>
        </div>
        <div className='flex justify-center text-black'>
        <p className=''>Logout</p>
        </div>
    </div>
  )
}

export default Logout