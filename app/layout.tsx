import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers';
import { Theme } from '@radix-ui/themes'

import '@radix-ui/themes/styles.css';
import './globals.css'


const inter = Inter({
   weight: '800',
   subsets: ['latin'] });



export const metadata: Metadata = {
  title: 'Nature Dopes - Flower Finder',
  description: 'Nature Dopes - mini-game app - Flower Finder ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Theme>
      <body>

        <nav>
          <section className={inter.className}>
            <a href='https://www.naturedopes.com'>Main Site</a>
          </section>

        </nav>
        <Providers>
            {children}
        </Providers>
      
      
      
      </body>
      </Theme>
    </html>
  )
}
