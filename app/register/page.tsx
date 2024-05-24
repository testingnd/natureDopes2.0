'use client'

import React from "react";
import Link from "next/link";

import {registerUser} from './_registerPageAction'

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";
import {SubmitButton} from '../components/buttons/SubmitButton' 
import styles from './register.module.css'


export default function RegisterPage(){

    const [ error, setError] = React.useState<string>('')

    const submit = async (data: FormData) => {
        const {error} = await registerUser(data)
        setError(error)
    }

    return(
        <main>
        <Theme accentColor="grass" >    
            <Card>
                <Flex gap='3' direction='column' >
                    <h1> Create your account </h1>
                    <Flex gap ='2' direction='column' asChild>
                        <form action={submit}>
                            <TextField.Root size='3' placeholder="Username" name='Username' />
                            <TextField.Root size='3' placeholder="Email" name='Email' type='email' />
                            <TextField.Root size='3' placeholder="Password" name='Password' type='password' />
                            <TextField.Root size='3' placeholder="Confirm Password" name='Confirm' type='password' />
                            <SubmitButton>Register</SubmitButton>
                        </form>
                    </Flex>        
                </Flex>
                {error && <p className={styles.errorMessages}>{error}</p>}
                            
                <div className={styles.backToSignIn}>
                    <h3>Have an account already?</h3>
                    <Link href='/api/auth/signin'>Sign in</Link>
                </div>
            </Card>
        </Theme> 
        </main>    

    )
}