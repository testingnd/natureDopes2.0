'use client'

import Link from "next/link";
import { useState } from "react";

import {sendPasswordReset} from './_sendPasswordReset'

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";
import {SubmitButton} from '../components/buttons/SubmitButton' 
import styles from './passwordStyles.module.css'


export default function ForgotPassword(){

    const [error, setError] = useState<string>('')

    const submit = async (data: FormData) => {
        const { error } = await sendPasswordReset(data)
        setError(error)
      }

    return(
        
        <main>
         <Theme accentColor="grass" >     
            <Card>
                <Flex gap='4' direction='column' asChild>
                    <form action={submit}>
                        <h1> Reset Password</h1>
                        <p>Enter your email address here, a link will be sent to your inbox, click the link to reset your password</p>

                        <TextField.Root 
                        name='email' 
                        type='email' 
                        size='3' 
                        placeholder='Your email...'
                        />
                        {error && <p className={styles.errorMessage}>{error}</p>}
                        <SubmitButton>Send</SubmitButton>
                        
                    </form>


                </Flex>

            </Card>
        </Theme> 
        </main>
       
    )
}