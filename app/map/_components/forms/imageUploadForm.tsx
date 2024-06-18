'use client'

import {useState} from "react";

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";
import style from './uploadForm.module.css'

import { iagonUpload } from "../../_lib/uploadImageIagon";
import { registerImageData } from "../../_lib/registerImageData";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";


export default function imageUploadForm({lng, lat, session, toggleUploadForm}: {lng: number, lat: number, session: number, toggleUploadForm: Function}){

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
        <section className={style.uploadFormWrapper}>
        <Theme accentColor="grass" data-is-root-theme='false'>
            <Card >
                <Flex width='50%' gap='4' direction='column'>
                    <Button onClick={toggleUploadForm}>close</Button>
                    <form action={submit}>
                        <TextField.Root name='species' placeholder="Species Name" size='3'  />
                        <TextField.Root name='gps_long' placeholder="Position Long" size='3' value={lng} />
                        <TextField.Root name='gps_lat' placeholder="Position Lat" size='3' value={lat}/>
                        <input name='image_file' placeholder="Image" type="file" accept=".png, .jpg, .jpeg, .heic, .svg"/>   
                        <SubmitButton>Upload</SubmitButton>
                    </form>
                    {error && <p>{error}</p>}
                    { success && <p >{success}</p>}  
                    <p>{session}</p>
                </Flex>
            </Card>
        </Theme>
        </section>
    )
}