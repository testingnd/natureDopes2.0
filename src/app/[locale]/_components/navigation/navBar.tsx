'use client'

import React from "react"

import style from '../../layout.module.css'

import Nav from "./nav";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "../languageSwitcher";
import { LoginButton, LogoutButton } from '../../auth'

// radix ui elements
import { Text, Box, Link, Flex } from "@radix-ui/themes";

import { Session } from "next-auth";

// icons & images
import { RxHome } from "react-icons/rx";
import Image from "next/image";
import logowob from '../../../../../public/images/Naturedopes-logo-removebg-preview.png'

import { useTranslations } from "next-intl";

import { useTheme } from "next-themes";


export default function NavBar({session, locale}: {session: Session | null, locale: string}){

  const t = useTranslations('Navigation')

 
  
    return(

        <div className={style.layoutNav}  >
              <Flex justify='start'  gap='3'>

                <Flex pl='3' align='center' display={{initial: 'none', xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex'}} className={style.logoContainer}>
                  {/*<Image 
                    src={logoMini}
                    width={100}
                    height={90}
                    alt='Nature dopes logo'
                  />*/}
                   <Text color='green'><Link href='/'>
                   <Image src={logowob} width={48} alt='Nature Dopes Logo'/>
                   </Link></Text>
                                                           
                </Flex>

                <Flex align='center' pl='1'>

                  {!session? <LoginButton />:<LogoutButton />  }

                  {session? <Box pl='4px' ><Text >{t('user')} {session.user.name}</Text></Box>: null }
                </Flex>


              </Flex>


              <section className={style.navUserSection}>
                <div>
                  <Nav />
               
                </div>
                {/*<div>
                  <Text color='grass'><a href='/'><RxHome size={30}/></a></Text>
                 
                </div>*/}
                <div>
                   <ThemeSwitcher />
                </div>
                <div>
                  <LanguageSwitcher locale={locale} />
                </div>
              
              </section>
            
          
          </div>
    )
}