
export const runtime = 'nodejs'
export const maxDuration = 40

import React from "react"


import loadingGif from '@/public/images/nd -logo-gif.gif'

// css imports
import style from './map.module.css'

// import session data
import { getServerSession } from 'next-auth';
import { authOptions } from "../_lib/authOptions";

import {translator} from './translationPropsMap'

//google map react build
import Gmap from './_components/GMap'
import { sessionTypes } from "../_lib/sessionTypes";



async function getData() {
   
    const res = await fetch(`${process.env.LIVESITE}/map/api`, { next: { tags: ['finderdata'] } })
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
     
    }


    return res.json()
  }


export default async function Map(){

  const translationProps = await translator()  

  const getImageData = await getData()

  const session: sessionTypes | null = await getServerSession(authOptions)

  
 let userId = null

  if(session){
    userId = session.user.id
  }
    
    return (
        <>
     

              <Gmap getImageData={getImageData} loadingGif={loadingGif} session={userId} translationProps={translationProps} />
       
       
        
      
        </>
    )
}

