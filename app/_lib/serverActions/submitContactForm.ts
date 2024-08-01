

export function submitContactForm(data: FormData){
    'use server'

    const name = data.get('name') as string
    const email = data.get('email') as string
    const message = data.get('message') as string




}