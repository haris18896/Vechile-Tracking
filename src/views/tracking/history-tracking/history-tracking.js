import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'

// ** Styled Components
import { TrackingMapWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import HistoryTrackingMapTable from './history-tracking-map-table.js/history-tracking-map-table'
import { MainUIContext } from 'src/contexts/MainContext'
import { useContext } from 'react'
import HistoryTrackingFilter from './history-tracking-filter/history-tracking-filter'
import { useDispatch, useSelector } from 'react-redux'
import { LiveMapComponent, mapURL } from 'src/components/google-map/map'
import { resetHistoryTracking } from 'src/store/tracking/index/trackingSlice'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

// let polylineData = null
function HistoryTrackingMap(props) {
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)
  const [speedometer, setSpeedometer] = useState(false)
  const [polylineData, setpolylineData] = useState([])
  const [avgSpeedometer, setavgSpeedometer] = useState(0)
  const [mapCenter, setmapCenter] = useState(center)

  const dispatch = useDispatch()

  const { getHistoryTracking } = useSelector(state => state?.tracking)

  useEffect(() => {
    if (getHistoryTracking?.data?.length > 0) {
      let data = getHistoryTracking?.data

      const convertedData = data?.map(item => ({
        speed: item.speed,
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude)
      }))

      const avgSpeed = data?.reduce((acc, item) => acc + parseFloat(item.speed), 0)
      const averageSpeed = avgSpeed / data.length
      setavgSpeedometer(averageSpeed.toFixed(2))
      setSpeedometer(true)
      setpolylineData(convertedData)

      //getting center of map
      const totalLatitude = data.reduce((acc, item) => acc + parseFloat(item.latitude), 0)
      const totalLongitude = data.reduce((acc, item) => acc + parseFloat(item.longitude), 0)
      const averageLatitude = totalLatitude / data.length
      const averageLongitude = totalLongitude / data.length

      // Create a center object with the calculated average latitude and longitude
      const center = {
        lat: averageLatitude,
        lng: averageLongitude
      }
      setmapCenter(center)
    } else {
      setpolylineData([])
    }
  }, [getHistoryTracking])

  let sidebarWidth = sidebarHover ? 260 : 68

  let calculatedWidth = '-' + (450 - sidebarWidth) + 'px'

  let drawerWidth = 450

  const styles = useDrawerStyles({
    drawerOpen: open,
    drawerWidth: drawerWidth + 'px',
    slideVal: calculatedWidth,
    sidebarW: sidebarWidth
  })

  //Getting table height and setting map height accordingly
  // const getTableHeight = tableRef => {
  //   if (tableRef) {
  //     setTableHeight(tableRef?.current?.offsetHeight + 'px')
  //   }
  // }

  return (
    <TrackingMapWrapper>
      <Grid container spacing={0}>
        {/* First Grid */}
        <Grid item xs={3}>
          <HistoryTrackingFilter
            stopNavigation={() => {
              dispatch(resetHistoryTracking())
            }}
            toggleNavigation={() => {}}
          />
        </Grid>

        {/* Second Grid */}

        <Grid item xs={9}>
          <Grid container spacing={0} sx={{ height: 'calc(100vh - 64px)' }}>
            <Grid item xs={12}>
              <Grid key={polylineData} sx={{ height: '70%' }}>
                {/* <GoogleMapComponent
                  zoom={13}
                  center={mapCenter}
                  tracking={true}
                  speedometer={speedometer}
                  drawer={open}
                  drawerWidth={drawerWidth}
                  polylineData={polylineData}
                  speedometerSpeed={avgSpeedometer}
                /> */}
                <LiveMapComponent
                  googleMapURL={mapURL}
                  polylineData={polylineData}
                  center={mapCenter}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%`, width: '100%' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Grid>
              <Grid
                sx={{
                  marginLeft: open ? drawerWidth + 'px' : '0px',
                  transition: '.3s ease',
                  maxHeight: '30vh',
                  overflowY: 'auto',
                  position: 'absolute',
                  bottom: 0,
                  width: '80%'
                }}
              >
                <HistoryTrackingMapTable getTableHeight={'30px'} data={getHistoryTracking?.data} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default HistoryTrackingMap
