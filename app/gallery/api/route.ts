
import {NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

    const res = await fetch(`https://graph.instagram.com/me/media?fields=media_type,media_url,id,caption,thumbnail_url&access_token=${process.env.INSTAGRAMACCESSTOKEN}`)
    
 
    console.log(res.status)
    if(res.status == 400 || res.status == 500){
        const response = await res.json();
       

        console.log(response.body.error)
        return NextResponse.json({error: 'Problem returning data from Instagram. If the problem persists please contact us' })
    }

    if(!res.ok){
        console.log('Problem2')
        return NextResponse.json({error: 'Technical issue. If the problem persists please contact us' })
    }


    const igData = await res.json()
    const newArray = []

    for(let i = 0; i < 8; i++ ){
        newArray.push(igData.data[i])
    }

    
    
    return NextResponse.json({igResponse: newArray})
}

