import { CollectionConfig } from 'payload/types';

const Topicsflash:CollectionConfig = {
    slug: "topicsflash",

    access: {
        read: () => true,
    },

    admin: {
       
        useAsTitle: 'title',
        group:'Flashcards'
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
            label: 'Select Flashcards',
            type: 'relationship',
            relationTo: 'flashcards',
            hasMany:true,
        }

        

        
        
        
        
       
        
    ],
   


}

export default Topicsflash;