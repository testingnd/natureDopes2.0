'use client'

import { Theme, Button, Flex } from '@radix-ui/themes'


import { signIn, signOut } from "next-auth/react"
import { useTranslations, useLocale } from "next-intl";

export const LoginButton = () => {
    const t = useTranslations('Navigation');
    const locale = useLocale();

    return (<Flex><Button size={{xs: '1', sm: '1', md: '2', lg: '2'}} variant='surface' onClick={ () => signIn(undefined, { callbackUrl: `/${locale}` })}>{t('signin')}</Button></Flex>)
}

export const LogoutButton = () => {
    const t = useTranslations('Navigation');

    return(<Flex><Button variant='surface' size={{xs: '1', sm: '1', md: '2', lg: '2'}} onClick={() => signOut()}> {t('signout')}</Button></Flex>)

}

