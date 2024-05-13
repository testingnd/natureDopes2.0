import React from "react";
import Link from "next/link";
import { hash } from "bcrypt";
import {prisma} from '@/app/prisma'
import styles from './register.module.css'

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

        <div>
            <div className={styles.createAccount}>
                <h1> Create your account </h1>
                <form className={styles.registerForm} action={registerUser}>
                    <input className={styles.input} placeholder="Username" name='Username' />
                    <input className={styles.input} placeholder="Email" name='Email' type='email' />
                    <input className={styles.input} placeholder="Password" name='Password' type='password' />
                    <button type='submit'>Register</button>
                </form>

            </div>
            <div className={styles.backToSignIn}>
                <h3>Have an account already?</h3>
                <Link href='/api/auth/signin'>Sign in</Link>
            </div>

        </div>

    )
}