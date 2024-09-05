'use client'

import React from "react";
import Link from "next/link";

import {registerUser} from './_registerPageAction'


import { Card, Flex, TextField, Box, Heading, Avatar, Text} from "@radix-ui/themes";
import {RegisterSubmitButton} from '../_components/buttons/RegisterSubmitButton' 
import styles from './register.module.css'


export default function RegisterPage(){

    const [ error, setError] = React.useState<string | undefined>('')
    const [success, setSuccess] = React.useState<string| undefined>('')

    const submit = async (data: FormData) => {
        const {error, success} = await registerUser(data)
        setError(error)
        setSuccess(success)
    }

    return(
        
        <Flex justify='center' pt='8'> 
            <Box width={{xs: '80vw', sm: '80vw', md: '50vw', lg: '50vw' , xl: '50vw'}}>
            <Card size='5' variant="classic" style={{boxShadow: 'var(--shadow-5)'}}>
                <Flex gap='3' direction='column' justify='center' >
                    <Flex gap='3' align='center' justify='center' direction='column' >
                        <Avatar size='5'  src='../../../images/logoMini.png' fallback='N'/>
                        <Heading> Create new account </Heading>
                    </Flex>
                    
                    <Flex gap ='3' direction='column' asChild>
                        <form action={submit}>
                            <TextField.Root size='3' placeholder="Username" name='Username' />
                            <TextField.Root size='3' placeholder="Email" name='Email' type='email' />
                            <TextField.Root size='3' placeholder="Password" name='Password' type='password' />
                            <TextField.Root size='3' placeholder="Confirm Password" name='Confirm' type='password' />
                            <RegisterSubmitButton>Register</RegisterSubmitButton>
                        </form>
                    </Flex>        
                </Flex>
                {error && <p className={styles.errorMessages}>{error}</p>}
                { success && <p className={styles.successMessage}>{success}</p>}         
                <div className={styles.backToSignIn}>
                    <h3>Have an account already?</h3>
                    <Link href='/api/auth/signin' ><Text ml='2' color='blue'>Sign in</Text></Link>
                </div>
            </Card>
            </Box>
       </Flex>
         

    )
}