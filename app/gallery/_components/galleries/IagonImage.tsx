'use client'

import Image from "next/image";
import React from "react";

import { GetImage } from "@/app/map/_lib/GetImage";





export default function IagonImage({path, LoadingGif}: {path: string, LoadingGif: string}){

const [base64String, setBase64String] =  React.useState<string|null>(LoadingGif)
const iagonLocation = path

    async function getImageApi(iagonLocation: string){
       
        if(base64String != LoadingGif){
            return
        } else {
        setBase64String(LoadingGif)
        let i = await GetImage(iagonLocation)
        let imageSrc: string = 'data:image/png;base64,' + i
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
            width={100} 
            height={100} 
           
           
            alt='flower picture'
        
            />

        </div>

    )

}