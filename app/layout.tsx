import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers';


// Radix UI themes
import { Theme, Button, Flex } from '@radix-ui/themes'


import style from './layout.module.css'

// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from './auth'

import '@radix-ui/themes/styles.css';
import './globals.css'


const inter = Inter({
   weight: '800',
   subsets: ['latin'] });



export const metadata: Metadata = {
  title: 'Nature Dopes | Wild Flower Data | Nature Preservation | Nature Map',
  description: 'Nature Dopes - mini-game app - Flower Finder ',
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
         
          <nav className={style.layoutNav}>
              <section className={style.navUserSection}>
              <Theme data-is-root-theme='False' accentColor='grass'>
              
              {!session? <LoginButton/>:<LogoutButton/>  }
              </Theme>
              {session? <div><p>Logged in as: {session.user.name}</p></div>: null }
              
              </section>
              
              <section className={style.navUserSection}>
                <div><a href='https://www.naturedopes.com'>Main Site</a></div>
              </section>
               
          
          </nav>
         
            {children}
        </Providers>
      
      
      
      </body>
  
    </html>
  )
}
