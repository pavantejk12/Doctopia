'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
function page() {
  const items = ["all", "qbank", "test"]
  const [index,setindex] = useState(0)

  const [data,setData] = useState<any>()

  const deleteBookmark = async (id:string) => {

      //console.log(id)

      const req = await fetch(`/api/bookmarks/${id}`,{
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      })
      const dataa = await req.json()
      //if(req.s)
      //console.log(req.status)
      if(req.status === 200){

        //console.log(JSON.stringify(data.docs))
        const dataArray = data.docs.filter((item:any) => item.id !== id);
        //console.log(JSON.stringify(dataArray))

        setData({...data,docs:dataArray})
      }
      
      
    
  }

  useEffect(() => {

    if(index === 0){
      console.log("all")
      fetch("/api/bookmarks")
      .then(res => res.json())
      .then(data => setData(data))
    }
    if(index === 1){
      console.log("qbank")
      fetch("/api/bookmarks?where[or][0][and][0][test.exam][equals]=qbank")
      .then(res => res.json())
      .then(data => setData(data))
    }
    if(index === 2){
      console.log("test")
      fetch("/api/bookmarks?where[or][0][and][0][test.exam][equals]=test")
      .then(res => res.json())
      .then(data => setData(data))
    }
    
  },[index])


  return (
    <div>
      <h1 className='text-xl font-semibold text-black'>Bookmarks</h1>
      <div className='flex gap-2 pt-3'>
        {
          items.map((item, indexx) => {

            return(
              <div key={indexx} onClick={() => setindex(indexx)} className={`cursor-pointer rounded-full text-black opacity-50 border-[1px]  pl-3 pr-3 pt-2 pb-2  ${index === indexx ? '!bg-orange !text-white !opacity-100' : ''}`}>{item}</div>

            )
            
          })
        }
        

      </div>

      <div className='grid grid-cols-1 gap-3 mt-5'>{

        data?.docs?.map((item:any,index:number)=>{

          if (item.test.name){
            return(
            
            <Link  key={index} href={`/bookmarks/${item?.id}`}>
            <div className='p-3 border-[1px] border-gray-300 rounded-md flex justify-between'>
              <div className='my-auto'>
              <h1 className='text-black !opacity-100 line-clamp-1'>{item.test.questions.find((q:any) => q.id === item?.qid)?.question || "Question not found for the given ID."}</h1>
              </div>
              <div className='w-20 flex justify-end'>
              <div onClick={(event)=>{
                event.preventDefault();
                deleteBookmark(item.id)
                //console.log(item.id)
              }} className='h-10 w-10 my-auto'>
                <Image alt='bookmarks' height={444} width={444} src={'/bookmarkn.svg'} ></Image>
              </div>
              </div>
            </div>
            </Link>
          )}
        
        
        })??''
        
      
      }</div>

    </div>
  )
}

export default page