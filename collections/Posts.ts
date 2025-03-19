import { CollectionConfig } from "payload/types";
import FormatTitle  from "./utils/FormatTitle";




const Posts:CollectionConfig = {
    slug: "posts",
    access: {
        read: ({req}) => {
            
          // if(req.user.collection === 'users'){
          //     return true
          // }
          
          return {
              owner:{
                  equals:req.user.id,
              }
          }
      },
    },
    admin: {
        group: 'Posts',
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'drive',
            label: 'Project Main Image',
            
        }, 
        {
            name: 'posttime', // required
            type: 'date', // required
            label: 'Post Published date',
            
            admin: {
              position: 'sidebar',
              date: {
                // All config options above should be placed here
                pickerAppearance: 'dayOnly',
                
              }
            }
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'drive',
            label: 'Project Thumbline Image',
            admin: {
                position: 'sidebar',
            },
            
        }, 
        {
            name: "Title",
            type: "text",
            label: "Post Title",
            
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: "content",
            type: "richText",
            label: "Post Content",
            
        },
        // {
        //     name: 'categories',
        //     label: 'Categories',
        //     type: 'relationship',
        //     relationTo: 'catagory',
        //     hasMany: true,
        //     admin: {
        //       position: 'sidebar',
        //     },
        //   },

          {
            name: 'trending', // required
            type: 'radio', // required
            options: [ // required
              {
                label: 'True',
                value: 'True',
              },
              {
                label: 'False',
                value: 'False',
              },
            ],
            defaultValue: 'False', // The first value in options.
            admin: {
              layout: 'horizontal',
              position: 'sidebar',
            }
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
                

                var title= ""
                const arryt:[any] = x?.data?.Title.split(" ")
                for(var i=0;i<=arryt.length-1;i++){
                   title=title+'-'+arryt[i]
                }

                

  
               
                //return FormatTitle(x?.data?.Title)
                return title.substring(1)

              }],
            },
            
          },

          {
            name: 'owner',
            type: 'relationship',
            relationTo: 'users',
            hasMany: false,
            defaultValue: ({ user, locale }:{user:any,locale:any}) => {
                
                return (`${user.id}`)
            },
            validate: (val, {user,args}) => {
                if(user.collection === 'users'){
                    return true
                }

                if(val === user.id){
                    return true
                }

                
                return "Your can't create order as provided User"
            },

            admin:{
                readOnly: true,
            }
        },

       
    ]


}

export default Posts;