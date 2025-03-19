import { CollectionConfig } from 'payload/types';
const Customers:CollectionConfig = {
    slug: "customers",
    auth:true,
    admin: {
        useAsTitle: 'fullName',
        group: "Management",
    },
    access: { 
        //anyone can create user
        create:() => true,
        //admin can read all but user can read himself
        read: ({req}) => {
            
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                id:{
                    equals:req.user.id,
                }
            }
        },

        //admin and own user can update his info
        update:({req})=>{
            if(req.user.collection === 'users'){
                return true
            }
            
            return {
                id:{
                    equals:req.user.id,
                }
            }
        },

        //admin and own user can delete his info
        delete:({req}) =>{
            if(req.user.collection === 'users'){
                return true
            }
            else{
                return false
            }
        }
    },
    fields: [
        {
            name: "fullName",
            type: "text",
            label: "User Full Name",
            
        },

        {
            name: 'picture',
            type: 'text',
            label: 'Profile Picture',
        },
        
        {
            name: "address",
            type: "textarea",
            label: "User Address",
            
            
        },
        {
            name: "number",
            type: "text",
            label: "Contact Number",
            unique: true,
            
            
        },
        {
            name: 'course',
            type: 'relationship',
            label: 'User course',
            relationTo: 'courses',
            hasMany:false,
        },

        {
            name: 'program',
            type: 'relationship',
            label: 'User Program',
            relationTo: 'programs',
            hasMany:false,
        },
        {
            name: 'year',
            type: 'number',
            label: 'Passed out year'
        },
        {
            name: 'totalTest',
            type: 'number',
            label: 'Total Test attemped'
        },
        {
            name: 'totalQbank',
            type: 'number',
            label: 'Total Qbank attemped'
        },

        {
            name: 'totalQuestions',
            type: 'number',
            label: 'Total Questions'
        },
        {
            name: 'totalCorrectanswer',
            type: 'number',
            label: 'Total Score'
        },
        {
            name: 'totalWronganswer',
            type: 'number',
            label: 'Total Wrong'
        },
        {
            name: 'totalNotAttempted',
            type: 'number',
            label: 'Total Not Attempted'
        }


        
       
    ]


}

export default Customers;