import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers';


// Radix UI themes
import { Theme} from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes';
//global css


import './globals.css'



// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route'

import NavBar from './_components/navigation/navBar';
import Footer from './_components/footer/Footer';

import { getTranslations } from 'next-intl/server';

import { useTheme } from 'next-themes';

const inter = Inter({
   weight: '800',
   subsets: ['latin'] });



export const metadata: Metadata = {
  title: 'Nature Dopes | Wild Flower Data | Nature Preservation | Nature Map',
  description: 'Nature Dopes ',
}

export interface TranslationTypes { 
  [key: string]: string;
}

export default async function RootLayout({
  children, params: {locale}
}: {
  children: React.ReactNode, params: {locale: string}
}) {

  const session: any = await getServerSession(authOptions)

  const t = await getTranslations("Navigation")
  const tf = await getTranslations("Footer")


  const translationProps: TranslationTypes = {
    user: t('user'),
    signin: t('signin'),
    signout: t('signout'),
    map: t('NavMenu.map'),
    gallery: t('NavMenu.gallery'),
    play: t('NavMenu.play')

  }

  const translationPropsFooter: TranslationTypes = {
    poweredBy: tf('awattsdev')
  }



  return (
    <html lang={locale} suppressHydrationWarning>
      <head>

        
      </head>
      <body >
       
      <Providers> 
         <ThemeProvider
              attribute='class'
              enableSystem={false}
              disableTransitionOnChange
              >
          <Theme data-is-root-theme='true' accentColor='grass' grayColor='sage' scaling='100%' panelBackground='solid' >
           
            
            <NavBar translationProps={translationProps} session={session} locale={locale} />
          
            {children}

            <Footer translationPropsFooter={translationPropsFooter} />
           
          </Theme>
         </ThemeProvider>
      </Providers>
      
      
      
      </body>
  
    </html>
  )
}
