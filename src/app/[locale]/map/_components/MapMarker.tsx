'use client'


import React, { MouseEventHandler, ReactEventHandler } from "react";
import Image, { StaticImageData } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";


import style from './mapMarker.module.css'
import { Box, Text, Button, Flex, Code, Badge, Popover } from "@radix-ui/themes";


import { RiFlowerFill } from "react-icons/ri";


import { GetImage } from "../_lib/GetImage";
import { useTranslations } from "next-intl";


export interface mapMarkerProps {
    id: number,
    user_id: number,
    lat: number,
    lng: number,
    text: string,
    ipath: string,
    session: string | null,
    loadingGif: StaticImageData,
    toggleEditForm: MouseEventHandler | Function
}

export default function MapMarker({id, user_id, lat, lng, text, ipath, session, loadingGif, toggleEditForm}: mapMarkerProps){

const t = useTranslations('GMap');

const [isShown, setIsShown] = React.useState<boolean>(false);
const [iagonPath, setIagonPath]= React.useState<string|StaticImport>("")
const [toggle, setToggle] = React.useState<boolean>(false)




const toggleIs= () => {
    // 👇️ Passed function to setState
    setToggle(current => !current);
    
  };

  async function getImageApi(ipath: string){
        
       setToggle(current => !current);
       
        if(iagonPath){
            return
        } else{
        setIagonPath(loadingGif)
       let {i64} = await GetImage(ipath)
       let path: string = 'data:image/png;base64,' + i64
        setIagonPath(path)
        }
    }

    function changePointer(event: React.ChangeEvent<EventTarget>): void {
        event.target.style.cursor = 'pointer';
        setIsShown(true)
      }

      function leavePointer(): void {
        
        setIsShown(current => !current)
      }
 
    return(
        <Flex direction='column' >
        {toggle? <Button size='1' onClick={toggleIs} onTouchStart={leavePointer}>X</Button>: <p></p>}
        <Box onMouseEnter={changePointer} onMouseLeave={leavePointer} onTouchStart={changePointer} onClick={() => {getImageApi(ipath)}}>
            
        
            {toggle? null: session == user_id.toString() ? <RiFlowerFill size={15} color="#115511" />: <RiFlowerFill size={15} color="green"/>}
                
            {isShown ? <Box className={style.markerTextSnippet}><Flex justify='between'><Text>{text}</Text>{ session == user_id.toString()? <Button className={style.editButton} onClick={ () => toggleEditForm(text, id, lng, lat)} size='1' ml='1' >{t('editbutton')}</Button>: null}</Flex></Box >: <Box className={style.markerTextSnippet} ></Box>}
            {toggle ? <Image width={100} height={100} src={iagonPath} alt='Awaiting image...' />: null }
        </Box>
        </Flex>
    )
    
}