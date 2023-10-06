import { Icon } from '@iconify/react'
import { Button, Grid, SwipeableDrawer } from '@mui/material'
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'

import * as Yup from 'yup'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import LiveTravelers from 'src/pages/tracking/live-travers'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** Styled Components
import { TrackingMapWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import LiveTravelersMapTable from './live-travelers-map-table.js/live-travelers-map-table'
import LiveTravelersFooter from './live-travelers-table/live-travelers-footer'
import LiveTravelersHeader from './live-travelers-table/live-travelers-header'
import LiveTravelersTable from './live-travelers-table/live-travelers-table'
import { MainUIContext } from 'src/contexts/MainContext'
import { useContext } from 'react'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function LiveTravelersMap(props) {
  const { window } = props
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)

  let sidebarWidth = sidebarHover ? 260 : 68

  let calculatedWidth = '-' + (450 - sidebarWidth) + 'px'

  let drawerWidth = 450

  const styles = useDrawerStyles({
    drawerOpen: open,
    drawerWidth: drawerWidth + 'px',
    slideVal: calculatedWidth,
    sidebarW: sidebarWidth
  })

  const [markers, setMarkers] = useState([
    {
      position: { lat: 21.7136, lng: 50.675 },
      icon: '/images/vehicles/white.png'
    }
  ])

  const [tableheight, setTableHeight] = useState('')

  const toggleDrawer = value => {
    setOpen(value)
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined

  const getTableHeight = tableRef => {
    if (tableRef) {
      setTableHeight(tableRef?.current?.offsetHeight + 'px')
    }
  }

  const schema = Yup.object().shape({
    account: Yup.string().required('Name is required'),
    vehicleName: Yup.string().required('Vehicle Name is required'),
    lat: Yup.number().required('Latitude is required, select your location on the map'),
    lng: Yup.number().required('Longitude is required, select your location on the map')
  })

  const formik = useFormik({
    initialValues: {
      account: '',
      vehicleName: '',
      lat: location.lat,
      lng: location.lng
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('lat', location.lat)
        data.append('lng', location.lng)

        // dispatch(registerCampusAction({ data, callBack: () => router.push('/catalogs/campus') }))
      }
    }
  })

  const handleChange = event => {
    const { name, value } = event.target
    if (name === 'account') {
      formik.setFieldValue(name, event.target)
    }

    formik.setFieldValue(name, value)
  }

  return (
    <TrackingMapWrapper>
      <Grid container spacing={0} sx={{ height: 'calc(100vh - 64px)' }}>
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
              <Button onClick={() => toggleDrawer(!open)} className={styles.puller} sx={{ display: { xs: 'block' } }}>
                <Icon icon='material-symbols:arrow-back-ios-rounded' />
              </Button>

              <LiveTravelersHeader formik={formik} handleChange={handleChange} />
              <FieldHorizontalWrapper sx={{ marginBottom: '2rem' }}>
                <LiveTravelersTable />
              </FieldHorizontalWrapper>
              {/* <LiveTravelersFooter /> */}
            </Grid>
          </SwipeableDrawer>
        </Grid>

        <Grid item xs={12}>
          <Grid sx={{ height: `calc(100% - ${tableheight})` }}>
            <GoogleMapLoader>
              {isLoaded => (
                <GoogleMapComponent
                  zoom={6}
                  isLoaded={isLoaded}
                  center={center}
                  tracking={true}
                  drawer={open}
                  drawerWidth={drawerWidth}
                  markers={markers}
                />
              )}
            </GoogleMapLoader>
          </Grid>
          <Grid sx={{ marginLeft: open ? drawerWidth + 'px' : '0px', transition: '.3s ease' }}>
            <LiveTravelersMapTable getTableHeight={getTableHeight} />
          </Grid>
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default LiveTravelersMap
