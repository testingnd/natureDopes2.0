'use server'

import { prisma } from "@/app/prisma"

import { redirect } from "next/navigation";

import { sendMail } from "../_lib/nodemailer"

import { randomUUID } from "crypto"


const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'




export async function sendPasswordReset(data: FormData){
  
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