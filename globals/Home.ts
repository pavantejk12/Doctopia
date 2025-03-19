import { GlobalConfig } from "payload/types";

const Home:GlobalConfig = {
    access: {
      read: () => true,
    },
    slug:"home",

    admin: {
      group: 'Pages',
    },
    

    fields:[
        {
            name: 'name',
            label: 'Site Name',
            type: 'text',
            admin: {
              position: 'sidebar',
            },
            
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'drive',
          required: true,
          admin: {
            description: 'upload a logo',
          },
        },

        {
            name: 'width',
            label: 'Logo Width',
            type: 'text',
            admin: {
              position: 'sidebar',
            },
            
        },

        {
            name: 'slogan',
            label: 'Site Slogan',
            type: 'text',
            
        },
        {
            name: 'desc',
            label: 'Site Description',
            type: 'text',
            
        },
        {
          name: 'animation',
          type: 'upload',
          relationTo: 'drive',
          required: true,
          admin: {
            description: 'Lotti Animation JSON file',
          },
        },
        
        

        
        
    ],
    
    
  
    
}

export default Home;