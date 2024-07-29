'use client'

import {ReactEventHandler, useState} from "react";

import { Heading, Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField, Text, HoverCard } from "@radix-ui/themes";
import style from './uploadForm.module.css'

import { iagonUpload } from "../../_lib/uploadImageIagon";
import { registerImageData } from "../../_lib/registerImageData";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";


export default function imageUploadForm({lng, lat, session, toggleUploadForm, getData}: {lng: number, lat: number, session: number, toggleUploadForm: ReactEventHandler, getData: ReactEventHandler}){

    const [ errors, setError] = useState<string | undefined>('')
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

        if(errors){
            return
        }
        
        const {error, path} = await iagonUpload(data)
        
        if(error){
            setError(error)
            return
        } else {
              const {errorPrisma, success} = await registerImageData(data, path, session)
                setError(errorPrisma)
                if(success){
                    refreshData()
                    setSuccess(success)
                    

                }
        }
       
        
    }



    return(
        <section className={style.uploadFormWrapper}>
        
            <Card variant="classic">
                <Flex  gap='4' direction='column'>
                    
                    <Flex justify='between'>
                        <Flex align='center'>
                            <Text>Upload your finds here</Text> 
                            <HoverCard.Root >
                                <HoverCard.Trigger>
                                    <Button ml='1' size='1'>i</Button>
                                </HoverCard.Trigger>
                                <HoverCard.Content className={style.uploadFormInfoHover}>
                                    <Card >
                                        <Flex direction='column' gap='2'>
                                            <Text>>Enter Your Species Name</Text>
                                            <Text>>Click on the map where you located it (Zoom in for accuracy)</Text>
                                            <Text>>Click Choose File to select the photo from your device</Text>
                                            <Text>>Click Upload and it's done!</Text>
                                        </Flex>
                                    </Card>

                                </HoverCard.Content>
                            </HoverCard.Root>

                        </Flex>
                        <Button size='1' variant="surface" onClick={toggleUploadForm}>X</Button>
                    </Flex>
                    
                    <form action={submit}>
                        <TextField.Root mb='2' name='species' placeholder="Species Name" size='3'  />
                        <TextField.Root mb='2' name='gps_long' placeholder="Position Longtitude" size='3' value={lng} />
                        <TextField.Root mb='2' name='gps_lat' placeholder="Position Latitude" size='3' value={lat}/>
                        <input className={style.uploadFileButton} name='image_file' placeholder="Image" type="file" accept=".png, .jpg, .jpeg, .heic, .svg" onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                            if (event.target.files[0].size > 5 * 1000 * 1024) {
                                setError("File with maximum size of 5MB is allowed");
                                
                                return false;
                            } else {
                                setError('')
                            }

                            // do other operation
                            }
                        }}/>   
                        <SubmitButton>Upload</SubmitButton>
                    </form>
                    {errors && <p>{errors}</p>}
                    { success && <p >{success}</p>}  
                    
                </Flex>
            </Card>
    
        </section>
    )
}