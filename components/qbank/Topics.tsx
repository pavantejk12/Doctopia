'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface props {
    topic:any
}

function Topics({topic}:props) {
    const [more,setMore] = useState<number>(0)
  return (
    <div className='grid grid-cols-1 gap-3 mt-3'>
        {
            topic?.topics?.map((topic:any,index:number)=>{
              return (
                <div onClick={()=>{
                    setMore(index)
                  }} className='bg-yellow rounded-md cursor-pointer'>
                    <div className='flex justify-between'>
                    <h1 className='pl-3 pr-3 pt-3 text-black '>{topic.title}</h1>
                    <div onClick={()=>{
                          setMore(index)
                        }} className='cursor-pointer w-5 h-5  my-auto mr-3'>
                       <Image width={444} height={444} alt='more' src={`${index === more ?'/more.svg':'/arrow.svg'}`}></Image>
                    </div>
                    
                    </div>
                    <h1 className={`${index=== more?'hidden':'block'} text-black opacity-50 pl-3 pb-3`}>{topic?.ques?.length??0} Qbanks</h1>

                    <div className={`${index=== more?'block':'hidden'} p-3 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-3`}>
                        {
                            topic?.ques?.map((ques:any,index:number)=>{
                                return (
                                    <Link className={`${ques.name?'':'hidden'}`} href={`/tests/start?id=${ques.id}&name=${topic.title}`}>
                                    <div className='bg-white p-3 rounded-md flex justify-between'>
                                        <div>
                                        <h1 className='text-black '>{ques.name}</h1>
                                        <div className='flex  text-[1rem] opacity-50 text-black'>
                                            {/* <div className='w-5 h-5 my-auto'>
                                                <Image className='my-auto' height={444} width={444} alt='clock' src={'/clock.svg'}></Image>
                                            </div> */}
                                            {/* <p className='ml-1'>{ques.duration} Min</p>
                                            <h1 className='ml-2 mr-2'>|</h1> */}
                                            <p>{ques.qlength} Qus</p>
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
  )
}

export default Topics