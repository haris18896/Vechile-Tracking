import { Icon } from '@iconify/react'
import { Button, Grid, SwipeableDrawer } from '@mui/material'
import React, { useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** Styled Components
import { TrackingMapWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import MultiTrackFooter from './multi-tracking-table/multitrack-footer'
import MultiTrackHeader from './multi-tracking-table/multitrack-header'
import MultiTrackTable from './multi-tracking-table/multitrack-table'
import { MainUIContext } from 'src/contexts/MainContext'
import { useContext } from 'react'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function MultiTrackingMap(props) {
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

  const toggleDrawer = value => {
    setOpen(value)
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined
  const [checkedRows, setCheckedRows] = useState([])


  const clearCheckedRows = () => {
    setCheckedRows([])
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
              <MultiTrackHeader />
              <FieldHorizontalWrapper sx={{ marginBottom: '1rem', overflowY: 'auto' }}>
                <MultiTrackTable sidebar={sidebarHover} checkedRows={checkedRows} setCheckedRows={setCheckedRows} />
              </FieldHorizontalWrapper>
              <MultiTrackFooter clearCheckedRows={clearCheckedRows} />
            </Grid>
          </SwipeableDrawer>
        </Grid>
        */}
        <Grid item xs={12}>
          <GoogleMapComponent zoom={6} center={center} tracking={true} drawerWidth={drawerWidth} drawer={open} />
        </Grid>
      </Grid>
    </TrackingMapWrapper>
  )
}

export default MultiTrackingMap
