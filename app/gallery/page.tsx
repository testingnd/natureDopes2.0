
import React from "react"
import Image from "next/image"

import MainGalleryComponent from "./_components/MainGalleryComponent"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

import LoadingGif from '@/public/images/loadingplant.gif'


async function getPrismaData(sessionId){
 
  const res = await fetch(`http://localhost:3000/gallery/api/prismaData/${sessionId}`, { next: { revalidate: 1} })

  if (!res.ok) {
   
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function PageRootGallery(){

    //check for session
    const session: any = await getServerSession(authOptions)

    let userId = null

    if(session){
      userId = session.user.id
  }

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
    const {igResponse, error} = await getInstagramData();

   

    return(
        <>  
        {error && <p>{error}+ verify </p> }
        {!error ?
          <MainGalleryComponent igResponse={igResponse} imageDataPrisma={imageDataPrisma} session={userId} LoadingGif={LoadingGif} />: null
        }
      
       
        </>
    )
}