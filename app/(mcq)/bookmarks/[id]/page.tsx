import getPayloadClient from '@/payload/payloadClient'
import Image from 'next/image'

import escapeHTML from 'escape-html';
import { Text } from 'slate';
import  { Fragment } from 'react';

async function getData(id:string){
  const payload = await getPayloadClient()
  const data = payload.findByID({
    collection:'bookmarks',
    id:id
  })

  return data
  
  
}


interface Search  {
  params:{
    id:string
  },
  searchParams: {
    q:string
  }

}

async function page(Search:Search) {

  const data:any = await getData(Search.params.id)

  

  return (
    <div>
      
      <h1 className='text-xl'>{data.test.questions.find((q:any) => q.id === data?.qid)?.question || "Question not found for the given ID."}</h1>
      <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3 mt-3'>
       {(data.test.questions.find((q:any) => q.id === data?.qid)?.options || []).map((q:any,index:number) => {
           
           
          return (<div className={`${q.isoption === 'True'?'bg-green-300 !text-white':' border-[1px] border-gray-200 text-black '} p-3 rounded-md`} key={index}>{q.option}</div>)
       
       })}
      </div>

      <div className={` text-textprime  bg-yellow p-3 rounded-md mt-5`} >
            
            {serialize((data.test.questions.find((q:any) => q.id === data?.qid)?.explaination || [])??[])}
   
      </div>
      

    </div>
  )
}

export default page


const serialize = (children:any) => children.map((node:any, i:number) => {
  if (Text.isText(node)) {
    let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

    if (node.bold) {
      text = (
        <strong key={i}>
          {text}
        </strong>
      );
    }

    
    if (node.text === "") {
     text = (
       <div className='h-3'>

       </div>
     );
    }



    if (node.code) {
      text = (
        
        <div className='text-white bg-teal-900 p-5' key={i}>
          {text}
        </div>
        
      );
    }

    

    if (node.italic) {
      text = (
        <em className='italic' key={i}>
          {text}
        </em>
      );
    }

    if (node.underline) {
     text = (
       <em className='underline' key={i}>
         {text}
       </em>
     );
   }

    // Handle other leaf types here...

    return (
      <Fragment key={i}>
        {text}
      </Fragment>
    );
  }

  if (!node) {
    return null;
  }

  switch (node.type) {

    case 'indent':
          return (
            <div className='ml-[3vw] mr-[3vw]' key={i}>
              {serialize(node.children)}
            </div>
    );

    case 'bold':
          return (
            <strong className='font-bold' key={i}>
              {serialize(node.children)}
            </strong>
    );


    case 'h1':
      return (
        <h1 className='text-6xl font-bold' key={i}>
          {serialize(node.children)}
        </h1>
      );
    // Iterate through all headings here...
    case 'h2':
      return (
        <h2 className='text-5xl font-semibold ' key={i}>
          {serialize(node.children)}
        </h2>
      );
    case 'h3':
        return (
          <h3 className='text-4xl font-semibold' key={i}>
            {serialize(node.children)}
          </h3>
    );
    case 'h4':
        return (
          <h4 className='text-3xl font-semibold' key={i}>
            {serialize(node.children)}
          </h4>
    );
    case 'h5':
      return (
        <h5 className=' text-2xl font-semibold' key={i}>
          {serialize(node.children)}
        </h5>
    );
    case 'h6':
      return (
        <h6 className='text-sm' key={i}>
          {serialize(node.children)}
        </h6>
    );
    case 'quote':
      return (
        <blockquote key={i}>
          {serialize(node.children)}
        </blockquote>
      );
    case 'ul':
      return (
        <ul key={i}>
          {serialize(node.children)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i}>
          {serialize(node.children)}
        </ol>
      );
    case 'li':
      return (
        <li key={i}>
          {serialize(node.children)}
        </li>
      );
    case 'link':
      return (
        <a className='text-blue-600'
          href={escapeHTML(node.url)}
          key={i}
        >
          {serialize(node.children)}
        </a>
      );
    case 'upload':
      return(
        
          <Image alt='Image'width={555} height={555} className=' w-full ' src={node.value.url} key={i}>
          </Image>
        
        
      );
    

    default:
      return (
        <p className='text-justify text-xl text-textpost' key={i}>
          {serialize(node.children)}
        </p>
      );
  }
});









