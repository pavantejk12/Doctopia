import { CollectionConfig } from 'payload/types';

const Subjects:CollectionConfig = {
    slug: "subjects",

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
            relationTo: 'topics',
            hasMany:true,
        },
        {
            name: 'isqbank', 
            type: 'radio', 
            defaultValue: 'False', 
            label: 'Qbank or Subject',
            admin: {
                  layout: 'horizontal',
            },
            options: [
                {
                    label: 'Qbank',
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

export default Subjects;