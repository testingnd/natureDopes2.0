'use client'

import { Theme, Button, Flex } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';

import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {

    return (<Flex><Button onClick={ () => signIn()}>Sign In</Button></Flex>)
}

export const LogoutButton = () => {

    

    return(<Flex><Button onClick={() => signOut()}> Sign Out</Button></Flex>)

}

