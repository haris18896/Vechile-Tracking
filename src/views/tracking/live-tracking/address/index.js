import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Grid, SwipeableDrawer, Tab, TextField } from '@mui/material'
import React, { useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'

// ** Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Styled Components
import { TrackingMapWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import { TrackingWrapper } from 'src/styles/pages/tracking'
import { Icon } from '@iconify/react'
import { MainUIContext } from 'src/contexts/MainContext'
import { useContext } from 'react'
import { isObjEmpty } from 'src/configs/utils'
import { useCommonStyles } from 'src/styles/common'
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function SearchAddress(props) {
  const [value, setValue] = useState('1')
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

  const common = useCommonStyles()

  const toggleDrawer = value => {
    setOpen(value)
  }

  // Window body
  const container = window !== undefined ? () => window().document.body : undefined

  //Getting table height and setting map height accordingly
  const getTableHeight = tableRef => {
    if (tableRef) {
      setTableHeight(tableRef?.current?.offsetHeight + 'px')
    }
  }

  const schema = Yup.object().shape({
    search: Yup.string().required('Search value is required')
  })

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        console.log('submitted')

        // const data = new FormData()

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
                <Box mt='64px'>
                  <HeaderLabel sx={{ color: '#556485', fontSize: '1rem' }}>Search Location</HeaderLabel>
                </Box>

                <TextField
                  fullWidth
                  max={10}
                  id='search'
                  name='search'

                  // disabled={!formik.values.lat}
                  type='text'
                  variant='outlined'
                  placeholder='Enter Location'
                  className={common.TextField}
                  sx={{ marginTop: '2rem' }}
                  {...formik.getFieldProps('search')}
                  error={formik.touched.search && Boolean(formik.errors.search)}
                  helperText={formik.touched.search && formik.errors.search}
                />
                <Grid mt={4} textAlign='right'>
                  <ButtonIcon onClick={formik.handleSubmit} sx={{ width: 120 }} color='primary-outlined'>
                    Search
                  </ButtonIcon>
                </Grid>
              </TrackingWrapper>
            </Grid>
          </SwipeableDrawer>
        </Grid>

        <Grid item xs={12}>
          <GoogleMapComponent
            zoom={6}
            center={center}
            tracking={true}
            liveTracking={true}
            drawer={open}
            drawerWidth={drawerWidth}
          />
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default SearchAddress
