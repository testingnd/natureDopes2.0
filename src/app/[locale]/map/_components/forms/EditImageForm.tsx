'use client'

import {MouseEventHandler, ReactEventHandler, useState} from "react";


import { Card, Flex, Button, TextField, Text, HoverCard } from "@radix-ui/themes";
import style from './uploadForm.module.css'


import { editImageData } from "../../_lib/editImageData";
import { TranslationTypes } from "../../../layout";

import { SubmitButton } from "@/src/app/[locale]/_components/buttons/SubmitButton";


export default function EditImageForm({species, lng, lat, imageId, toggleEditForm, getData, translationProps}: {species: string | undefined, lng: number | undefined, lat: number | undefined, imageId: number | undefined | string, toggleEditForm: React.MouseEventHandler, getData: Function, translationProps: TranslationTypes}){

    const [ error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

   
// handler to refresh data dynamically after marker edit
  async function refreshData(){
    const {error, success} = await getData()
    if (error) {
        setError(error)
        
    }
    if(success)
    console.log(success)
    
  }

    const submit = async (data: FormData) => {
        
        const {errorPrisma, success} = await editImageData(data)
            setError(errorPrisma)
            if(success){
                refreshData()
                setSuccess(success)

            }
        
       
        
    }



    return(
        <section className={style.EditFormWrapper}>
        
            <Card size={{xs: '1', sm: '1', md: '3', lg: '4', xl: '5'}} variant="ghost" className={style.cardColor} >
                <Flex  gap='4' direction='column'>
                    
                    <Flex justify='between'>
                        <Flex align='center'>
                            <Text>{translationProps.editFormTitle}</Text> 
                            <HoverCard.Root >
                                <HoverCard.Trigger>
                                    <Button ml='1' mr='1' size='1'>?</Button>
                                </HoverCard.Trigger>
                                <HoverCard.Content className={style.uploadFormInfoHover} >
                                    <Card size={{xs: '1', sm: '1', md: '3', lg: '4', xl: '5'}} mr={{initial: '2', xs: '2', sm: '2', }} >
                                        <Flex direction='column' gap='2'>
                                            <Text>{">"}{translationProps.eHoverOne}</Text>
                                            <Text>{">"}{translationProps.eHoverTwo}</Text>
                                            
                                            <Text>{">"}{translationProps.eHoverThree}</Text>
                                        </Flex>
                                    </Card>

                                </HoverCard.Content>
                            </HoverCard.Root>

                        </Flex>
                        <Button size='1' variant="surface" onClick={toggleEditForm}>X</Button>
                    </Flex>
                    
                    <form action={submit}>
                        <TextField.Root mb='2' name='species' placeholder={species} size='3'  />
                        <TextField.Root mb='2' name='gps_long' placeholder='Position Longtitude' size='3' value={lng} />
                        <TextField.Root mb='2' name='gps_lat' placeholder='Position Latitude' size='3' value={lat}/>
                        <TextField.Root className={style.hiddenInput} name='imageId' value={imageId} style={{display: 'none'}}  />
                        <SubmitButton>{translationProps.updateButton}</SubmitButton>
                       
                    </form>
                    {error && <p>{error}</p>}
                    { success && <p >{success}</p>}  
                    
                </Flex>
            </Card>
    
        </section>
    )
}