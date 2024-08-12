
import styles from './layout.module.css'
import React, { JSXElementConstructor } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import ndLogo from '../public/images/logo_mid.png'
import HomeContent from './_components/homeContent/HomeContent'


import { Indie_Flower } from 'next/font/google'
import { Box, Flex, Section, Text } from '@radix-ui/themes'

// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route'





const indie = Indie_Flower({
  weight: '400',
  subsets: ['latin'],
  
})




export default async function Page() {

  const session = await getServerSession(authOptions)


  return(
  
      
        <Flex pt='8' justify='center' direction='column' align='center'  >
          <Box height='80vh' width='40%' mt='8'>
          <Flex justify='center' align='center' direction='column' >
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
                            height: 'auto',
                            borderRadius: '10%'
                          }} />
                        
                      </aside>
                      
                      </Flex>
              </section>
            
            
           
          </Flex>
          </Box>
          
          <HomeContent session={session} />
          
          <Flex height='500px'align='end'>
            <Flex >
              <Text>Footer</Text>
            </Flex>
              
          </Flex>
      </Flex>
            
  
 
 
  )

  //change to objects to align with Typescript (oop)
}
