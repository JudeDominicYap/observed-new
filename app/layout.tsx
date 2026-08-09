import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--geist-mono' })

export const metadata: Metadata = {
  title: 'Jude Dominic Yap | Engineering Portfolio',
  description: 'The portfolio of Jude Dominic Yap, an aspiring engineer and STEM student exploring programming and emerging technologies.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101411',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
