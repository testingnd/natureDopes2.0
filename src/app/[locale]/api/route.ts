import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../_lib/authOptions";


export async function GET(req: Request){
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({authenticated: !!session})
}