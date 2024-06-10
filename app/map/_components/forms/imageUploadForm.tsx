
import {useState} from "react";

import { Theme } from "@radix-ui/themes";
import { Card, Flex, Button, TextField } from "@radix-ui/themes";


export default function imageUploadForm({lng, lat}){


    return(

        <Theme accentColor="grass" data-is-root-theme='false'>
            <Card>
                <Flex gap='4' direction='column'>
                    <form>
                        <TextField.Root name='species' placeholder="Species Name" size='3'  />
                        <TextField.Root name='gps_long' placeholder="Position Long" size='3' value={lng} />
                        <TextField.Root name='gps_lat' placeholder="Position Lat" size='3' value={lat}/>
                        <input name='image_file' placeholder="Image" type="file" />             
                    </form>

                </Flex>
            </Card>
        </Theme>

    )
}