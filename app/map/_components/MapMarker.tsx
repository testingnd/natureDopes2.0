'use client'


import React from "react";
import Image from "next/image";
import maplibregl, { Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import style from './mapMarker.module.css'


import imageIcon from "@/public/images/icons8-flower-32.png";

import { GetImage } from "../GetImage";


export interface mapMarkerProps {
    text: string,
    path: string,
    loadingGif: string
}

export default function MapMarker({text, path, loadingGif}: mapMarkerProps){

const [isShown, setIsShown] = React.useState<boolean>(false);
const [iagonPath, setIagonPath]= React.useState<string|null>(null)

    async function getImageApi(){
       
        setIagonPath(loadingGif)
       let i = await GetImage()
       let path: string = 'data:image/png;base64,' + i
        setIagonPath(path)

    }

    function changePointer(event: React.ChangeEvent<EventTarget>): void {
        event.target.style.cursor = 'pointer';
        setIsShown(true)
      }

      function leavePointer(): void {
        
        setIsShown(false)
      }
 
    return(
        <div onMouseEnter={changePointer} onMouseLeave={leavePointer} onClick={getImageApi}>
            
            <Image
            src={imageIcon}
            unoptimized={true}
            alt='Flower icon'
            
            />
            {isShown ? <div>{text}</div>: <div></div>}
            {iagonPath ? <Image width={100} height={100} src={iagonPath} alt='Awaiting image...'/>: null }
        </div>
        
    )
    
}