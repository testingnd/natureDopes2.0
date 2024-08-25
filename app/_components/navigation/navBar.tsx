'use client'

import React from "react"

import style from '../../layout.module.css'

import Nav from "./nav";
import { LoginButton, LogoutButton } from '../../auth'

// radix ui elements
import { Text, Box } from "@radix-ui/themes";
// to allow theme change
import { useTheme } from "next-themes"

import Image from "next/image";

// icons & images
import { RxHome } from "react-icons/rx";
import { CiLight, CiDark } from "react-icons/ci";
import logoMini from "@/public/images/logomini.png"





export default function NavBar({session}){

  const { theme, setTheme } = useTheme()
  const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light')

    return(

        <div className={style.layoutNav}>
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

                  {!session? <LoginButton/>:<LogoutButton/>  }
             
                  {session? <Box pl='4px' size={{xs: '1' ,sm: '1', md: '2', lg: '3', xl: '4'}}><Text color='grass' size={{xs: '1' ,sm: '1', md: '2', lg: '3'}}>User: {session.user.name}</Text></Box>: null }
                </div>
                
              
              </div>
            
              
              <section className={style.navUserSection}>
                <div>
                  <Nav/>
               
                </div>
                {/*<div>
                  <Text color='grass'><a href='/'><RxHome size={30}/></a></Text>
                 
                </div>*/}
                <div>
                   <button onClick={toggleMode}> <CiLight  size={30} /> </button>
                </div>
              
              </section>
            
          
          </div>
    )
}