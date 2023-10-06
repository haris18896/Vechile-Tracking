import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Drawer, Grid, SwipeableDrawer, Tab } from '@mui/material'
import React, { useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'

// ** Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Styled Components
import { Puller, TrackingMapWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import { TrackingWrapper } from 'src/styles/pages/tracking'
import { Icon } from '@iconify/react'
import HeatMapTable from './heat-map-table/heatmap-table'
import HeatMapFooter from './heat-map-table/heatmap-footer'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { MainUIContext } from 'src/contexts/MainContext'
import { useContext } from 'react'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function HeatMapMain(props) {
  const [value, setValue] = useState('1')
  const { window } = props
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)

  const [heatMapOptions, setHeatMapOptions] = useState({
    heatmap: false,
    gradient: false,
    opacity: false,
    radius: false
  })

  let sidebarWidth = sidebarHover ? 260 : 68

  let calculatedWidth = '-' + (450 - sidebarWidth) + 'px'

  let drawerWidth = 450

  const styles = useDrawerStyles({
    drawerOpen: open,
    drawerWidth: drawerWidth + 'px',
    slideVal: calculatedWidth,
    sidebarW: sidebarWidth
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const toggleDrawer = value => {
    setOpen(value)
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined

  const schema = Yup.object().shape({
    account: Yup.object().required('Account is required').nullable(),
    asset: Yup.object().required('Asset is required').nullable(),
    date_from: Yup.string().required('Starting Date is required'),
    date_to: Yup.string().required('Ending Date is required'),
    time_from: Yup.string().required('Starting Time is required'),
    time_to: Yup.string().required('Ending Time is required'),

    route_option: Yup.object().required('Route Option is required').nullable(),
    trip_event: Yup.object().required('Trip Event is required').nullable(),
    speed: Yup.object().required('Speed is required').nullable()
  })

  const formik = useFormik({
    initialValues: {
      account: {},
      asset: {},
      date_from: '',
      date_to: '',
      time_from: '',
      time_to: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      setSpeedometer(true)

      if (isObjEmpty(formik.errors)) {
        console.log('submitted')

        // const data = new FormData()

        // dispatch(registerCampusAction({ data, callBack: () => router.push('/catalogs/campus') }))
      }
    }
  })

  // Input Options
  const [options, setOptions] = useState({
    accountOptions: [
      { label: 'Tracking', value: 'track-11' },
      { label: 'Tracking2', value: 'track-12' }
    ],
    assetOptions: [
      { label: 'Asset 1', value: 'asset-11' },
      { label: 'Asset 2', value: 'asset-12' },
      { label: 'Asset 3', value: 'asset-13' }
    ],
    timeOptions: ['12 am', '1 am', '2 am', '3 am']
  })

  const handleHeatMap = (name, value) => {
    console.log('name =>', name, ' value =>', value)
    setHeatMapOptions({ ...heatMapOptions, [name]: value })
  }

  return (
    <TrackingMapWrapper>
      <Grid container spacing={0} sx={{ height: 'calc(100vh - 64px)' }}>
        {/*
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
                <Box mt='64px'>
                  <HeaderLabel sx={{ color: '#556485', fontSize: '1rem' }}>Heat Map</HeaderLabel>
                </Box>
              </TrackingWrapper>

              <FieldHorizontalWrapper>
                <HeatMapTable formik={formik} allOptions={options} />
              </FieldHorizontalWrapper>
              <HeatMapFooter />
            </Grid>
          </SwipeableDrawer>
        </Grid>
        */}

        <Grid item xs={12}>
          <GoogleMapComponent
            zoom={6}
            center={center}
            tracking={true}
            heatMap={true}
            drawer={open}
            drawerWidth={drawerWidth}
            heatMapOptions={heatMapOptions}
            handleHeatMap={handleHeatMap}
          />
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default HeatMapMain
