'use client'

import {MouseEventHandler, ReactEventHandler, useState} from "react";


import { Card, Flex, Button, TextField, Text, HoverCard } from "@radix-ui/themes";
import style from './uploadForm.module.css'


import { editImageData } from "../../_lib/editImageData";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";


export default function EditImageForm({species, lng, lat, imageId, toggleEditForm, getData}: {species: string | undefined, lng: number | undefined, lat: number | undefined, imageId: number | undefined | string, toggleEditForm: Function | ReactEventHandler, getData: Function}){

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
        
            <Card variant="classic" >
                <Flex  gap='4' direction='column'>
                    
                    <Flex justify='between'>
                        <Flex align='center'>
                            <Text>Edit existing find</Text> 
                            <HoverCard.Root >
                                <HoverCard.Trigger>
                                    <Button ml='1' size='1'>?</Button>
                                </HoverCard.Trigger>
                                <HoverCard.Content className={style.uploadFormInfoHover}>
                                    <Card >
                                        <Flex direction='column' gap='2'>
                                            <Text>{">"}Re-Enter Your Species Name</Text>
                                            <Text>{">"}Click on the map again, the location of the find (Zoom in for accuracy)</Text>
                                            
                                            <Text>{">"}Click Update and it's done!</Text>
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
                        <TextField.Root className={style.hiddenInput} name='imageId' placeholder={imageId} value={imageId} />
                        <SubmitButton>Update</SubmitButton>
                       
                    </form>
                    {error && <p>{error}</p>}
                    { success && <p >{success}</p>}  
                    
                </Flex>
            </Card>
    
        </section>
    )
}