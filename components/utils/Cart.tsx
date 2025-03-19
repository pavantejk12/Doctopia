"use client"

import React from 'react'
//import {useShopcart} from '@/zustand/Cart'
import { useShopcart, useShopwish } from '@/zustand/Cart'

import {FaCartPlus } from 'react-icons/fa'

import Image from 'next/image'
import { RxCross1 } from 'react-icons/rx'

import Link from 'next/link'
import {redirect} from 'next/navigation'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react'
import { TbMoodEmpty } from 'react-icons/tb'








function Cart() {
  const Items = useShopcart((state) => state.carts)
  const remove = useShopcart((state) => state.remove)

  const [loading,setLoading]= useState(false)

  const success = () => toast("Order successfully placed ✅");
  const error =() =>toast.warn("Please login to order!")

  

  function calculate():number{
    console.log("running")
    var price:number = 0
    Items.forEach((item,index)=>{
      price = price+ (item.price as number * item.quantity)
    })
    return price
  }

  return (
    <div className='flex justify-center'>
    <div className='lg:w-5/6 md:w-5/6 w-11/12'>

    <div className='flex flex-col lg:flex-row md:flex-row gap-5'>
       <div className='w-full flex flex-col gap-[4px]  '>
       {    
          Items?.length>0 ? Items?.map((items:any,index:number)=>(

            <Link href={'/products/'+items?.search??'/'}>

             <div key={index} className='bg-white bg-opacity-10 backdrop-blur-sm   shadow-md flex h-32 justify-between'>
                
                <div className="avatar">
                    <div className="w-24">

                    <Image src={items.image} alt="Product" fill
                        className=" object-cover "/>
                      
                    </div>
                </div>


                <div className='m-2 w-3/4'>
                <h1 className='pt-1 text-textprime font-semibold'>{items?.brand}</h1>
                <h1 className='pt-1 text-sm text-textpost  line-clamp-1'>{items.name}</h1>
                <h1 className='pt-1 text-sm text-textpost  line-clamp-1'>Size: {items.size}</h1>

                
                
                <div className='flex justify-between'>
                    <h1 className='pt-1 '>{"৳ "+items.price+" X "+items.quantity}</h1>
                    <div className='my-auto text-2xl cursor-pointer' onClick={(e)=>{
                      e.preventDefault();
                      
                      remove(index)
                       

                    }} ><RxCross1></RxCross1></div>
                    


                </div>
                </div>

             </div> 
             </Link>                            
          ))??"":
          <div className='flex col-span-full justify-center  '>
          <div className='flex justify-center gap-2 text-xl '>
            <div className='my-auto'><TbMoodEmpty></TbMoodEmpty></div>
            <h1>Cart is empty !</h1>
          </div>
          </div>   
      }
      </div>
      
      
      <div className='w-3/6  h-full'>
        {
        Items.length>0?
        <div>
          <h1 className='text-xl'>{Items.length} items</h1>
          <h1 className='text-xl'>Sub total Tk. {calculate()}</h1>
          
          <div onClick={async ()=>{

            setLoading(true)
            
            
            const products = Items.map((item,index)=>{

                 return {size:item.size,name:item.id,quantity:item.quantity}
            })

            const body = {
                products:products

            }

            const req = await fetch('/api/order',{
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body:JSON.stringify(body),


            })

            if(req.status ===201){
              //console.log("success")
              
              setLoading(false)
              success()
              window.location.href = '/orders';
            
              
              

            }else{
              error()
              setLoading(false)
              window.location.href = '/login';


            }

            

          }} className='cursor-pointer  p-2 bg-black text-white w-fit mt-1 flex rounded-md shadow-stone-500 shadow-sm'>
            {loading?<span className="loading loading-spinner loading-xs"></span>:<div className='my-auto'><FaCartPlus></FaCartPlus></div>}
            <h1 className='ml-1'>Check Out</h1>
          </div>
         
        </div>:""
        }

        


      </div>


    </div>
    
    

      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default Cart