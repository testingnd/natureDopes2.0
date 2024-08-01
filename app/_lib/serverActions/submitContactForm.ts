 'use server'

import { error } from "console"
 import { sendMail } from "../nodemailer"

export async function submitContactForm(data: FormData){
   

    const name = data.get('name') as string
    const email = data.get('email') as string
    const message = data.get('message') as string

    const mailOptions = {
        from: 'naturedopes@gmx.fr',
        to: 'naturedopes@gmx.fr',
        subject: `New message received from ${name}`,
        text: `${message} from ${email}`

    }

     await sendMail(mailOptions)

   
   


}