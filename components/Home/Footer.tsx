'use client'
import Link from "next/link";
import { useState } from "react";
import React from 'react'
import { RiHome2Line } from "react-icons/ri";
import { RiHome2Fill } from "react-icons/ri";
import { PiSquaresFourLight } from "react-icons/pi";
import { PiSquaresFourFill } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoBook } from "react-icons/io5";
import { PiCardsLight } from "react-icons/pi";
import { PiCardsFill } from "react-icons/pi";
import Image from "next/image";


function Footer() {

    const [home,setHome] = useState(false)
    const [explore,setExplore] = useState(false)
    const [wish,setWish] = useState(false)
    const [cart,setCart] = useState(false)
    const [profile,setProfile] = useState(false)

    function handleclick(path:string){
        if(path === '/home'){
            setHome(true)
            setExplore(false)
            setWish(false)
            setCart(false)
            setProfile(false)
        }
        if(path === '/qbank'){
            setHome(false)
            setExplore(true)
            setWish(false)
            setCart(false)
            setProfile(false)
        }
        if(path === '/tests'){
            setHome(false)
            setExplore(false)
            setWish(true)
            setCart(false)
            setProfile(false)
        }
        if(path === '/cards'){
            setHome(false)
            setExplore(false)
            setWish(false)
            setCart(true)
            setProfile(false)
        }
        if(path === '/profile'){
            setHome(false)
            setExplore(false)
            setWish(false)
            setCart(false)
            setProfile(true)
        }
        

    }


  return (
    <div className='fixed bg-white  z-10 left-0 bottom-0 h-[55px] w-full  lg:hidden md:hidden'>
      <div className='flex justify-center '>
      <div className='w-5/6 flex justify-between text-sm mt-2 mb-2'>
        
        <Link href={'/'}>
        <div className='flex flex-col ' onClick={()=>{
             handleclick('/home')
        }} >
            <div className='flex justify-center text-2xl w-6 h-6 mx-auto'>
              {home?<Image alt="home" width={444} height={444} src={'/home.svg'}></Image>:<Image alt="home" width={444} height={444} src={'/home2.svg'}></Image>}
            </div>
            
            <p className={`text-black ${home?'':'opacity-50'}`} >Home</p>
        </div>
        </Link>

        {/* <Link href={'/qbank'}>
        <div className='flex flex-col' onClick={()=>{
            handleclick('/qbank')
        }}>
            <div className='flex justify-center text-2xl w-6 h-6 mx-auto'>
              {explore?<Image alt="home" width={444} height={444} src={'/home.svg'}></Image>:<Image alt="home" width={444} height={444} src={'/home2.svg'}></Image>}
            </div>
            
            <p>Qbank</p>
        </div>
        </Link> */}

        <Link href={'/qbank'}>
        <div className='flex flex-col ' onClick={()=>{
             handleclick('/qbank')
        }} >
            <div className='flex justify-center text-2xl w-6 h-6 mx-auto'>
              {explore?<Image alt="home" width={444} height={444} src={'/qbank.svg'}></Image>:<Image alt="home" width={444} height={444} src={'/qbank2.svg'}></Image>}
            </div>
            
            <p className={`text-black ${explore?'':'opacity-50'}`} >Qbank</p>
        </div>
        </Link>

        {/* <Link href={'/tests'}>
        <div className='flex flex-col' onClick={()=>{
            handleclick('/tests')
        }}>
            <div className='flex justify-center text-2xl'>
              {wish?<IoBook></IoBook>:<IoBookOutline></IoBookOutline>}
            </div>
            
            <p>Tests</p>
        </div>
        </Link> */}

        <Link href={'/tests'}>
        <div className='flex flex-col ' onClick={()=>{
             handleclick('/tests')
        }} >
            <div className='flex justify-center text-2xl w-6 h-6 mx-auto'>
              {wish?<Image alt="home" width={444} height={444} src={'/test.svg'}></Image>:<Image alt="home" width={444} height={444} src={'/test2.svg'}></Image>}
            </div>
            
            <p className={`text-black ${wish?'':'opacity-50'}`} >Tests</p>
        </div>
        </Link>

        {/* <Link href={'/cards'}>
        <div className='flex flex-col ' onClick={()=>{
            handleclick('/card')
        }}>
            <div className='flex justify-center text-2xl'>
              {cart?<PiCardsFill></PiCardsFill>:<PiCardsLight></PiCardsLight>}
            </div>
            
            <p>Cards</p>
        </div>
        </Link> */}

        <Link href={'/cards'}>
        <div className='flex flex-col ' onClick={()=>{
             handleclick('/cards')
        }} >
            <div className='flex justify-center text-2xl w-6 h-6 mx-auto'>
              {cart?<Image alt="home" width={444} height={444} src={'/card.svg'}></Image>:<Image alt="home" width={444} height={444} src={'/card2.svg'}></Image>}
            </div>
            
            <p className={`text-black ${cart?'':'opacity-50'}`} >Cards</p>
        </div>
        </Link>
        
        <Link href={'/profile'}>
        <div className='flex flex-col' onClick={()=>{
            handleclick("/profile")
        }}>
            <div className='flex justify-center text-2xl'>
              {profile?<div className="text-black" >< RiUser3Fill></RiUser3Fill></div>:<div className="text-black opacity-50"><RiUser3Line></RiUser3Line></div>}
            </div>
            
            <p className={`text-black ${profile?'':'opacity-50'}`}>Profile</p>
        </div>
        </Link>

      </div>
      </div>


     
     </div>
  )
}

export default Footer