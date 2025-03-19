

import React from 'react'


type Prop={
    category:any,
    handleCategoryChange:React.ChangeEventHandler<HTMLInputElement>,
    selectedCategory:any,
    name:string
}

function Catagory(prop:Prop) {
   
  return (
    <div className='p-5'>
      <h2 className='font-semibold uppercase text-base' >{prop.name}</h2>
      <div className='flex flex-col mt-2'>
      {
                  
           prop.category?.docs?.map((items:any,index:number)=>(

            <div className='flex' key={index}>
            <input className='checkbox  checkbox-xs my-auto' type="checkbox" value={items.title} onChange={prop.handleCategoryChange} checked={prop.selectedCategory.includes(items.title)} />
            <label className='ml-2 my-auto' >
            {items.title}
            </label> 
            </div>                  
                     
           ))??""
         
         
     }
     </div>
     </div>
  )
}

export default Catagory