import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from "openai";
import qs from 'qs'
import getPayloadClient from '@/payload/payloadClient';

type ParsedUrlParams = {
    genders: string[];
    categories: string[];
    brand: string[];
    color: string[];
};

type ResponseData = {
  data: any
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) 
{
    const payload = await getPayloadClient()
    
    function parseUrlParams(url: string): ParsedUrlParams {
        const params = new URLSearchParams(url);
      
        const genders = params.get('Genders') ? params.get('Genders')!.split(',') : [];
        const categories = params.get('Categorys') ? params.get('Categorys')!.split(',') : [];
        const brand = params.get('Brand') ? params.get('Brand')!.split(',') : [];
        const color = params.get('Color') ? params.get('Color')!.split(',') : [];
      
        return { genders, categories, brand, color };
    }
    
    const message = req.body.message

    const prompt = `where each entry contains a URL parameter (url) and the number of times the user performed that search (number), provide the most probable query string (using the JavaScript querystring library) for the user's gender and category preferences. Only include the parameters for gender, category, and brand, and structure the query string as follows: user history like this based on the user's search history. Do not provide any additional description or text, and ensure that the query string is derived from the user's preferences as per the given data. response without the introductory statement give me only one  best query url from all of the data avoid giving json data . in a catagory two item will be seperated by coma(,) and another catagory will be added by and (&)`


    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
      
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${JSON.stringify(message)} ${prompt}` }],
        model: "gpt-3.5-turbo",
    });

    const parsedParams = parseUrlParams(chatCompletion.choices[0].message.content??''); 
    //console.log(parsedParams)

    var query = {
        "where": {
          "or": [
            {
              "and": [
                {
                    "genders.title": {
                      "in": [...parsedParams.genders]
                    }
                },
                {
                  "categories.title": {
                    "in": [...parsedParams.categories]
                  }
                },
                {
                    "brand.title": {
                      "in": [...parsedParams.brand]
                    }
                },
                {
                    "color.title": {
                      "in": [...parsedParams.color]
                    }
                },
              ]
            }
          ]
        }
    }

    const stringifiedQuery = qs.stringify(query)
    

    const data = await fetch(process.env.SITE_URI+`api/products?${stringifiedQuery}`)
    
    const final = await data.json()
    res.status(200).json({ data:final.docs })
}