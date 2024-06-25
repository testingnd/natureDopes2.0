'use client'

import Image from "next/image";
import React from "react";

import { GetImage } from "@/app/map/_lib/GetImage";





export default function IagonImage({path, LoadingGif}){

const [base64String, setBase64String] =  React.useState(LoadingGif)
const iagonLocation = path

    async function getImageApi(iagonLocation){
       
        let i = await GetImage(iagonLocation)
        let imageSrc: string = 'data:image/png;base64,' + i
         setBase64String(imageSrc)
         
     }

    function handleImage(){
        getImageApi(iagonLocation)
    }

    return (
        <div>

        <Image
            src={base64String} 
            width={100} 
            height={100} 
            onLoad={handleImage} 
           
            alt='Awaiting image...' 
        
            />

        </div>

    )

}