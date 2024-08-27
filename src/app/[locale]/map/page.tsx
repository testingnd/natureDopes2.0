
import React from "react"


import loadingGif from '@/public/images/nd -logo-gif.gif'

// css imports
import style from './map.module.css'

// import session data
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route'
import {getTranslations} from 'next-intl/server';
import {translator} from './translationPropsMap'

//google map react build
import Gmap from './_components/GMap'



async function getData() {
   
    const res = await fetch('http://localhost:3000/map/api', { next: { tags: ['finderdata'] } })
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }


    return res.json()
  }


export default async function Map(){

  const translationProps = await translator()  

  const getImageData = await getData()

  const session: any = await getServerSession(authOptions)

  
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

