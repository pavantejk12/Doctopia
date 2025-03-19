'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Home/Header';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import  { Fragment } from 'react';
import ImageRender from '@/components/utils/ImageRender';
interface Option {
    id: string;
    option: string;
    isoption: string;
  }
  
interface Question {
    id: string;
    image?: {
      id: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      createdAt: string;
      updatedAt: string;
      url: string;
    };
    question: string;
    explaination: any;
    hint:string;
    options: Option[];
}

export default  function Singlepost({ params }: { params: { id: string } }){
  const [show, setShow] = useState(false)
  const [showArray, setShowArray] = useState<number[]>([])
  
  const [hintt,setHint] = useState(false)
  const [decrease,setDecrase] = useState(1)

  const [isqbank,setisqbank] = useState(false)
  const success = (message:string) => toast(`${message} ✅`);
  const error =() =>toast.warn("Error doing operation!")
  
  const [draftid,setdraftid] = useState<string>()
  const [isdraft,setisdraft] = useState<boolean>(false)
  const [ids, setIds] = useState<string[]>([]);

  const [current,setcurrent] = useState(0)
  
  const [time, setTime] = useState(100);

  const array = ["A","B","C","D","E","F","G","H","I","J","K"]
  const [question,setquestion] = useState<Question>()
  
  const [data, setData] = useState<{id: string;
    name: string;
    questions: Question[];
    createdAt: string;
    updatedAt: string;
    exam: string;
  }>()
  const [isLoading, setLoading] = useState(true)

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  
  //for multiple option selection
  
  // const handleOptionChange = (questionId: string, optionId: string) => {
  //   setSelectedOptions((prevSelectedOptions) => {
  //     const currentSelectedOptions = prevSelectedOptions[questionId] || [];
  //     const updatedOptions = [...currentSelectedOptions];

  //     const optionIndex = updatedOptions.indexOf(optionId);

  //     if (optionIndex === -1) {
  //       updatedOptions.push(optionId);
  //     } else {
  //       updatedOptions.splice(optionIndex, 1);
  //     }

  //     return {
  //       ...prevSelectedOptions,
  //       [questionId]: updatedOptions,
  //     };
  //   });
  // };

  // for single option selection
  const handleOptionChange = (questionId: string, optionId: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const currentSelectedOptions = prevSelectedOptions[questionId] || [];
      let updatedOptions: string[] = [];
  
      // If the clicked option is already selected, unselect it
      if (currentSelectedOptions.includes(optionId)) {
        updatedOptions = currentSelectedOptions.filter((id) => id !== optionId);
      } else {
        // Otherwise, select the clicked option
        updatedOptions = [optionId];
      }
  
      return {
        ...prevSelectedOptions,
        [questionId]: updatedOptions,
      };
    });
  };

  
  
  

  

  const handleId = (id: string) => { 
    if (ids.includes(id)) {
      console.log("removed")
      setIds(ids.filter((existingId) => existingId !== id));
    } else {
      console.log("added")
      setIds([...ids, id]);
    }
  };
    const handlePause = async () =>{
      //setDecrase(0)

      if(decrease === 0){
        setDecrase(1)
        setTime(time-1)
        return
      }
      if(decrease === 1){
        setDecrase(0)
      }


      const index = data!.questions.indexOf(question!); 
      const body = {
        test:params.id,
        selectedoptions:selectedOptions,
        index:index,
        time:time
      }

      const check = await fetch(`/api/draft?where[or][0][and][0][test][equals]=${params.id}`)
      const draft = await check.json()
      if (draft.docs.length > 0){
        //console.log(JSON.stringify(draft.docs[0].id))
        
        const req = await fetch(`/api/draft/${draft.docs[0].id}`,{
         headers: {
         "Content-Type": "application/json",
        },
        method: "PATCH",
        body:JSON.stringify(body),
        })
        if(req.status ===200){
          //window.location.href = '/';
          success("Paused and Saved to draft");
          //console.log("updated")
        }else{
        console.log("error")
        }

      }
      else{

      
      const req = await fetch('/api/draft',{
        headers: {
         "Content-Type": "application/json",
      },
       method: "POST",
       body:JSON.stringify(body),
      })
      if(req.status ===201){
        //window.location.href = '/';
        console.log("success")
        success("Paused and Saved to draft");
      }else{
      console.log("error")
      }
      
    }

    }

    const handleBookmark = async () =>{

      const check = await fetch(`/api/bookmarks?where[or][0][and][0][qid][equals]=${question!.id}`)
      const bookmark = await check.json()
      
      if (bookmark.docs.length > 0){
        console.log("already bookmarked")
        success("Already bookmarked")
        return
      }
      
      const body = {
        test:params.id,
        qid: question!.id
      }
      const req = await fetch('/api/bookmarks',{
        headers: {
         "Content-Type": "application/json",
      },
     method: "POST",
     body:JSON.stringify(body),
     })

     if(req.status ===201){
        //window.location.href = '/results';
        //console.log("success fully saved to bookmarks")
        success("Bookmarked Successfully")
        return
        
     }else{
      console.log("error")}
      //error()

    }

    const handleSubmit = async () => {
       //console.log(selectedOptions)

       if(isdraft){
        try {
          const req = await fetch(`/api/draft/${draftid}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
            },
          })
          const data = await req.json()
        } catch (err) {
          console.log(err)
        }
          
       }
       
       const body = {
        test:params.id,
        selectedoptions:selectedOptions
       }


       const req = await fetch('/api/results',{
           headers: {
            "Content-Type": "application/json",
         },
        method: "POST",
        body:JSON.stringify(body),
        })

        if(req.status ===201){
           window.location.href = '/results';
           console.log("success")
        }else{
        console.log("error")}

    };



  
 
    useEffect(() => {

      // fetch(`/api/results?depth=0&where[or][0][and][0][test][equals]=${params.id}`).then((res) => res.json()).then((data) => {
        // if(data.docs.length > 0){
        //   //window.location.href = `/results/${data.docs[0].id}`;
        
        // }
        // else{
          fetch(`/api/draft?&where[or][0][and][0][test][equals]=${params.id}`)
          .then((res) => res.json())
          .then((data:any) => {
             
             if(data.docs.length > 0){
                //console.log("Draft logic")
                setisdraft(true)
                setdraftid(data.docs[0].id) 
                setData(data.docs[0].test)
                setLoading(false)
                setquestion(data.docs[0].test.questions[data.docs[0].index])
                console.log(`draft exam type ${data.docs[0].test.exam}`)
                setTime(data.docs[0].time);
                if(data.docs[0].test.exam === "qbank"){
                  setTime(10000 * 60);
                  setisqbank(true)
                }
                setSelectedOptions(data.docs[0].selectedoptions)
             }
    
             else{
              fetch(`/api/tests/${params.id}`)
              .then((res) => res.json())
              .then((data) => {
                
                setData(data)
                setLoading(false)
                setquestion(data.questions[0])
                
                setTime(data.duration * 60);
                if(data.exam === "qbank"){
                  setTime(10000 * 60);
                  setisqbank(true)
                }
                //console.log(`normal exam type ${data.exam}`)
              })
             }
    
            
          })
        // }
      
      // }
      // )

 
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        if (time > 0) {
          setTime(prevTime => prevTime - decrease);
        } else {
          console.log('Time end');
          handleSubmit();
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [time]);
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    


 
    if (isLoading) return (
      <div>
       <Header></Header>
       <p>Loading...</p>
      </div>
    )


    if (!data) return <p>Test not found</p>
    if (!data.questions) return <p>Test not found</p>

    
    return(
      <div>
        <Header></Header>

      <div className='flex justify-center'>

      
     
      <div className='flex flex-col lg:flex-row justify-center w-10/12 h-full'>
        
       <div className='w-full lg:w-8/12 md:w-full h-full bg-white'>

       <div className=''>


       <div className='flex justify-between mt-20 lg:mt-24 md:mt-24'>
           <h1 className='text-black opacity-50 '>{`Questions ${data.questions.indexOf(question!)+1} of ${data.questions.length}`}</h1> 
           
           <div className='flex gap-2'>

              <div className={`${ids.includes(question?.id??'')?'!bg-indigo-500 text-white':''} w-7 h-7 rounded-full  bg-indigo-200 cursor-pointer flex justify-center place-items-center`} onClick={()=>{
               //console.log(question?.id)
               handleId(question?.id??'')}}>
                <Image className='p-2' height={444} width={444} alt='flag' src={'/flag.svg'}></Image>
              </div>
           
             <div onClick={()=>{
               handleBookmark()
              }} className='w-7 h-7 flex justify-center cursor-pointer'>
               <Image alt='bookmark' width={444} height={444} src={'/bookmark.svg'}></Image>
             </div>

             


      
           
           </div>
       
       
       </div>

       <div className={`${question?.image?.url?'mt-3':'hidden'} w-full md:w-full lg:w-2/4 h-56 rounded-md  flex justify-center`}>

          <Image className='rounded-md' width={444} height={444} alt='image' src={`${question?.image?.url??'/doctor1.png'}`} ></Image>

       </div>


       <h1 className='mt-5 text-black font-semibold' >{question?.question}</h1>

       <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-3 mt-5'>
            {question!.options.map((option,index) => (
              
                    <button disabled={showArray.includes(data.questions.indexOf(question!))}  key={option.id} onClick={() => {
                      handleOptionChange(question!.id, option.id)
                    }} className={`text-left ${show  && (option?.isoption === "True" ) ?'!bg-green-300 text-white':'border-[1px] border-gray-200 '} rounded-md cursor-pointer ${(selectedOptions[question!.id] || []).includes(option.id)?'bg-orange text-white':'border-[1px] border-gray-200 '} p-3 `}><p className=''><span className='text-black opacity-50'>{`${array[index]}. `}</span>{option.option}</p></button>
                    
            ))}
          </div>

          <div className=' flex  mt-10 justify-between mb-5'>


            <div className='flex gap-2' >
            <div className='rounded-md  bg-green-200 cursor-pointer flex justify-center' onClick={()=>{
              setShow(false)
              const index = data.questions.indexOf(question!);
              //console.log(index)
              if (index === 0) {
                 
              } else {
                console.log(index-1)

                setcurrent(index-1)

                setquestion(data.questions[index-1])
              }
              if(decrease === 0){
                setDecrase(1)
                setTime(time-1)
                return
              }
              setHint(false);


            }}><p className='my-auto ml-3 mr-3 mt-2 mb-2 text-xl'>Prev</p></div>
            
            
            <div className='rounded-md  bg-yellow cursor-pointer flex justify-center' onClick={()=>{
              setShow(false)
              const index = data.questions.indexOf(question!);  
              if(index+1 === data.questions.length){
              }else{
                setquestion(data.questions[index+1])
                setcurrent(index+1)
              }
              if(decrease === 0){
                setDecrase(1)
                setTime(time-1)
                return
              }
              setHint(false);

            }}><p className='my-auto ml-3 mr-3 mt-2 mb-2 text-xl'>Next</p></div>
            

            

            <div  onClick={()=>{
            setHint(!hintt)
          }} className={`${isqbank?'block':'hidden'} cursor-pointer flex justify-center bg-orange rounded-md`}>
              <h1 className='text-xl text-white my-auto ml-3 mr-3 mt-2 mb-2'>Hint</h1>
          </div>

          

          </div>

          

          <div className=' flex justify-between gap-3'>

          
          <div onClick={()=>{
              setShow(true)
              const index = data.questions.indexOf(question!);
              //console.log("Question Index",index)
              setShowArray([...showArray,index])


            }} className={`${isqbank?'block':'hidden'}  bg-green-500 rounded-md  cursor-pointer flex justify-center`}>
            <p className=' text-white my-auto ml-3 mr-3 mt-2 mb-2 text-xl'>Show</p>


            </div>

          </div>

          
          </div>
          </div>

          

          <div className={`${hintt?'block':'hidden'} text-textprime  bg-yellow p-3 rounded-md mb-3`} >
            
            {question?.hint??''}
   
          </div>


          {/* ${selectedOptions[question!.id] && (question?.explaination?.length??0) ?'block':'hidden'} */}
         
          <div className={`${show ?'block':'hidden'} text-textprime  bg-yellow p-3 rounded-md`} >
            
            {serialize(question?.explaination??[])}
   
          </div>

          <div className='lg:h-20 h-0'></div>

          {/* <div className={`${hint?'block':'hidden'} text-textprime  bg-yellow p-3 rounded-md`} >
            
            {serialize(question?.explaination??[])}
   
          </div> */}


          

          

          

           

       </div>


       <div className='md:w-full lg:w-4/12 w-full h-full bg-white '>
           
           <div className='lg:h-24'></div>

           

           <div className='flex justify-end'>
          

           <div className={` bg-yellow w-full lg:w-4/5 md:w-full p-3 rounded-md flex justify-between`}>
              
              <div>
              <h1 className='text-xl text-black line-clamp-1'>{data.name}</h1>
              <div className={`${isqbank?'hidden':'block'} bg-white w-full p-3 flex justify-start gap-2 rounded-md`}>
                 <div className='flex justify-center'>
                    <div className='my-auto w-10 h-10'> 
                    <Image className='my-auto' alt='clock' height={4444} width={444} src={'/clock.svg'} ></Image>
                    </div>
                 </div>

                 <div className={``}>
                   <p className='text-black text-[1rem] opacity-50'>Time remaining</p>
                   <p className='text-black font-semibold text-[1rem] -mt-1'>{minutes} : {seconds < 10 ? '0' : ''}{seconds}</p>
                   
                 </div>
              </div>

              </div>

              <div>

                {/* submit and pause */}
                <div className='flex justify-end gap-2 flex-col '>

          <div onClick={()=>{
            handlePause()

          }} className=' cursor-pointer my-auto border-[1px] border-black opacity-50 rounded-md pl-1 pr-1 pt-2 pb-2'><p className='text-center'>{decrease===0?"Resume":'Pause'}</p></div>
          
          <div onClick={()=>{
            handleSubmit()
          }} className='cursor-pointer flex justify-center bg-orange rounded-md'>
              <h1 className='text-xl text-white my-auto pl-1 pr-1 pt-2 pb-2'>Submit</h1>
          </div>

          </div>

                
 

              </div>

           </div>
           </div>

          

           
           <div className='flex justify-end mt-5 mb-5 lg:mb-0 md:mb-0' >
           
           <div className='lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 w-full lg:w-4/5 md:w-full h-5/6 my-auto rounded-lg border-[1px] border-gray-300'>
           <p className='pl-3 pr-3 pt-3'>Question map</p>

           <div className='flex justify-between pl-3 pr-3 '>
             
             <div className='flex justify-center gap-2'>
                  <div className='bg-green-400 w-4 h-4 rounded-full my-auto'></div>
                  <p className='my-auto text-[1rem] text-black opacity-50'>Answered</p>
             </div>

             <div className='flex justify-center gap-2'>
                  <div className='bg-red-100 w-4 h-4 rounded-full my-auto'></div>
                  <p className='mr-[5px] my-auto text-[1rem] text-black opacity-50'>Not answered</p>
             </div>

           </div>

           <div className='flex justify-between pl-3 pr-3 pb-3'>
             
             <div className='flex justify-center gap-2'>
                  <div className='bg-teal-200 w-4 h-4 rounded-full my-auto'></div>
                  <p className='my-auto text-[1rem] text-black opacity-50'>Selected</p>
             </div>

             <div className='flex justify-center gap-2'>
                  <div className='bg-indigo-200 w-4 h-4 rounded-full my-auto'></div>
                  <p className='my-auto text-[1rem] text-black opacity-50'>Flaged answer</p>
             </div>

           </div>
           
           <div className=' grid grid-cols-5 gap-2 pl-3 pr-3 pb-3'>
             

             
             {data.questions.map((item:Question,index)=>(
                <div key={index} onClick={()=>{
                  setShow(false)
                  setcurrent(index)
                  setquestion(item)
                }} className={ `${current === index?'!bg-teal-200 text-white':''} ${ids.includes(item.id)?'!bg-indigo-200 text-white':''} ${selectedOptions[`${item.id}`]?.length > 0?'bg-green-400 text-white':'bg-yellow text-black '}  cursor-pointer w-10 h-10 rounded-full  flex justify-center`}><h1 className='my-auto opacity-100'>{index+1}</h1></div>
             ))}

           </div>
           </div>


           </div>

           <div className='lg:hidden md:hidden hidden justify-end gap-3 mt-5'>

          <div onClick={()=>{

            handlePause()


          }} className=' cursor-pointer my-auto border-[1px] border-black opacity-50 rounded-md p-3'>{decrease===0?"Resume":'Pause'}</div>
          
          <div onClick={()=>{
            handleSubmit()
          }} className='cursor-pointer flex justify-center bg-orange rounded-md'>
              <h1 className='text-xl text-white my-auto ml-3 mr-3 mt-2 mb-2'>Submit</h1>
          </div>

          </div>
       
       </div>



      
      
    </div>


    </div>
    <ToastContainer position="bottom-right" />
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
        <li className=' ml-5 text-xl text-textpost'  key={i}>
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
          
          <ImageRender i={i} node={node}></ImageRender>
          
        
      );
    

    default:
      return (
        <p className='text-xl text-textpost text-black ' key={i}>
          {serialize(node.children)}
        </p>
      );
  }
});



