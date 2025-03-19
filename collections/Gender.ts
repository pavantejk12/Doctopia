import { CollectionConfig } from 'payload/types';

const Gender:CollectionConfig = {
    slug: "gender",

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

export default Gender;