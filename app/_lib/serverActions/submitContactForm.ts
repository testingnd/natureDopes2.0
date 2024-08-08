 'use server'


 import { sendMail } from "../nodemailer"

export async function submitContactForm(data: FormData){
   

    const name = data.get('name') as string
    const email = data.get('email') as string
    const text = data.get('message') as string

    const mailOptions = {
        from: 'naturedopes@gmx.fr',
        to: 'naturedopes@gmx.fr',
        subject: `New message received from ${name}`,
        text: `${text} from ${email}`

    }

     const {message, error} = await sendMail(mailOptions)
     if(error){
        console.log(error)
        return {error}
     } else {
        console.log(message)
        return {message}
     }
     
   
   


}