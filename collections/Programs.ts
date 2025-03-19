import { CollectionConfig } from 'payload/types';

const Programs:CollectionConfig = {
    slug: "programs",

    access: {
        read: () => true,
    },

    admin: {
       
        useAsTitle: 'name',
        group:'Courses'
    },

    fields: [
        
        {
            name: 'name',
            label: 'Program Name',
            type: 'text',
            required: true,
        }, 
       
        
    ],
   


}

export default Programs;