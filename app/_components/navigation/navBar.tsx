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
import logoMid from "@/public/images/logo_mid.png"





export default function NavBar({session}){

  const { theme, setTheme } = useTheme()
  const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light')

    return(

        <div className={style.layoutNav}>
              <section className={style.navUserSection}>

                <div>
                  <Image 
                    src={logoMid}
                    width={100}
                    height={100}
                    alt='Nature dopes logo'
                  />
                </div>

                {!session? <LoginButton/>:<LogoutButton/>  }
             
                {session? <Box><Text color='grass'>Logged in as: {session.user.name}</Text></Box>: null }
              
              </section>
            
              
              <section className={style.navUserSection}>
                <div>
                  <Nav/>
               
                </div>
                <div>
                  <Text color='grass'><a href='/'><RxHome size={30}/></a></Text>
                 
                </div>
                <div>
                   <button onClick={toggleMode}> {theme != 'dark'? <CiDark size={30} />:<CiLight  size={30} />} </button>
                </div>
              
              </section>
            
          
          </div>
    )
}