
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Admin',
  description: 'Ecommerce management',
  manifest:'/manifest.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {children} 
      </body>
    </html>
  )
}
