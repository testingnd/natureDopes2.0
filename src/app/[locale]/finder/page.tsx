
import styles from './finderPage.module.css'
import React, { JSXElementConstructor } from 'react'


import Link from 'next/link'
import Image from 'next/image'

import ndLogo from '../../../../public/images/logo_mid.png'

import { Indie_Flower } from 'next/font/google'
import GoButton from '../_components/buttons/GoButton'


import { Button } from '@radix-ui/themes'



const indie = Indie_Flower({
  weight: '400',
  subsets: ['latin'],
  
})




export default  function Page() {

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
                      height: 'auto',
                      borderRadius: '10%'

                    }} />
                    
                  
                </aside>
                <h2>Nature Dopes</h2>
        </section>
        
        
        <section className={`${indie.className} ${styles.rootPageSection} `}>
            <h1> Welcome to the Nature Dopes mini-game <span style={{color: '#5B9240', fontWeight: '800'}}>'Flower finder'</span></h1>
            <h2> <br /> While out in Nature, see if you can find each flower then answer a question for each</h2>
            <h3> <br /> Click Go to begin </h3>
            <Link className={styles.finderLink} href="/finder/game">
              <Button>Go!</Button>
            </Link>
              
              
          
                  
        </section>
      
            
    </main>
 
 
  )

  //change to objects to align with Typescript (oop)
}
