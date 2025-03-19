'use client'
import React from 'react'
import {useShopcart, useShopwish} from '@/zustand/Cart'

import {AiOutlineShopping} from 'react-icons/ai'

function Wish() {
    const carts = useShopcart((state) => state.carts)


  return (
    <div className='my-auto flex text-2xl relative'><AiOutlineShopping ></AiOutlineShopping>
    <h1  className='absolute text-sm -top-3 -right-1'>{carts.length}</h1>
    
    </div>
  )
}

export default Wish