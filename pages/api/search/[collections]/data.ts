import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  data: any,
  
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) 
{
  const { collections } = req.query
  const {q} = req.query

  
  
  const headers = {
    'Authorization': `Bearer ${process.env.MEILISEARCH_API_KEY}`,
    'Content-Type': 'application/json' 
  };
  const requestOptions = {
    method: 'GET',
    headers: headers
  };


  const data = await fetch(`${process.env.MEILISEARCH_HOST}/indexes/${collections}/search?q=${q??''}`,requestOptions)
  
  const json = await data.json()

  
  res.status(200).json(
    { 
      data: json ,
      
    
    }
    )
}