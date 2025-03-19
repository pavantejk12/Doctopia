import { CollectionConfig } from 'payload/types';

const SubCategory:CollectionConfig = {
    slug: "subcategory",

    access: {
        read: () => true,
    },

    admin: {
       
        useAsTitle: 'title',
        group:'Tests',
    },

    fields: [
        
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        }, 

        {
            name:'tests',
            type:'relationship',
            relationTo:'tests',
            hasMany:true,
        }
       
        
    ],
   


}

export default SubCategory;