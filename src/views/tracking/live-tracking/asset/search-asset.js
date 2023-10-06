import { Icon } from '@iconify/react'
import { Button, Dialog, Grid, SwipeableDrawer } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { FieldHorizontalWrapper, HeaderLabel, TextInput } from 'src/styles/components/input'

// ** Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Styled Components
import { TrackingMapWrapper, TrackingWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import { useContext } from 'react'
import { MainUIContext } from 'src/contexts/MainContext'
import { Box } from '@mui/system'
import LiveTrackingHeader from '../live-tracking-table/live-tracking-header'
import CreatePOIForm from './form'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { IconWrapper } from 'src/styles/pages/catalogs'
import { useCommonStyles } from 'src/styles/common'
import DrawGeofenceForm from './form'
import NearestAssetForm from './form'
import SearchDriverForm from './form'
import SearchAssetForm from './form'
import { isObjEmpty } from 'src/configs/utils'




// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}
function SearchAsset(props) {
  const { window } = props
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)
  const common = useCommonStyles()
  const [showAsset, setShowAsset] = useState(false);

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
    asset_name: Yup.string().required('Asset Name is required'),
  })

  const handleShowAsset = () => {
    setShowAsset(true)
  }

  const formik = useFormik({
    initialValues: {
      account: '',
      asset_name: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        handleShowAsset();

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
              <Grid container mt="64px">
                <Grid item xs={12}>
                  <HeaderLabel sx={{ color: '#556485', fontSize: '1rem'}}>Search Asset</HeaderLabel>
                </Grid>
                <Grid item xs={12}>
                <SearchAssetForm formik={formik} showAsset={showAsset}  />
                </Grid>
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

export default SearchAsset
