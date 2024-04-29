'use client'

import React from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map.module.css'




export default function MapUpload(){

const mapContainer = React.useRef(null);
const map = React.useRef(null);
const [lng] = React.useState(139.753);
const [lat] = React.useState(35.6844);
const [zoom] = React.useState(14);
const [API_KEY] = React.useState('CMRIccwlZz6zI6QR2E5I');


React.useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
  
      map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });
  
  }, [API_KEY, lng, lat, zoom]);

 return(
    <div className={mapStyle.mapWrap}>
    <div ref={mapContainer} className={mapStyle.map} />
</div>
    
 );

}