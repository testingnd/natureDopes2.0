
import styles from './layout.module.css'
import React, { JSXElementConstructor } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ndLogo from '../public/images/logomini.png'
import { Indie_Flower } from 'next/font/google'
import GoButton from './_components/buttons/GoButton'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

import { LoginButton, LogoutButton } from './auth'


const indie = Indie_Flower({
  weight: '400',
  subsets: ['latin'],
  
})




export default async function Page() {

  return(
    <main className={styles.rootPageWrapper}> 
   
      
        <section className={`${indie.className} ${styles.logoWrapper} `}>
                <aside>
                  <Image
                    src={ndLogo}
                    alt='Nature Dopes Logo, mini'
                    width={200}
                    style={{  
                      maxWidth: '100%',
                      height: 'auto'
                    }} />
                  
                </aside>
                <h2>Nature Dopes</h2>
        </section>
        
        
        <section className={`${indie.className} ${styles.rootPageSection} `}>
            <h1> Welcome to Nature Dopes</h1>
            
              
          
                  
        </section>
      
            
    </main>
 
 
  )

  //change to objects to align with Typescript (oop)
}
