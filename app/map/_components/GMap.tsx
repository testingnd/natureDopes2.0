'use client'


import { Suspense, useState } from 'react';

import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'

import Loading from '@/app/loading'

import { StaticImageData } from 'next/image';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Switch, Theme } from '@radix-ui/themes';
import { Label } from '@radix-ui/themes/src/components/context-menu.jsx';



export default function Gmap({getImageData, loadingGif, session}: {getImageData: ImageData, loadingGif: StaticImageData, session: number}) {


  const [imageData, setImageData] = useState<ImageData>(getImageData)

  const [searchParams, setSearchParams] = useState<string>('')

  const [allChecked, setAllChecked]  = useState<boolean>(true)



  /*const handleSearchEvent = (event) => {
    setImageData([getImageData])
    setSearchParams(event.target.value)
    let tempArray = imageData.filter((data) => data.species_name.includes(searchParams));
    setImageData(tempArray);
   
    }*/
  

  const handleSubmit = (event: React.ChangeEvent<EventTarget>): void => {
    event.preventDefault();
    /* let tempArray = imageData.filter((data) => data.species_name.includes(searchParams));
    setImageData(tempArray);
    if(searchParams.length < 1){
    setImageData(getImageData)
     
  }*/
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
        <input name='searchSpecies' type='text' placeholder="Search for species here... " onChange={event => setSearchParams(event.target.value)}/>
      </form>

    <Theme accentColor='grass' data-is-root-theme='false'>
      { !session ? null :<><label>All finds</label>
      <Switch checked={!allChecked} onCheckedChange={() => setAllChecked(allChecked => !allChecked)} />
      <label>Your finds</label></>
      }
     

    </Theme>


      
      <Suspense fallback={<Loading/>}>
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  process.env.NEXT_PUBLIC_GOOGLEMAPAPI}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
         
        >
    
        {imageData.filter(data => {
          if(!allChecked){
            if(data.user_id == session){
              return data
            } else {
              return
            }
          } else {
            return data
          }
        })
        .filter(data => {
          if(data === ''){
            return data
          } else if(data.species_name.toLowerCase().includes(searchParams.toLowerCase())) {
            return data
          }
        }).map((data) => (
          <MapMarker key={data.id} lat={data.gps_lat} lng={data.gps_long} text={data.species_name} path={data.path} loadingGif={loadingGif} />
        ))}  

        </GoogleMapReact>
      </div>
      </Suspense>
    </>
  );
 
}