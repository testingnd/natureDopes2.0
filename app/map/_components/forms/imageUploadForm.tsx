'use client'

import {ReactEventHandler, useState} from "react";

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";
import style from './uploadForm.module.css'

import { iagonUpload } from "../../_lib/uploadImageIagon";
import { registerImageData } from "../../_lib/registerImageData";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";


export default function imageUploadForm({lng, lat, session, toggleUploadForm}: {lng: number, lat: number, session: number, toggleUploadForm: ReactEventHandler}){

    const [ error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')


    const submit = async (data: FormData) => {
        
        const {error, path} = await iagonUpload(data)
        
        if(error){
            setError(error)
            return
        } else {
              const {errorPrisma, success} = await registerImageData(data, path, session)
                setError(errorPrisma)
                if(success){
                    setSuccess(success)

                }
        }
       
        
    }



    return(
        <section className={style.uploadFormWrapper}>
        
            <Card>
                <Flex  gap='4' direction='column'>
                    <Flex justify='end'>
                        <Button size='1' variant="surface" onClick={toggleUploadForm}>close</Button>
                    </Flex>
                    
                    <form action={submit}>
                        <TextField.Root mb='2' name='species' placeholder="Species Name" size='3'  />
                        <TextField.Root mb='2' name='gps_long' placeholder="Position Longtitude" size='3' value={lng} />
                        <TextField.Root mb='2' name='gps_lat' placeholder="Position Latitude" size='3' value={lat}/>
                        <input className={style.uploadFileButton} name='image_file' placeholder="Image" type="file" accept=".png, .jpg, .jpeg, .heic, .svg"/>   
                        <SubmitButton>Upload</SubmitButton>
                    </form>
                    {error && <p>{error}</p>}
                    { success && <p >{success}</p>}  
                    <p>{session}</p>
                </Flex>
            </Card>
    
        </section>
    )
}