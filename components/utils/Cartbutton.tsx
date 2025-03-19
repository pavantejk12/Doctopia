import React from 'react'
import {useShopcart} from '@/zustand/Cart'

function Cartbutton() {
    const carts = useShopcart((state) => state.carts)


  return (
    <div>
        <div className="border-primery	border-2 rounded-md"><h1 className="p-2 text-sm font-bold text-primery">{`Items ${carts.length}`}</h1></div>

    </div>
  )
}

export default Cartbutton