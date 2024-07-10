
import styles from './layout.module.css'
import React, { JSXElementConstructor } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import ndLogo from '../public/images/logo_mid.png'
import { Indie_Flower } from 'next/font/google'
import { Box, Flex } from '@radix-ui/themes'






const indie = Indie_Flower({
  weight: '400',
  subsets: ['latin'],
  
})




export default async function Page() {

  return(
  
   
        <Flex pt='8' justify='center' >
          <Flex justify='center' align='center' direction='column' width='40%'>
              <section className={`${indie.className} ${styles.rootPageSection} `}>
                  <h1 className={styles.ndHeadings}> Welcome to Nature Dopes</h1>
                  
                    
                
                        
              </section>
              <section className={`${indie.className} ${styles.logoWrapper} `}>
                      <Flex direction='column' align='center'>
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
                      <h2 className={styles.ndHeadings}>Nature Dopes</h2>
                      </Flex>
              </section>
            
            
           
          </Flex>
      </Flex>
            
  
 
 
  )

  //change to objects to align with Typescript (oop)
}
