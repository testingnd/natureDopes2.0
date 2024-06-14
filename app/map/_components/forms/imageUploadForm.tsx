'use client'

import {useState} from "react";

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";

import { iagonUpload } from "../../_lib/uploadImageIagon";
import { registerImageData } from "../../_lib/registerImageData";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";


export default function imageUploadForm({lng, lat, session}: {lng: number, lat: number, session: number}){

    const [ error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')


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

        <Theme accentColor="grass" data-is-root-theme='false'>
            <Card >
                <Flex width='50%' gap='4' direction='column'>
                    <form action={submit}>
                        <TextField.Root name='species' placeholder="Species Name" size='3'  />
                        <TextField.Root name='gps_long' placeholder="Position Long" size='3' defaultValue={lng} />
                        <TextField.Root name='gps_lat' placeholder="Position Lat" size='3' defaultValue={lat}/>
                        <input name='image_file' placeholder="Image" type="file" />   
                        <SubmitButton>Upload</SubmitButton>
                    </form>
                    {error && <p>{error}</p>}
                    { success && <p >{success}</p>}  
                    <p>{session}</p>
                </Flex>
            </Card>
        </Theme>

    )
}