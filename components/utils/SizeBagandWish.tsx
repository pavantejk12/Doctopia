'use client'
import { useShopcart, useShopwish } from '@/zustand/Cart'
import React from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

import {AiOutlineShopping} from 'react-icons/ai'

import { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

type Product={
    data:any,
    size:any,
}

type Size = {
    title:string,
    price:string|number,
    index:number

}


function SizeBagandWish(data:Product) {

    const [size,setSize] = useState<Size>()

    const [quantity,setQuantity] = useState(1)


    const addwish = useShopwish((state) => state.addItem)
    const addcart = useShopcart((state) => state.addItem)
    const notify = () => toast("Item added to bag 🛍️");
    const wish = () => toast("Item added to Wish list ♥️");
    const nosize =() =>toast.warn("Please select a product size!")

    const wishlist = useShopwish((state) => state.carts)

    function check(id:string):boolean{
      const bool = wishlist.some(item => item.id === id)
      return bool
    }


  return (
    <div>
    

    {/* sizes */}
    <div className="flex flex-wrap gap-2 gap-y-5 mt-3">
    { 
      data?.size?.map((item:any,index:number)=>(
      <div onClick={()=>{

        setSize({
            price:item?.price,
            title:item?.title,
            index:index,
        })

      }} key={index} className={`border-2 ${size?.index===index?'bg-black text-white':'border-slate-950'} rounded-3xl p-2  text-center cursor-pointer`}>
         <h1 className="text-sm">{item?.title??''}</h1>
         <h1 className='text-sm '>{item?.price>0?`Tk. ${item?.price}`:''}</h1>
      </div>

    ))??''
    }
    </div>

    <div className='mt-3 font-semibold flex gap-5'>
        <div><h1>QUANTITY</h1></div>  
        <div className='flex gap-3'>
            <div onClick={()=>{
                if(quantity === 1){

                }
                else{
                    setQuantity(quantity-1)
                }
            }} className='my-auto text-2xl cursor-pointer '><FiMinus ></FiMinus></div>
            <h1 className='my-auto pl-3 pr-3 -pt-1 -pb-1  bg-black bg-opacity-10 text-black'>{quantity}</h1>  
            <div onClick={()=>{

                setQuantity(quantity+1)

            }} className='my-auto text-2xl cursor-pointer '><FiPlus></FiPlus></div>
            
            
        </div>
    </div>
    
    <div className='flex  mt-3 gap-5 pb-10'>
                    

                    <div className='bg-black rounded-md flex text-white cursor-pointer' onClick={()=>{
                        
                        if(size){
                            addcart(
                                {
                                    name:data?.data?.name??'unknown',
                                    brand:data?.data?.brand[0].title??'unknown',
                                    id:data?.data?.id??'unknown',
                                    image:data?.data?.image?.url??'unknown',
                                    price: (size.price as number) > 0 ? size.price:data?.data?.pricesale??99999,
                                    quantity:quantity,
                                    search:data?.data?.search??'unknown',
                                    size:size?.title??'unknown',
                                }
                            )
                            notify()
                            
                        }else{
                            nosize()

                        }
                        
                        
                    }}>
                         <div className='my-auto ml-2 text-xl'><AiOutlineShopping></AiOutlineShopping></div>
                         <h1 className='p-2 my-auto'>ADD TO BAG</h1>
                         
                    </div>
                    

                    <div className='border-2 border-slate-950 rounded-md flex cursor-pointer' onClick={()=>{

                        if(check(data.data.id)){

                        }
                        else{
                            addwish(
                                {
                                    name:data?.data?.name??'unknown',
                                    brand:data?.data?.brand[0]?.title,
                                    id:data?.data?.id??'unknown',
                                    image:data?.data?.image?.url??'unknown',
                                    price:data?.data?.pricesale??99999,
                                    search:data?.data?.search??'unknown',
                                    
    
                                }
                            )
                            wish()
                        }
                        
                        
                    }}>
                         <div className='my-auto ml-2 text-xl'>{check(data?.data?.id??0)?<div className='text-black'><AiFillHeart/></div>:<AiOutlineHeart></AiOutlineHeart>}</div>
                         <h1 className='p-2 text-black'>WISH LIST</h1>
                         
                    </div>
                   


    </div>
    <ToastContainer position="bottom-right" />
    </div>
  )
}

export default SizeBagandWish