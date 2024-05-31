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

  const handleSearchEvent = (event) => {
    setSearchParams(event.target.value)
   
    }
  

  const handleSubmit = (event) => {
    event.preventDefault();
     let tempArray = imageData.filter((data) => data.species_name.includes(searchParams));
    setImageData(tempArray);
    if(searchParams.length < 1){
    setImageData(getImageData)
     
  }
}


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
    <>
       <form onSubmit={handleSubmit}>

      <label >Search</label><br />
        <input name='searchSpecies' type='text' value={searchParams} placeholder="Search for species here... " onChange={handleSearchEvent}/>
      </form>
      <p>{searchParams}</p>
      
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
    </>
  );
 
}