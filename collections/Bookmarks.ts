
import { CollectionConfig } from 'payload/types';


const Bookmarks:CollectionConfig = {
    slug: "bookmarks",
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
        delete: ({req}) => {
            
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                owner:{
                    equals:req.user.id,
                }
            }
        },

        
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
            name: 'qid',
            type: 'text',
            required: true,
            label: 'Question id'
        }

        
        

        
        
        
       
    ],

    


}

export default Bookmarks;