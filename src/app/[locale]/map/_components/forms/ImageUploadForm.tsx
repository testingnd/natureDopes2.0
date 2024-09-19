'use client'

import {ReactEventHandler, useState} from "react";


import { Card, Flex, Button, TextField, Text, HoverCard } from "@radix-ui/themes";
import style from './uploadForm.module.css'

import { iagonUpload } from "../../_lib/uploadImageIagon";
import { registerImageData } from "../../_lib/registerImageData";
import { revalidateTag } from "next/cache";

import { SubmitButton } from "@/src/app/[locale]/_components/buttons/SubmitButton";
import { TranslationTypes } from "../../../layout";


export default function imageUploadForm({lng, lat, session, toggleUploadForm, getData, translationProps}: {lng: number | undefined, lat: number | undefined, session: number, toggleUploadForm: ReactEventHandler, getData: Function, translationProps: TranslationTypes}){

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
                    revalidateTag('finderdata')
                    setSuccess(success)
                    

                }
        }
       
        
    }
    



    return(
        <section className={style.uploadFormWrapper}>
        
            <Card size={{xs: '1', sm: '1', md: '3', lg: '4', xl: '5'}} variant="classic">
                <Flex  gap='4' direction='column'>
                    
                    <Flex justify='between'>
                        <Flex align='center'>
                            <Text>{translationProps.uploadFormTitle}</Text> 
                            <HoverCard.Root >
                                <HoverCard.Trigger>
                                    <Button ml='1' size='1'>i</Button>
                                </HoverCard.Trigger>
                                <HoverCard.Content className={style.uploadFormInfoHover}>
                                    <Card size={{xs: '1', sm: '1', md: '3', lg: '4', xl: '5'}} >
                                        <Flex direction='column' gap='2'>
                                            <Text>{">"}{translationProps.hoverOne}</Text>
                                            <Text>{">"}{translationProps.hoverTwo}</Text>
                                            <Text>{">"}{translationProps.hoverThree}</Text>
                                            <Text>{">"}{translationProps.hoverFour}</Text>
                                        </Flex>
                                    </Card>

                                </HoverCard.Content>
                            </HoverCard.Root>

                        </Flex>
                        <Button size='1' variant="surface" onClick={toggleUploadForm}>X</Button>
                    </Flex>
                    
                    <form action={submit}>
                        <TextField.Root mb='2' name='species' placeholder={translationProps.species} size='3'  />
                        <TextField.Root mb='2' name='gps_long' placeholder="Position Longtitude" size='3' value={lng} />
                        <TextField.Root mb='2' name='gps_lat' placeholder="Position Latitude" size='3' value={lat}/>
                        <input className={style.uploadFileButton} name='image_file' placeholder="Image" type="file" accept=".png, .jpg, .jpeg, .heic, .svg" onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                            if (event.target.files[0].size > 5 * 1000 * 1024) {
                                setError("Photo with maximum size of 5MB is allowed");
                                
                                return false;
                            } else {
                                setError('')
                            }

                       
                            }
                        }}/>   
                        <SubmitButton>{translationProps.uploadButton}</SubmitButton>
                       
                    </form>
                    {errors && <p>{errors}</p>}
                    { success && <p >{success}</p>}  
                    
                </Flex>
            </Card>
    
        </section>
    )
}