import { CollectionConfig } from 'payload/types';

const Products:CollectionConfig = {
    slug: "products",

    access: {
        read: () => true,
    },

    admin: {
       
        useAsTitle: 'name',
    },

    fields: [
        
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },

        {
            name: 'desc',
            label: 'Description',
            type: 'text',
            required: true,
        },

        {
            name: 'image',
            type: 'upload',
            relationTo: 'drive',
            label: 'Product Main Image',
            required: true,
        },

        {
            name: 'images',
            type: 'array',
            label: 'Product Images',
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'drive',
                label: 'Product Images',
              },
       
            ],
        },

        {
            name: 'pricesale',
            type: 'number',
            label: 'Product Sale Price',
            required: true,
        },

        {
            name: 'priceoriginal',
            type: 'number',
            label: 'Product Original Price',
            required: true,
        },

        {
            name: 'genders',
            label: 'Genders',
            type: 'relationship',
            relationTo: 'gender',
            hasMany: true,
            admin: {
              position: 'sidebar',
            },
        },

        {
            name: 'categories',
            label: 'Categories',
            type: 'relationship',
            relationTo: 'category',
            hasMany: true,
            admin: {
              position: 'sidebar',
            },
        },

        {
            name: 'brand',
            label: 'Brand',
            type: 'relationship',
            relationTo: 'brand',
            hasMany: true,
            admin: {
              position: 'sidebar',
            },
        },

        {
            name: 'color',
            label: 'Color',
            type: 'relationship',
            relationTo: 'color',
            hasMany: true,
            admin: {
              position: 'sidebar',
            },
        },
        {
          name:'size',
          label:'Sizes',
          type: 'array',
          required:true,
          fields:[
              {
                  name: 'title',
                  label: 'Size name',
                  type: 'text',
                  required: true
              },
              
              {
                  name: 'price',
                  label: 'Extra total Price for size if any',
                  type: 'number',
              }

              


          ]
        },


        {
            name: "search",
            type: "text",
            label: "Post Search String",
            admin: {
              position: 'sidebar',
            },
            hooks: {
              beforeValidate: [(x)=>{
                
                const title = x?.data?.name
                const sanitizedTitle = title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') 
                .toLowerCase(); 
                const timestamp = String(new Date().getTime()).slice(-6);
                return sanitizedTitle + '-' + timestamp;
                  

              }],
            },
            
          },

          {
            name: 'trending', 
            type: 'radio', 
            options: [
              {
                label: 'True',
                value: 'True',
              },
              {
                label: 'False',
                value: 'False',
              },
            ],
            defaultValue: 'False', 
            admin: {
              layout: 'horizontal',
              position: 'sidebar',
            }
          },
        
        
        
        
       
        
    ],
   


}

export default Products;