'use client'

import ndLogo from '../../../../public/images/Naturedopes-logo.jpg'
import Image from 'next/image'
import styles from '../layout.module.css'
import {motion} from 'framer-motion'

import { Flex } from '@radix-ui/themes'



export default function LoadingIcon(){

    return(

    <Flex justify='center' width='80%' mb='9' pb='5' pt='5'> 
    <motion.div className={styles.animateCont} 
        animate={{scale: 1.2}}
        transition={{
          duration: 1,
          repeat: Infinity }}
        >

          <Image
               src={ndLogo}
                alt='Nature Dopes Logo, mini'
                width={200}
                style={{  
                    
                    height: 'auto',
                    borderRadius: '10%'
                }} />    

      </motion.div>
      </Flex> 

    )
}