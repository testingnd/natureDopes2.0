'use server'

import { hash } from "bcrypt";

import {prisma} from '@/app/prisma'

import { redirect } from "next/navigation";

export async function resetPassword(token: string, data: FormData){

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
            token,
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