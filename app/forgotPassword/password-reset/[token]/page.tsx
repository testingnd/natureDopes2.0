import { redirect } from "next/navigation";


import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";

import {prisma} from '@/app/prisma'

import { hash } from "bcrypt";


export default function ResetPassword({
    params, 
} : {
    params: {token: string}
}
){

    async function resetPassword(data: FormData){
        'use server'

        const password = data.get('password')
        const confirmPassword = data.get('confirm')

        if(!password || typeof password !== "string" || password !== confirmPassword){
            return{
                error: 'The passwords did not match, please try again '
            }

        }

        const passwordResetToken = await prisma.passResetToken.findUnique({
            where: {
                token: params.token,
                CreatedAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4)},
            }
        }) 
    }

    return(
        <Theme accentColor="grass" >     
        <main>
            <Card>
                <Flex gap='4' direction='column' asChild>
                    <form action={undefined}>
                        <h1>Choose a new password</h1>
                        <TextField.Root 
                        name="Password"
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
                        <Button>Reset Password</Button>
                        
                    </form>



                </Flex>

            </Card>


        </main>
        </Theme> 



    )
}