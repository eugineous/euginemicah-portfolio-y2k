import type { Metadata } from 'next'
import { Playfair_Display, Space_Grotesk, DM_Mono, Lora, Inter } from 'next/font/google'
import './globals.css'
import { LenisProvider } from '@/components/global/LenisProvider'
import { CurtainTransition } from '@/components/global/CurtainTransition'
import { GoldCursor } from '@/components/global/GoldCursor'
import { Nav } from '@/components/global/Nav'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eugine Micah — The Roylandz Universe',
  description: 'Media Entrepreneur & Storytelling Strategist. Head of Digital @ PPP TV Kenya. Born Broke. Built Loud.',
  keywords: ['Eugine Micah', 'Roylandz', 'PPP TV', 'Urban News', 'ProPost', 'Nairobi', 'Media Entrepreneur'],
  authors: [{ name: 'Eugine Micah' }],
  creator: 'Eugine Micah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://euginemicah.com',
    title: 'Eugine Micah — The Roylandz Universe',
    description: 'Media Entrepreneur & Storytelling Strategist. Born Broke. Built Loud.',
    siteName: 'The Roylandz Universe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eugine Micah — The Roylandz Universe',
    description: 'Media Entrepreneur & Storytelling Strategist. Born Broke. Built Loud.',
    creator: '@euginemicah',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceGrotesk.variable} ${dmMono.variable} ${lora.variable} ${inter.variable}`}
    >
      <body>
        <LenisProvider>
          <GoldCursor />
          <Nav />
          <CurtainTransition>
            {children}
          </CurtainTransition>
        </LenisProvider>
      </body>
    </html>
  )
}
