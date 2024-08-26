
import {prisma} from '@/src/app/[locale]/prisma'
import { NextResponse } from "next/server";


export async function GET(req: any, {params}: {params: {id: string}}){
    
    
    let prismaId = Number(params.id)

    const imageData = await prisma.images.findMany({
        where: {
            user_id: prismaId,
        }
    });

    
  return NextResponse.json({prismaData: imageData});

}