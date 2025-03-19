import { GlobalConfig } from "payload/types";

const Contact:GlobalConfig = {
    access: {
      read: () => true,
    },
    slug:"contact",

    admin: {
      group: 'Pages',
    },
    

    fields:[
        {
            name: 'address',
            label: 'Address',
            type: 'textarea',
            
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'text',
            
        },
        {
            name: 'linkedin',
            label: 'Linkedin Url',
            type: 'text',
            
        },
        {
            name: 'instagram',
            label: 'Instagram Url',
            type: 'text',
            
        },
        {
            name: 'facebook',
            label: 'Facebook Url',
            type: 'text',
            
        },
        {
            name: 'teligram',
            label: 'Teligram Url',
            type: 'text',
            
        },

        {
            name: 'youtube',
            label: 'Youtube Url',
            type: 'text',
            
        },
        {
            name: 'twitter',
            label: 'Twitter Url',
            type: 'text',
            
        },
        {
            name: 'twitch',
            label: 'Twitch Url',
            type: 'text',
            
        },

        

    

        
        
    ],
    
    
  
    
}

export default Contact;