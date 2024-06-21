
import {prisma} from '@/app/prisma'
import { NextResponse } from "next/server";


export async function GET(req, {params}: {params: {id: string}}){
    
    console.log(params)
    let prismaId = Number(params.id)

    const imageData = await prisma.images.findMany({
        where: {
            user_id: prismaId,
        }
    });

  return NextResponse.json(imageData);

}