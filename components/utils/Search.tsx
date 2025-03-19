'use client'
import React from 'react'
import {useShopwish} from '@/zustand/Cart'

import {AiOutlineSearch} from 'react-icons/ai'

function Wish() {
    const carts = useShopwish((state) => state.carts)


  return (
    <div className='my-auto flex text-2xl relative'>
      <AiOutlineSearch ></AiOutlineSearch>
    
    </div>
  )
}

export default Wish