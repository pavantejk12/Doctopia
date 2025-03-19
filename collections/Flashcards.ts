import { CollectionConfig } from "payload/types";


const Flashcards:CollectionConfig = {
    slug: "flashcards",
    
    access: {
      read: () => true,
    },
    
    admin: {
        group: 'Flashcards',
        useAsTitle: 'name',
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
            name: 'answer',
            type: 'text',
            required: true,
            label: 'Answer',
          }
          
        ],
        
      },

        

      {
        name:'program',
        type: 'relationship',
        relationTo: 'programs',
        hasMany:false,
      }


       
    ]


}

export default Flashcards;