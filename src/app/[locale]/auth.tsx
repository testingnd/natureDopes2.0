'use client'

import { Theme, Button, Flex } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';

import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {

    return (<Flex><Button size={{xs: '1', sm: '1', md: '2', lg: '2'}} variant='surface' onClick={ () => signIn()}>Sign In</Button></Flex>)
}

export const LogoutButton = () => {

    

    return(<Flex><Button variant='surface' size={{xs: '1', sm: '1', md: '2', lg: '2'}} onClick={() => signOut()}> Sign Out</Button></Flex>)

}

