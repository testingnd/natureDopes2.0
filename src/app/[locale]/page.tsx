
import style from './layout.module.css'
import './globals.css'
import React, { JSXElementConstructor } from 'react'



import HomeContent from './_components/homeContent/HomeContent'
import Splash from './_components/homeContent/Splash'


import { Indie_Flower } from 'next/font/google'
import { Box, Flex, Section, Text } from '@radix-ui/themes'

// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './_lib/authOptions'

import { useTheme } from 'next-themes';


import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'



export default async function Page() {

  const session = await getServerSession(authOptions)

  const messages = await getMessages()
 
  return(
  
      
    <Flex pt='8' justify='center' direction='column' align='center' className={style.homePageWrapper} >
          
          <Splash />
          <NextIntlClientProvider  messages={messages}>
          
            <HomeContent session={session} />
          </NextIntlClientProvider>
          
    </Flex>
            
  
 
 
  )

  //change to objects to align with Typescript (oop)
}
