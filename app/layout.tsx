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
import Nav from './_components/navigation/nav';

import '@radix-ui/themes/styles.css';
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
          <Theme data-is-root-theme='False' accentColor='grass'>
          <nav className={style.layoutNav}>
              <section className={style.navUserSection}>
             
            
              {!session? <LoginButton/>:<LogoutButton/>  }
             
              {session? <div><p>Logged in as: {session.user.name}</p></div>: null }
              
              </section>
            
              
              <section className={style.navUserSection}>
                 <div>
                  <Nav/>
                </div>
                <div><a href='https://www.naturedopes.com'>Main Site</a></div>
              </section>
            
          
          </nav>
          </Theme>
            {children}
        </Providers>
      
      
      
      </body>
  
    </html>
  )
}
