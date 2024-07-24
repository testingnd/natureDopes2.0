
import {prisma} from '@/app/prisma'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const imageData = await prisma.images.findMany();


  return NextResponse.json(imageData);
}

