
'use client'

import React from "react";

import { Text, Flex, Box } from "@radix-ui/themes";

import ContactForm from "./contact/ContactForm";
import About from "./about/About";



import { Fade } from 'react-awesome-reveal'

export default function HomeContent({session}: {session: null | undefined | number}){


     return (

       
        <Fade direction="up">
        <Flex>
            <ContactForm session={session}/>
        </Flex>
      
        <Flex justify='center'>
            <About/>
        </Flex>
        </Fade>
        
     )

}