import React from "react";

import {useTranslations} from 'next-intl'
import Image from "next/image";

import { Box, Flex, Section, Text, Heading } from '@radix-ui/themes'
import { Indie_Flower } from 'next/font/google'
import styles from '../../layout.module.css'

import ndLogo from '../../../../../public/images/Naturedopes-logo.jpg'


const indie = Indie_Flower({
    weight: '400',
    subsets: ['latin'],
    
  })

export default function Splash(){

    const translated = useTranslations("Home");

    return(

       <Box p='0' width='100%' height='95vh'>
          <span className={styles.spanwrapper}>
            <span className={styles.spaninside}>

            </span>
          </span>
          <Flex justify='center'>
          <Box height='80vh' width='40%' mt='8' pt='8'>
          <Flex justify='center' align='center' direction='column' >
              <section className={`${indie.className} ${styles.rootPageSection} `}>
                  <Heading size='9' className={`${styles.ndHeadings} ${indie.className}`}> {translated("title")}</Heading>
                  <Heading  size='5' mt='3' className={styles.ndHeadings}>{translated('splashh2')}</Heading>
                    
                
                        
              </section>
              {/*<section className={`${indie.className} ${styles.logoWrapper} `}>
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
            */}
            
           
          </Flex>
          </Box>
          </Flex>
        </Box>
    )
}