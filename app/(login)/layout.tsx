
import type { Metadata } from 'next'
import localFont from '@next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'

const glory = localFont({
  src: '../../public/Gilroy-Regular.ttf',
  display: 'swap',
  
});

export const metadata: Metadata = {
  title: 'Login',
  description: 'MCQ Login',
  manifest:'/manifest.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${glory.className}`}>
      {children} 
      </body>
      <GoogleAnalytics gaId="G-8ZE3BKYCZV" />
    </html>
  )
}
