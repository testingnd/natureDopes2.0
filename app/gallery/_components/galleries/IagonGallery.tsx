'use client'

import React from "react"
import Image from "next/image"

//radix themes
import '@radix-ui/themes/styles.css';
import { Theme, Card, Box, Flex, Section, Container } from "@radix-ui/themes"

//image component
import IagonImage from "./IagonImage";

import { ImagesDataPrisma } from "../../page";

export default function IagonGallery({imageDataPrisma, LoadingGif}: {imageDataPrisma: ImagesDataPrisma | null, LoadingGif: any}){

    const [imageData, setImageData] = React.useState(imageDataPrisma)


    return (
        <>
        {imageData.map((data: ImagesDataPrisma) => 

            <IagonImage key={data.id} path={data.path} LoadingGif={LoadingGif} />
        )}
        </>
        
    )
}
