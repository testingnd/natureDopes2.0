'use client'

import {useState} from "react";

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";

import { iagonUpload } from "../../_lib/uploadImageIagon";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";


export default function imageUploadForm({lng, lat}: {lng: number, lat: number}){

    const [ error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')


    const submit = async (data: FormData) => {
        
        const {error, path} = await iagonUpload(data)
        setError(error)

        setSuccess(path)
    }



    return(

        <Theme accentColor="grass" data-is-root-theme='false'>
            <Card>
                <Flex gap='4' direction='column'>
                    <form action={submit}>
                        <TextField.Root name='species' placeholder="Species Name" size='3'  />
                        <TextField.Root name='gps_long' placeholder="Position Long" size='3' value={lng} />
                        <TextField.Root name='gps_lat' placeholder="Position Lat" size='3' value={lat}/>
                        <input name='image_file' placeholder="Image" type="file" />   
                        <SubmitButton>Upload</SubmitButton>
                    </form>
                    {error && <p>{error}</p>}
                    { success && <p >{success}</p>}  
                </Flex>
            </Card>
        </Theme>

    )
}