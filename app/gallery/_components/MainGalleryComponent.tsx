'use client'


import React, { useState } from "react"
import Image from "next/image"

import '@radix-ui/themes/styles.css';
import { Theme, Card, Box, Flex, Section, Container, Button } from "@radix-ui/themes"

//import gallery components
import IagonGallery from "./galleries/IagonGallery";
import InstagramGallery from "./galleries/InstagramGallery";



export default function MainGalleryComponent({session, igResponse, imageDataPrisma}: {session: number|null}){

    const [galleryInView, setGalleryinView] = React.useState<boolean>(true)

    function galleryToggle(){
        setGalleryinView(!galleryInView)
    }

    return (

        
         <Theme accentColor="grass" grayColor="sand" appearance="light">
          <Container>  
        {session? <div> 
                    <Button onClick={galleryToggle} >switch</Button> 
                
                    {galleryInView? <InstagramGallery igResponse={igResponse}  />: <IagonGallery imageDataPrisma={imageDataPrisma} />}
                  </div>
            : <InstagramGallery igResponse={igResponse} />
        
       
        
        
        }
         </Container>
        </Theme>
       
    )

}