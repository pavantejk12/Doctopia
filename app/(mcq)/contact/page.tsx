import React from 'react'
import Image from 'next/image'
import getPayloadClient from '@/payload/payloadClient';
import Link from 'next/link';
async function getData(){
  
    const payload = await getPayloadClient();
    const contact = await payload.findGlobal({
        slug:"contact"
    })
  
    return contact
  }

async function page() {
  const data = await getData()
  return (
    <div>
        <h1 className='text-black font-bold text-xl'>Contact</h1>
        
        <div className='grid lg:grid-cols-2 gap-5 mt-5'>

            <div className='w-full rounded-md border-gray-300 border-[1px]'>
                <div className='p-10'>
                    <h1 className='text-black text-xl font-bold'>Address</h1>
                    <p className='mt-3'>{ data.address??"Ug 17, Palika Place, Panchkuian Road, Connaught Place hall New Delhi."}</p>
                </div>



            </div>
            
            <div className='w-full rounded-md border-gray-300 border-[1px]'>
                <div className='p-10'>
                    <h1 className='text-black text-xl font-bold'>Contacts</h1>
                    <div className='flex gap-2 mt-3'>
                        <div className='w-5 h-5'>
                            <Image alt='email' width={444} height={444} src={'/email1.svg'}></Image>
                        </div>
                        <p>{data.email??"mhshakib100@gmail.com"}</p>


                    </div>

                    <div className='flex gap-2 '>
                        <div className='w-5 h-5'>
                            <Image alt='email' width={444} height={444} src={'/phone.svg'}></Image>
                        </div>
                        <p>{data.phone??"+8801770440969"}</p>


                    </div>
                </div>



            </div>


        </div>

        <div className='bg-yellow flex justify-center place-items-center p-3 mt-5 rounded-md'>
 
              <div className='grid grid-cols-7 justify-center place-items-center gap-5'>
                       
                        <Link href={`${data?.linkedin??''}`} >
                        <div className='w-8 h-8'>
                            <Image alt='email' width={444} height={444} src={'/linkedin.svg'}></Image>
                        </div> 
                        </Link>

                        <Link href={`${data?.instagram??''}`} >
                        <div className='w-8 h-8'>
                            <Image alt='instagram' width={444} height={444} src={'/insta.svg'}></Image>
                        </div> 
                        </Link> 

                        <Link href={`${data?.facebook??''}`} >
                        <div className='w-8 h-8'>
                            <Image alt='facebook' width={444} height={444} src={'/facebook.svg'}></Image>
                        </div> 
                        </Link>

                        <Link href={`${data?.teligram??''}`} >
                        <div className='w-8 h-8'>
                            <Image alt='email' width={444} height={444} src={'/teligram.svg'}></Image>
                        </div> 
                        </Link>

                        <Link href={`${data?.youtube??''}`} >
                        <div className='w-8 h-8'>
                            <Image alt='email' width={444} height={444} src={'/youtube.svg'}></Image>
                        </div> 
                        </Link>

                        <Link href={`${data?.twitter??''}`} >
                        <div className='w-8 h-8'>
                            <Image alt='email' width={444} height={444} src={'/twitter.svg'}></Image>
                        </div> 
                        </Link>

                        <Link href={`${data?.twitch??''}`} >
                        <div className='w-8 h-8'>
                            <Image alt='email' width={444} height={444} src={'/twich.svg'}></Image>
                        </div>
                        </Link>
              
              </div>
 
        </div>
    
    </div>
  )
}

export default page