'use client'

import React from "react"

import style from '../../layout.module.css'

import Nav from "./nav";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "../languageSwitcher";
import { LoginButton, LogoutButton } from '../../auth'

// radix ui elements
import { Text, Box, Link } from "@radix-ui/themes";

import { sessionTypes } from "../../_lib/sessionTypes";

// icons & images
import { RxHome } from "react-icons/rx";
import Image from "next/image";
import logowob from '../../../../../public/images/Naturedopes-logo-removebg-preview.png'



import {TranslationTypes} from '../../layout'

import { useTheme } from "next-themes";


export default function NavBar({session, locale, translationProps}: {session: sessionTypes , locale: string, translationProps: TranslationTypes }){

  const {theme} = useTheme()
  console.log(theme)
    return(

        <div className={style.layoutNav} data-theme={theme} >
              <div className={style.navUserSection}>

                <div className={style.logoContainer}>
                  {/*<Image 
                    src={logoMini}
                    width={100}
                    height={90}
                    alt='Nature dopes logo'
                  />*/}
                   <Text color='green'><Link href='/'>
                   <Image src={logowob} width={48} alt='Nature Dopes Logo'/>
                   </Link></Text>
                                                           
                </div>

                <div>

                  {!session? <LoginButton translationProps={translationProps} />:<LogoutButton translationProps={translationProps}  />  }
             
                  {session? <Box pl='4px' ><Text >{translationProps.user} {session.user.name}</Text></Box>: null }
                </div>
                
              
              </div>
            
              
              <section className={style.navUserSection}>
                <div>
                  <Nav translationProps={translationProps} />
               
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