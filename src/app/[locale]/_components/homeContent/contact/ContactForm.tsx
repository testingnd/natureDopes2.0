'use client'

import { useState } from "react";
import { useRef } from 'react'

import { submitContactForm } from "@/src/app/[locale]/_lib/serverActions/submitContactForm";

import { Box, Card, Heading, Text, Flex, TextField, TextArea } from "@radix-ui/themes";
import Link from "next/link";
import { SubmitButton } from "../../buttons/SubmitButton";

import { useTheme } from "next-themes";

import { RiInstagramFill } from "react-icons/ri";

import style from '../homecontent.module.css'

export default function ContactForm({session}: {session: null | undefined | number}) {

    const {theme} = useTheme()

    const ref = useRef<HTMLFormElement>(null)

    const [error, setError] = useState<string | undefined>('')
    const [message, setMessage] = useState<string | undefined>('')

    async function submit(data: FormData){

       const {message, error} = await submitContactForm(data)
       if(error){
        setError(error)
       } else {
        setMessage(message)
       }

       ref.current?.reset()


    }


    return  (

        <Box width='100vw' className={style.contactWrapper} data-theme={theme}>
            <Flex justify='center' pt='8' pb='8' gap='2'>
            <Card size='5' variant="classic" >
                <form action={submit} ref={ref}>  
                    <Flex gap='2' direction='column' align='center' width='100%' justify='center'>

                        <Heading size='5'>Please contact Nature Dopes here</Heading>
                        <Flex direction='column' gap='2'>
                            <Box width='200px'>
                                <TextField.Root name='name' size='2' type='text' placeholder="Name"></TextField.Root>
                            </Box>
                            <Box width='200px'>
                                <TextField.Root name='email' type='email' placeholder="Email"></TextField.Root>
                            </Box>
                            <Box width='250px'>
                                <TextArea name='message'  placeholder="Write your message here"></TextArea>
                            </Box>
                             
                             
                            
                            <SubmitButton>Send</SubmitButton>
                            {error? <Text>{error}</Text>:null}
                            {message? <Text>{message}</Text>:null}
                        </Flex>
                       
                    
                    </Flex>
                   



                </form>

            </Card>

            <Card size='5' variant="surface">
                <Flex align='center' justify='center' direction='column' pl='8' pt='8' pb='8' pr='8'>
                    <Heading size='5'>Social Media Links</Heading>
                    <Text ><Link target='_blank' href='https://www.instagram.com/naturedopes/'><RiInstagramFill size={84} /></Link></Text>
                </Flex>

            </Card >

            </Flex>


        </Box>

    )
}