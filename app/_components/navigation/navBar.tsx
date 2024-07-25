'use client'

import React from "react"

import style from '../../layout.module.css'

import { LoginButton, LogoutButton } from '../../auth'

import { Text } from "@radix-ui/themes";
import { useTheme } from "next-themes"

import Nav from "./nav";

import { RxHome } from "react-icons/rx";
import { CiLight, CiDark } from "react-icons/ci";




export default function NavBar({session}){

  const { theme, setTheme } = useTheme()
  const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light')

    return(

        <nav className={style.layoutNav}>
              <section className={style.navUserSection}>
             
            
              {!session? <LoginButton/>:<LogoutButton/>  }
             
              {session? <div><Text color='grass'>Logged in as: {session.user.name}</Text></div>: null }
              
              </section>
            
              
              <section className={style.navUserSection}>
                <div>
                  <Nav/>
               
                </div>
                <div>
                  <Text color='grass'><a href='/'><RxHome size={30}/></a></Text>
                 
                </div>
                <div>
                   <button onClick={toggleMode}> {theme == 'light'? <CiDark color="black" size={30} />:<CiLight  size={30} />} </button>
                </div>
              
              </section>
            
          
          </nav>
    )
}