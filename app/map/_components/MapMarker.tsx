'use client'


import React from "react";
import maplibregl, { Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map.module.css'

import { ImageIcon } from "@radix-ui/react-icons";

import { GetImage } from "../GetImage";


export default function MapMarker({text}){

 
    return(
        <div>
            <ImageIcon />
            <div>{text}</div>
        </div>
        
    )
    
}