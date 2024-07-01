
import React from "react"
import Image from "next/image"

import MainGalleryComponent from "./_components/MainGalleryComponent"

import { getServerSession, NextAuthOptions } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"


import LoadingGif from '@/public/images/loadingplant.gif'




async function getPrismaData(sessionId: number){
 
  const res = await fetch(`http://localhost:3000/gallery/api/prismaData/${sessionId}`, { next: { revalidate: 1} })

  if (!res.ok) {
   
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export type ImagesDataPrisma = {
  id: number,
  path: string,
  species_name: string,
  gps_long: number,
  gps_lat: number,
  user_id: number
}

export type InstagramApiData = {
  media_type: string,
  media_url: string,
  id: number,
  caption: string,
  thumbnail_url: string
}


export default async function PageRootGallery(){

    //check for session
    const session: any = await getServerSession(authOptions)

    let userId = null

    if(session){
      userId = session.user.id
  }

    let imageDataPrisma: ImagesDataPrisma | null = null
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
    const {igResponse, error}: {igResponse: InstagramApiData, error: string} = await getInstagramData();

   

    return(
        <>  
       
          <MainGalleryComponent error={error} igResponse={igResponse} imageDataPrisma={imageDataPrisma} session={userId} LoadingGif={LoadingGif} />
        
      
        </>
    )
}