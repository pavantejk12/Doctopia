import { CollectionConfig } from 'payload/types';

const Color:CollectionConfig = {
    slug: "color",

    access: {
        read: () => true,
    },

    admin: {
       
        useAsTitle: 'title',
    },

    fields: [
        
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },

        {
            name: 'colorcode',
            label: 'Color Code',
            type: 'text',
            required: true,
        },
        
        
        
        
       
        
    ],
   


}

export default Color;