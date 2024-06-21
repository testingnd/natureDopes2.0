'use client'

import React from "react"
import Image from "next/image"

import '@radix-ui/themes/styles.css';
import { Theme, Card, Box, Flex, Section, Container } from "@radix-ui/themes"



export default function InstagramGallery({igResponse}){

    return (
        <>
        <Theme accentColor="grass" grayColor="sand" appearance="light">
        <Container size='3'>
         <Flex>
            {igResponse.map((media, index) => {
                if(index % 2){
                    return
                }
                if(media.media_type == 'IMAGE'){
                
                return <Box key={media.id} width='350px' height='350px'>
                            <Card >
                                <Image 
                                    src={media.media_url}
                                    width={250}
                                    height={250}
                                    alt={'Ig picture'}
                                />
                            </Card>
                        </Box>       
            }
            
                return   <Box key={media.id} width='350px' height='350px'>
                            <Card>
                            <video width="200" height="200" controls preload="none" src={media.media_url}>
                            
                            </video>
                            </Card>
                         </Box>
          
        } )}
        </Flex>
        </Container>
        <Container size='3'>
         <Flex>
            {igResponse.map((media, index) => {
                if(index % 2 == 0){
                    return
                }
                if(media.media_type == 'IMAGE'){
                
                return <Box key={media.id} width='350px' height='350px'>
                            <Card >
                                <Image 
                                    src={media.media_url}
                                    width={250}
                                    height={250}
                                    alt={'Ig picture'}
                                />
                            </Card>
                        </Box>      
            }
            
                return   <Box key={media.id} width='350px' height='350px'>
                            <Card>
                            <video width="200" height="200" controls preload="none" src={media.media_url}>
                            
                            </video>
                            </Card>
                         </Box>
        } )}
        </Flex>
        </Container>
     </Theme>
     </> 
   )
}