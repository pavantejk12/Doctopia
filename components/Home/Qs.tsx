'use client'

import React from 'react'
import qs from 'qs'
import { Button } from '../ui/button'

import { Checkbox } from '../ui/checkbox'

async function Products(){
    

    const res = await fetch(process.env.SITE_URI+`/api/products`)

    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error('Failed to fetch data')
    // }

    return res.json()


}

type SearchParams ={
  f:string
}

async function Qs({searchParams}:{searchParams:SearchParams}) {
  
  console.log(searchParams)

  const data = await Products()

  function demo(){

    var genders:string[] = ["Girls","Boys"]
    var categories:string[]=["Pant"]
    var brand:string[]=[]
    var color:string[] = ["Red"]
    
    
    var query = {
        "where": {
          "or": [
            {
              "and": [
                {
                    "genders.title": {
                      "in": [...genders]
                    }
                },
                {
                  "categories.title": {
                    "in": [...categories]
                  }
                },
                {
                    "brand.title": {
                      "in": [...brand]
                    }
                },
                {
                    "color.title": {
                      "in": [...color]
                    }
                },
              ]
            }
          ]
        }
    }

    const stringifiedQuery = qs.stringify(query)

    console.log(stringifiedQuery)




  } 

  return (
    <div>
      {JSON.stringify(data)}

      <Checkbox></Checkbox>
        
    </div>
  )
}

export default Qs