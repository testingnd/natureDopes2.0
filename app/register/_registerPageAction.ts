'use server'

import validator from 'validator'
import { hash } from "bcrypt";
import {prisma} from '../prisma'
import { Prisma } from "@prisma/client";


    export async function registerUser(data: FormData){
       
        let password = data.get('Password') as string
        let confirm = data.get('Confirm') as string
        let username = data.get('Username') as string
        let email = data.get('Email') as string

        if(!validator.isAlphanumeric(username, 'en-GB')){
            return{
                error: 'Please use only letters and numbers for your Username'
            }
        }

        if(!validator.isEmail(email)){
            return {
                error: 'Please use a valid email address'
            }
        }

        if(password.length < 8){
            return {
                error: 'Passwords must be at least 8 characters long'
            }
        }

        if(password !== confirm){
            return {
                error: 'The passwords do not match, please check your typing'
            }
        }

    
        const passwordHash = await hash(password, 10) as string

        try {

            const user = await prisma.users.create({
            data: {
                username,
                email,
                password: passwordHash
            }
        })
        } catch(e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError)
                console.log(e.message, e.code)
                if(e.code == 'P2002'){
                    return {
                        error: 'This account already exists, please login or reset your password if you are the account owner '
                    }
                }
                return {
                    error: 'Technical issue, please contact us'
            }   

        }
       
    }
