'use server'
import {prisma} from '@/src/app/[locale]/prisma'
import { Prisma } from "@prisma/client";
import validator from 'validator';

import { revalidateTag } from 'next/cache';


export async function editImageData(data: FormData){

 console.log(data)   
 const species_name = data.get('species') as string
 const gps_longs = data.get('gps_long') as string
 const gps_lats = data.get('gps_lat') as string
 const imageId = data.get('imageId') as string

 if(!validator.isFloat(gps_longs)){
    return {
        errorPrisma: 'gps coordinates must be decimal numbers'
    }
 }
 if(!validator.isAlpha(species_name, ['en-GB'], {ignore: " '-()"})){
    return {
        errorPrisma: 'Species names must only  contain letters '
    }
 }
 const gps_long = Number(gps_longs)
 const gps_lat = Number(gps_lats)
 const id = Number(imageId)

 try {

    const newImageData = await prisma.images.update({
        where: {
            id
        },
        data: {
            species_name,
            gps_long,
            gps_lat,
        }

    })

    console.log(newImageData)

 } catch(error: any){

    console.log(error)
    if(error instanceof Prisma.PrismaClientKnownRequestError){
    console.log(error.code, error.message)}
    return {
        errorPrisma: 'Database error, if problem persists please contact us.'
    }


 }
 revalidateTag('finderdata')
 return {
    success: 'Thank you, this find has been updated'
 }

}