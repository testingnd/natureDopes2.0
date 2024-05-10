'use client'

import React from "react";
import maplibregl, { Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map.module.css'
import { cache, use } from "react";
import Loading from "../finder/loading";
import { Suspense } from "react";

import { GetImage } from "./GetImage";



//const getImageData = cache(() =>
 //   fetch("http://localhost:3000/map/api").then((res) => res.json()));
 

export default function MapUpload({getImageData}){

//const imageData = use(getImageData()) 

const [lng] = React.useState<number>(-1.17);
const [lat] = React.useState<number>(48);
const [zoom] = React.useState<number>(4);
const mapContainer = React.useRef<any>(null);
const map = React.useRef<any>(null);
const [API_KEY] = React.useState<string>('CMRIccwlZz6zI6QR2E5I');


const [data, setData] = React.useState(getImageData)



React.useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
  
      map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [-1.17, 48],
      zoom: 4
    });


   // `<img width="100" height="100" src='data:image/png;base64,${iagImages[0]}'>`
  
  for (let i in data){
   
  
    const marker = new maplibregl.Marker({color: "#FF0000"})
    .setLngLat([data[i].gps_long, data[i].gps_lat])
    
    //.off('click', imageHandler)
    .addTo(map.current);

    
   marker.getElement().addEventListener('click', async () =>{
      
      let popUp = new maplibregl.Popup()
      marker.setPopup(popUp)
      popUp.setHTML('<p>Awaiting photo<p/>')
    
      const getPath = await GetImage()
      //const imagePath = `<img width="100" height="100" src='data:image/png;base64,${getPath}`
     
      
      popUp.setHTML(`<img width="100" height="100" src="data:image/png;base64,${getPath}" alt="${data[i].species_name}">`)
      
    } )
    
  }
  
  }, [API_KEY, lng, lat, zoom, data]);



 return(
     
     <>
     
      <div ref={mapContainer} className={mapStyle.map} />  <div/>
     
      
     </> 
        
   
    
 );

}