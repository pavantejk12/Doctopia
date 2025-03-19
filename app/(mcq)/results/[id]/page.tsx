
import Image from 'next/image';
import getPayloadClient from '@/payload/payloadClient'
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import  { Fragment } from 'react';

async function getData(id:string){
  const payload = await getPayloadClient()
  const data = payload.findByID({
    collection:'results',
    id:id
  })

  return data
  
  
}


export default async  function Singlepost({ params }: { params: { id: string } }){
  
    const data:any = await getData(params.id)
    
    const correctans = data?.score?.score??0
    
    const notanswered = data?.score?.notanswered??0

    const wrongans = data?.score.wrongans

    const correctPercentage = data?.score.correctPercentage
    const wrongPercentage = data?.score.wrongPercentage
    const notAnsweredPercentage = data?.score.notAnsweredPercentage


    const [correct, wrong, wrongAnswer] = [correctPercentage,wrongPercentage,notAnsweredPercentage];

    const gradient = `conic-gradient(
      #2DD79A 0% ${correct}%,
      #FF6A61 ${correct}% ${correct + wrong}%,
      #6649ED ${correct + wrong}% ${correct + wrong + wrongAnswer}%
    )`;
    
    
    return(
      <div className=''>

      

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          
              <div  className='bg-yellow shadow-sm p-3 flex rounded-md justify-between'>
                <div>
                   <h1 className='text-xl'>{data?.test?.name??''}</h1>

                   <div className='flex gap-2'>
                    <div className={`${data.test.exam ==='qbank'?'hidden':'block'} w-5 h-5 flex justify-center my-auto`}>
                    <Image className='my-auto' alt='clock' width={444} height={444} src={'/clock.svg'}></Image>
                    </div>
                    
                    <p className={`${data.test.exam ==='qbank'?'hidden':'block'} text-black opacity-50`}>{data?.test?.duration??''} Min</p>

                    <div className={`${data.test.exam ==='qbank'?'hidden':'block'} h-5 w-[1px] bg-black opacity-50`}></div>
                    <p className='text-black opacity-50'>{data?.score?.nofquestion??''} Qus</p>

                   </div>

                </div>

                <div className='flex justify-center my-auto'>

                    <div className='w-5 h-5'>

                        <Image alt='arrow' height={444}  width={444} src={'/arrow.svg'}></Image>

                    </div>

                </div>
                
                

                </div>

          
          
              <div className='w-full bg-yellow flex justify-around rounded-md'>

                  <div style={{background: gradient,}} className=' flex justify-center w-28 h-28 p-3 rounded-full m-3'> 
                    
                    <div className=' my-auto w-full h-full rounded-full bg-yellow flex justify-center '>  
                        <div className='my-auto flex justify-center'>
                          <p className='my-auto text-xl'>{data.score.score}</p>
                          <h1 className='my-auto text-xl'>/</h1>
                          <p className='my-auto text-xl'>{data.score.nofquestion}</p>
                        </div>
                    </div>  
                
                  </div>

                  <div className='flex justify-center mr-3'>

                    <div className='my-auto flex flex-col gap-3'>

                    <div className='flex w-full justify-between gap-5 lg:gap-10 md:gap-10 '>
                        
                        <div className='flex justify-center gap-2'>
                          <div className='my-auto bg-green-400 w-5 h-5 rounded-full'></div>
                          <p className='my-auto text-black'>Correct</p>
                        </div>

                        <h1 className='my-auto text-black opacity-50'>{correctans}</h1>

                    </div>


                    <div className='flex w-full justify-between gap-5 lg:gap-10 md:gap-10 '>
                        
                        <div className='flex justify-center gap-2'>
                          <div className='my-auto bg-red-400 w-5 h-5 rounded-full'></div>
                          <p className='my-auto text-black'>Wrong</p>
                        </div>

                        <h1 className='my-auto text-black opacity-50'>{wrongans}</h1>

                    </div>

                    <div className='flex w-full justify-between gap-5 lg:gap-10 md:gap-10 '>
                        
                        <div className='flex justify-center gap-2'>
                          <div className='my-auto bg-indigo-500 w-5 h-5 rounded-full'></div>
                          <p className='my-auto text-black'>Not Answered</p>
                        </div>

                        <h1 className='my-auto text-black opacity-50'>{ notanswered}</h1>

                    </div>



                    </div>

                    



                  </div>


              </div>

       </div>

       <div className='mt-10 '>
       {data.test.questions.map((question:any,index:number) => (
        <div  className='border-[1px] border-yellow mb-10 p-5 rounded-md' key={question.id}>
          <h1 className='text-black opacity-50 mb-2'>Question {index+1} of {data.test.questions.length}</h1>
          <h3 className='text-black font-semibold'>{question.question}</h3>
          {question.image && <img src={question.image.url} alt="Question" />}
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 mt-3'>
            {question.options.map((option:any,index:number) => (
                    
                    <div key={index} className={`${(data?.selectedoptions[question.id] || []).includes(option.id) && option.isoption === "True" ?'!bg-green-400 text-white':'' } ${(data?.selectedoptions[question.id] || []).includes(option.id) && option.isoption === "False" ?'!bg-red-400 text-white':'' } ${option.isoption === "True"?'bg-green-500 text-white':'bg-white'} p-2 rounded-md border-[1px] border-gray-200`}>{option.option}  </div>
            ))}
          </div> 

          <div className={`${question.explaination ?'block':'hidden'} text-textprime  bg-yellow p-3 rounded-md mt-3`} >
            <div className='mb-3'>
              <p className='font-semibold text-black'>Explanation</p>
            </div>
            
            {serialize(question?.explaination??[])}
   
          </div>


        </div>
        ))}
       </div>

       <div className='h-24'></div>

      


       </div>
           
        
    )

}

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
        <ul className='list-disc mt-3' key={i}>
          {serialize(node.children)}
        </ul>
      );
    case 'ol':
      return (
        <ol className='list-decimal mt-3' key={i}>
          {serialize(node.children)}
        </ol>
      );
    case 'li':
      return (
        <li className=' ml-5 text-justify text-xl text-textpost'  key={i}>
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
          
          <Image alt='Image'width={555} height={555} className=' w-full h-[40vw]' src={node.value.url} key={i}>
          </Image>
        
        
      );
    

    default:
      return (
        <p className='text-justify text-xl text-textpost text-black ' key={i}>
          {serialize(node.children)}
        </p>
      );
  }
});









