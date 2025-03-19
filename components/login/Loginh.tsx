'use client'
import { useEffect } from 'react'
import { useState } from 'react';
import React from 'react'
import {Card} from '@/components/ui/card'
import { login } from '@/actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import {redirect} from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
function Loginh() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/doctor1.png',
    '/doctor2.png',
    '/doctor3.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);



  const [error, seterror] = useState(false);
  const [email,setemail]= useState<string>()
  const [password,setpassword]= useState<string>()
  const [disabled,setdisabled] = useState(false)

  async function handleclick(){
    //console.log(email),
    //console.log(password)
    const req = await fetch('/api/customers/login',{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body:JSON.stringify({
        email: email,
        password: password
      }),

    })

    const data = await req.json()
    
    if(data.user){
      setdisabled(false)
      window.location.href = '/'

    }
    if(!data?.user){
      setdisabled(false)
      seterror(true)
    }
    


    
    
  }
          
  // async function onCreate(formData: FormData) {
  //           console.log(JSON.stringify(formData))
  //           const res = await login(formData);
  //           if(res.user === null){
  //             seterror(true)
  //           }else{
              
  //             redirect('/')
  //           }
           
  // }
 


  return (
    
    
    <div className='login bg-white  flex flex-col h-screen'>
        <div className='flex justify-center'>
           <div className='header w-10/12 lg:w-9/12 h-20  flex justify-between'>
               
                <div className="flex justify-center my-auto">
                   <div className="w-40 h-20 flex justify-center">
                    <Link className="my-auto" href={'/'}>
                    <Image className="my-auto" alt="Doctopia" src={`/logo.svg`} width={444} height={4444}></Image>
                    </Link>
                   </div>
                </div>

               <div className='sharebtn h-full flex justify-center '>

                   <div className='my-auto h-10  gap-2 lg:gap-5 w-full flex justify-between'>
                       
                       <Link href={'https://www.instagram.com/doctopia.in/'}>
                       <div className='w-10 h-10'>
                       <Image className="my-auto" alt="instagram" src={`/instagram.svg`} width={444} height={4444}></Image>
                       </div>
                       </Link>

                       <Link href={'https://t.me/doctopia'}>

                       <div className='w-10 h-10'>
                       <Image className="my-auto" alt="share" src={`/share.svg`} width={444} height={4444}></Image>
                       </div>
                       </Link>


                       <Link href={'https://www.youtube.com/channel/UCGxVe0y5KNfkIx_nbpF_GGQ'}>
                       <div className='w-10 h-10'>
                       <Image className="my-auto" alt="share" src={`/ytn.svg`} width={444} height={4444}></Image>
                       </div>
                       </Link>
                   </div>

               </div>
           </div>
          
        </div>

        
        <div className='content flex justify-center flex-grow '>

          <div className='lg:w-9/12 w-10/12 h-full   flex flex-col gap-5 lg:gap-0 lg:flex-row '>

               <div className=' w-full h-full flex flex-col justify-center'>
                   
                   <div className='lg:h-3/4 h-full  flex flex-col'>

                        <div className='h-2/3  flex justify-start w-full pb-3'>

                           <Image className="h-full" alt="doctor" src={`${images[currentIndex]}`} width={444} height={4444}></Image>


                        </div>

                        <div className='h-1/3  w-full flex justify-start'>
                          <div className='lg:w-5/6 w-full lg:ml-5'>
                          { currentIndex === 0 &&
                          <h1 className='lg:text-3xl text-2xl '> <span className='text-orange'>Doctopia</span> Your one-stop shop for NEETPG, FMGE, INICET success. Covers over 1500 Must know topics.</h1>
                          }

                          { currentIndex === 1 &&
                          <h1 className='lg:text-3xl text-2xl '> Master <span className='text-orange'>medical</span> knowledge with our comprehensive Qbank, practice tests, and flashcards.</h1>
                          }

                          { currentIndex === 2 &&
                          <h1 className='lg:text-3xl text-2xl '>Empower your journey to medical <span className='text-orange'>excellence</span>. Sign up today!</h1>
                          }
                          
                          {/* <p className='lg:mt-5 mt-2 text-slate-500'>Unleash Your Potential, Excel in Your Exams, and Achieve Medical Excellence!</p> */}
                          
                          <div className='flex gap-2 mt-5 mr-24'>
                            <div className='bg-orange rounded-md h-1 w-2/4'></div>
                            <div className={`${currentIndex>0?'!bg-orange':''} bg-slate-400 rounded-md h-1 w-1/4`}></div>
                            <div className={`${currentIndex===2?'!bg-orange':''} bg-slate-400 rounded-md h-1 w-1/4`}></div>
                          </div>
                          
                          </div>
                        </div>

                   </div>
                     
               </div>
               
               
               <div className=' w-full  flex flex-col justify-center '>

                   <div className='lg:h-3/4   flex justify-end '  >
                       
                     
                       <div className='flex flex-col justify-around gap-5 mt-10 mb-10 lg:w-3/5 w-full bg-white rounded-3xl border-[1px] border-gray-400 pl-5 pr-5 '>
                              
                           <div className={`${error?'bg-red-200':'bg-yellow'} h-14  rounded-md   flex justify-center w-full mt-10`}>
                              <div className='my-auto flex w-full pl-3 pr-3 gap-3'>
                                 <div className='h-7 w-7 my-auto'>
                                   <Image className='mt-[2px]' alt='email' src={'/email.svg'} width={444} height={444}></Image>
                                 </div>

                                 <input onChange={(e)=>{
                                     seterror(false)
                                     setemail(e.target.value)
                                 }} className={`${error?'bg-red-200':'bg-yellow'} outline-none  my-auto border-none  w-full h-12 `} type="email" name="email" placeholder="Email"  ></input>
                              
                              </div>
                           </div>

                           <div className={`${error?'bg-red-200':'bg-yellow'} h-14  rounded-md   flex justify-center w-full `}>
                              <div className='my-auto flex w-full pl-3 pr-3 gap-3'>
                                 <div className='h-7 w-7 my-auto'>
                                   <Image className='mt-[1px]' alt='email' src={'/passwd.svg'} width={444} height={444}></Image>
                                 </div>

                                 <input onChange={(e)=>{
                                  
                                  seterror(false)
                                  setpassword(e.target.value)
                                  }} className={`${error?'bg-red-200':'bg-yellow'} outline-none my-auto border-none   w-full h-12`} type="password" name="passwd" placeholder="Password"></input>
                              
                              </div>
                           </div>


                           <div onClick={()=>{
                            setdisabled(true)
                            handleclick()
                            }
                            } className={`cursor-pointer h-14 ${disabled?'bg-red-400':'bg-orange'}   rounded-md flex justify-center `}  >
                               <h1 className='my-auto text-white'>Sign In</h1>
                           </div>

                           <div onClick={(e) =>{
                                 e.preventDefault()
                                 signIn('google')
                               } } className='cursor-pointer flex justify-center h-14 bg-white  border-[1px] border-gray-300 rounded-md'>
                               <div className='flex my-auto gap-2'>

                                       <div className='h-5 w-5 my-auto'>
                                          <Image className="h-full" alt="google" src={`/google.png`} width={444} height={4444}></Image>

                                       </div>

                                       <div className='my-auto'>
                                          <p>Google</p>
                                       </div>

                               </div>
                           </div>
                           
                           
                           <div className='flex justify-center mb-5'>
                                <p className='text-sm text-gray-500'>Do not have an account? <Link href={'/register'}><span className='text-black'>Register</span></Link></p>
                            </div>
                           
                       </div>

                   </div>
                   
              
               </div>

          </div>

        </div>
        
    </div>
  )
}

export default Loginh