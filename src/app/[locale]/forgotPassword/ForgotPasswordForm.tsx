'use client'

import { useState } from "react";

import {sendPasswordReset} from './_sendPasswordReset'

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField, Box } from "@radix-ui/themes";
import {SubmitButton} from '../_components/buttons/SubmitButton' 
import styles from './passwordStyles.module.css'



export default  function ForgotPassword(){



    const [error, setError] = useState<string>('')

    const submit = async (data: FormData) => {
        const { error } = await sendPasswordReset(data)
        setError(error)
      }

    return(
        
        
        <Flex justify='center' pt='8'>
        <Box width={{xs: '80vw', sm: '80vw', md: '50vw', lg: '50vw' , xl: '50vw'}}>
            
            <Card size='4' variant="classic" style={{boxShadow: 'var(--shadow-5)'}} >
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
        </Box>
        </Flex>
       
    )
}