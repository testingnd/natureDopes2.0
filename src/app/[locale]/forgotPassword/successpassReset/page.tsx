
import { redirect } from "next/navigation"

import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route'

export default async function ResetSuccess(){

    const session: any = await getServerSession(authOptions)

    if(session){
        redirect('/')
    }

    return(
        <p>Thanks, your password has been reset</p>
    )
}