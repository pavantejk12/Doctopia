import { CollectionConfig } from "payload/types";


const Qbank:CollectionConfig = {
    slug: "qbank",
    
    access: {
      read: () => true,
    },
    
    admin: {
        
        useAsTitle: 'name',
        group:'Qbank'
    },

    fields: [
      {
        name: "name",
        type: "text",
        label: "Test Name",
        
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
                  read: ({req}) => {
            
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
        name:'program',
        type: 'relationship',
        relationTo: 'programs',
        hasMany:false,
      }
        
        
        
        
  
          

         

       
    ]


}

export default Qbank;