'use client'
//import Time from "@/components/Home/Time"
import Image from "next/image"
import { useEffect } from "react"
import { useState } from "react"
import '@/css/nextjs/next.css'
import Link from "next/link"

export default  function Home() {
  const [udata,setudata] = useState<any>()
  const [performance, setperformance] = useState<number>()
  const [perform, setperform] = useState<number>()

  const [draft,setdraft ] = useState<any>()

  


  useEffect(() => {
    fetch("/api/customers/me")
      .then(response => response.json())
      .then((data:any) => {
         
         setudata(data)
         //console.log(data.user.totalQuestions)
         const perfor = (data.user.totalCorrectanswer / data.user.totalQuestions) * 100
         
         const per = Math.floor((perfor/100)*10)
         setperform(Math.floor(perfor))
         setperformance(per)

         const correctPercentage = ((data?.user?.totalCorrectanswer || 0) / (data?.user?.totalQuestions || 0)) * 100;
         const wrongPercentage = ((data?.user?.totalWronganswer || 0) / (data?.user?.totalQuestions || 0)) * 100;
         const notAnsweredPercentage = ((data?.user?.totalNotAttempted || 0) / (data?.user?.totalQuestions || 0)) * 100;
         setCorrect(correctPercentage)
         setWrong(wrongPercentage)
         setNotAnswered(notAnsweredPercentage)
         
      })
    
  },[])

  useEffect(()=>{
    ///api/draft
    fetch("/api/draft?&limit=2&depth=1")
      .then(response => response.json())
      .then((data:any) => {
        //console.log(JSON.stringify(data))
        setdraft(data)
    })


  },[])



  const [correct,setCorrect] = useState(0)
  const [wrong,setWrong] = useState(0)
  const [wrongAnswer,setNotAnswered] = useState(0)


  const gradient = `conic-gradient(
      #2DD79A 0% ${correct}%,
      #FF6A61 ${correct}% ${correct + wrong}%,
      #6649ED ${correct + wrong}% ${correct + wrong + wrongAnswer}%
  )`;
  
  return (
    <div className="">
      <div className="flex justify-between flex-col md:flex-col lg:flex-row gap-3">

        <div className="lg:w-7/12 md:w-full w-full  ">
          <h1 className="text-xl text-black pb-5 font-semibold">Peer Group Comparison</h1>

          <div className="bg-yellow flex justify-center flex-col rounded-md">
             
             <div className="mx-auto flex justify-between w-full pl-10 pr-10 pt-5 pb-5">

                 <div>
                   <div className="flex gap-1 justify-start">
                     <div className="w-4 h-4 bg-orange rounded-full my-auto "></div>
                     <p className="my-auto text-black opacity-50">Target</p>
                   </div>

                   <div className="flex gap-1 justify-start">
                     <div className="w-4 h-4 bg-blue rounded-full my-auto"></div>
                     <p className="my-auto text-black opacity-50">Your Point</p>
                   </div>

                 </div>
                 
                 <div>
                   <div className="text-black font-semibold">...</div>
                 </div>

             </div>
             
               
             <div className="relative lg:w-5/6 md:w-5/6 w-full mx-auto h-4/5 pt-5 pl-10 pr-10 pb-12">
                 <Image alt="wave" width={444} height={444} src={'/wave2.svg'} ></Image>
                 <div className="absolute w-5/6 h-full  mx-auto -top-1  flex flex-col justify-between">
                    
                    <div className="h-full w-full  grid grid-cols-10">
                       {performance===1?<div className={`col-span-1`}></div>:''}
                       {performance===2?<div className={`col-span-2`}></div>:''}
                       {performance===3?<div className={`col-span-3`}></div>:''}
                       {performance===4?<div className={`col-span-4`}></div>:''}
                       {performance===5?<div className={`col-span-5`}></div>:''}
                       {performance===6?<div className={`col-span-6`}></div>:''}
                       {performance===7?<div className={`col-span-7`}></div>:''}
                       {performance===8?<div className={`col-span-8`}></div>:''}
                       {performance===9?<div className={`col-span-9`}></div>:''}
                       {performance===10?<div className={`col-span-9`}></div>:''}
                       <div className=" w-[1px] h-full  border-[1px] border-blue border-dashed"></div>
      
                    </div>

                    <div className="h-1/6 w-full  grid grid-cols-10 text-[1rem] pr-3">
                        
                        <div className="flex justify-start my-auto text-black opacity-50"><p>10</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>20</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>30</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>40</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>50</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>60</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>70</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>80</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>90</p></div>
                        <div className="flex justify-start my-auto text-black opacity-50"><p>100</p></div>

                    </div>
                    
                    

                 </div>
             </div>

             <div className="h-5">
             </div>

             

             

             


          </div>

          <h1 className="text-black font-semibold mt-5 text-xl">Drafts</h1>
          
          <div className="grid grid-cols-1 gap-2 mt-2">
          {
            draft?.docs?.map((item:any,index:number)=>(

              <Link className={`${item.test.name?'':'hidden'}`} href={`/exam/${item?.test?.id}`} >
              <div key={index} className="flex  gap-2 ">
                <div className={`w-10 h-10 ${item?.test?.exam === "qbank"?'bg-indigo-950':'bg-orange'}  my-auto rounded-md flex justify-center`}>
                    <Image className="m-2" alt="test" src={item?.test?.exam === "qbank" ? '/what.svg': '/draftt.svg'} width={444} height={444}></Image>
                </div>
                
                <div className="my-auto">
                <h1 className="text-black font-semibold">{item.test.name}</h1>
                <p className="text-[1rem] text-black opacity-50">{Math.floor(((Object.keys(item.selectedoptions).length)/item.test.qlength)*100)} % completed</p>
                </div>
              </div>
              </Link>
            ))??''
          }
          </div>
          


        </div>

        <div className="lg:w-5/12 md:w-full w-full mb-24" >

        <h1 className="text-xl text-black pb-5 font-semibold ">My Performance</h1>
        
        <div style={{
          backgroundColor: 'rgba(237, 228, 255, 0.5)'

          
          
        }} className="rounded-md ">

            <div className="flex justify-center">
               <div className="w-3/5 aspect-square rounded-full bg-white mt-10 mb-5 p-10">

                  <div style={{background: gradient,}} className=' flex justify-center w-full h-full  rounded-full '>
                      <div className="w-16 h-16 bg-black  rounded-full my-auto flex justify-center">
                         <p className="my-auto text-white">{perform}%</p>
                      </div>
                  </div> 
               
               </div>
            </div> 

            <p className="pl-5 pr-5 pt-1 text-black font-semibold">Details</p>
            <p className="pl-5 pr-5 pt-2 text-black text-[1rem] ">Total question answered</p>
            <p className="pl-5 pr-5 text-black text-1rem opacity-50">{(udata?.user?.totalCorrectanswer || 0)+ (udata?.user?.totalWronganswer || 0)}</p>
            
            <div className="flex pl-5 pr-5 justify-between mt-3">
              <div className="flex justify-center gap-2">
                   <p className="my-auto text-[1rem]">Qbanks</p>
              </div>

              <div className="flex justify-center gap-2">
                   <p className="my-auto text-[1rem]">Tests</p>
              </div>

            </div>

            <div className="flex pl-5 pr-5 justify-between">
              <div className="flex justify-center gap-2">
                   
                   <p className="my-auto text-[1rem] opacity-50">{(udata?.user?.totalQbank ||0)} Qbanks</p>
              </div>

              <div className="flex justify-center gap-2">
                  
                   <p className="my-auto text-[1rem] opacity-50">{(udata?.user?.totalTest || 0)} Tests</p>
              </div>

            </div>



            <div className="flex pl-5 pr-5 justify-between mt-3">
              <div className="flex justify-center gap-2">
                   <p className="my-auto text-[1rem]">Total Questions</p>
              </div>

              <div className="flex justify-center gap-2">
                   <p className="my-auto text-[1rem]">Correct Answers</p>
              </div>

            </div>

            <div className="flex pl-5 pr-5 justify-between">
              <div className="flex justify-center gap-2">
                   <div className="bg-black w-4 h-4 rounded-full my-auto"></div>
                   <p className="my-auto text-[1rem] opacity-50">{(udata?.user?.totalQuestions ||0)} Qus</p>
              </div>

              <div className="flex justify-center gap-2">
                   <div className="bg-green-400 w-4 h-4 rounded-full my-auto"></div>
                   <p className="my-auto text-[1rem] opacity-50">{(udata?.user?.totalCorrectanswer || 0)} Qus</p>
              </div>

            </div>

            <div className="flex pl-5 pr-5 justify-between mt-3">
              <div className="flex justify-center gap-2">
                   <p className="my-auto text-[1rem]">Wrong Answers</p>
              </div>

              <div className="flex justify-center gap-2">
                   <p className="my-auto text-[1rem]">Not Answered</p>
              </div>

            </div>

            <div className="flex pl-5 pr-5 justify-between pb-10">
              <div className="flex justify-center gap-2">
                   <div className="bg-red-400 w-4 h-4 rounded-full my-auto"></div>
                   <p className="my-auto text-[1rem] opacity-50">{(udata?.user?.totalWronganswer ||0)} Qus</p>
              </div>

              <div className="flex justify-center gap-2">
                   <div className="bg-indigo-500 w-4 h-4 rounded-full my-auto"></div>
                   <p className="my-auto text-[1rem] opacity-50">{(udata?.user?.totalNotAttempted || 0)} Qus</p>
              </div>

            </div>


        </div>
        




        </div>


      </div>
      

    </div>    
  )
}
