
import { NextResponse } from "next/server";

export async function GET(req: Request){

    const res = await fetch(`https://graph.instagram.com/me/media?fields=media_type,media_url,id&access_token=${process.env.INSTAGRAMACCESSTOKEN}`)
    
    const igData = await res.json()
    const newArray = []

    for(let i = 0; i < 6; i++ ){
        newArray.push(igData.data[i])
    }

    
    
    return NextResponse.json(newArray)
}

