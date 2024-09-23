'use client'

import React from "react"
import Image from "next/image"


import { Theme, Card, Box, Flex,  Inset, Grid, Blockquote } from "@radix-ui/themes"

//type imports
import { InstagramApiData } from "../../page";


export default function InstagramGallery({igResponse}: {igResponse: InstagramApiData}){

    return (
        <>
        
        <Flex justify='center' pl='6' pr='6'>
         <Grid columns={{lg:'4', md: '3' ,sm: '3', xs: '1' , initial: '1'}} gap='6' >
            {igResponse.map((media: InstagramApiData, index: number) => {
               
                if(media.media_type == 'IMAGE'){
                
                return <Box key={media.id}  maxHeight='auto' >
                            <Card size={{lg: '2', md: '2', sm: '1', xs: '1', initial: '1'}}>
                               
                                <Inset clip="padding-box" side="top" pb="current"  >
                                    <Image 
                                        src={media.media_url}
                                        width={300}
                                        height={240}
                                        alt={'Ig picture'}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        
                                    />
                                </Inset>
                                <Blockquote size='2'>
                                    {media.caption}
                                </Blockquote>
                              
                            </Card>
                        </Box>       
            }
            
                return   <Box key={media.id} maxHeight='auto'>    
                            
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
        </Flex>
       
    
     </> 
   )
}