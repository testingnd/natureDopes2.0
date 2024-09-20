'use client'

import React from "react"
import Image from "next/image"

//radix themes

import { Container, Card, Box, Blockquote, Inset, Grid, Flex} from "@radix-ui/themes"

//image component
import IagonImage from "./IagonImage";

import { ImagesDataPrisma } from "../../page";

export default function IagonGallery({imageDataPrisma, LoadingGif}: {imageDataPrisma: ImagesDataPrisma | null, LoadingGif: any}){

    const [imageData, setImageData] = React.useState(imageDataPrisma)


    return (
        <>
         <Flex justify='center' pl='6' pr='6'>
            <Grid columns={{lg:'4', md: '3' ,sm: '3', xs: '1' , initial: '1'}} gap='6' >
                {imageData.map(data => 

                            <Box key={data.id} maxHeight='auto' >
                                <Card size={{lg: '2', md: '2', sm: '1', xs: '1', initial: '1'}} >
                                
                                    <Inset clip="padding-box" side="top" pb="current" >
                                        <IagonImage key={data.id} path={data.image_path} LoadingGif={LoadingGif} />
                                    </Inset>
                                    <Blockquote size='2'>
                                        {data.species_name}
                                    </Blockquote>
                                
                                </Card>
                            </Box>       

                
                )}
            </Grid>
        </Flex>
        </>
        
    )
}
