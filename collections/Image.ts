
import { CollectionConfig } from 'payload/types';

const Image:CollectionConfig = {
    slug: 'image',
    
    access: {
      read: () => true,
    },
    fields: [
        {
          name: 'alt',
          type: 'text',
        },
    ],
    upload: {
      staticURL: '/catagory',
      staticDir: '../public/catagory',
      adminThumbnail: 'thumbnail',
      mimeTypes: ['image/*'],
    },
    
};
  
  
export default Image