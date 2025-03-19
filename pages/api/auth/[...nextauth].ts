import NextAuth,{Session} from 'next-auth';
import GoogleProvider from "next-auth/providers/google"


import getPayloadClient from '@/payload/payloadClient';
import Payloadtoken from '@/payload/Payloadtoken';
import { JWTDecodeParams } from 'next-auth/jwt';
var generator = require('generate-password');
import Payloaduser from '@/payload/Payloaduser';

import type { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.CLIENTID??'',
        clientSecret: process.env.CLIENTSECRET??'',
    }),
  ],

  jwt: {
    async encode({ secret, token, }) {

        const payload = await getPayloadClient();
        
        const user = await payload.find(
            {
              collection:"customers",
              where:{
                email:{
                  equals: token?.email
                }
              }
            }
        )

        if(user.docs.length === 0){
          var password = generator.generate({
            length: 10,
            numbers: true
          });

          if(token?.email){

            const d1 = new Date().getTime();
            const account = await payload.create({
              collection:"customers",
              data:{
                email: token.email??'',
                password:password,
                fullName:token.name??'',
                number: `${d1.toString()}`,
                picture: token.picture??'',
              }
            })

            if(account.id){
              var message = {
                from: "Doctopia <doctopia.in@gmail.com>",
                to: token?.email,
                subject: "Welcome to Doctopia.in, Your Medical School Ally!",
                html: `
                <div class="container">
        <h1>Welcome to Doctopia.in, Your Medical School Ally!</h1>
        <p>Hi ${token?.name},</p>
        <p>Welcome to Doctopia.in, your one-stop shop for mastering medical school! We're thrilled to have you join our growing community of ambitious students dedicated to academic excellence.</p>
        <p>At Doctopia.in, we understand the challenges you face. That's why we've created a comprehensive platform packed with powerful tools to help you:</p>
        <ul>
            <li>Ace your exams: Sharpen your knowledge with our extensive QBank, featuring thousands of practice questions designed to mimic real-world exams.</li>
            <li>Test your understanding: Take advantage of our diverse selection of self-assessment tests to identify areas requiring extra focus and track your progress over time.</li>
            <li>Boost your recall: Utilize our effective flashcard system to solidify key concepts in your memory for long-term retention.</li>
        </ul>
        <h2>Getting Started</h2>
        <ul>
            <li>Explore our platform: Dive into our vast library of resources and personalize your study experience to fit your learning style.</li>
            <li>Join the community: Connect with fellow medical students through our forums and find a network of support.</li>
            <li>Stay informed: Subscribe to our updates to receive valuable study tips, upcoming events, and exclusive offers.</li>
        </ul>
        <p>We're confident that Doctopia.in will become your go-to resource for success throughout your medical school journey.</p>
        <p>Ready to embark on your medical school adventure? <a href="https://doctopia.in/">Visit our website</a> to explore the features and unlock your full potential!</p>
        <p>In case if you don’t remember your password, this is your master password - ${password}</p>
        <p>If you have any questions or need assistance, please don't hesitate to reach out to our friendly support team at <a href="mailto:doctopia.in@gmail.com">doctopia.in@gmail.com</a> or DM us on Instagram <a href="https://instagram.com/Doctopiain">@Doctopiain</a></p>
        <p>Wishing you the very best in your medical studies!</p>
        <p>Sincerely,<br>The Doctopia.in Team</p>
    </div> 
                `
              };
              payload.sendEmail(message)
              
              const newuser ={
                id:account.id,
                collection: 'customers',
                email:account.email,
                name:account.fullName,
                image:account.picture,

              }
  
              const tokenn:any = Payloadtoken(newuser);
              return tokenn?.token??''

            }else{
              return ''
            }

          }

          return ''
        }

        
        

        const olduser ={
            id:user.docs[0].id,
            collection: 'customers',
            email:user.docs[0].email as string,
            name:user.docs[0].fullName as string,
            image:user.docs[0].picture as string,
            course: user.docs[0].course,
            program: user.docs[0].program,
            year:  user.docs[0].year,

        }

        const tokenn:any = Payloadtoken(olduser);
        return tokenn?.token??''

    },

    async decode(params: JWTDecodeParams){

      //console.log("decode ++++++++++")
      
      const user:any = Payloaduser(params.token??'')

      //console.log(user)
      
      return {
        name:user.name,
        email:user.email,
        picture:user.image,
        course:user?.course??'',
        program:user?.program??'',

      }
    }

 
    
  },
  cookies:{
     
    sessionToken: {
        name: `payload-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: true
        }
    },

  },
  callbacks: {
    async jwt({token, user,}) {
        return token;
    },
    async redirect({ url, baseUrl }) {
      return '/'
    } 
    
  },
}

const handler = NextAuth(authOptions)

export default handler


