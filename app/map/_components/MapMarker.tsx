'use client'


import React from "react";
import Image from "next/image";
import maplibregl, { Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import style from './mapMarker.module.css'


import imageIcon from '@/public/images/icons8-flower-32.png';

import { GetImage } from "../_lib/GetImage";


export interface mapMarkerProps {
    text: string,
    path: string,
    loadingGif: string
}

export default function MapMarker({text, path, loadingGif}: mapMarkerProps){

const [isShown, setIsShown] = React.useState<boolean>(false);
const [iagonPath, setIagonPath]= React.useState<string|null>(null)
const [toggle, setToggle] = React.useState<boolean>(false)

const toggleIs= () => {
    // 👇️ Passed function to setState
    setToggle(current => !current);
    
  };

    async function getImageApi(){
       setToggle(current => !current);

        if(iagonPath){
            return
        } else{
        setIagonPath(loadingGif)
       let i = await GetImage()
       let path: string = 'data:image/png;base64,' + i
        setIagonPath(path)
        }
    }

    function changePointer(event: React.ChangeEvent<EventTarget>): void {
        event.target.style.cursor = 'pointer';
        setIsShown(true)
      }

      function leavePointer(): void {
        
        setIsShown(false)
      }
 
    return(
        <>
        {toggle? <button onClick={toggleIs}>Close</button>: <p></p>}
        <div className={style.imageDiv} onMouseEnter={changePointer} onMouseLeave={leavePointer} onClick={getImageApi}>
            
            <Image
            src={imageIcon}
            width={32}
            height={32}
            alt='Flower icon'
            
            />
            {isShown ? <div>{text}</div>: <div></div>}
            {toggle ? <Image width={100} height={100} src={iagonPath} alt='Awaiting image...' />: null }
        </div>
        </>
    )
    
}