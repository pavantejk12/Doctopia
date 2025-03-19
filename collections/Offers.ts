import { CollectionConfig } from 'payload/types';

const Offers:CollectionConfig = {
    slug: "offers",
    fields:[
        {
            name: 'offername',
            label: 'Offer Exclusive Name',
            type: 'text'
        },
        
        {
            name:'offers',
            label:'Offers',
            type: 'array',
            
            fields:[
                
                
                {
                    name: 'product',
                    label: 'Product',
                    type: 'relationship',
                    relationTo: 'products',
                    hasMany: false,
                    
                },

                {
                    name: 'percentage',
                    label: 'Percentage',
                    type: 'text'
                }
                
  
            ]
          },
        
        

    ]

}

export default Offers;