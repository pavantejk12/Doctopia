'use client'

import { useEffect } from 'react'
import { useUrl } from '@/zustand/Cart'
import { useSugges } from '@/zustand/Cart'


export default function Ai() {
  
  const urls = useUrl((state) => state.stringNumbers)
  const addlist = useSugges((state) => state.addList)
  

  useEffect(()=>{

   
  
    fetch("/api/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message:urls}),
    }).then((res) => res.json()).then((data:any) => {
      
      addlist(data.data)

    })


  },[urls.length])



  return null
}
