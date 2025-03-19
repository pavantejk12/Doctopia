'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useUrl } from '@/zustand/Cart'



export default function UrlTracker() {
  
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const addurl = useUrl((state) => state.addString)
  
  useEffect(() => {
    const nurl = `${pathname}?${searchParams}`
  
    addurl(nurl)
    
  }, [pathname, searchParams])

  return null
}
