'use client'

import { Key, MouseEventHandler, Suspense, useState } from 'react';

import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import ImageUploadForm from './forms/ImageUploadForm';
import EditImageForm from './forms/EditImageForm';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import Loading from '@/src/app/[locale]/loading'

import { StaticImageData } from 'next/image';

import { Button, Switch, Tooltip, TextField, Flex, Box } from '@radix-ui/themes';
import style from './mapMarker.module.css'

import { useTranslations } from 'next-intl';

import { images } from '@prisma/client';



export default function Gmap({getImageData, loadingGif, session}: {getImageData: images[], loadingGif: StaticImageData, session: number}) {

  const t = useTranslations('GMap');



  //image data from prisma client
  const [imageData, setImageData] = useState(getImageData)

  // state for search bar
  const [searchParams, setSearchParams] = useState<string>('')

  //toggles if user would like to see all markers or just there own
  const [allChecked, setAllChecked]  = useState<boolean>(true)

  // state for long/ lat positons for onclickMap function
  const[gps_lat, setLat] = useState<number>()
  const[gps_long, setLong] = useState<number>()
  const[species_name, setSpecies] = useState<string>()
  const[imageId, setImageId] = useState<number>()
  

  // whether upload form is visible
  const[uploadForm, setUploadForm]= useState<boolean>(false)
  const[editForm, setEditForm] = useState<boolean>(false)

  async function getData() {
    const res = await fetch(`${process.env.LIVESITE}/map/api`)
  
    if (!res.ok) {
     
      return {
        error: 'Find has been updated, please refresh browser'
      }
    }
    const newData = await res.json()
    setImageData(newData)
    return {
      success: 'Map updated'
    } 
  }
  


  function toggleUploadForm(){
    setUploadForm(!uploadForm)
  }

  // whether Edit Form is Visible
  function toggleEditForm(species?: string, id?: number, lng?: number, lat?: number){
    if (species !== undefined && id !== undefined) {
      // Opening form with data
      setSpecies(species)
      setImageId(id)
      setLong(lng)
      setLat(lat)
      setEditForm(true)
    } else {
      // Closing form
      setEditForm(false)
      setImageId(undefined)
      setSpecies(undefined)
      setLong(undefined)
      setLat(undefined)
    }
  }




  const handleSubmit = (event: React.ChangeEvent<EventTarget>): void => {
    event.preventDefault();
 
}

// on click function for googleMap
function onClickMap({lat, lng}: {lat: number, lng: number}) {
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
      <Flex p='1' direction='column' width={{initial:'60%', xs: '60%', sm: '60%', md: '40%', lg:'40%', xl: '40%'}}>
      
        { !session ? null :
        
        <Flex p='1' justify='between'>
          <Flex align='center'>
            <label className={style.findLabel}>{t('allfinds')}</label>
            <Switch checked={!allChecked} onCheckedChange={() => setAllChecked(allChecked => !allChecked)} />
            <label className={style.findLabel}>{t('yourfinds')}</label>
          </Flex>

        </Flex>
        }
        <Flex align='center'>
          <form onSubmit={handleSubmit}>

            <TextField.Root placeholder={t('searchbar')} onChange={event => setSearchParams(event.target.value)}>
              <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>

          </form>
          {!session? null :  uploadForm ? null : <Box p='1'><Button onClick={toggleUploadForm}>{t('addbutton')}</Button> </Box>}
          {editForm ? <EditImageForm species={species_name} lng={gps_long} lat={gps_lat} imageId={imageId} toggleEditForm={toggleEditForm} getData={getData} />: null }
          {session? null:<Tooltip className={style.toolTip}  content='Sign in for more map features'>
            <Button ml='1%'  radius='medium'>i</Button>

          </Tooltip>
          }
        </Flex>
        
     

    </Flex>


      
      
      <div style={{ height: '90vh', width: '100%'  }}>

        {uploadForm? <ImageUploadForm lng={gps_long} lat={gps_lat} session={session} toggleUploadForm={toggleUploadForm} getData={getData}  />: null}
        <Suspense fallback={<Loading/>}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  process.env.NEXT_PUBLIC_GOOGLEMAPAPI}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          
          onClick={onClickMap}
        >
     
    
        {imageData.filter((data) => {
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
        .filter((data) => {
          if(!data){
            return data
          } else if(data.species_name.toLowerCase().includes(searchParams.toLowerCase())) {
            return data
          }
        }).map(data  => (
          <MapMarker key={data.id} id={data.id} user_id={data.user_id} lat={data.gps_lat} lng={data.gps_long} text={data.species_name} ipath={data.image_path} session={session} loadingGif={loadingGif} toggleEditForm={toggleEditForm}  />
        ))}

        </GoogleMapReact>
      </Suspense>
      </div>
      
    </>
  );
 
}