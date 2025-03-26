// next.config.js
const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
})


module.exports = withPayload(
  withPWA({
      

      experimental:{
        serverActions:false,
        
      },
      distDir:'build',
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'domain.s3.us-east-1.amazonaws.com',
            port: '',
            pathname: '/images/**',
          },
          {
            protocol: 'https',
            hostname: 'id.cloudfront.net',
            port: '',
            pathname: '/images/**',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/a/**',
          },

          // https://lh3.googleusercontent.com/a/ACg8ocKEgAFTyqmS-lBTOY8loNLBComLd7r4ROtGDkl79k_3=s96-c
        ],
      },
  
     
      
    
  }),
  
  {
    // The second argument to `withPayload`
    // allows you to specify paths to your Payload dependencies
    // and configure the admin route to your Payload CMS.

    // Point to your Payload config (Required)
    configPath: path.resolve(__dirname, "./payload/payload.config.ts"),

    // Point to custom Payload CSS (optional)
    // cssPath: path.resolve(__dirname, "./payload/payload.css"),

    // Point to your exported, initialized Payload instance (optional, default shown below`)
    payloadPath: path.resolve(process.cwd(), "./payload/payloadClient.ts"),

    // Set a custom Payload admin route (optional, default is `/admin`)
    // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
    adminRoute: "/admin",
  }
);