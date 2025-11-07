import {Text, Flex, Box, Heading} from '@radix-ui/themes'
import Image from 'next/image'

import Logo from '@/public/images/Naturedopes-logo-removebg-preview.png'

import { useTranslations } from 'next-intl'


export default function InfoSection(){


    const t = useTranslations('Home.InfoSection')

    return (
       <Flex width='80%' justify='center'>
            <Flex justify='center' direction='column'>
                <Heading align='center' mb='5'>
                    {t('enjoy')}
                </Heading>
                <Flex justify='center' pb='5'>
                    <Image
                    src={Logo}
                    width={200}
                    alt='Nature Dopes Logo'
                />
                </Flex>
                <Text align='center' mt='2' >
                    {t('info1')}
                </Text>
                <Text align='center' mt='2' >
                    {t('info2')}
                </Text>


            </Flex>
       </Flex> 
    
)
}