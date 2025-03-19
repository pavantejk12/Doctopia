import { CollectionConfig } from 'payload/types';

const Brand:CollectionConfig = {
    slug: "brand",

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
        
        
        
        
       
        
    ],
   


}

export default Brand;