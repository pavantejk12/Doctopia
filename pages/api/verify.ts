// pages/api/confirm-otp.js
import type { NextApiRequest, NextApiResponse } from 'next'
import getPayloadClient from '@/payload/payloadClient';
import Payloadtoken from '@/payload/Payloadtoken';

import { serialize } from 'cookie';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const payload = await getPayloadClient();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { sessionInfo, phoneNumber,code } = req.body;

  try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${process.env.FIREBASE}`

      const response = await fetch(url,{
         method: "POST",
         headers: {
          "Content-Type": "application/json",
         },
         body: JSON.stringify({
          sessionInfo: sessionInfo,
          phoneNumber: phoneNumber,
          code:code,
         }),
      })

      if(response.ok){
        const data = await response.json()
        const number = data.phoneNumber

        const user = await payload.find(
          {
            collection:"customers",
            where:{
              number:{
                equals: number
              }
            }
          }
        )
        
        if(user.docs.length !== 0){
          
          const obj ={
            id:user.docs[0].id,
            collection: 'customers',
            email:user.docs[0].email
          }

          const token:any = Payloadtoken(obj);

          

          res.setHeader('Set-Cookie', serialize('payload-token', token.token, { path: '/', httpOnly:true }));

          
          res.status(200).json(token)



        }
        else{

          //res.redirect('/register')

          res.json({
            message:"create and account first"
          })

        }

        
        
        



      }else{

        const data = await response.json()
        res.status(200).json(data)

      }
      
      
  } catch (error) {
    
    res.status(401).json({ error: "error" });
  }
}
