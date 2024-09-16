'use client'


import React, { useState } from "react"
import Image from "next/image"


import { Theme, Card, Box, Flex, Section, Container, Button, Switch, Badge} from "@radix-ui/themes"

//import gallery components
import IagonGallery from "./galleries/IagonGallery";
import InstagramGallery from "./galleries/InstagramGallery";

// importing types
import {ImagesDataPrisma} from '../page'
import { InstagramApiData } from "../page";
import { useTranslations } from "next-intl";
import { TranslationTypes } from "../../layout";

export default function MainGalleryComponent({session, igResponse, imageDataPrisma, LoadingGif, error, prismaError, translationProps}: {session: number|null, igResponse: InstagramApiData, imageDataPrisma: ImagesDataPrisma | null, LoadingGif: any, error: string, prismaError: string | null, translationProps: TranslationTypes}){

    

    const [galleryInView, setGalleryinView] = React.useState<boolean>(true)

    function galleryToggle(){
        setGalleryinView(!galleryInView)
    }

    return (

        
        
         <Box width='95vw' ml='5' mr='5'>
        
        {session?
            
                <>
                 <Flex gap='1'  ml={{initial: '2', xs:'2', sm:'3', md:'4', lg:'6', xl:'7'}}><Badge variant="surface" size='3'>{translationProps.nd}</Badge><Switch size='3' onClick={galleryToggle} /><Badge variant="surface" size='3'>{translationProps.user}</Badge></Flex> 
                 <Box mt='3' ml='1' mr='1'> 
                   
                
                    {galleryInView? error?  <p>{error}</p>: <InstagramGallery igResponse={igResponse}  />: prismaError? <p>{prismaError}</p> : <IagonGallery imageDataPrisma={imageDataPrisma} LoadingGif={LoadingGif} />}
                  </Box>
                </>
            : error? <p>{error}</p>: <InstagramGallery igResponse={igResponse} />
        
       
                
        
        }
        
        </Box>
       
       
    )

}