'use client'
import React from "react";
import { GetImage } from "./GetImage";
import style from './map.module.css'


export default function Button(){

    const [iagImage, setIagImage] = React.useState<string | null>(null)

    async function handleData(){
        
        setIagImage('Sending Api...')
        const data = await GetImage()
        setIagImage(data)
        
    }

    return(
        <>
        <button onClick={handleData}>Get That Data</button>
        <img className={style.IAGONimage} src={`data:image/png;base64,${iagImage}`} alt={iagImage} />
        
        </>
    )
}