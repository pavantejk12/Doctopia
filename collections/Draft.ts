import { Payload } from 'payload';
import { CollectionConfig } from 'payload/types';


const Draft:CollectionConfig = {
    slug: "draft",
    admin:{
        group:'Others'

    },
    access: { 
        read: ({req}) => {
            
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                owner:{
                    equals:req.user.id,
                }
            }
        },

        // update:({req})=>{
        //     if(req.user.collection === 'users'){
        //         return true
        //     }
            
        //     return {
        //         owner:{
        //             equals:req.user.id,
        //         }
        //     }
        // },
        // delete:({req}) =>{
        //     if(req.user.collection === 'users'){
        //         return true
        //     }
            
        //     return {
        //         owner:{
        //             equals:req.user.id,
        //         }
        //     }
        // },
        
        create:() => true,
    },


    fields: [
        
        {
            name: 'owner',
            type: 'relationship',
            relationTo: 'customers',
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

                
                return "Your cand create order as provided User"
            },

            // admin:{
            //     readOnly: true,
            // }
        },

        {
            name: 'test',
            label: 'Test Name',
            type: 'relationship',
            relationTo: 'tests',
            required: true,
            
        },

        {
            name: 'selectedoptions', // required
            type: 'json', // required
            required: true,
        },
        
        {
            name: 'index',
            type: 'number',
            required: true,
            defaultValue: 0,
        },

        {
            name: 'time',
            type: 'number',
            required: true,
            defaultValue: 1,
        }
        
        
       
    ],

    


}

export default Draft;