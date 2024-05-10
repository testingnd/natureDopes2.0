import React from "react";
import Link from "next/link";
import { hash } from "bcrypt";
import {prisma} from '@/app/prisma'

export default function RegisterPage(){

    async function registerUser(data: FormData){
        'use server'

        const password = await hash(data.get('password') as string, 10)

        const user = await prisma.users.create({
            data: {
                username: data.get('username') as string,
                email: data.get('email') as string,
                password
            }
        })
    }


    return(



    )
}