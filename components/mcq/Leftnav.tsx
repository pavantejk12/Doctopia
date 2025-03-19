'use client'
import React from 'react'
import Link from "next/link";
import { useState } from "react";
import { RiHome2Line } from "react-icons/ri";
import { RiHome2Fill } from "react-icons/ri";
import { PiSquaresFourLight } from "react-icons/pi";
import { PiSquaresFourFill } from "react-icons/pi";
import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoBook } from "react-icons/io5";
import { PiCardsLight } from "react-icons/pi";
import { PiCardsFill } from "react-icons/pi";
import { VscOutput } from "react-icons/vsc";
import Image from 'next/image';
var today = new Date();

// Getting full month name (e.g. "June")



function Leftnav() {

    var month = today.toLocaleString('default', { month: 'long' });
    var date = today.toLocaleString('default', { day: '2-digit' });
    var day = today.toLocaleString('default', { weekday: 'long' });

    //console.log(month);
    const [home,setHome] = useState(false)
    const [explore,setExplore] = useState(false)
    const [wish,setWish] = useState(false)
    const [cart,setCart] = useState(false)
    const [profile,setProfile] = useState(false)
    const [result,setResult] = useState(false)
    const [bookmarks,setBookmarks] = useState(false)
    const [contact,setContact] = useState(false)

    function handleclick(path:string){
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
  return (
    <div className='lg:fixed'>
        <div className='h-2'></div>
        <Link href={'/'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/home')
            }} >
            
            <div className='flex justify-center h-5 w-5 '>
              {home?<Image alt='home' width={444} height={444} src={'/home.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/home2.svg'}></Image>}
            </div>
            
            <p className={`${home?'text-black':'text-black opacity-50'}`}>Home</p>
            </div>
        </Link>

        <div className='h-2'></div>

        

        <Link href={'/qbank'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/qbank')
            }} >
            
            <div className='flex justify-center h-5 w-5 '>
              {explore?<Image alt='home' width={444} height={444} src={'/qbank.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/qbank2.svg'}></Image>}
            </div>
            
            <p className={`${explore?'text-black':'text-black opacity-50'}`}>Qbank</p>
            </div>
        </Link>

        
        <div className='h-2'></div>

        

        <Link href={'/tests'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/tests')
            }} >
            
            <div className='flex justify-center h-5 w-5 '>
              {wish?<Image alt='home' width={444} height={444} src={'/test.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/test2.svg'}></Image>}
            </div>
            
            <p className={`${wish?'text-black':'text-black opacity-50'}`}>Tests</p>
            </div>
        </Link>



        <div className='h-2'></div>

        <Link href={'/cards'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/cards')
            }} >
            
            <div className='flex justify-center h-5 w-5 '>
              {cart?<Image alt='home' width={444} height={444} src={'/card.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/card2.svg'}></Image>}
            </div>
            
            <p className={`${cart?'text-black':'text-black opacity-50'}`}>Flashcard</p>
            </div>
        </Link>

        <div className='h-2'></div>

        <Link href={'/results'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/results')
            }} >
            
            <div className='flex justify-center h-5 w-5 '>
              {result?<Image alt='home' width={444} height={444} src={'/results.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/results2.svg'}></Image>}
            </div>
            
            <p className={`${result?'text-black':'text-black opacity-50'}`}>Results</p>
            </div>
        </Link>


        <div className='h-2'></div>

        <Link href={'/bookmarks'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/bookmarks')
            }} >
            
            <div className='flex justify-center h-5 w-5 '>
              {bookmarks?<Image alt='home' width={444} height={444} src={'/bookmark1.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/bookmark2.svg'}></Image>}
            </div>
            
            <p className={`${bookmarks?'text-black':'text-black opacity-50'}`}>Bookmarks</p>
            </div>
        </Link>

        <div className='h-2'></div>

        <Link href={'/contact'}>
            <div className='flex  h-5 gap-2' onClick={()=>{
             handleclick('/contact')
            }} >
            
            <div className='flex justify-center h-5 w-5 '>
              {contact?<Image alt='home' width={444} height={444} src={'/contact.svg'}></Image>:<Image alt='home' width={444} height={444} src={'/contact1.svg'}></Image>}
            </div>
            
            <p className={`${contact?'text-black':'text-black opacity-50'}`}>Contact</p>
            </div>
        </Link>


        

        <div className='h-2'></div>

        <Link href={'/profile'}>
        <div className='flex gap-2' onClick={()=>{
            handleclick("/profile")
        }}>
            <div className='flex justify-center text-xl'>
              {profile?<div className='text-black'><RiUser3Fill></RiUser3Fill></div>:<div className='text-black opacity-50'><RiUser3Line></RiUser3Line></div>}
            </div>
            
            <p className={`${profile?'text-black':'text-black opacity-50'}`}>Profile</p>
        </div>
        </Link>

        <div className='flex flex-col h-screen justify-between'>
            <div></div>

            <div className='flex  items-center flex-grow gap-2'>
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
  )
}

export default Leftnav