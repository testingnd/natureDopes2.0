
import {prisma} from '@/app/prisma'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const imageData = await prisma.images.findMany();
  console.log(imageData[0])
  return NextResponse.json(imageData);
}

