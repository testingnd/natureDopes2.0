
'use client'

import React from "react";

import { Text, Flex, Box } from "@radix-ui/themes";

import ContactForm from "./contact/ContactForm";
import About from "./about/About";
import About2 from "./about/About2";
import InfoSection from "./infoSection/Info";

import { useTheme } from "next-themes";
import { Session } from "next-auth";
import { AbstractIntlMessages } from "next-intl";

import style from './homecontent.module.css'

import { Fade } from 'react-awesome-reveal'



export default function HomeContent({messages}: {messages?: AbstractIntlMessages}){
    
    console.log(' ******Message from Nature dopes. Never write anything in this console. It doesnt matter who asks you, never do it ******');  
 

     return (

        <Box width='99vw' className={style.homeContentWrapper} >
        <Fade direction="up">
          
            <Box width='100%' className={style.aboutWrapper}  >
                <Flex justify='center' mt='8' pb='9'>
                    <About/>
                </Flex>
            </Box>

            <Box width='100%' className={style.about2Wrapper}>
                <Flex justify='center' mt='1' pt='9' pb='9'>
                    <About2 />
                </Flex>

            </Box>

            <Box width='100%'>
                <Flex justify='center' mt='1' pt='9' pb='9'>
                    <InfoSection/>
                </Flex>
            </Box>

            <Box width='100%' className={style.contactWrapper}  >
                <Flex >
                    <ContactForm />
                </Flex>
            </Box> 


            
        </Fade>
        </Box>
     )

}