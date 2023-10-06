import React, { useRef, useState } from 'react'

// ** MUI
import { Button, Grid, SwipeableDrawer } from '@mui/material'

// ** Icons
import { Icon } from '@iconify/react'

// Translation
import { useTranslation } from 'react-i18next'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { HeaderLabel } from 'src/styles/components/input'

// ** Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Styled Components
import { TrackingMapWrapper, TrackingWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import { useContext } from 'react'
import { MainUIContext } from 'src/contexts/MainContext'

import DrawGeofenceForm from './form'

// ** Redux
import { registerGeofenceAction } from 'src/store/tracking/geofence/geofenceAction'
import { useDispatch } from 'react-redux'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function DrawGeofence(props) {
  const { window } = props

  const dispatch = useDispatch()

  // ** Handle Sidebar
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)

  let sidebarWidth = sidebarHover ? 260 : 68

  let calculatedWidth = '-' + (500 - sidebarWidth) + 'px'

  const styles = useDrawerStyles({
    drawerOpen: open,
    drawerWidth: '500px',
    slideVal: calculatedWidth,
    sidebarW: sidebarWidth
  })

  const toggleDrawer = value => {
    setOpen(value)
  }

  // Geofence Ref
  const geofenceRef = useRef(null)

  // State to get Geofence Values
  const [geofenceVal, setGeofenceVal] = useState(null)

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined

  // ** Formik To get Forms values
  const schema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Type is required'),
    zone: Yup.string().required('Zone is required'),
    speed: Yup.string().required('Speed is required'),
    description: Yup.string().required('Description is required'),
    user: Yup.string().required('User is required'),
    vehicle_group: Yup.string().required('Vehicle Group is required')
  })

  const formik = useFormik({
    initialValues: {
      address: '',
      name: '',
      history: false,
      asset: '',
      date_from: '',
      date_to: '',
      time_from: '',
      time_to: '',
      type: '',
      zone: '',
      speed: '',
      description: '',
      user: '',
      vehicle_group: '',
      points: {}
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      console.log('hello', values)
      const data = new FormData()
      data.append('address', values.address)
      data.append('name', values.name)
      data.append('geofence_type_id', values.type)
      data.append('zone', values.zone)
      data.append('speed', values.speed)
      data.append('description', values.description)
      data.append('user_id', values.user)
      data.append('group_id', values.vehicle_group)
      data.append('points', JSON.stringify(values.points))
      data.append('history', 0)
      data.append('radius', '0')
      data.append('type', values.points?.type)

      dispatch(
        registerGeofenceAction({
          data,
          callback: () => {
            resetForm()
            geofenceRef.current.setMap(null)
          }
        })
      )
    }
  })

  // ** To get Points Value Form Geofence
  const getGeofencePoints = (points, address) => {
    formik.setFieldValue('points', points)
    formik.setFieldValue('address', address)
  }

  const geofence = [
    {
      id: '1',
      icon: '/images/icons/tracking-icons/stop-ic.svg',
      title: 'Stop Drawing',
      type: 'null'
    },
    {
      id: '2',
      icon: '/images/icons/tracking-icons/circle-ic.svg',
      title: 'Draw a Circle',
      type: 'circle'
    },
    {
      id: '3',
      icon: '/images/icons/tracking-icons/shape-ic.svg',
      title: 'Draw a Shape',
      type: 'polygon'
    },
    {
      id: '4',
      icon: '/images/icons/tracking-icons/rectangle-ic.svg',
      title: 'Draw a Rectangle',
      type: 'rectangle'
    }
  ]

  const changeGeofence = name => {
    setGeofenceVal(name)
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
                background: '#fff',
                overflowY: 'auto'
              }}
            >
              <TrackingWrapper>
                <Grid container mt='64px'>
                  <Grid item xs={4}>
                    <HeaderLabel sx={{ color: '#556485', fontSize: '1rem' }}>Draw Geofence</HeaderLabel>
                  </Grid>

                  <Grid item xs={8}>
                    {/* <TextInput
                      fullWidth
                      max={10}
                      id='location'
                      name='location'
                      // disabled={!formik.values.lat}
                      type='text'
                      variant='outlined'
                      placeholder='Enter Location'
                      className={common.TextField}
                      {...formik.getFieldProps('location')}
                      error={formik.touched.location && Boolean(formik.errors.location)}
                      helperText={formik.touched.location && formik.errors.location}
                      InputProps={{
                        endAdornment: (
                          <IconWrapper sx={{ border: 0 }}>
                            <Icon icon='ic:baseline-location-on' width='20' height='20' />
                          </IconWrapper>
                        )
                      }}
                    /> */}
                    {/* <PlacesAutocomplete /> */}
                  </Grid>
                  <DrawGeofenceForm formik={formik} />
                </Grid>
              </TrackingWrapper>
            </Grid>
          </SwipeableDrawer>
        </Grid>

        <Grid item xs={12}>
          <GoogleMapLoader>
            {isLoaded => (
              <GoogleMapComponent
                zoom={6}
                isLoaded={isLoaded}
                center={center}
                tracking={true}
                liveTracking={true}
                geofence={geofence}
                changeGeofence={changeGeofence}
                geofenceValues={geofenceVal}
                getGeofencePoints={getGeofencePoints}
                geofenceRef={geofenceRef}
              />
            )}
          </GoogleMapLoader>
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default DrawGeofence
