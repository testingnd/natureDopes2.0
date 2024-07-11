'use client'

import React from "react"

import style from '../../layout.module.css'


import { LoginButton, LogoutButton } from '../../auth'

import { Text } from "@radix-ui/themes";

import Nav from "./nav";

import { RxHome } from "react-icons/rx";



export default async function NavBar({session}){


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
                <div><Text color='grass'><a href='/'><RxHome size={30}/></a></Text></div>
              </section>
            
          
          </nav>
    )
}