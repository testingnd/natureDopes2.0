'use client'

import { Theme, Button, Flex } from '@radix-ui/themes'


import { signIn, signOut } from "next-auth/react"
import { TranslationTypes } from './layout';

export const LoginButton = ({translationProps}: {translationProps: TranslationTypes}) => {

    return (<Flex><Button size={{xs: '1', sm: '1', md: '2', lg: '2'}} variant='surface' onClick={ () => signIn()}>{translationProps.signin}</Button></Flex>)
}

export const LogoutButton = ({translationProps}: {translationProps: TranslationTypes}) => {

    

    return(<Flex><Button variant='surface' size={{xs: '1', sm: '1', md: '2', lg: '2'}} onClick={() => signOut()}> {translationProps.signout}</Button></Flex>)

}

