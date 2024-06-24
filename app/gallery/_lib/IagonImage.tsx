
import Image from "next/image";
import React from "react";

import { GetImage } from "@/app/map/_lib/GetImage";
import 




export default function IagonImage({path}){

const [iagonPath, setIagonPath] =  React.useState('awaiting image')

    async function getImageApi(){
       
        let i = await GetImage()
        let path: string = 'data:image/png;base64,' + i
         setIagonPath(path)
         
     }

    return (
        <div>

        <Image
            src={iagonPath} 
            width={100} 
            height={100} 
            onLoad={getImageApi} 
           
            alt='Awaiting image...' 
        
            />

        </div>

    )

}