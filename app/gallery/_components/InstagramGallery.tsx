'use client'

import React from "react"
import Image from "next/image"

import '@radix-ui/themes/styles.css';
import { Theme, Card, Box, Flex } from "@radix-ui/themes"



export default function InstagramGallery({igResponse}){

    return (
        <>
        <Theme accentColor="grass">
         <Flex gap='2'>
        {igResponse.map((media) => {
            if(media.media_type == 'IMAGE'){
                return <div key={media.id}>
                           
                            <Card>
                            <Image 
                                src={media.media_url}
                                width={200}
                                height={200}
                                alt={'Ig picture'}
                            />
                            </Card>
                           
                           
                        </div>
            }
            
                return <div key={media.id} height='200'>
                      
                      
                        <Card>
                        <video width="200" height="200" controls preload="none" src={media.media_url}>
                        
                        </video>
                        </Card>
                        
                        
                        </div>
          
        } )}
        </Flex>
     </Theme>
     </> 
   )
}