
import {prisma} from '@/src/app/[locale]/prisma'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const imageData = await prisma.images.findMany();


  return NextResponse.json(imageData);
}

