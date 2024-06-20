

import React from "react"
import Image from "next/image"




import InstagramGallery from "./_components/InstagramGallery"





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
        <InstagramGallery igResponse={igResponse} />
        <p>This will be the gallery page</p>
        
        </>
    )
}