import { redirect } from "next/navigation";


import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";

import {prisma} from '@/app/prisma'


import { hash } from "bcrypt";
import { error } from "console";


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
            console.log('error1')
            return{
            
                error: 'The passwords did not match, please try again '
            }

        }
        console.log('error2')

        const passwordResetToken = await prisma.passResetToken.findUnique({
            where: {
                token: params.token,
                CreatedAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4)},
                resetAt: null,
            }
        }) 

        if(!passwordResetToken){
           
            return{
                error: 'Invalid token reset request. Your token may have expired, in this case please restart the process. If the problem persists please reach out to us'
            }
        }

        const encrypted = await hash(password, 10)
        console.log('error3')
        const updateUser = prisma.users.update({
            where: {
                id: passwordResetToken.userId,
            },
            data: {
                password: encrypted,
            }
        })

        const updateToken = prisma.passResetToken.update({
            where: {
                id: passwordResetToken.id,
            },
            data: {
                resetAt: new Date(),
            }
        })

        console.log('1')
        try {
            await prisma.$transaction([updateUser, updateToken])
        } catch(err) {
            console.log(err)
            return {
                error: 'An unexpected error has occured, please retry. If the problem persists please reach out to us.'
            }
        }
        console.log('2')

        redirect('/forgotPassword/successpassReset')


    }

    return(
        <Theme accentColor="grass" >     
        <main>
            <Card>
                <Flex gap='4' direction='column' asChild>
                    <form action={resetPassword}>
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
                        <Button>Reset Password</Button>
                        
                    </form>



                </Flex>

            </Card>


        </main>
        </Theme> 



    )
}