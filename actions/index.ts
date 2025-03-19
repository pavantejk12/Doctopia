'use server'
 //import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import {cookies} from 'next/headers'


import getPayloadClient from '@/payload/payloadClient'
import { revalidatePath } from 'next/cache'


export async function formAction(formData:FormData) {
    
    //for gatting the cookies
    
    const token = cookies().get("payload-token")
    //console.log(token?.value??'')
   

    //for gatting the form data
    
    const text = formData.get('text')
    console.log(text)
 
  
}

export async function login(formData:FormData){

   
    const payload = await getPayloadClient();
    const email = formData.get('email') as string
    const passwd = formData.get('passwd') as string


    
    try{
        const data = await payload.login({
        
            collection: 'customers', // required
            data: {
                email: email,
                password: passwd,
            },
          }
        )
        cookies().set({
            name: 'payload-token',
            value: data.token as string,
            httpOnly: true,
            path: '/',
        })
        revalidatePath('/login');

        return data
        

        
        
    }
    catch(e){
        return {
            user:null
        }

    }

    

    
        

        
    
        

    
    

    

    
    
    




}