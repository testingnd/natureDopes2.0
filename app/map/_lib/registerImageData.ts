
import {prisma} from '@/app/prisma'
import { Prisma } from "@prisma/client";


export async function registerImageData(data: FormData, image_path: string, user_id: number){

 const species_name = data.get('species') as string
 const gps_long = data.get('gps_long') as number
 const gps_lat = data.get('gps_lat') as number

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

    } catch(e:any){
        console.log(e.message)
        return {
            errorPrisma: 'error'
        }

    }

    return {
        success: 'Image data has been uploaded'
    }

}