'use client'
import React from 'react'
import {useShopwish} from '@/zustand/Cart'

import {AiOutlineHeart} from 'react-icons/ai'

function Wish() {
    const carts = useShopwish((state) => state.carts)


  return (
    <div className='my-auto flex text-2xl relative'><AiOutlineHeart ></AiOutlineHeart>
    <h1  className='absolute text-sm -top-3 -right-1'>{carts.length}</h1>
    
    </div>
  )
}

export default Wish