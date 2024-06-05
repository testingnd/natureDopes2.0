
import React from "react"
import Button from "./Button"
import Head from "next/head"


import loadingGif from '@/public/images/loadingplant.gif'


// css imports
import style from './map.module.css'

//map libre build
import MapUpload from "./MapUpload"

//google map react build
import Gmap from './GMap'



async function getData() {
    const res = await fetch('http://localhost:3000/map/api')
    // The return value is *not* serialized
  
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function Map(){



   
  const getImageData = await getData()

    
    return (
        <>
     
       
       

              <Gmap getImageData={getImageData} loadingGif={loadingGif} />
       
          
      
       
        
      
        </>
    )
}

