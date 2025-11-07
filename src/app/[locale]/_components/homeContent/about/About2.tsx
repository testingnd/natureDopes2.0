'use client'

import { Text, Flex, Box } from "@radix-ui/themes";
import React from "react";
import { useTheme } from "next-themes";

import style from '../homecontent.module.css'

import { CiMap } from "react-icons/ci";
import { RiGalleryView } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";

import { useTranslations } from "next-intl";



export default function About2(){

    const t = useTranslations('Home.About2')

    return (

        <Box width='80%'  >
            <Flex align='center'>
            <Text  className={style.about2Text} size='9' align='center'><RiUser3Line/></Text>
                <Text  className={style.about2Text} ml='3'>
                    {t('user')}
                </Text>
            </Flex>
                <br /><br />
            <Flex align='center'>
                <Text  className={style.about2Text} size='9' align='center'><CiMap /></Text>
                <Text  className={style.about2Text} ml='3'>
                {t('map')}
                </Text>
            </Flex>
                  <br /><br />
            <Flex align='center'>
                 <Text  className={style.about2Text} size='9' align='center'><RiGalleryView /></Text>
                 <Text  className={style.about2Text} ml= '3'>
                   {t('gallery')}
                </Text>
            </Flex>
           
      
            
            
           


        </Box>

    )}