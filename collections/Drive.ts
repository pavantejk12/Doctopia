import { S3UploadCollectionConfig } from 'payload-s3-upload';

const Drive: S3UploadCollectionConfig = {
  slug: 'drive',
  admin:{
    group:'Others'
  },
  access: {
    read: () => true,
  },
  upload: {
    staticURL: '/assets',
    staticDir: 'assets',
    disableLocalStorage: true,
    s3: {
      bucket: 'securedsoft',
      prefix: 'images/drive', // files will be stored in bucket folder images/xyz
      // prefix: ({ doc }) => `assets/${doc.type}`, // dynamic prefixes are possible too
      commandInput: {
        // optionally, use here any valid PutObjectCommandInput property
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/putobjectcommandinput.html
        ACL: 'public-read',  
      },
    },
    adminThumbnail: ({ doc }) =>
      `https://d3th4fjgtl3dup.cloudfront.net/images/drive/${doc.filename}`,
  },
  // create a field to access uploaded files in s3 from payload api
  fields: [
    {
      name: 'url',
      type: 'text',
      access: {
        create: () => false,
      },
      admin: {
        disabled: true,
      },
      hooks: {
        afterRead: [
          ({ data: doc }) =>
            `https://d3th4fjgtl3dup.cloudfront.net/images/drive/${doc?.filename}`,
        ],
      },
    },
  ],
};

export default Drive;