

import React from "react"
import ForgotPassword from "./ForgotPasswordForm"

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route'

import { redirect } from "next/navigation";



export default async function ForgotPasswordPage(){


const session: any = await getServerSession(authOptions)

if(session){
    redirect('/')
}

    return(
        
        <main>
            {!session? <ForgotPassword/>: <p>Already logged in as {session.user.name} please return to the main site</p>}
   
        </main>
       
    )
}