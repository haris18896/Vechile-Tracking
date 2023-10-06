import { Icon } from '@iconify/react'
import { Button, Grid, SwipeableDrawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'

// ** Styled Components
import { TrackingMapWrapper, SwipperWrapper, useDrawerStyles } from 'src/styles/pages/tracking'
import LiveTrackingHeader from './live-tracking-table/live-tracking-header'
import LiveTrackingTable from './live-tracking-table/live-tracking-table'

import { useContext } from 'react'
import { MainUIContext } from 'src/contexts/MainContext'

import LiveTrackingAlertTable from './alerts/live-tracking-table'
import LiveTrackingAlert from './alerts/LiveTrackingAlert'

// Table imports
import { vehicle_columns } from './alerts/vehicle/table.data'

// ** Redux Action and Hooks
import { getAllAssetListAction, getStatusCountsTracking } from 'src/store/tracking/index/trackingAction'
import { useDispatch, useSelector } from 'react-redux'

// ** Utils
import { getNull } from 'src/utilities/utils'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}
function LiveTracking(props) {
  const { window } = props
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState('')

  // ** Handling the marker array
  const [cords, setCords] = useState([])

  // ** Router
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Selector For AssetList
  const { loading, getAllAssetList } = useSelector(state => state.tracking)
  const rows = getAllAssetList?.data
  const page = getAllAssetList?.page
  const limit = getAllAssetList?.limit
  const total = getAllAssetList?.total

  // ** state for Filered Asset List
  const [refresh, setRefresh] = useState(false)

  // ** Effect to update Asset List form Refresh
  useEffect(() => {
    if (!!refresh) {
      dispatch(getAllAssetListAction({ page: page, limit: limit }))
      setRefresh(false)
    }
  }, [refresh])

  // ** Fetching Asset List --->
  useEffect(() => {
    dispatch(getAllAssetListAction({ page: page, limit: limit }))

    setCords([])
  }, [router, page, limit])

  const handleSelectedRows = e => {
    // ** gets all selected data from the table and passes to the state
    const filtered = e.selectedRows?.filter(data => {
      return !(getNull(data.latitude) && getNull(data.longitude))
    })

    const latlng = filtered?.map(x => {
      return {
        latitude: x.latitude,
        longitude: x.longitude
      }
    })

    setCords(latlng)
  }

  // ** Selector For Status Count In Asset List Tracking
  const { getStatusCounts } = useSelector(state => state?.tracking)

  // ** Fetching Asset List Status Counts
  useEffect(() => {
    dispatch(getStatusCountsTracking({ page: 1, limit: 'all' }))
  }, [router])

  // ** CallBack Function to call api on no value
  const callbackHeader = name => {
    dispatch(getAllAssetListAction({ page, limit, name: name }))
  }

  const handleOpen = alertType => {
    setShowAlert(true)
    if (alertType === 'account') {
      setAlertType('account')
    } else {
      setAlertType('vehicle')
    }
  }

  const close = () => {
    setShowAlert(false)
  }

  // ** Side Bar Width
  let sidebarWidth = sidebarHover ? 260 : 68
  let drawerWidth = 850

  let calculatedWidth = '-' + (drawerWidth - sidebarWidth) + 'px'

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
                <LiveTrackingHeader callback={callbackHeader} count={getStatusCounts} />
                <LiveTrackingTable
                  setRefresh={setRefresh}
                  rows={rows}
                  page={page}
                  total={total}
                  limit={limit}
                  handleSelectedRows={handleSelectedRows}
                  getAllAssetList={getAllAssetList}
                  loading={loading}
                />
              </SwipperWrapper>
            </Grid>
          </SwipeableDrawer>
        </Grid>
        <Grid item xs={12}>
          <GoogleMapLoader>
            {isLoaded => (
              <GoogleMapComponent
                isLoaded={isLoaded}
                vehicleCountTrackingLive={getAllAssetList?.data?.length}
                zoom={6}
                center={center}
                tracking={true}
                trackingAlerts={true}
                liveTracking={true}
                handleOpen={handleOpen}
                drawer={open}
                drawerWidth={drawerWidth}
                markers={cords}
              />
            )}
          </GoogleMapLoader>
        </Grid>
      </Grid>

      <LiveTrackingAlert icon='ic:round-close' title={'Vehicle Expiry Alert'} open={showAlert} close={close}>
        <LiveTrackingAlertTable
          getAllAssetList={getAllAssetList}
          loading={loading}
          // rows={alertType == 'account' ? acc_rows : vehicle_rows}
          columns={vehicle_columns}
        />
      </LiveTrackingAlert>
    </TrackingMapWrapper>
  )
}

export default LiveTracking
