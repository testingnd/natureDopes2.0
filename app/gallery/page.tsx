

import React from "react"
import Image from "next/image"





export default async function Gallery(){

    async function getData() {
        const res = await fetch('http://localhost:3000/gallery/api', { next: { revalidate: 1 } })
        // The return value is *not* serialized
    
       
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
    
    
        return res.json()
      }


    const igResponse = await getData();
    console.log(igResponse)

    return(
        <>
        {igResponse.map((media) => {
            if(media.media_type == 'IMAGE'){
                return <div key={media.id}>
                        
                            <Image 
                                src={media.media_url}
                                width={200}
                                height={200}
                                alt={'Ig picture'}
                            />
                        </div>
            }
            
                return <div key={media.id} height='200'>

                        <video width="200" height="200" controls preload="none" src={media.media_url}>

                        </video>
                </div>
            
        } )}
        <p>This will be the gallery page</p>
        
        </>
    )
}