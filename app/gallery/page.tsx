
import React from "react"
import Image from "next/image"

import InstagramGallery from "./_components/InstagramGallery"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"


async function getPrismaData(sessionId){
  console.log(sessionId)
  const res = await fetch(`http://localhost:3000/gallery/api/prismaData/${sessionId}`, { next: { revalidate: 1000 } })

  if (!res.ok) {
   
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function Gallery(){

    //check for session
    const session: any = await getServerSession(authOptions)

    let imageDataPrisma = null
    if(session){
      imageDataPrisma = await getPrismaData(session.user.id)
    }



    async function getInstagramData() {
        const res = await fetch('http://localhost:3000/gallery/api', { next: { revalidate: 1 } })
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        return res.json()
      }
    const igResponse = await getInstagramData();

   

    return(
        <>
        <InstagramGallery igResponse={igResponse} imageDataPrisma={imageDataPrisma} />
        <p>This will be the gallery page</p>
        
        </>
    )
}