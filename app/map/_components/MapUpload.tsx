'use client'

import React, { useRef } from "react";

import { cache, use } from "react";
import Loading from "../../finder/loading";
import { Suspense } from "react";

import { GetImage } from "../_lib/GetImage";

import MapMarker from './MapMarker'



//const getImageData = cache(() =>
 //   fetch("http://localhost:3000/map/api").then((res) => res.json()));
 

export default function MapUpload({getImageData}){

//const imageData = use(getImageData()) 

//const [lng] = React.useState<number>(-1.17);
//const [lat] = React.useState<number>(48);
//const [zoom] = React.useState<number>(4);
const mapContainer = React.useRef<any>(null);
const map = React.useRef<any>(null);
const ref = React.useRef({mapContainer, map})

const [API_KEY] = React.useState<string>('CMRIccwlZz6zI6QR2E5I');

const [imageData, setImageData] = React.useState(getImageData)
const [searchParams, setSearchParams] = React.useState('')







React.useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
  
      map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [-1.17, 48],
      zoom: 4
    });
  
},[map, mapContainer])

React.useEffect(() => {
   //`<img width="100" height="100" src='data:image/png;base64,${iagImages[0]}'>`
  
  for (let i in imageData){
   
  
    const marker = new maplibregl.Marker({color: "#FF0000"})
    .setLngLat([imageData[i].gps_long, imageData[i].gps_lat])
    
    //.off('click', imageHandler)
    .addTo(map.current);

    
   marker.getElement().addEventListener('onmouseover', () => {
      let popUp = new maplibregl.Popup()
     
      marker.setPopup(popUp)
      popUp.setHTML(`<p key=${imageData[i].id}>${imageData[i].species_name}</p>`)
     }) 

  marker.getElement().addEventListener('click', async () =>{
      
      let popUp = new maplibregl.Popup()
      marker.setPopup(popUp)
      popUp.setHTML('<p >Awaiting photo...</p>')
    
      const getPath = await GetImage()
      //const imagePath = `<img width="100" height="100" src='data:image/png;base64,${getPath}`
     
      
      popUp.setHTML(`<img  width="100" height="100" src="data:image/png;base64,${getPath}" alt="${imageData[i].species_name}">`)
      
    } )
    
  }
  
  }, [imageData, searchParams]);



 return(
     
     <>

          <form onSubmit={handleSubmit}>

              <label >Search</label><br />
              <input name='searchSpecies' type='text' value={searchParams} placeholder="Search for species here... " onChange={handleSearchEvent}/>
          </form>
         <p>{searchParams}</p>
          {imageData.map((item: any) => (
            <p key={item.id}>{item.species_name}</p>
          )) }
     
      <div ref={mapContainer} className={mapStyle.map} />  
          
      <div/>
     
      
     </> 
        
   
    
 );

}