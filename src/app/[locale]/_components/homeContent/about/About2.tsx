'use client'

import { Text, Flex, Box } from "@radix-ui/themes";
import React from "react";
import { useTheme } from "next-themes";

import style from '../homecontent.module.css'



export default function About2(){


    return (
        
        <Box width='80%'  >
            
            <Text  className={style.about2Text}>
            This site features a Gallery page, a collection of photos of flowers & trees found growing in nature. It is linked directly to our instagram account and is updated regularly.
            </Text>
            <br /><br />
            <Text  className={style.about2Text}>
            There is a Map page, the aim is to allow users to create an account and then post photos of their own finds and their locations. The information will be stored in order to build a working database of where wildflowers & trees are found. The map tool is still in beta testing so please visit the page and test it out
            </Text>
            <br /><br />
            <Text className={style.about2Text}>
            There are links to our other social media activities and an email address to contact us directly.
            </Text>


        </Box>

    )}