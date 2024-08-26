'use client'


import React, { useState } from "react"
import Image from "next/image"

import '@radix-ui/themes/styles.css';
import { Theme, Card, Box, Flex, Section, Container, Button, Switch, Badge} from "@radix-ui/themes"

//import gallery components
import IagonGallery from "./galleries/IagonGallery";
import InstagramGallery from "./galleries/InstagramGallery";

// importing types
import {ImagesDataPrisma} from '../page'
import { InstagramApiData } from "../page";

export default function MainGalleryComponent({session, igResponse, imageDataPrisma, LoadingGif, error, prismaError}: {session: number|null, igResponse: InstagramApiData, imageDataPrisma: ImagesDataPrisma | null, LoadingGif: any, error: string, prismaError: string | null}){

    const [galleryInView, setGalleryinView] = React.useState<boolean>(true)

    function galleryToggle(){
        setGalleryinView(!galleryInView)
    }

    return (

        
        
          <Container size={{lg: '4', md: '3', sm: '2', xs: '1', initial: '1'}}>  
        {session?<>
                 <Flex gap='1'><Badge variant="surface" size='3'>Nature Dopes Gallery</Badge><Switch size='3' onClick={galleryToggle} /><Badge variant="surface" size='3'>User Gallery</Badge></Flex> 
                 <Box size={{xs: '1'}} mt='3' ml={{xs: '2', initial: '8'}} mr={{xs: '2', initial: '8'}}> 
                   
                
                    {galleryInView? error? prismaError? <p>{prismaError}</p> : <p>{error}</p>: <InstagramGallery igResponse={igResponse}  />: <IagonGallery imageDataPrisma={imageDataPrisma} LoadingGif={LoadingGif} />}
                  </Box></>
            : error? <p>{error}</p>: <InstagramGallery igResponse={igResponse} />
        
       
                
        
        }
         </Container>
       
       
    )

}