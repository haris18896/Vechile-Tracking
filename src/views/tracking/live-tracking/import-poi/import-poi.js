import { Icon } from '@iconify/react'
import { Button, Dialog, Grid, SwipeableDrawer } from '@mui/material'
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



// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}
function ImportPOI(props) {
  const { window } = props
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)

  let sidebarWidth = sidebarHover ? 260 : 68 ;
  
  let calculatedWidth = "-" + (500 - sidebarWidth) + "px"

  const styles = useDrawerStyles({ drawerOpen: open, drawerWidth: '500px', slideVal: calculatedWidth, sidebarW: sidebarWidth })

  const toggleDrawer = value => {
    setOpen(value)
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined

  const schema = Yup.object().shape({
    account: Yup.string().required('Account is required'),
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

        // dispatch(registerCampusAction({ data, callBack: () => router.push('/catalogs/campus') }))
      }
    }
  })



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
              <Grid mt="64px">
                  <HeaderLabel sx={{ color: '#556485', fontSize: '1rem'}}>Import POI From KML</HeaderLabel>
                  <ImportPOIForm formik={formik}   />
              </Grid>
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

export default ImportPOI
