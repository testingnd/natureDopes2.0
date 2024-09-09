'use client'

import React from "react"

import style from '../../layout.module.css'

import Nav from "./nav";
import LanguageSwitcher from "../Switcher";
import { LoginButton, LogoutButton } from '../../auth'

// radix ui elements
import { Text, Box } from "@radix-ui/themes";
// to allow theme change
import { useTheme } from "next-themes"

import Image from "next/image";

// icons & images
import { RxHome } from "react-icons/rx";
import { CiLight, CiDark } from "react-icons/ci";
import { NextAuthOptions } from "next-auth";

import {TranslationTypes} from '../../layout'


export default function NavBar({session, locale, translationProps}: {session: NextAuthOptions, locale: string, translationProps: TranslationTypes }){

  const { theme, setTheme } = useTheme()
  const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light')

  const color = theme == 'light' ? 'white': 'black'

    return(

        <div className={style.layoutNav} style={{backgroundColor: color}}>
              <div className={style.navUserSection}>

                <div className={style.logoContainer}>
                  {/*<Image 
                    src={logoMini}
                    width={100}
                    height={90}
                    alt='Nature dopes logo'
                  />*/}
                   <Text color='grass'><a href='/'><RxHome className={style.homeLogo}  /></a></Text>
                </div>

                <div>

                  {!session? <LoginButton translationProps={translationProps} />:<LogoutButton translationProps={translationProps}  />  }
             
                  {session? <Box pl='4px' ><Text>{translationProps.user} {session.user.name}</Text></Box>: null }
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
                   <button onClick={toggleMode}> <CiLight  size={30} /> </button>
                </div>
                <div>
                  <LanguageSwitcher locale={locale} />
                </div>
              
              </section>
            
          
          </div>
    )
}