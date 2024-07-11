import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers';


// Radix UI themes
import { Theme, Button, Flex, Text, Section, Box } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';
import { ThemeProv } from './_components/ThemeProvider';

import { RxHome } from "react-icons/rx";


import style from './layout.module.css'

// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from './auth'
import Nav from './_components/navigation/nav';
import NavBar from './_components/navigation/navBar';

//global css
import './globals.css'


const inter = Inter({
   weight: '800',
   subsets: ['latin'] });



export const metadata: Metadata = {
  title: 'Nature Dopes | Wild Flower Data | Nature Preservation | Nature Map',
  description: 'Nature Dopes ',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session: any = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
       
      </head>
      <body>
       
      <Providers> 
        <ThemeProv attribute='class'
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <Theme data-is-root-theme='False' accentColor='grass' grayColor='mauve' scaling='100%'>
            <NavBar session={session} />
          
            {children}
        
            </Theme>
          </ThemeProv>
        </Providers>
      
      
      
      </body>
  
    </html>
  )
}
