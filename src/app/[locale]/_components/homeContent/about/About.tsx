

import { Text, Flex, Box, Heading} from "@radix-ui/themes";
import React from "react";

import { AbstractIntlMessages, useMessages } from "next-intl";

import style from '../homecontent.module.css'

export default function About(){

   const m: {key: string}= useMessages()

    return (
        
        <Box width='80%' className={style.aboutWrapper} pt='3' pb='3' >
            
            <Heading align='center' mb='6'>{m.Home.About.welcome}</Heading>
            <Text mb='2'>
            {m.Home.About.para1}
            </Text>
            <br /><br />
            <Text mb='2'>
            {m.Home.About.para2}
            </Text>
            <br /><br />
            <Text>
            {m.Home.About.para3}
            </Text>


        </Box>


    )
}
