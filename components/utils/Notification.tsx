'use client'
import React from 'react'
import {useShopwish} from '@/zustand/Cart'

import {AiOutlineSearch} from 'react-icons/ai'
import { IoIosNotificationsOutline } from "react-icons/io";


function Notification() {
    const carts = useShopwish((state) => state.carts)


  return (
    <div className='my-auto flex text-2xl relative'>
      <IoIosNotificationsOutline ></IoIosNotificationsOutline>
    
    </div>
  )
}

export default Notification