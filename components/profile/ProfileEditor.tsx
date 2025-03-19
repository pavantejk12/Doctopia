'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ProfileEditor({data}:any) {

    const [disabled,setDisabled] = useState(false)



  const success = (message:string) => toast(`${message} ✅`);
  const error =() =>toast.warn("Error Updating user Profile!")

  const [name,setName] = useState<string>()
  const [address,setAddress] = useState<string>()
  const [phone,setPhone] = useState<string>()
  const [image,setImage] = useState<string>()
  const [email,setEmail] = useState<string>()

  const updateData = async ()=>{
    setDisabled(true)

    if(data.id){
        

        const res = await fetch(`/api/customers/${data.id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
               
            },
            body: JSON.stringify({
                fullName: name,
                number: phone,
                email: email,
                address:address
            })

        })

        const response = await res.json()
        if(res.ok){
            console.log(response)
            success(response.message)
            setDisabled(false)
        }
        else{
            error()
            setDisabled(false)
        }


        

    

    }else{
        error()
        setDisabled(false)
    }


    

  }
  

  useEffect(()=>{

     setName(data.fullName)
     setAddress(data.address)
     setPhone(data.number)
     setImage(data.picture)
     setEmail(data.email)


  },[])

  
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  justify-between md:rounded-md lg:rounded-md bg-yellow p-10' >
         
         <div className='md:col-span-2 lg:col-span-2 col-span-1 flex justify-center mb-5'>
             <div className="avatar">
                  <div className="w-24 rounded-full ring ring-orange ring-offset-base-100 ring-offset-1">
                  <Image alt='profile' width={444} height={444}  src={image??'/user.png'} />
                  </div>
             </div>

         </div>
         
         
         <div className='w-full'>
         <div className="label">
          <span className="label-text text-base text-textsecound">Full Name</span>
         </div>
         <input onChange={(e)=>{
            setName(e.target.value)
         }} type="text" placeholder="Full Name" defaultValue={name}  className="input w-full max-w-xs shadow-inner shadow-slate-300 bg-slate-50 focus:outline-none" />
         </div>

         <div className='w-full'>
         <div className="label">
          <span className="label-text text-base text-textsecound">Email</span>
         </div>
         <input onChange={(e)=>{
            setEmail(e.target.value)
         }} type="text" placeholder="Email" defaultValue={email} className="input w-full max-w-xs shadow-inner shadow-slate-300 bg-slate-50 focus:outline-none" />
         </div>

         <div className='w-full'>
         <div className="label">
          <span className="label-text text-base text-textsecound">Address</span>
         </div>
         <input onChange={(e)=>{
            setAddress(e.target.value)
         }} type="text" placeholder="Address" defaultValue={address} className="input w-full max-w-xs shadow-inner shadow-slate-300 bg-slate-50 focus:outline-none" />
         </div>


         <div className='w-full'>
         <div className="label">
          <span className="label-text text-base text-textsecound">Phone Number</span>
         </div>
         <input onChange={(e)=>{
            setPhone(e.target.value)
         }} type="text" placeholder="Number" defaultValue={phone} className="input w-full max-w-xs shadow-inner shadow-slate-300 bg-slate-50 focus:outline-none" />
         </div>

         <div className='w-full'>

        <button disabled={disabled}  onClick={updateData} className={`hover:scale-105 hover:shadow-lg hover:shadow-zinc-400 shadow-md shadow-zinc-400 cursor-pointer mt-5 uppercase p-2 ${disabled?'bg-white text-black':'bg-orange text-white'} w-min rounded-md text-center `}>Update</button>

    
         </div>

         <ToastContainer position="bottom-right" />


      </div>
  )
}

export default ProfileEditor