import { CollectionConfig } from 'payload/types';

const Courses:CollectionConfig = {
    slug: "courses",

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
            label: 'Course Name',
            type: 'text',
            required: true,
        }, 

        {
            name: 'programs',
            type:'relationship',
            relationTo: 'programs',
            hasMany:true,
        }
        
       
        
    ],
   


}

export default Courses;