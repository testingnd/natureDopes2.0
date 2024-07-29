'use client'

import React from "react"
import Image from "next/image"

//radix themes
import '@radix-ui/themes/styles.css';
import { Container, Card, Box, Blockquote, Inset, Grid} from "@radix-ui/themes"

//image component
import IagonImage from "./IagonImage";

import { ImagesDataPrisma } from "../../page";

export default function IagonGallery({imageDataPrisma, LoadingGif}: {imageDataPrisma: ImagesDataPrisma | null, LoadingGif: any}){

    const [imageData, setImageData] = React.useState(imageDataPrisma)


    return (
        <>
         <Container size='2'>
            <Grid columns='4' gap='6' >
                {imageData.map((data: ImagesDataPrisma) => 

                            <Box key={data.id} size='3' maxHeight='auto' >
                                <Card >
                                
                                    <Inset clip="padding-box" side="top" pb="current" >
                                        <IagonImage key={data.id} path={data.path} LoadingGif={LoadingGif} />
                                    </Inset>
                                    <Blockquote size='2'>
                                        {data.species_name}
                                    </Blockquote>
                                
                                </Card>
                            </Box>       

                
                )}
            </Grid>
        </Container>
        </>
        
    )
}
