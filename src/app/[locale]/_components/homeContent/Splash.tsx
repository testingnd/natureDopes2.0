import React from "react";

import {useTranslations} from 'next-intl'
import Image from "next/image";

import { Box, Flex, Section, Text } from '@radix-ui/themes'
import { Indie_Flower } from 'next/font/google'
import styles from '../../layout.module.css'

import ndLogo from '../../../../../public/images/logo_mid.png'


const indie = Indie_Flower({
    weight: '400',
    subsets: ['latin'],
    
  })

export default function Splash(){

    const translated = useTranslations("Home");

    return(

       
          <Box height='80vh' width='40%' mt='8'>
          <Flex justify='center' align='center' direction='column' >
              <section className={`${indie.className} ${styles.rootPageSection} `}>
                  <h1 className={styles.ndHeadings}> {translated("title")}</h1>
                  
                    
                
                        
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

    )
}