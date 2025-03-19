import path from 'path';
import { buildConfig } from 'payload/config';
import meilisearchPlugin from "@nouance/payload-meilisearch";
import s3Upload from 'payload-s3-upload';
import Drive from '@/collections/Drive';
import Home from '@/globals/Home';
import Contact from '@/globals/Contact';
import Users from '@/collections/Users';
import Customers from '@/collections/Customerst';
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { OTP } from '@/collections/OTP';





import Tests from '@/collections/Tests';
import Results from '@/collections/Result';
import Subjects from '@/collections/Subjects';
import Topics from '@/collections/Topics';
//import Qbank from '@/collections/Qbank';
import Category from '@/collections/Category';
import SubCategory from '@/collections/SubCategory';
import Courses from '@/collections/Courses';
import Programs from '@/collections/Programs';
import Draft from '@/collections/Draft';
import Bookmarks from '@/collections/Bookmarks';
import Flashcards from '@/collections/Flashcards';
import Subjectsflash from '@/collections/Subjectsflash';
import Topicsflash from '@/collections/Topicsflash';


export default buildConfig({
  
  
  editor: slateEditor({
    
  }), // editor-config
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.MONGODB_URI||false,
  }),
  email: {
    transportOptions: {
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      port: process.env.SMTP_PORT,
      secure: true,
      },
    fromName: 'BDMarket',
    fromAddress: 'mhshakib100@gmail.com'
  },
  // database-adapter-config-end
  // serverURL: process.env.SITE_URI,
  collections: [
    Courses,
    Programs,
    Category,
    SubCategory,
    Tests,
    Subjects,
    Topics,
    //Qbank,
    Users,
    Customers,
    Drive,
    Results,
    Draft,
    Bookmarks,
    OTP,
    Flashcards,
    Subjectsflash,
    Topicsflash

    // Gender,
    // Category,
    // Brand,
    // Color,
    // Products,
    // Order,
    // Posts,
    // Offers,
    //  OTP,
  ],
  globals: [
    Home,
    Contact,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  
  
  
  
  plugins: [
    s3Upload({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY??"",
        secretAccessKey: process.env.AWS_SECRET??"",

        
      },
    }),

    meilisearchPlugin({
      host: process.env.MEILISEARCH_HOST??"",
      apiKey: process.env.MEILISEARCH_API_KEY??"",
      sync: [
        {
          collection: "tests",
          fields: [
            {
              name: "name",
            },
            {
              name: "exam",
            },
            
          ],
        }
        

      ],
    }),

    
    
    
    
  
  ],
})
