

import { Text, Flex, Box } from "@radix-ui/themes";
import React from "react";

import { useTheme } from "next-themes";

import style from '../homecontent.module.css'

export default function About(){

    const {theme} = useTheme()

    return (
        
        <Box width='80%' className={style.aboutWrapper} data-theme={theme} >
            
            <Text>
            Welcome to Naturedopes. We are based in Western Europe so the majority of resources found here relate to the natural Flora found in this region and the appreciation of them.
            </Text>
            <Text>
            No matter where you stand on Climate issues, few can argue that as our civilisation expands, our natural spaces are diminishing to make room. Be that in the form of fields for modern agriculture, logging practices or land for new homes. More needs to be done to protect our natural spaces. The more space we lose the more species we lose with it.
            </Text>
            <Text>
            On this site, we believe that for people to appreciate nature, then first you have to understand it. Be that the tallest tree outside your window, or the smallest flower at the side of the road. This site is a mix of art & education, flowers and trees are identified in all our posts. In the hope that a working knowledge of all species can be passed on to whoever wishes to learn. 
            </Text>


        </Box>


    )
}
