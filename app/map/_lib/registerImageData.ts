'use server'
import {prisma} from '@/app/prisma'
import { Prisma } from "@prisma/client";


export async function registerImageData(data: FormData, image_path: string, user_ids: number){

 const species_name = data.get('species') as string
 const gps_longs = data.get('gps_long') as string
 const gps_lats = data.get('gps_lat') as string

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
        return {
            errorPrisma: 'error'
        }

    }

    return {
        success: 'Image data has been uploaded'
    }

}