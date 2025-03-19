import React from 'react'
import getPayloadClient from '@/payload/payloadClient'
import Image from 'next/image';
import Link from 'next/link';
async function getData(id:string){
  
  const payload = await getPayloadClient();
  const topic = await payload.findByID({
     collection: "subjectsflash",
     id:id,
     depth:2
  
  });

  return topic
}

export default async function page({ params }: { params: { id: string } }) {
    
    const topic = await getData(params.id)
  
    return (
    <div>
        <h1 className='text-xl text-black font-semibold'>Topics of {topic?.title??''}</h1>
        <div className='grid grid-cols-1 gap-3 mt-3'>
        {
            topic?.topics?.map((topic:any,index:number)=>{
              return (
                <div className='bg-yellow rounded-md'>
                    <h1 className='pl-3 pr-3 pt-3 text-black '>{topic.title}</h1>
                    <div className='p-3 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-3'>
                        {
                            topic?.ques?.map((ques:any,index:number)=>{
                                return (
                                    <Link href={`${params.id}/${ques.id}`}>
                                    <div className='bg-white p-3 rounded-md flex justify-between'>
                                        <div>
                                        <h1 className='text-black '>{ques.name}</h1>
                                        <div className='flex  text-[1rem] opacity-50 text-black'>
                                            {/* <div className='w-5 h-5 my-auto'>
                                                <Image className='my-auto' height={444} width={444} alt='clock' src={'/clock.svg'}></Image>
                                            </div>
                                            <p className='ml-1'>{ques.duration} Min</p>
                                            <h1 className='ml-2 mr-2'>|</h1> */}
                                            <p>{ques.questions.length} Qus</p>
                                        </div>
                                        </div>

                                        <div className='flex justify-center'>
                                            <div className='w-5 h-5 my-auto'>
                                                <Image className='my-auto' height={444} width={444} alt='arrow' src={'/arrow.svg'}></Image>
                                            </div>

                                        </div>
 
                                    </div>
                                    </Link>
                                )
                            })??''
                        }
                    </div>
                </div>
              )
            })??''
        }
        </div>

    </div>
  )
}
