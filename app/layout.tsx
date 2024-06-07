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
  title: 'Nature Dopes - Flower Finder',
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
      
      <body>
       
      <Providers>   
         
          <nav className={style.layoutNav}>
              <section>
              <Theme data-is-root-theme='False' accentColor='grass'>
              
              {!session? <LoginButton/>:<LogoutButton/>  }
              </Theme>
              {session? <pre>Logged in as {JSON.stringify(session)}</pre>: null }
              </section>
              
              <section className={inter.className}>
                <a href='https://www.naturedopes.com'>Main Site</a>
              </section>
               
          
          </nav>
         
            {children}
        </Providers>
      
      
      
      </body>
  
    </html>
  )
}
