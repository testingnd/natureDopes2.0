
import {prisma} from '@/app/prisma'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const imageData = await prisma.images.findMany({
    select: {
      id: true,
      species_name: true,
      gps_lat: true,
      gps_long: true
    }
  });
  return NextResponse.json(imageData);
}

