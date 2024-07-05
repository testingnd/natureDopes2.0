'use client'

import React from "react";
import { sendPasswordReset } from "@/app/forgotPassword/_sendPasswordReset";
import { Flex , Text, Button} from "@radix-ui/themes";


import { signIn } from "next-auth/react";

export default function SignIn() {

    const[email, setEmail] = React.useState("")
    const[password, setPassword] = React.useState("")

    const signInHandler = async (e : React.FormEvent) => {
        console.log(email, password)
        e.preventDefault()
       
        await signIn("credentials" , {email: email, password: password, callbackUrl: '/'})
    }

    return (
      <form method="post" action="/api/auth/callback/credentials" onSubmit={signInHandler}>
       
        <label>
          email
          <input name="Email" type="text" onChange={e => setEmail(e.target.value)}/>
          <p>{email}</p>
        </label>
        <label>
          Password
          <input name="Password" type="password" onChange={ e => setPassword(e.target.value)} />
          <p>{password}</p>
        </label>
        <button >Sign in</button>
      </form>
    )
  }

  
