'use client'
import React from "react";
import { GetData } from "./GetImage";


export default function Button(){

    const [iagImage, setIagImage] = React.useState(null)

    async function handleData(){
        
        setIagImage('Sending Api...')
        const data = await GetData()
        setIagImage(data)
        
    }

    return(
        <>
        <button onClick={handleData}>Get That Data</button>
        <img src={`data:image/png;base64,${iagImage}`} alt={iagImage} />
        
        </>
    )
}