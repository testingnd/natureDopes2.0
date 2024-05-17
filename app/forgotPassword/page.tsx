import Link from "next/link";
import { redirect } from "next/navigation";

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";

import { randomUUID } from "crypto";

import {prisma} from '@/app/prisma'

import {sendMail} from '../_lib/nodemailer'


const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'




export default function ForgotPassword(){

    async function resetPassword(data: FormData){
        'use server'
        const email = data.get('email')

        if(!email || typeof email !== 'string'){
            return{
                error: 'Invalid email'
            }
        }

        const user = await prisma.users.findUnique({
            where: {email},
        })

        if(!user) {
            return {
                error: 'This email is not registered'
            }
        }

        const token = await prisma.passResetToken.create({
            data: {
                userId: user.id,
                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
            },
        })


        let mailOptions = {
            from: 'naturedopes@gmx.fr',
            to: user.email,
            subject: 'Reset Password Link - NatureDopes' ,
            text: `Hello ${user.username} please find password reset link, click here: ${PROTOCOL}://${DOMAIN}/forgotPassword/password-reset/${token.token} . This link will remain valid for 4 hours. `,
            
        }

        await sendMail(mailOptions)
        console.log('reset email sent')
        redirect('/forgotPassword/success')
    }

    return(
        
        <main>
         <Theme accentColor="grass" >     
            <Card>
                <Flex gap='4' direction='column' asChild>
                    <form action={resetPassword}>
                        <h1> Reset Password</h1>
                        <p>Enter your email address here, a link will be sent to your inbox, click the link to reset your password</p>

                        <TextField.Root 
                        name='email' 
                        type='email' 
                        size='3' 
                        placeholder='Your email...'
                        />
                        
                        <Button>Send</Button>
                        
                    </form>


                </Flex>

            </Card>
        </Theme> 
        </main>
       
    )
}