import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers';


// Radix UI themes
import { Theme} from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';
import { ThemeProv } from './_components/ThemeProvider';

import style from './layout.module.css'

// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route'

import NavBar from './_components/navigation/navBar';
import Footer from './_components/footer/Footer';

import { getTranslations } from 'next-intl/server';


//global css
import './globals.css'
import { signOut } from 'next-auth/react';


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

  const translationProps: TranslationTypes = {
    user: t('user'),
    signin: t('signin'),
    signout: t('signout'),
    map: t('NavMenu.map'),
    gallery: t('NavMenu.gallery'),
    play: t('NavMenu.play')

  }

  return (
    <html lang={locale}>
      <head>
       
      </head>
      <body>
       
      <Providers> 
        <ThemeProv attribute='class'
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <Theme data-is-root-theme='False' accentColor='grass' grayColor='sage' scaling='100%'>
            <NavBar translationProps={translationProps} session={session} locale={locale} />
          
            {children}

            <Footer />
          </Theme>
        </ThemeProv>
      </Providers>
      
      
      
      </body>
  
    </html>
  )
}
