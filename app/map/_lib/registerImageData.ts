'use server'
import {prisma} from '@/app/prisma'
import { Prisma } from "@prisma/client";
import validator from 'validator';


export async function registerImageData(data: FormData, image_path: string, user_ids: number){

 const species_name = data.get('species') as string
 const gps_longs = data.get('gps_long') as string
 const gps_lats = data.get('gps_lat') as string

 if(!validator.isFloat(gps_longs)){
    return {
        errorPrisma: 'gps coordinates must be decimal numbers'
    }
 }
 if(!validator.isAlpha(species_name)){
    return {
        errorPrisma: 'Species names must only  contain letters '
    }
 }

 const gps_long = Number(gps_longs)
 const gps_lat = Number(gps_lats)
 const user_id = Number(user_ids)


 

    try{

        const imageData = await prisma.images.create({
            data: {
                species_name,
                gps_long,
                gps_lat,
                image_path,
                user_id

            }
        })

        console.log(imageData)

    } catch(error :any){
        console.log(error)
        if(error instanceof Prisma.PrismaClientKnownRequestError){
        console.log(error.code, error.message)}
        return {
            errorPrisma: 'Database error, if problem persists please contact us.'
        }

    }

    return {
        success: 'Thank you, a record has been created for '+ species_name
    }

}