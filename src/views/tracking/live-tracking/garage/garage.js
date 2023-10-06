import { Icon } from '@iconify/react'
import { Button, Dialog, Grid, SwipeableDrawer } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'

// ** Styled Components
import { TrackingMapWrapper, TrackingWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import { Box } from '@mui/system'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { IconWrapper } from 'src/styles/pages/catalogs'
import { useCommonStyles } from 'src/styles/common'




// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function Garage(props) {

  // Fuel Markers
const [markers, setMarkers] = useState([
  {
    position: {lat: 24.7136, lng: 46.675},
    icon: '/images/map-markers/garage-ic.svg'
  },
  {
    position: {lat: 20.7136, lng: 46.675},
    icon: '/images/map-markers/garage-ic.svg'
  },
  {
    position: {lat: 19.7136, lng: 40.675},
    icon: '/images/map-markers/garage-ic.svg'
  },
  {
    position: {lat: 28.7136, lng: 40.675},
    icon: '/images/map-markers/garage-ic.svg'
  },

  {
    position: {lat: 28.7136, lng: 52.675},
    icon: '/images/map-markers/garage-ic.svg'
  }
])

  return (
    <TrackingMapWrapper>
      <Grid container spacing={0} sx={{ height: 'calc(100vh - 64px)' }}>
        <Grid item xs={12}>
          <GoogleMapComponent zoom={6} center={center} tracking={true} liveTracking={true} markers={markers} />
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default Garage
