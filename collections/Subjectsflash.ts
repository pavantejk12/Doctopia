import { CollectionConfig } from 'payload/types';

const Subjectsflash:CollectionConfig = {
    slug: "subjectsflash",

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
            label: 'Title',
            type: 'text',
            required: true,
        },

        {
            name: 'image',
            type: 'upload',
            relationTo: 'drive',
            label: 'Category Images',
            required: true,
        },
        {
            name: 'topics',
            type: 'relationship',
            relationTo: 'topicsflash',
            hasMany:true,
        },
        {
            name: 'isqbank', 
            type: 'radio', 
            defaultValue: 'False', 
            label: 'Flashcards or Subject',
            admin: {
                  layout: 'horizontal',
            },
            options: [
                {
                    label: 'Flashcards',
                    value: 'True'
                },
                {
                    label: 'Subject',
                    value: 'False'
                }
            ]
        },
        {
            name: 'courses',
            type: 'relationship',
            relationTo: 'courses',
            hasMany:true,
        },

        
        
        
        
       
        
    ],
   


}

export default Subjectsflash;