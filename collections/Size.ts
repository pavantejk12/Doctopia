import { CollectionConfig } from 'payload/types';

const Color:CollectionConfig = {
    slug: "size",

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

        {
            name:'size',
            label:'Sizes',
            type: 'array',
            fields:[
                {
                    name: 'title',
                    label: 'Size name',
                    type: 'text'
                },
                
                {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                }

                


            ]
        }
        
        
        
        
       
        
    ],
   


}

export default Color;