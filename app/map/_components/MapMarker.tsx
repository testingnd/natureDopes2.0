'use client'


import React from "react";
import maplibregl, { Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map.module.css'

import { ImageIcon } from "@radix-ui/react-icons";

import { GetImage } from "../GetImage";


export interface mapMarkerProps {
    text: string,
    path: string
}

export default function MapMarker({text, path}: mapMarkerProps){

const [isShown, setIsShown] = React.useState(false);
const [iagonPath, setIagonPath]= React.useState(null)

    async function getImageApi(){
       
        
       let i = await GetImage()
       let path = 'data:image/png;base64,' + i
        setIagonPath(path)

    }

    function changePointer(e) {
        e.target.style.cursor = 'pointer';
        setIsShown(true)
      }

      function leavePointer() {
        
        setIsShown(false)
      }
 
    return(
        <div onMouseEnter={changePointer} onMouseLeave={leavePointer} onClick={getImageApi}>
            <ImageIcon />
            {isShown ? <div>{text}</div>: <div></div>}
            {iagonPath ? <img  width="100" height="100" src={iagonPath} alt="${imageData[i].species_name}"></img>: null }
        </div>
        
    )
    
}