
import { CollectionConfig } from 'payload/types';

const Users:CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
      useAsTitle: 'email',
      group: "Management",
    },
    access: {
      read: () => true,
    },
    fields: [

        {
            name: 'name',
            type: 'text',
        },
        // {
        //     name: 'image',
        //     type: 'upload',
        //     relationTo: 'drive',
        //     label: 'Profile Picture',
            
        // }, 
      
    ],
  };
  
  export default Users;