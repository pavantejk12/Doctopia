import { CollectionConfig } from 'payload/types';

const Topics:CollectionConfig = {
    slug: "topics",

    access: {
        read: () => true,
    },

    admin: {
       
        useAsTitle: 'title',
        group:'Qbank'
    },

    fields: [
        
        {
            name: 'title',
            label: 'Topic',
            type: 'text',
            required: true,
        },
        {
            name: 'ques',
            label: 'Select Ques',
            type: 'relationship',
            relationTo: 'tests',
            hasMany:true,
        }

        

        
        
        
        
       
        
    ],
   


}

export default Topics;