'use client'

import React from "react"
import Image from "next/image"

import '@radix-ui/themes/styles.css';
import { Theme, Card, Box, Flex, Section, Container, Inset, Text, Grid, Blockquote } from "@radix-ui/themes"

//type imports
import { InstagramApiData } from "../../page";


export default function InstagramGallery({igResponse}: {igResponse: InstagramApiData}){

    return (
        <>
        
        <Container size='2'>
         <Grid columns={{lg:'4', sm: '1'}} gap='6' >
            {igResponse.map((media: InstagramApiData, index: number) => {
               
                if(media.media_type == 'IMAGE'){
                
                return <Box key={media.id} size='3' maxHeight='auto' >
                            <Card >
                               
                                <Inset clip="padding-box" side="top" pb="current" >
                                    <Image 
                                        src={media.media_url}
                                        width={300}
                                        height={250}
                                        alt={'Ig picture'}
                                    />
                                </Inset>
                                <Blockquote size='2'>
                                    {media.caption}
                                </Blockquote>
                              
                            </Card>
                        </Box>       
            }
            
                return   <Box key={media.id} size='3' maxHeight='auto'>    
                            
                            <Card variant="surface" >
                               
                                    <Inset clip="padding-box" side="top" pb="current">
                                        <video width="270" controls poster={media.thumbnail_url}>
                                            <source src={media.media_url}/>
                                        </video>
                                        
                                    </Inset>
                                    
            
                            </Card>
                           
                         </Box>
          
        } )}
        </Grid>
        </Container>
       
    
     </> 
   )
}