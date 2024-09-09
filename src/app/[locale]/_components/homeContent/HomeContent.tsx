
'use client'

import React from "react";

import { Text, Flex, Box } from "@radix-ui/themes";

import ContactForm from "./contact/ContactForm";
import About from "./about/About";



import { Fade } from 'react-awesome-reveal'

export default function HomeContent({session}: {session: null | undefined | number}){


     return (

       
        <Fade direction="up">
          
            <Box width='100%' style={{backgroundColor: 'white', zIndex: '4'}}>
                <Flex justify='center' mt='8'>
                    <About/>
                </Flex>
            </Box>

            <Box width='100%' >
                <Flex >
                    <ContactForm session={session}/>
                </Flex>
            </Box> 
            
        </Fade>
        
     )

}