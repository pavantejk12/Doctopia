import { CollectionConfig } from 'payload/types';

const Category:CollectionConfig = {
    slug: "category",

    access: {
        read: () => true,
    },

    admin: {
       
        useAsTitle: 'title',
        group:'Tests'
    },

    fields: [
        
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        }, 

        {
            name: 'subcat',
            type:'relationship',
            relationTo: 'subcategory',
            hasMany:true,
        },
        {
            name: 'courses',
            type: 'relationship',
            relationTo: 'courses',
            hasMany:true,
        },
       
        
    ],
   


}

export default Category;