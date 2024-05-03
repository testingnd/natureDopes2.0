'use client'

import React from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map.module.css'
import { cache, use } from "react";
import Loading from "../finder/loading";
import { Suspense } from "react";

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



  for (let i in data){
    new maplibregl.Marker({color: "#FF0000"})
    .setLngLat([data[i].gps_long, data[i].gps_lat])
    .addTo(map.current);
  }
  
  }, [API_KEY, lng, lat, zoom, data]);



 return(
     
     <>
     
       <div ref={mapContainer} className={mapStyle.map} />  <div/>
     
    
      
     </> 
        
   
    
 );

}