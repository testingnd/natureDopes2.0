
import React from "react"
import Image from "next/image"

import MainGalleryComponent from "./_components/MainGalleryComponent"

import { getServerSession, NextAuthOptions } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"


import LoadingGif from '@/public/images/nd -logo-gif.gif'




async function getPrismaData(sessionId: number){
 
  const res = await fetch(`http://localhost:3000/gallery/api/prismaData/${sessionId}`)

  if (!res.ok) {
   
    return {
      error: 'Cannot return images from database, please try again later'
    }
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
    let prismaError: string | null = null 
    if(session){
      const {prismaData, error}: {prismaData: ImagesDataPrisma, error: string | null} = await getPrismaData(session.user.id)
      
      if(prismaData){
        imageDataPrisma = prismaData
      }
      if(error){
        prismaError = error
      }

    }



    async function getInstagramData() {
        const res = await fetch('http://localhost:3000/gallery/api', { cache: 'no-store' })
        if (!res.ok) {
         return {
          error: 'Data from instagram has failed to load, please try again later'
         }
        }
        
        return res.json()
      }
    const {igResponse, error}: {igResponse: InstagramApiData, error: string} = await getInstagramData();

   

    return(
        <>  
       
          <MainGalleryComponent error={error} prismaError={prismaError} igResponse={igResponse} imageDataPrisma={imageDataPrisma} session={userId} LoadingGif={LoadingGif} />
        
      
        </>
    )
}
