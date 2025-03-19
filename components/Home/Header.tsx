"use client"
import React, { use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import  Search  from "@/components/utils/Search";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";
import { useSession } from "next-auth/react"
import Notification from "../utils/Notification";
var today = new Date();




interface kv{
    key:string,
    value: string
}

type prop={
    logo?:string,
    menus?:kv[],
    width?:string,

}


export default function Header(prop:prop){

    const [hide,setHide] = useState(true)

    const [hints,setHints] = useState<any>()

    const { data: session, } = useSession()
    const [udata,setudata] = useState<any>()

    const [search,setSearch] = useState("")

    const [home,setHome] = useState(false)
    const [explore,setExplore] = useState(false)
    const [wish,setWish] = useState(false)
    const [cart,setCart] = useState(false)
    const [profile,setProfile] = useState(false)
    const [result,setResult] = useState(false)
    const [bookmarks,setBookmarks] = useState(false)
    const [contact,setContact] = useState(false)
    var month = today.toLocaleString('default', { month: 'long' });
    var date = today.toLocaleString('default', { day: '2-digit' });
    var day = today.toLocaleString('default', { weekday: 'long' });


    function handleclick(path:string){
        setHide(true)
        if(path === '/home'){
            setHome(true)
            setExplore(false)
            setWish(false)
            setCart(false)
            setProfile(false)
            setResult(false)
            setBookmarks(false)
            setContact(false)
        }
        if(path === '/qbank'){
            setHome(false)
            setExplore(true)
            setWish(false)
            setCart(false)
            setProfile(false)
            setResult(false)
            setBookmarks(false)
            setContact(false)
        }
        if(path === '/tests'){
            setHome(false)
            setExplore(false)
            setWish(true)
            setCart(false)
            setProfile(false)
            setResult(false)
            setBookmarks(false)
            setContact(false)
        }
        if(path === '/cards'){
            setHome(false)
            setExplore(false)
            setWish(false)
            setCart(true)
            setProfile(false)
            setResult(false)
            setBookmarks(false)
            setContact(false)
        }
        if(path === '/profile'){
            setHome(false)
            setExplore(false)
            setWish(false)
            setCart(false)
            setProfile(true)
            setBookmarks(false)
            setResult(false)
            setContact(false)
        }
        if(path === '/results'){
            setHome(false)
            setExplore(false)
            setWish(false)
            setCart(false)
            setProfile(false)
            setBookmarks(false)
            setResult(true)
            setContact(false)
        }
        if(path === '/bookmarks'){
          setHome(false)
          setExplore(false)
          setWish(false)
          setCart(false)
          setProfile(false)
          setResult(false)
          setBookmarks(true)
          setContact(false)
        }
        if(path === '/contact'){
          setHome(false)
          setExplore(false)
          setWish(false)
          setCart(false)
          setProfile(false)
          setResult(false)
          setBookmarks(false)
          setContact(true)
        }

        

    }




    useEffect(()=>{

        fetch(`/api/search/tests/data?q=${search}`)
        .then(response => response.json())
        .then((data:any) => {
           setHints(data)
        })

        
    },[search])

   
    

    useEffect(()=>{
      
      if(!session?.user){
        window.location.href = '/login';

      }
      if(session?.user){

      
      fetch("/api/customers/me")
      .then(response => response.json())
      .then((data:any) => {
         setudata(data)
         if(!data?.user?.course){
            window.location.href = '/courses';
         }
      })
     }

      //console.log("use effect")




    },[])

    

    

    
    return(

    <div   className="bg-white h-16 flex justify-center fixed w-full z-10 " >

         <div className={`${hide?"hidden":""} top-16 left-0 absolute w-[60vw] h-screen z-30 bg-white lg:hidden md:hidden `}>

        <div className="ml-9">
        <div className='h-4'></div>
        <Link href={'/'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/home')
            }} >
            
            <div className='flex justify-center h-7 w-7 '>
              {home?<Image alt='home' width={444} height={444} src={'/home.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/home2.svg'}></Image>}
            </div>
            
            <p className={`${home?'text-black':'text-black opacity-50'} text-[1.3rem]`}>Home</p>
            </div>
        </Link>

        <div className='h-4'></div>

        

        <Link href={'/qbank'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/qbank')
            }} >
            
            <div className='flex justify-center h-7 w-7 '>
              {explore?<Image alt='home' width={444} height={444} src={'/qbank.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/qbank2.svg'}></Image>}
            </div>
            
            <p className={`${explore?'text-black':'text-black opacity-50'} text-[1.3rem]`}>Qbank</p>
            </div>
        </Link>

        
        <div className='h-4'></div>

        

        <Link href={'/tests'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/tests')
            }} >
            
            <div className='flex justify-center h-7 w-7 '>
              {wish?<Image alt='home' width={444} height={444} src={'/test.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/test2.svg'}></Image>}
            </div>
            
            <p className={`${wish?'text-black':'text-black opacity-50'} text-[1.3rem]`}>Tests</p>
            </div>
        </Link>



        <div className='h-4'></div>

        <Link href={'/cards'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/cards')
            }} >
            
            <div className='flex justify-center h-7 w-7 '>
              {cart?<Image alt='home' width={444} height={444} src={'/card.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/card2.svg'}></Image>}
            </div>
            
            <p className={`${cart?'text-black':'text-black opacity-50'} text-[1.3rem]`}>Flashcard</p>
            </div>
        </Link>

        <div className='h-4'></div>

        <Link href={'/results'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/results')
            }} >
            
            <div className='flex justify-center h-7 w-7 '>
              {result?<Image alt='home' width={444} height={444} src={'/results.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/results2.svg'}></Image>}
            </div>
            
            <p className={`${result?'text-black':'text-black opacity-50'} text-[1.3rem]`}>Results</p>
            </div>
        </Link>


        <div className='h-4'></div>

        <Link href={'/bookmarks'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/bookmarks')
            }} >
            
            <div className='flex justify-center h-7 w-7 '>
              {bookmarks?<Image alt='home' width={444} height={444} src={'/bookmark1.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/bookmark2.svg'}></Image>}
            </div>
            
            <p className={`${bookmarks?'text-black':'text-black opacity-50'} text-[1.3rem]`}>Bookmarks</p>
            </div>
        </Link>

        <div className='h-4'></div>

        <Link href={'/contact'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/contact')
            }} >
            
            <div className='flex justify-center h-7 w-7 '>
              {contact?<Image alt='home' width={444} height={444} src={'/contact.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/contact1.svg'}></Image>}
            </div>
            
            <p className={`${contact?'text-black':'text-black opacity-50'} text-[1.3rem]`}>Contact</p>
            </div>
        </Link>


        

        
        
      

        

        <div className='flex flex-col h-screen justify-between '>
            <div></div>

            <div className='flex  items-center flex-grow gap-2 mt-52 mb-20'>
               <div className='flex justify-center place-items-center rounded-full w-10 h-10 border-[1px] border-gray-500'>
                    <p className='text-orange font-bold text-xl my-auto'>{date}</p>
               </div>
               <div className='pt-2 pb-2'>
                   <p className='text-black font-bold text-[0.85rem]'>{day}</p>
                   <p className='-mt-2 text-black font-bold'>{month}</p>
               </div>
            </div>

        </div>


        

        
        </div>

         
         
         </div>

         <div onClick={()=>setHide(!hide)} className={`${hide?"hidden":""} top-16 left-0 absolute w-[100vw] h-screen z-20 bg-transparent lg:hidden md:hidden `}>

         </div>
         
         <div className="flex w-10/12">
            
            
            <div className="lg:w-3/12 md:w-3/12 w-6/12 flex gap-2 justify-start place-items-center">
              
              <div onClick={()=>setHide(!hide)} className="cursor-pointer lg:hidden md:hidden h-10 w-10  rounded-full my-auto flex justify-center place-items-center">

                <Image className="my-auto" height={444} width={444} alt="Menu" src={'/menu.svg'}></Image>
 
              </div>
              
              <div className="lg:w-32 md:w-32 w-40 h-full  flex  ">
                
                <Link className="my-auto " href={'/'}>
                  <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={444}
                  height={444}
                  className="rounded-md my-auto "  />
                </Link>

              </div>

            </div>

            <div className="w-9/12">

               
               
            <div className=" h-full flex justify-between ">

                <div>
                <div className="hidden  w-52 h-full md:flex  lg:flex  justify-center">
                
                      <div className="relative bg-whitefir h-9 my-auto w-full rounded-3xl flex">

                              <div className='my-auto flex w-full pl-3 pr-3 gap-3'>
                                 
                                 <div className='bg-whitefir h-7 w-7 my-auto'>
                                   <Image className='mt-[2px] p-[2px]' alt='Search' src={'/search.svg'} width={444} height={444}></Image>
                                 </div>

                                 <input onClick={()=>{
                                  setHide(false)
                                 }} onChange={(e)=>{

                                     setHide(false)

                                    setSearch(e.target.value);
                                     
                                 
                                 }} className={`bg-whitefir outline-none  my-auto border-none  w-full h-full `} type="search" name="search" placeholder="Tests or Qbanks"  ></input>
                              
                              </div>

                            <div className={`${hide ? 'hidden':'block'} absolute left-0 top-10 w-full h-52 bg-whitefir z-10 rounded-md`}>
                                <div className="flex justify-between mr-3 mt-3">
                                  <div></div>
                                  
                                  <div onClick={()=>{
                                    setHide(true)
                                  }} className="cursor-pointer  w-5 h-5 bg-red-400 flex justify-center rounded-full place-items-center">
                                    <div className=" text-white text-[1rem] ">x</div>

                                  </div>

                                </div>

                                 <div className="pl-3 pr-3 overflow-y-auto h-40">
                                 {
                                  hints?.data?.hits?.map((data:any,index:number)=>{

                                    return(
                                    <Link onClick={()=>{

                                      setHide(true)

                                    }} href={`/exam/${data?.id??''}`}>
                                    <div className="flex gap-1 cursor-pointer">
                                       <div className={`${data.exam === 'qbank'? 'bg-bluesec':'bg-orange'} w-5 h-5  rounded-md flex justify-center place-items-center`}>
                                         <Image className="p-1" alt="test or qbank" height={444} width={444} src={`${data.exam === 'qbank'?'/what.svg':'/draftt.svg'}`}></Image>
                                       </div>
                                       <h1 className=" line-clamp-1">{data.name}</h1>
                                    </div>
                                    </Link>
                                    
                                    )
                                  })??''
                                 }
                                 </div>

                            </div>


                      </div>

                </div>
                </div>

            

            

                <div className="my-auto flex justify-center gap-2">
                
              
                {/* <Link className="my-auto" href={'/wish'}><Search></Search></Link>
                <Link className="my-auto" href={'/wish'}><Notification></Notification></Link>
                 */}
                {/* <Link className="my-auto" href={'/wish'}><Wish></Wish></Link>
                <Link className="my-auto" href={'/cart'}><Shop></Shop></Link> */}

                <Link href={'/courses'}>
                <div className="hidden lg:block md:block my-auto  text-black">
                     <p className="text-[0.80rem] font-semibold">{udata?.user?.fullName??'BrainyDoc'}</p>
                     <p className="text-[0.70rem]  opacity-50">{udata?.user?.course?.name??'Course'}</p>
                </div>
                </Link>

                <Link href={'/courses'}>
                <div className={`cursor-pointer lg:block md:block my-auto avatar  rounded-full ${session?.user?.image?'bg-black p-[1px]':' bg-black p-[1px]'}`}>
                   <div className={`${session?.user?.image?'w-7':'w-7'} rounded-full `}>
                     {/* <img src={session?.user?.image?session.user.image:'/user.png'} /> */}
                     <Image className="rounded-full" fill src={session?.user?.image?session.user.image:'/user.png'} alt="image"></Image>

                  </div>
                </div> 
                </Link>

                <div className="hidden lg:block md:block h-7 bg-black w-[1px] my-auto opacity-50">
                </div> 

                <div onClick={async()=>{
                    const req = await fetch('/api/customers/logout') 
                    if(req.ok){
                      window.location.href = '/login';
                    }
                 }} className={`hidden cursor-pointer lg:block md:block my-auto avatar  rounded-full`}>
                   <div className={`w-8 rounded-full `}>
                     {/* <img src={session?.user?.image?session.user.image:'/user.png'} /> */}
                     <Image className="rounded-full" fill src={'/logout.svg'} alt="user"></Image>

                  </div>
                </div> 
                

                {/* <ModeToggle></ModeToggle> */}
            </div>

          </div>
               
            </div>

         </div>
         
          
          

          


      
    </div>
        
        
    )
}