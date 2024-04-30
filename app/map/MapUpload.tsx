'use client'

import React from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map.module.css'
import { cache, use } from "react";
import { Suspense } from "react";

const getImageData = cache(() =>
    fetch("http://localhost:3000/map/api").then((res) => res.json()));
 
  

export default function MapUpload(){

const imageData = use(getImageData()) 
 

const mapContainer = React.useRef(null);
const map = React.useRef(null);
const [lng] = React.useState(139.753);
const [lat] = React.useState(35.6844);
const [zoom] = React.useState(14);
const [API_KEY] = React.useState('CMRIccwlZz6zI6QR2E5I');


const [data, setData] = React.useState(imageData)



React.useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
  
      map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });

   /* data.map((d) => {
      new maplibregl.Marker({color: "#FF0000"})
      .setLngLat([d.gps_long, d.gps_lat])
      .addTo(map.current);

 
  })*/

  for (let i in data){
    new maplibregl.Marker({color: "#FF0000"})
    .setLngLat([data[i].gps_long, data[i].gps_lat])
    .addTo(map.current);
  }
  
  }, [API_KEY, lng, lat, zoom, data]);



 return(

  <Suspense>

     <div className={mapStyle.mapWrap}>
      
        <div ref={mapContainer} className={mapStyle.map} /><div/>
   
    </div>
  </Suspense>
   
    
 );

}