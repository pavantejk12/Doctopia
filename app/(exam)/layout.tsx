import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: 'Exam',
  description: 'Test Exam',
}

import '@/css/nextjs/next.css'
import SessionP from '@/components/provider/SessionP';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import localFont from '@next/font/local'

const glory = localFont({
  src: '../../public/Gilroy-Regular.ttf',
  display: 'swap',
  
});
//import Header from '@/components/Home/Header';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <SessionP session={session}>
      {/* <Header></Header> */}
      <body className={`${glory.className}`}>{children}</body>
      </SessionP>
      <GoogleAnalytics gaId="G-8ZE3BKYCZV" />
    </html>
  )
}
