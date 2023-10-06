import { Icon } from '@iconify/react'
import { Button, Dialog, Grid, SwipeableDrawer, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'

// ** Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Styled Components
import { TrackingMapWrapper, TrackingWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import { useContext } from 'react'
import { MainUIContext } from 'src/contexts/MainContext'
import { Box } from '@mui/system'
import ImportPOIForm from './form'
import { isObjEmpty } from 'src/configs/utils'
import NavigationForm from './navigation-form'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}
function ImportGeofence(props) {
  const { window } = props
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)
  const [navigationWindow, setNavigationWindow] = useState(false)
  const [showDistance, setShowDistance] = useState(false)

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

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined

  const schema = Yup.object().shape({
    account: Yup.string().required('Account is required')
  })

  const formik = useFormik({
    initialValues: {
      account: '',
      file: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        console.log('submitted')
        setNavigationWindow(true)

        // dispatch(registerCampusAction({ data, callBack: () => router.push('/catalogs/campus') }))
      }
    }
  })

  const navSchema = Yup.object().shape({
    start_point: Yup.string().required('Starting Point is required'),
    end_point: Yup.string().required('Ending Point is required')
  })

  const Navformik = useFormik({
    initialValues: {
      start_point: '',
      end_point: ''
    },
    validationSchema: navSchema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        setShowDistance(true)
        console.log('submitted')

        // dispatch(registerCampusAction({ data, callBack: () => router.push('/catalogs/campus') }))
      }
    }
  })

  const clearDistance = () => {
    setShowDistance(false)
    Navformik.resetForm()
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
                <Grid mt='64px'>
                  <HeaderLabel sx={{ color: '#556485', fontSize: '1rem' }}>
                    {navigationWindow ? 'Navigation Window' : 'Import From Excel'}
                  </HeaderLabel>
                  {navigationWindow ? (
                    <NavigationForm formik={Navformik} clearDistance={clearDistance} />
                  ) : (
                    <ImportPOIForm formik={formik} />
                  )}
                </Grid>

                {showDistance && (
                  <Grid item xs={12} mt={20}>
                    <Grid container justifyContent='center'>
                      <Grid item xs={8} display='flex' flexDirection='column' alignItems='center' gap={1}>
                        <Icon icon='solar:ruler-angular-bold' fontSize={25} />
                        <Typography sx={{ fontSize: '0.875rem', color: '#C0C5D0', fontWeight: '500' }}>
                          Distance Between Them
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem', color: '#0F224B', fontWeight: '700' }}>
                          {(Math.random() * 10).toFixed(3)} KM
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </TrackingWrapper>
            </Grid>
          </SwipeableDrawer>
        </Grid>

        <Grid item xs={12}>
          <GoogleMapComponent zoom={6} center={center} tracking={true} liveTracking={true} />
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default ImportGeofence
