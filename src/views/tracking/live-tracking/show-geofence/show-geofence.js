import { Icon } from '@iconify/react'
import { Button, Grid, SwipeableDrawer } from '@mui/material'
import React, { useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'

// ** Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Styled Components
import { SwipperWrapper, TrackingMapWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import { useContext } from 'react'
import { MainUIContext } from 'src/contexts/MainContext'

// ** Show Geofence Components
import ShowGeofenceForm from './form'
import ShowGeofenceTable from './show-geofence-table'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}
function ShowGeofence(props) {
  const { window } = props
  const [open, setOpen] = useState(false)

  // State For Showing Selected Points
  const [cords, setCords] = useState([])

  // ** SideBar Toggle
  const { sidebarHover } = useContext(MainUIContext)

  let sidebarWidth = sidebarHover ? 260 : 68

  let calculatedWidth = '-' + (550 - sidebarWidth) + 'px'

  const styles = useDrawerStyles({
    drawerOpen: open,
    drawerWidth: '550px',
    widthLg: '500px',
    slideVal: calculatedWidth,
    sidebarW: sidebarWidth
  })

  const toggleDrawer = value => {
    setOpen(value)
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    zone: Yup.string().required('Zone is required')
  })

  // Formik to get Value of Filter in Header of Swiper
  const formik = useFormik({
    initialValues: {
      zone: null,
      name: ''
    },
    validationSchema: schema,
    enableReinitialize: true
  })

  // ** Getting Points From Table Selected
  const handleSelectedRows = e => {
    const list = e.selectedRows?.map(val => {
      return JSON.parse(val?.points)
    })

    setCords(list)
  }

  return (
    <TrackingMapWrapper>
      <Grid container spacing={0} sx={{ height: 'calc(100vh - 64px)' }} className='live-tracking'>
        <Grid item>
          <SwipeableDrawer
            container={container}
            anchor='left'
            open={true}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
            swipeAreaWidth={200}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: false
            }}
            className={styles.drawer}
            variant='persistent'
          >
            <Button onClick={() => toggleDrawer(!open)} className={styles.puller} sx={{ display: { xs: 'block' } }}>
              <Icon icon='material-symbols:arrow-back-ios-rounded' />
            </Button>

            <Grid
              item
              sx={{
                position: 'absolute',
                left: 0,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                top: 0,
                right: 0,
                height: '100%',
                background: '#fff'
              }}
            >
              <SwipperWrapper>
                <ShowGeofenceForm xs={12} formik={formik} />
                <ShowGeofenceTable handleSelectedRows={handleSelectedRows} />
              </SwipperWrapper>
            </Grid>
          </SwipeableDrawer>
        </Grid>

        <Grid item xs={12}>
          <GoogleMapLoader>
            {isLoaded => (
              <GoogleMapComponent
                isLoaded={isLoaded}
                zoom={6}
                center={center}
                tracking={true}
                liveTracking={true}
                showGeofence={true}
                showGeofenceVal={cords}
              />
            )}
          </GoogleMapLoader>
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default ShowGeofence
