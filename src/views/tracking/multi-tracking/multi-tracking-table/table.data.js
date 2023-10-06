import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'
import { useEffect, useRef, useState } from 'react'

// ** Icon import
import { Icon } from '@iconify/react'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import { SmallMapWrapper } from 'src/styles/common'
import { useJsApiLoader, GoogleMap, Marker, Circle } from '@react-google-maps/api'
import { Grid, Typography } from '@mui/material'

export const columns = ({sidebar, checkedRows, setCheckedRows}) => {

  const mediaXl = window.matchMedia('(min-width: 1600px)');
  const mediaSm = window.matchMedia('(max-width: 768px)');
  const mediaXm = window.matchMedia('(max-width: 450px)');

  let containerStyle;
  let sm = mediaSm.matches;
  let xm = mediaXm.matches;
  let xl = mediaXl.matches;


  if(sm){
    containerStyle = {
      width: '22vw',
      height: '12vh'
    }
  }
  else{
    containerStyle = {
      width: '12vw',
      height: '15vh'
    }
  }


  // ** Google Map
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCpw_-yCs_z9hcqqp4-n-QKnE1REYOBFJo'
  })

  const handleVehicleModal = (row) => {
    const index = checkedRows.indexOf(row);
    const windowLimit = sm ? 9 : xl ? 15 : 12;
  
    if (index === -1) {
      if (checkedRows.length < windowLimit) {
        setCheckedRows([...checkedRows, row]);
      } else {
        const uncheckedIndex = 0;
        setCheckedRows([...checkedRows.slice(1), row]);
      }
    } else {
      setCheckedRows([...checkedRows.slice(0, index), ...checkedRows.slice(index + 1)]);
    }
  };


  const getRightValue = (row) => {

    let rowIndex = Math.abs(checkedRows.indexOf(row));

    if(sm){
    if(rowIndex < 1 || rowIndex === 3 || rowIndex === 6  ){
      return "0px"
    }

    else if (rowIndex > 3 && rowIndex < 6 ){
      return "calc(" + (rowIndex - 3) * 22 + "vw" + " + "  + (rowIndex - 3) * 35 + "px)"
    }

    else if (rowIndex > 6){
        return "calc(" + (rowIndex - 6) * 22 + "vw" + " + "  + (rowIndex - 6) * 35 + "px)"
      }

    else{
      return "calc(" + (rowIndex * 22) + "vw" + " + "  + (rowIndex * 35) + "px)"
    }
    }

    if(xl){
      if(rowIndex < 1 || rowIndex === 5 || rowIndex === 10  ){
        return "0px"
      }
  
      else if (rowIndex > 5 && rowIndex < 10 ){
        return "calc(" + (rowIndex - 5) * 12 + "vw" + " + "  + (rowIndex - 5) * 50 + "px)"
      }
  
      else if (rowIndex > 10){
          return "calc(" + (rowIndex - 10) * 12 + "vw" + " + "  + (rowIndex - 10) * 50 + "px)"
        }
  
      else{
        return "calc(" + (rowIndex * 12) + "vw" + " + "  + (rowIndex * 50) + "px)"
      }
    }

    else{
      if(rowIndex < 1 || rowIndex === 4 || rowIndex === 8  ){
        return "0px"
      }
  
      else if (rowIndex > 4 && rowIndex < 8 ){
        return "calc(" + (rowIndex - 4) * 12 + "vw" + " + "  + (rowIndex - 4) * 50 + "px)"
      }
  
      else if (rowIndex > 8){
          return "calc(" + (rowIndex - 8) * 12 + "vw" + " + "  + (rowIndex - 8) * 50 + "px)"
        }
  
      else{
        return "calc(" + (rowIndex * 12) + "vw" + " + "  + (rowIndex * 50) + "px)"
      }
    }

  }

  const getTopValue = (row) => {

    let rowIndex = Math.abs(checkedRows.indexOf(row));
    const mapModalHeight = document.querySelector('.mapModal')?.offsetHeight;
    if(sm){
      if(rowIndex > 2 && rowIndex < 6){
        return mapModalHeight + 40 + "px"
      }
  
      else if(rowIndex > 5){
        return (mapModalHeight * 2) + 20 + "px"
      }
  
      else{
        return "62px"
      }
    }

    if(xl){
      if(rowIndex > 4 && rowIndex < 10){
        return mapModalHeight + 40 + "px"
      }
  
      else if(rowIndex > 9){
        return (mapModalHeight * 2) + 20 + "px"
      }
  
      else{
        return "62px"
      }

    }

    else{
      if(rowIndex > 3 && rowIndex < 8){
        return mapModalHeight + 40 + "px"
      }
  
      else if(rowIndex > 7){
        return (mapModalHeight * 2) + 20 + "px"
      }
  
      else{
        return "62px"
      }
    }

    }

  return [
    {
      name: 'Asset Name',
      sortable: true,
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type='checkbox' onChange={() => handleVehicleModal(row)} checked={checkedRows.indexOf(row) !== -1} />
          <Icon icon='mdi:truck' color={row.iconColor} fontSize={20} />
          {row.name}
          <AddFormDialog
            id='geofence-modal'
            title={xm ? row?.name.slice(0,5)+ '...' : row?.name }
            open={checkedRows.indexOf(row) !== -1}
            hideBackdrop
            disableEnforceFocus
            sx={{ "&.MuiDialog-root":  
            {top: getTopValue(row), right: getRightValue(row) , left: 'auto', zIndex: '10000', bottom: 'auto',},
            "& .MuiDialogTitle-root":{
              padding: '0.8rem 1.25rem',
              fontSize: '1rem',
              '@media (max-width: 768px)': {
                fontSize: '13px',
                padding: '0.8rem',
              },
            },
            "& .MuiDialogContent-root p":{
              display: 'none'
            },
            "& .MuiDialogContent-root":{
              paddingBottom: '0.5rem',
              '@media (max-width: 768px)': {
                padding: '0.8rem',
                paddingTop: 0,
            
              },
            },
            "& .MuiPaper-root":{
              margin: '15px'
            }
            }}
            className= 'mapModal'
            // submit={() => formik.handleSubmit()}
          >
            <SmallMapWrapper sx={{ minWidth: 'auto', minHeight: 'auto'}}>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={8}
                  center={{
                    lat: row?.latitude,
                    lng: row?.longitude
                  }}
                >
                  <Marker
                    position={{
                      lat: row?.latitude,
                      lng: row?.longitude
                    }}
                  />
                  <Circle
                    center={{
                      lat: row?.latitude,
                      lng: row?.longitude
                    }}
                    radius={row?.radius}
                    options={{
                      // strokeColor: '#FC3B61',
                      strokeOpacity: 0,
                      strokeWeight: 2,
                      // fillColor: '#FC3B61',
                      fillOpacity: 0,
                      clickable: false,
                      draggable: false,
                      editable: false,
                      visible: true,
                      radius: 3000,
                      zIndex: 1
                    }}
                  />
                </GoogleMap>
              )}
            </SmallMapWrapper>
          </AddFormDialog>
        </div>
      ),
      selector: row => row.name
    },

    {
      name: 'Tracking Date',
      sortable: true,
      selector: row => row.trackingDate
    }
  ]
}

export const rows = [
  {
    name: '769IJA',
    status: 'idle',
    trackingDate: '2021-05-01T12:30:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '769IJA AF',
    status: 'idle',
    trackingDate: '2020-01-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },

  {
    name: '769IJA XA',
    status: 'idle',
    trackingDate: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FF8B00',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },

  {
    name: '469IJA GH',
    status: 'idle',
    trackingDate: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#C0C5D0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI AH',
    status: 'idle',
    trackingDate: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FF8B00',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  },
  {
    name: '12212DDD SA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: 23.765788,
    longitude: 44.567890
  }
]
