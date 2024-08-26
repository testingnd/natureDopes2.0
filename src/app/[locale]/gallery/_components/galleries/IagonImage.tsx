'use client'

import Image from "next/image";
import React from "react";

import { GetImage } from "@/src/app/[locale]/map/_lib/GetImage";





export default function IagonImage({path, LoadingGif}: {path: string, LoadingGif: string}){

const [base64String, setBase64String] =  React.useState<string>(LoadingGif)
const [error, setError] = React.useState<string|undefined>('')
const iagonLocation = path

    async function getImageApi(iagonLocation: string){
       
        if(base64String != LoadingGif){
            return
        } else {
        setBase64String(LoadingGif)
        let {i64, error} = await GetImage(iagonLocation)
        setError(error)
        let imageSrc: string = 'data:image/png;base64,' + i64
         setBase64String(imageSrc)
        }
     }

    function handleImage(){
        getImageApi(iagonLocation)
    }

    return (
        <div onLoad={handleImage} >

        <Image

            src={base64String} 
            width={300}
            height={240} 
           
           
            alt='flower picture'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        
            />
        {error && <p>{error}</p>}
        </div>

    )

}