'use client'

import {ReactEventHandler, useState} from "react";


import { Card, Flex, Button, TextField, Text, HoverCard } from "@radix-ui/themes";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import style from './uploadForm.module.css'

import { iagonUpload } from "../../_lib/uploadImageIagon";
import { registerImageData } from "../../_lib/registerImageData";
import { revalidateTag } from "next/cache";

import { SubmitButton } from "@/src/app/[locale]/_components/buttons/SubmitButton";
import { useTranslations } from "next-intl";


export default function imageUploadForm({lng, lat, session, toggleUploadForm, getData, clearSelection}: {lng: number | undefined, lat: number | undefined, session: string, toggleUploadForm: ReactEventHandler, getData: Function, clearSelection: () => void}){

    const t = useTranslations('GMap.UploadForm');
    const tHover = useTranslations('GMap.UploadForm.HoverCard');

    const [ errors, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [speciesName, setSpeciesName] = useState<string>('')

    // handler to refresh data dynamically after marker edit
  async function refreshData(){
    const {error} = await getData()
    if (error) {
        setError(error)
    }

  }
   

    const submit = async (data: FormData) => {

        setError('')
        
        const {error, path} = await iagonUpload(data)
      
        if(error){
            setError(error)
            return
        } else {
              const {errorPrisma, success} = await registerImageData(data, path, session)
                setError(errorPrisma)
                if(success){
                    setSuccess(success)
                    refreshData()
                  
                   
                   
                    

                }
        }
       
        
    }
    



    return(
        <section className={style.uploadFormWrapper}>
        
            <Card size={{xs: '1', sm: '1', md: '3', lg: '4', xl: '5'}} variant="classic">
                <Flex  gap='4' direction='column'>
                    
                    <Flex justify='between'>
                        <Flex align='center'>
                            <Text>{t('title')}</Text>
                            <HoverCard.Root >
                                <HoverCard.Trigger>
                                    <Button ml='1' size='1'>i</Button>
                                </HoverCard.Trigger>
                                <HoverCard.Content className={style.uploadFormInfoHover}>
                                    <Card size={{xs: '1', sm: '1', md: '3', lg: '4', xl: '5'}} >
                                        <Flex direction='column' gap='2'>
                                            <Text>{">"}{tHover('one')}</Text>
                                            <Text>{">"}{tHover('two')}</Text>
                                            <Text>{">"}{tHover('three')}</Text>
                                            <Text>{">"}{tHover('four')}</Text>
                                        </Flex>
                                    </Card>

                                </HoverCard.Content>
                            </HoverCard.Root>

                        </Flex>
                        <Button size='1' variant="surface" onClick={toggleUploadForm}>X</Button>
                    </Flex>

                    <form action={submit}>
                        <TextField.Root
                            mb='2'
                            name='species'
                            placeholder={t('species')}
                            size='3'
                            value={speciesName}
                            onChange={(e) => setSpeciesName(e.target.value)}
                        />
                        <TextField.Root mb='2' name='gps_long' placeholder="Position Longtitude" size='3' value={lng} readOnly />
                        <TextField.Root mb='2' name='gps_lat' placeholder="Position Latitude" size='3' value={lat} readOnly />

                        {/* Clear location button - removes temp marker and disables upload */}
                        {(lng !== undefined && lat !== undefined) && (
                          <Flex mb='2'>
                            <Button
                              type="button"
                              size='2'
                              variant='soft'
                              color='gray'
                              onClick={clearSelection}
                            >
                              <CrossCircledIcon /> {t('clearLocation')}
                            </Button>
                          </Flex>
                        )}

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
                        <SubmitButton disabled={!speciesName.trim() || lng === undefined || lat === undefined}>
                            {t('uploadbutton')}
                        </SubmitButton>
                       {errors && <p>{errors}</p>}
                       { success && <p >{success}</p>}  
                    </form>
                    
                    
                </Flex>
            </Card>
    
        </section>
    )
}