
import { Pool } from "pg"
import React from 'react'

import { prisma } from "../prisma";

  export default async function PgData(){
    
  let imagelist = await prisma.images.findMany();

        return(

            <>
                <section>
                    {imagelist.map(image => (
                  
                    
                    <p key={image.id}>{image.species_name}</p>
                    
                
                    
                    
                ))}</section>

                <p>Is this going to work anytime soon?</p>
             
            </>

        )

      

    }
