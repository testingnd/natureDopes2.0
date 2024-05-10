

import React from "react"
import Button from "./Button"
import Head from "next/head"
import Script from "next/script"
import { Suspense } from "react"
import { cache } from "react"

// css imports
import style from './map.module.css'

import MapUpload from "./MapUpload"
import Loading from "../loading"

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
        
    
        <Button />
        <Button />

        
        <div className={style.mapWrap}>
          
            <MapUpload getImageData={getImageData} />
          
           
          
        </div>
       
        
      
        </>
    )
}

