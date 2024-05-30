'use client'

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";
import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import styles from '../../passwordStyles.module.css'

import { useState } from "react";

import { resetPassword } from "../_resetPassword";



export default function ResetPassword({
    params, 
} : {
    params: {token: string}
}
){

    const [error, setError] = useState<string>('')

    async function submit(data: FormData) {
      const { error } = await resetPassword(params.token, data)
      setError(error || '')
    }

    return(
        <Theme accentColor="grass" >     
        <main>
            <Card>
                <Flex gap='4' direction='column' asChild>
                    <form action={submit}>
                        <h1>Choose a new password</h1>
                        <TextField.Root 
                        name="password"
                        type="password"
                        size='3'
                        placeholder="Password"
                         />
                        <TextField.Root 
                        name="confirm"
                        type="password"
                        size='3'
                        placeholder="Confirm password"
                         />

                         {error && <p className={styles.errorMessage}>{error}</p>}
                        <SubmitButton>Reset Password</SubmitButton>
                        
                    </form>



                </Flex>

            </Card>


        </main>
        </Theme> 



    )
}