'use client'

import { useState } from "react";

import { submitContactForm } from "@/app/_lib/serverActions/submitContactForm";

import { Box, Card, Heading, Text, Flex, TextField, TextArea } from "@radix-ui/themes";



export default function ContactForm({session}) {


    return  (

        <Box>
            <Card size='5' variant="surface">
                <form action={submitContactForm}>  
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
                             
                             
                            <Text>{session.user.id}</Text>
                        </Flex>
                       
                    
                    </Flex>
                   



                </form>

            </Card>


        </Box>

    )
}