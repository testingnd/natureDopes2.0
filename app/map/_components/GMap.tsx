'use client'


import { Suspense, useState } from 'react';

import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import ImageUploadForm from './forms/ImageUploadForm';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import Loading from '@/app/loading'

import { StaticImageData } from 'next/image';


import { Button, Switch, Tooltip, TextField, Flex, Box } from '@radix-ui/themes';
import style from './mapMarker.module.css'



export default function Gmap({getImageData, loadingGif, session}: {getImageData: ImageData, loadingGif: StaticImageData, session: number}) {

  //state for image file collected from iagon api
  const [imageData, setImageData] = useState<ImageData>(getImageData)

  // state for search bar
  const [searchParams, setSearchParams] = useState<string>('')

  //toggles if user would like to see all markers or just there own
  const [allChecked, setAllChecked]  = useState<boolean>(true)

  // state for long/ lat positons for onclickMap function
  const[gps_lat, setLat] = useState<number>(0)
  const[gps_long, setLong] = useState<number>(0)

  // whether upload form is visible
  const[uploadForm, setUploadForm]= useState<boolean>(false)

  function toggleUploadForm(){
    setUploadForm(!uploadForm)
  }




  const handleSubmit = (event: React.ChangeEvent<EventTarget>): void => {
    event.preventDefault();
 
}

// on click function for googleMap
function onClickMap({lat, lng}) {
  setLong(lng)
  setLat(lat)
  console.log(lat, lng)
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
      <Flex p='1' direction='column' width='40%'>
      
        { !session ? null :
        
        <Flex p='1' justify='between'>
          <Flex align='center'>
            <label>All finds</label>
            <Switch checked={!allChecked} onCheckedChange={() => setAllChecked(allChecked => !allChecked)} />
            <label>Your finds</label>
          </Flex>
        
        </Flex>
        }
        <Flex align='center'>
          <form onSubmit={handleSubmit}>

            <TextField.Root placeholder="Search for Species…" onChange={event => setSearchParams(event.target.value)}>
              <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          
          </form>
          {uploadForm ? null : <Box p='1'><Button onClick={toggleUploadForm}>Add</Button> </Box>}
          {session? null:<Tooltip  content='Sign in for more map features'>
            <Button ml='1%'  radius='medium'>i</Button>

          </Tooltip>
          }
        </Flex>
        
     

    </Flex>


      
      
      <div style={{ height: '90vh', width: '100%'  }}>

        {uploadForm? <ImageUploadForm lng={gps_long} lat={gps_lat} session={session} toggleUploadForm={toggleUploadForm}/>: null}
        <Suspense fallback={<Loading/>}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  process.env.NEXT_PUBLIC_GOOGLEMAPAPI}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          
          onClick={onClickMap}
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
      </Suspense>
      </div>
      
    </>
  );
 
}