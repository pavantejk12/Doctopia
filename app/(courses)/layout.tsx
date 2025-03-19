import { GoogleAnalytics } from '@next/third-parties/google'

import type { Metadata } from 'next'
import localFont from '@next/font/local'

const glory = localFont({
  src: '../../public/Gilroy-Regular.ttf',
  display: 'swap',
  
});

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Courses',
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
