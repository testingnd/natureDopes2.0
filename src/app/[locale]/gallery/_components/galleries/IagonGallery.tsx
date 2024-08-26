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
         <Container size={{lg: '2', sm: '2', xs: '1' , initial: '1'}}>
            <Grid columns={{lg:'4', md: '3' ,sm: '3', xs: '1' , initial: '1'}} gap='6' >
                {imageData.map(data => 

                            <Box key={data.id} maxHeight='auto' >
                                <Card size={{lg: '2', md: '2', sm: '1', xs: '1', initial: '1'}} >
                                
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
