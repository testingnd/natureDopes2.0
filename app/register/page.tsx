'use client'

import React from "react";
import Link from "next/link";

import {registerUser} from './_registerPageAction'

import styles from './register.module.css'


export default function RegisterPage(){

    const [ error, setError] = React.useState<string>('')

    const submit = async (data: FormData) => {
        const {error} = await registerUser(data)
        setError(error)
    }

    return(

        <div>
            <div className={styles.createAccount}>
                <h1> Create your account </h1>
                <form className={styles.registerForm} action={submit}>
                    <input className={styles.input} placeholder="Username" name='Username' />
                    <input className={styles.input} placeholder="Email" name='Email' type='email' />
                    <input className={styles.input} placeholder="Password" name='Password' type='password' />
                    <input className={styles.input} placeholder="Confirm Password" name='Confirm' type='password' />
                    <button type='submit'>Register</button>
                </form>

            </div>
            {error && <p>{error}</p>}
            
            <div className={styles.backToSignIn}>
                <h3>Have an account already?</h3>
                <Link href='/api/auth/signin'>Sign in</Link>
            </div>

        </div>

    )
}