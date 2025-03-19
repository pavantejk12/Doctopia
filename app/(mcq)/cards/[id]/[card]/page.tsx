'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from 'react';
import Link from 'next/link';
// gsap.registerPlugin(useGSAP);


interface Question {
  id: string;
  image?: {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    url: string;
  };
  question: string;
  answer: string;
  
}

function page({ params }: { params: { card: string } }) {

  const [showresult,setShowResult] = useState(false)

  const [myArray, setMyArray] = useState<string[]>([]);

  const addItem = (item:string) => {
        if (!myArray.includes(item)) {
            setMyArray([...myArray, item]); // Adding item to the array
        }
  };

  
  const [showans,setshowans] = useState(false)
  
  const [question,setquestion] = useState<Question>()
  
  const [data, setData] = useState<{id: string;
    name: string;
    questions: Question[];
  }>()

  const [count,setCount] = useState(0)

  useEffect(() => {
    fetch(`/api/flashcards/${params.card}`)
              .then((res) => res.json())
              .then((data) => {  
                setData(data)

                setquestion(data.questions[0])
                
              })


  }, []
  
  )

  
  
  //const container = useRef(null);

  const { contextSafe } = useGSAP(); // we can pass in a config object as the 1st parameter to make scoping simple

  const Rotate = contextSafe(() => {
     gsap.from(".progtext", {
      scale:0.5, 
      
      
     });
     gsap.from(".ansb", {
      y:40, 
      opacity:0,
      
      
     });

     gsap.from(".qus", {
      y: -40, 
      opacity:0,
      
      
     });

     

     
  
  });

  const Bounce = contextSafe(() => {
    gsap.from(".bounce", {
     y: 100, 
     duration: 1,
     ease: "bounce"

   })
 });

  


  return (
    <div>
      <div className='mb-5 text-black text-xl'>{data?.name}</div>
      <h1 className='text-black opacity-50 mb-5'>{`Questions ${(data?.questions?.indexOf(question!)??0)+1} of ${data?.questions?.length??0}`}</h1> 
      
      <div className=' w-full h-3 bg-gray-200 rounded-md'>
       <div style={{
        width:`${((data?.questions?.indexOf(question!)??0)+1)/(data?.questions?.length??0)*100}%`
       }} className={`h-full  bg-orange rounded-md`}></div>
      </div>

      <div className='flex justify-between mt-10'>

        <div onClick={()=>{
          Rotate();
          setshowans(false)
          const index = data!.questions.indexOf(question!);
          if (index === 0) {
                 
          } else {
          
            setquestion(data!.questions[index-1])
          }

        }} className='hidden  cursor-pointer w-1/12  h-96 lg:flex justify-start'>
              <div className='w-12 h-12 my-auto'>
                <Image height={444} width={444} alt='back' src={'/backb.svg'}></Image>
              </div>
        </div>
        { data?.questions?
        <div   className={`${showresult?'hidden':'block'} prog lg:w-10/12 w-full bg-white shadow-sm shadow-gray-300 rounded-md h-[450px]  lg:h-96 flex justify-center`}>
             <div className={`${showans?'hidden':''} my-auto` }>
             <h1 className='qus font-semibold my-auto text-black opacity-50   text-center text-xl mb-5'>Question</h1>

              <h1 className='progtext font-semibold my-auto text-black   text-center text-2xl'>{question?.question}</h1>
              <div className='flex justify-center my-5'>
                <div onClick={()=>{
                  Bounce();
                  
                  setshowans(true)

                }} className='ansb cursor-pointer w-fit bg-orange  rounded-md flex justify-center'>
                   <p className='my-auto ml-2 mr-2 mt-1 mb-1 text-white'>Click to see answer</p>
                </div>
              </div>
             </div>

             <div  className={`${showans?'':'hidden'} my-auto` }>
                <div className='bounce'>
                <div className='w-12 h-12 mx-auto'>
                  <Image height={444} width={444} alt='happy' src={'/happy.svg'}></Image>
                </div>

                <h1 className='mt-5 font-semibold my-auto text-black opacity-50  text-center'>Answer</h1>
                <h1 className='font-semibold text-center text-black'>{question?.answer}</h1>

                <h1 className='font-semibold my-auto text-black opacity-50  text-center'>Did you get right</h1>

                <div className='mx-auto flex justify-center'>
                  
                  <div className='flex justify-center gap-3 cursor-pointer'>
                     <div onClick={()=>{
                        addItem(question?.id!)
                        Rotate();
                        setshowans(false)
                        const index = data!.questions.indexOf(question!);  
                        if(index+1 === data!.questions.length){
                          setShowResult(true);

                          
                       
                        }else{
                          setquestion(data!.questions[index+1])
                          //setcurrent(index+1)
                        }
                        
                     }} className='w-10 h-10'>
                      <Image height={444} width={444} alt='Right' src={'/right.svg'}></Image>

                     </div>
                      
                     <div onClick={()=>{
                       
                       setshowans(false)
                       Rotate();
                        setshowans(false)
                        const index = data!.questions.indexOf(question!);  
                        if(index+1 === data!.questions.length){
                          setShowResult(true);

                          
                       
                        }else{
                          setquestion(data!.questions[index+1])
                          //setcurrent(index+1)
                        }

                     }} className='w-10 h-10'>
                      <Image height={444} width={444} alt='Right' src={'/wrong.svg'}></Image>

                     </div>
                  
                  </div>
                  </div>

                </div>


             </div>
        
        </div>:''
        }

        <div className={`${showresult?'':'hidden'} w-full lg:w-10/12 flex justify-center `}>

            <div className='relative w-full h-full my-auto flex justify-center place-items-center'>
              <img width={444} height={444} alt='success' src='/success.gif'></img>
              <div className='my-auto absolute'>
                <p className='text-3xl  text-orange'>Your Score is {myArray.length}</p>
                <Link href={'/'}><p className='text-red-400 font-bold text-xl'>Close</p></Link>
              </div>
            </div>
            

        </div>
        
        <div onClick={()=>{
          Rotate();
          setshowans(false)
          const index = data!.questions.indexOf(question!);  
          if(index+1 === data!.questions.length){
          }else{
            setquestion(data!.questions[index+1])
            //setcurrent(index+1)
          }

        }} className='hidden cursor-pointer w-1/12  h-96 lg:flex justify-end'>
              <div className='w-12 h-12 my-auto'>
                <Image height={444} width={444} alt='back' src={'/nextb.svg'}></Image>
              </div>
        </div>

      </div>
      <div className='flex lg:hidden  w-full justify-between mt-5'>

        <div onClick={()=>{
          Rotate();
          setshowans(false)
          const index = data!.questions.indexOf(question!);
          if (index === 0) {
                 
          } else {
          
            setquestion(data!.questions[index-1])
          }

        }} className='cursor-pointer w-12 h-12 my-auto'>
                <Image height={444} width={444} alt='back' src={'/backb.svg'}></Image>
        </div>

        <div onClick={()=>{
          Rotate();
          setshowans(false)
          const index = data!.questions.indexOf(question!);  
          if(index+1 === data!.questions.length){
          }else{
            setquestion(data!.questions[index+1])
            //setcurrent(index+1)
          }

        }} className='cursor-pointer w-12 h-12 my-auto'>
                <Image height={444} width={444} alt='back' src={'/nextb.svg'}></Image>
        </div>


      </div>

      
    </div>
  )
}

export default page