'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Draft from '@/collections/Draft'

function page({searchParams}:{searchParams:{id:string,name:string}}) {

  console.log(searchParams.id)
  const [namet, setNamet] = useState<string>("")
  const [dtaft,setDraft] = useState('Start')
  const [draftData,setDraftdata] = useState<any>()
  const [sesultid,setResultid] = useState<string>('')
  const [result,setResult] = useState(false)



  useEffect(() => {
    fetch(`/api/draft?&where[or][0][and][0][test][equals]=${searchParams.id}`)
          .then((res) => res.json())
          .then((data:any) => {

            console.log(data)
            if(data.docs.length > 0){
                //console.log("draft found")
                setDraft('Resume');
                setNamet(data.docs[0].test.name)
                setDraftdata(data.docs[0])
            }
            else{
                fetch(`/api/tests/${searchParams.id}`).then((res) => res.json())
                .then((data) => {
                    //console.log("normal test")
                    //console.log(data.name)
                    setNamet(data.name)
                })

            }

            

    })
      
  },[])

  useEffect(() => {
      fetch(`/api/results?depth=0&where[or][0][and][0][test][equals]=${searchParams.id}`).then((res) => res.json()).then((data) => {
        
         if(data.docs.length > 0){
           setResultid(data.docs[0].id)
           setDraft('Retake')
           setResult(true)
          //window.location.href = `/results/${data.docs[0].id}`;
        
         }
      
      })
    
  },[])


  return (
    <div className='bg-yellow p-3 rounded-md'>

      <h1 className=' font-semibold text-black'>{searchParams.name}</h1>
      <div className='flex justify-between  bg-white rounded-md'>
      
         <div className='p-3'>
            <p>{namet}</p>
            {dtaft === 'Resume'?
            <p className='text-black text-[0.80rem] opacity-50'>{Object.keys(draftData?.selectedoptions || []).length}/{draftData?.test.qlength??0} Qus Attempted </p>
            :<p className='text-black text-[0.80rem] opacity-50'>{dtaft} exam</p>
            }
            
            </div>

         <div className='flex flex-col lg:flex-row md:flex-row'>

         <div  className={`${result ? 'block' : 'hidden'} p-3`}>
            <Link href={`/results/${sesultid}`} >
            <div className='rounded-md text-white bg-orange pl-4 pr-4 lg:pl-3 lg:pr-3 pt-2 pb-2 w-fit'>Result</div>
            </Link>
         </div>

         <div  className='p-3'>
            <Link href={`/exam/${searchParams.id}`} >
            <div className='rounded-md text-white bg-orange pl-3 pr-3 pt-2 pb-2 w-fit'>{dtaft}</div>
            </Link>
         </div>
         
         </div>
 
      </div>

      
    
    </div>
  )
}

export default page