import { Payload } from 'payload';
import { CollectionConfig } from "payload/types";


const Tests:CollectionConfig = {
    slug: "tests",
    
    access: {
      read: async ({req,data}) => {
        
        

          
        if(req.user.collection === 'users'){
            return true
        }

        const payload: Payload = req.payload;
        
        const puser:any = await payload.findByID({
          collection: "customers",
          id: req.user.id
        })

        
        
        return {
          course:{
                equals: puser?.course?.id??'',
            }
        }
      },
    },
    
    admin: {
        group: 'Exams',
        useAsTitle: 'name',
    },

    fields: [
      {
        name: "name",
        type: "text",
        label: "Test Name",
        
      },
      {
        name: 'exam', 
        type: 'radio', 
        label: 'Exam Type',
        required: true,
        options: [
          
          {
            label: 'Test',
            value: 'test',
          },
          {
            label: 'Qbank',
            value: 'qbank',
          },
        ],
        defaultValue: 'test', // The first value in options.
        admin: {
          layout: 'horizontal',
        },
      },
      
      {
        name: 'questions', // required
        type: 'array', // required
        label: 'Add Questions',
        
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'drive',
            label: 'Question Image',
            
          },
          
          {
            name: 'question', 
            type: 'text', 
            required: true,
          },

          {
            name: 'options',
            type: 'array',
            
            fields:[
              {
                name: 'option', 
                type: 'text', 
                required: true,
              },

              {
                name: 'isoption', 
                type: 'radio', 

                access: {
                  read: ({req,data,doc}) => {
                    
                    if(doc?.exam === 'qbank'){
                        return true
                    }
            
                    if(req?.user?.collection === 'users'){
                        return true
                    }

                    return false
                    
                    
                  },
                  
                  
                  
                  
                },

                options: [
                  
                  {
                    label: 'Correct',
                    value: 'True',
                  },

                  {
                    label: 'Not Correct',
                    value: 'False',
                  },
                ],
                defaultValue: 'False', 
                admin: {
                  layout: 'horizontal',
                },
                
              },

            ]
          },

          {
            name:'explaination',
            type:'richText',
            label:'Explaination',
            access: {
              read: ({req,data,doc}) => {
                
                if(doc?.exam === 'qbank'){
                    return true
                }
        
                if(req?.user?.collection === 'users'){
                    return true
                }

                return false
                
                
              },
              
              
              
              
            },
          },
          {
            name:'hint',
            type:'textarea',
            label:'Hint',
            defaultValue:'No Hint Available',
            access: {
              read: ({req,data,doc}) => {
                
                if(doc?.exam === 'qbank'){
                    return true
                }
        
                if(req?.user?.collection === 'users'){
                    return true
                }

                return false
                
                
              },
              
              
              
              
            },
          }



          

          
          
        ],
        
      },

      {
        name: 'duration',
        type: 'number',
        label: 'Exam Duration'

      },

      {
        name: 'qlength',
        type: 'number',
        admin:{
          readOnly:true,
          hidden:true,
        },
        hooks: {
          beforeValidate:[
            ({data})=>{
              return data?.questions?.length??0
            
            }
          ]
        }
      },

      {
        name:'course',
        type: 'relationship',
        relationTo: 'courses',
        hasMany:false,
      }

     


        
        
        
        
  
          

         

       
    ]


}

export default Tests;