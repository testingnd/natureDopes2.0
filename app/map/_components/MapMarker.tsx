'use client'


import React from "react";
import Image from "next/image";


import style from './mapMarker.module.css'
import { Box, Text, Button, Flex, Code, Badge, Popover } from "@radix-ui/themes";


import imageIcon from '@/public/images/icons8-flower-32.png';

import { GetImage } from "../_lib/GetImage";


export interface mapMarkerProps {
    id: number,
    text: string,
    path: string,
    loadingGif: string
}

export default function MapMarker({id, text, path, loadingGif}: mapMarkerProps){

const [isShown, setIsShown] = React.useState<boolean>(false);
const [iagonPath, setIagonPath]= React.useState<string|null>(null)
const [toggle, setToggle] = React.useState<boolean>(false)

const toggleIs= () => {
    // 👇️ Passed function to setState
    setToggle(current => !current);
    
  };

  async function getImageApi(){
       setToggle(current => !current);

        if(iagonPath){
            return
        } else{
        setIagonPath(loadingGif)
       let {i64} = await GetImage()
       let path: string = 'data:image/png;base64,' + i64
        setIagonPath(path)
        }
    }

    function changePointer(event: React.ChangeEvent<EventTarget>): void {
        event.target.style.cursor = 'pointer';
        setIsShown(true)
      }

      function leavePointer(): void {
        
        setIsShown(false)
      }
 
    return(
        <Flex direction='column' >
        {toggle? <Button size='1' onClick={toggleIs}>X</Button>: <p></p>}
        <Box onMouseEnter={changePointer} onMouseLeave={leavePointer} onClick={getImageApi}>
            
            {toggle? null:<Image
                src={imageIcon}
                width={32}
                height={32}
                alt='Flower icon'
                style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '-16px'
                }}
                />}
                
            {isShown ? <Box className={style.markerTextSnippet}><Text>{text}</Text></Box >: <Box className={style.markerTextSnippet} ></Box>}
            {toggle ? <Image width={100} height={100} src={iagonPath} alt='Awaiting image...' />: null }
        </Box>
        </Flex>
    )
    
}