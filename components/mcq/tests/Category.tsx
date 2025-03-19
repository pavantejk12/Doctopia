'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
//import { GoDotFill } from "react-icons/go";
import { PiDotOutlineFill } from "react-icons/pi";
import Image from 'next/image';
interface props{
    data:any
}

function Category(props:props) {
  const [more,setMore] = useState<number>(0)

  const [numberc,setnumber] = useState<number>(0)
  const [data,setdata] = useState<{subcat:[]}>()

  const handledata = (id:string) => {
    console.log(id)
    
    
    fetch(`/api/category/${id}`, {headers: {'Content-Type': 'application/json',
    },
    }).then(response => response.json())
    .then(data => {
       console.log(JSON.stringify(data));
       setdata(data)
    }).catch(error => {
    
    console.error('Error:', error);
    });

      
  }
  useEffect(()=>{
    handledata("65df3214bb562b975cacc1c9")
    setnumber(3)

  },[])

  
  return (
    <div>
    <div className=' grid lg:grid-cols-5 grid-cols-2 gap-3 pt-3 '>
        {
            props.data.docs.map((item:any,index:number)=>(
                
                <div onClick={()=>{
                    setnumber(index)
                    handledata(item.id)
                }} className={`flex justify-center ${numberc == index ?'bg-orange rounded-full pl-3 pr-3 pt-1 pb-1 text-white':'text-black opacity-50 border-[1px] border-black rounded-full pl-3 pr-3 pt-1 pb-1'} cursor-pointer`} key={index}>

                  <p>{item.title}</p>
                </div>
            ))
        }
    </div>

    <div className='h-5'></div>
    {
        data?
        data!.subcat.map((item:any,index)=>(
            <div onClick={()=>{
              setMore(index)
            }} className='cursor-pointer bg-yellow rounded-md shadow-sm  mb-5 p-3 '>
            <div className='flex justify-between'>
            <h1 className='text-xl'>{item.title}</h1>
            <div onClick={()=>{

              setMore(index)

            }} className='w-5 h-5 cursor-pointer'>
              <Image width={444} height={444} alt='more' src={`${index === more ?'/more.svg':'/arrow.svg'}`}></Image>

            </div>
            </div>
            <h1 className={`${index=== more?'hidden':'block'} text-black opacity-50`}>{item?.tests?.length??0} Tests</h1>
            <div className='h-2'></div>
            <div className={`${index=== more?'block':'hidden'} grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5`}>
            {
                item?.tests?.map((item2:any,index:number)=>(
                    <Link className={`${item2.name?'':'hidden'}`} href={`/tests/start?id=${item2.id}&name=${item.title}`} >
                    <div className='bg-white border-black  p-3 rounded-md flex justify-between'>
                        <div><h2>{item2.name}</h2>
                        <div className='flex gap-1'>
                            <div className='w-[0.90rem] h-[0.90rem] my-auto'>
                              <Image alt='clock' height={444} width={444} src={'/clock.svg'}></Image>

                            </div>
                            <p className='text-sm text-black opacity-50'>{item2.duration} min</p>
                            <div className='my-auto h-4 w-[1px] bg-black opacity-50'></div>
                            <p className='text-sm text-black opacity-50'>{item2.qlength} Qus</p>
                        </div></div>
                        <div>
                           <div className='h-full  w-10 flex justify-center'>
                                <div className='w-[1rem] h-[1rem] my-auto'>
                                <Image alt='arrow' height={444} width={444} src={'/arrow.svg'}></Image>
                                </div>
                           </div>
                        </div>
                    </div>
                    </Link>
                ))??''
            }
            </div>
            </div>
            
        )):''
        
        
        
    }

    </div>
  )
}

export default Category