'use client'


import React from "react";

import GoogleMapReact from 'google-map-react';
import MapMarker from './_components/MapMarker'


export default function Gmap({getImageData}){


  const [imageData, setImageData] = React.useState(getImageData)
  const [searchParams, setSearchParams] = React.useState('')


  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  // starting view of map
  const defaultProps = {
    center: {
      lat: 48,
      lng: -1.25
    },
    zoom: 6
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key:  process.env.NEXT_PUBLIC_GOOGLEMAPAPI}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
   
      {imageData.map((data) => (
        <MapMarker key={data.id} lat={data.gps_lat} lng={data.gps_long} text={data.species_name} path={data.path} />
      ))}  

      </GoogleMapReact>
    </div>
  );
}