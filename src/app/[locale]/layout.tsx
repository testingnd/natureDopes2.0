import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers';

import '@radix-ui/themes/styles.css';
// Radix UI themes
import { Theme} from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes';
//global css

import { Analytics } from "@vercel/analytics/react"


import './globals.css'



// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './_lib/authOptions';

import NavBar from './_components/navigation/navBar';
import Footer from './_components/footer/Footer';

import { useTheme } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({
   weight: '800',
   subsets: ['latin'] });



export const metadata: Metadata = {
  title: 'Nature Dopes | Wild Flower Data | Nature Preservation | Nature Map',
  description: 'Nature Dopes ',
}

export default async function RootLayout({
  children, params: {locale}
}: {
  children: React.ReactNode, params: {locale: string}
}) {

  const session = await getServerSession(authOptions)
  const messages = await getMessages()



  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Nature Dopes - Dedicated to preserving nature</title>
        
      </head>
      <body >
       
      <Providers>
        <NextIntlClientProvider messages={messages}>
         <ThemeProvider
              attribute='class'
              enableSystem={false}
              disableTransitionOnChange
              >
           <Theme data-is-root-theme='false' accentColor='green' grayColor='sage' scaling='100%' panelBackground='solid' >


            <NavBar session={session} locale={locale} />

            {children}

            <Footer />
            <Analytics />
          </Theme>
         </ThemeProvider>
        </NextIntlClientProvider>
      </Providers>
      
      
      
      </body>
  
    </html>
  )
}
