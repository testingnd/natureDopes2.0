
import style from './layout.module.css'
import React, { JSXElementConstructor } from 'react'



import HomeContent from './_components/homeContent/HomeContent'
import Splash from './_components/homeContent/Splash'


import { Indie_Flower } from 'next/font/google'
import { Box, Flex, Section, Text } from '@radix-ui/themes'

// Next auth  imports
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route'




export default async function Page() {

  const session = await getServerSession(authOptions)


  return(
  
      
    <Flex pt='8' justify='center' direction='column' align='center' className={style.homePageWrapper} >
          
          <Splash />
          <HomeContent session={session} />
          
          
    </Flex>
            
  
 
 
  )

  //change to objects to align with Typescript (oop)
}
