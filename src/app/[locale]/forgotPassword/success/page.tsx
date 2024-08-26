

import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route'

import { redirect } from "next/navigation";


export default async function ResetSuccess(){

    const session: any = await getServerSession(authOptions)

    if(session){
        redirect('/')
    }

    return(
        <p>Thanks, we have sent an email to your account. Click on the link in the email to reset your password</p>
    )
}