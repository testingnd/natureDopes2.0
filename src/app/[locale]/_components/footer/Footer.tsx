import React from "react";

import Link from "next/link";
import Image from "next/image";

import { Box, Flex, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

import { TranslationTypes } from "../../layout";
import style from './footer.module.css'

import { Genos, Indie_Flower } from "next/font/google";


import logoMid from "../../../../../public/images/logo_mid.png"

const genos = Genos({weight: ["500"] , subsets: ['latin']}) 

const indie = Indie_Flower({
    weight: ['400'],
    subsets: ['latin'],
    
    
  })

export default function Footer(){

    const t = useTranslations("Footer")
    return (
    
    <Box width='99vw' height='10vh' mt='9' >

        <Flex justify='center' align='center' pr='3'>
            <Image
                src={logoMid}
                alt='Nature dopes logo'
                width= {50}
                height={50}

            
            />
            <Text className={indie.className} style={{color: "#5B9240"}} >Nature Dopes</Text>
        </Flex>

        <Flex justify='center'>
            <Text>{t("awattsdev")} <Link href='https://www.awattsdev.eu' target="_blank"><Text className={` ${genos.className} ${style.wattsLink}`}> awattsdev</Text></Link></Text >
        </Flex>
       


    </Box>
   
  
    )
}