

import { Text, Flex, Box, Heading} from "@radix-ui/themes";
import React from "react";

import { useTranslations } from "next-intl";

import style from '../homecontent.module.css'

export default function About(){

   const t = useTranslations('Home.About')

    return (

        <Box width='80%' className={style.aboutWrapper} pt='3' pb='3' >

            <Heading align='center' mb='6'>{t('welcome')}</Heading>
            <Text mb='2'>
            {t('para1')}
            </Text>
            <br /><br />
            <Text mb='2'>
            {t('para2')}
            </Text>
            <br /><br />
            <Text>
            {t('para3')}
            </Text>


        </Box>


    )
}
