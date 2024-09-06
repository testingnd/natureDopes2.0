
import styles from './finderPage.module.css'
import React, { JSXElementConstructor } from 'react'


import Link from 'next/link'
import Image from 'next/image'

import ndLogo from '../../../../public/images/logo_mid.png'

import { Indie_Flower } from 'next/font/google'


import { Button, Text} from '@radix-ui/themes'
import { SubmitButton } from '../_components/buttons/SubmitButton'



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
        
        
        <section className={styles.rootPageSection}>
            <Text size='4'> Welcome to the Nature Dopes mini-game <span className={indie.className} style={{color: '#5B9240', fontWeight: '800', fontSize: '1.1em'}}>'Flower finder'</span></Text>
            <Text size='4'> <br /> While out in Nature, see if you can find each flower then answer a question for each</Text>
            <Text size='4'> <br /> Click Go to begin </Text>
            <Link className={styles.finderLink} href="/finder/game">
              <SubmitButton>Go!</SubmitButton>
            </Link>
              
              
          
                  
        </section>
      
            
    </main>
 
 
  )

  //change to objects to align with Typescript (oop)
}
