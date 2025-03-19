import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Home/Header'
// import { Inter as FontSans } from "next/font/google"
import Footer from '@/components/Home/Footer'
import Leftnav from '@/components/mcq/Leftnav'
import localFont from '@next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'



const glory = localFont({
  src: '../../public/Gilroy-Regular.ttf',
  display: 'swap',
  
});


// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next"
import SessionP from '@/components/provider/SessionP';



export const metadata: Metadata = {
  title: 'Doctopia',
  description: 'Number one MCQ platform',
  manifest:'/manifest.webmanifest',
  themeColor:'#ffffff'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${glory.className}`}>
      
        <SessionP session={session}>
        
         <Header></Header>

         <div className='flex justify-center'>

            <div className=' h-screen w-10/12 flex mt-20'>
                   {/* left nav */}
                   <div className='w-3/12  h-screen hidden lg:block md:block'>

                       <Leftnav></Leftnav>
                   </div>
                   
                   {/* content space */}
                   <div className='lg:w-9/12 w-full h-screen'>

                   {children}

                   </div>

            </div>
            

         </div>


            
            

         <Footer></Footer>

         </SessionP>

         

          
           
         <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        </body>
        <GoogleAnalytics gaId="G-8ZE3BKYCZV" />
    </html>
  )
}