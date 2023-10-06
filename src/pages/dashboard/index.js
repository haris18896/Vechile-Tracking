import { Icon } from '@iconify/react'
import { Button, Grid, SwipeableDrawer } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'
import { isObjEmpty } from 'src/store/utils'
import useJwt from 'src/auth/jwt/useJwt'
// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { MainUIContext } from 'src/contexts/MainContext'

// ** Styled Components
import { useDrawerStyles } from 'src/styles/pages/tracking'

// ** Customer Components
import GoogleAnalytics from 'src/views/dashboard/google-map/analytics'
import DashboardTable from 'src/views/dashboard/google-map/table'

import { getAlertsAction } from 'src/store/dashboard/alerts/alertActions'
import { postAlertsAction } from 'src/store/dashboard/alerts/alertActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { getNull } from 'src/utilities/utils'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

function Dashboard(props) {
  const { window } = props

  // ** Getting USer Data from the local Storage via JwtServices
  const user = useJwt.getUserData()

  // ** Getting Token via JwtServices
  const token = useJwt.getToken()

  const router = useRouter()

  const dispatch = useDispatch()
  const { sidebarHover } = useContext(MainUIContext)
  const { getAllAssetList } = useSelector(state => state.assets)
  const { getAssetInfoList } = useSelector(state => state.assetsInfo)
  const { getAlertsList } = useSelector(state => state.alerts)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogData, setdialogData] = useState(null)

  const [openLeftDrawer, setOpenLeftDrawer] = useState(false)
  const [openRightDrawer, setOpenRightDrawer] = useState(false)

  useEffect(() => {
    if (!getNull(token)) {
      dispatch(getAlertsAction({ page: 1, limit: 'all' }))
    }
  }, [router])

  useEffect(() => {
    let interval = setInterval(() => {
      dispatch(getAlertsAction({ page: 1, limit: 'all' }))
    }, 30000)

    return () => clearInterval(interval)
  }, [router])

  const handleToastClose = (reason, item) => {
    if (dialogOpen) return
    setdialogData(item)
    setDialogOpen(true)
  }

  const showToast = item => {
    toast.info(item.rule.description, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: false,
      // autoClose: item.id * 2000,
      // onClick: reason => handleToastClose(reason, item),
      onClose: reason => handleToastClose(reason, item),
      closeOnClick: true
    })
  }

  useEffect(() => {
    if (!getNull(token)) {
      // Trigger the toast notifications when the component mounts
      getAlertsList?.data.forEach(item => showToast(item))
      console.log(getNull(token), 'el')
    }
  }, [getAlertsList?.data, router])

  const schema = Yup.object().shape({
    agent_comments: Yup.string().required('agent comments is a required field')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      desktop_notification_dismissed_by: user?.id,
      agent_comments: '',
      customer_comments: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          desktop_notification_dismissed_by: user?.id,
          agent_comments: values.agent_comments,
          customer_comments: values.customer_comments
        }

        resetForm()
        dispatch(postAlertsAction({ id: dialogData.id, data }))
        setDialogOpen(false)
      }
    }
  })

  let sidebarWidth = sidebarHover ? 260 : 68

  let drawerWidth = 550

  let calculatedWidth = '-' + (drawerWidth - sidebarWidth) + 'px'

  const stylesLeftDrawer = useDrawerStyles({
    drawerOpen: openLeftDrawer,
    drawerWidth: drawerWidth + 'px',
    slideVal: calculatedWidth,
    sidebarW: sidebarWidth
  })

  const stylesRightDrawer = useDrawerStyles({
    drawerOpen: openRightDrawer,
    drawerWidth: drawerWidth + 'px',
    slideVal: '0px',
    sidebarW: drawerWidth
  })

  const toggleDrawerLeft = value => {
    setOpenLeftDrawer(value)
  }

  const toggleDrawerRight = value => {
    setOpenRightDrawer(value)
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Grid container spacing={0} sx={{ height: 'calc(100vh - 64px)' }}>
        {/* ============== LEFT DRAWER ============== */}
        <Grid item>
          <SwipeableDrawer
            container={container}
            anchor='left'
            open={true}
            onClose={() => toggleDrawerLeft(false)}
            onOpen={() => toggleDrawerLeft(true)}
            swipeAreaWidth={200}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: false
            }}
            className={stylesLeftDrawer.drawer}
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
              <Button
                onClick={() => setOpenLeftDrawer(!openLeftDrawer)}
                className={stylesLeftDrawer.puller}
                sx={{ display: { xs: 'block' } }}
              >
                <Icon icon='material-symbols:arrow-back-ios-rounded' />
              </Button>

              <DashboardTable />
            </Grid>
          </SwipeableDrawer>
        </Grid>

        {/* ============== RIGHT DRAWER ============== */}
        <Grid item>
          <SwipeableDrawer
            container={container}
            anchor='right'
            open={true}
            onClose={() => toggleDrawerRight(false)}
            onOpen={() => toggleDrawerRight(true)}
            swipeAreaWidth={200}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: false
            }}
            // className={stylesRightDrawer.drawer}
            sx={{
              '& > .MuiPaper-root': {
                width: { xs: '300px', sm: drawerWidth + 'px' },
                transform: openRightDrawer
                  ? { xs: `translateX(${300}px)`, sm: `translateX(${drawerWidth}px)` }
                  : `translateX(0px)`,
                transition: 'transform .5s ease',
                background: '#fff',
                overflow: 'visible',
                border: 'none',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }
            }}
            variant='persistent'
          >
            <Grid
              item
              sx={{
                position: 'absolute',
                left: 'auto',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                top: 0,
                right: 0,
                height: '100%',
                background: '#fff'
              }}
            >
              <Button
                onClick={() => toggleDrawerRight(!openRightDrawer)}
                className={stylesRightDrawer.puller}
                sx={{ display: { xs: 'block' }, '&.MuiButtonBase-root': { left: '-75px' } }}
              >
                <Icon icon='material-symbols:arrow-back-ios-rounded' />
              </Button>
              <GoogleAnalytics />
            </Grid>
          </SwipeableDrawer>
        </Grid>

        {/* ============== MAP & ANALYTICS ============== */}
        <Grid item xs={12} position='relative'>
          <GoogleMapLoader>
            {isLoaded => (
              <GoogleMapComponent
                zoom={4}
                center={center}
                tracking={true}
                dashboard={true}
                drawer={openLeftDrawer}
                drawerWidth={drawerWidth}
                markers={getAssetInfoList?.data}
                isLoaded={isLoaded}
              />
            )}
          </GoogleMapLoader>
        </Grid>

        <AddFormDialog
          id='alerts-modal'
          title='Alerts Feedback'
          close={() => setDialogOpen(false)}
          open={dialogOpen}
          submit={() => formik.handleSubmit()}
          agree='Submit'
          // cancel='Cancel'
          bg='#fff'
        >
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel id='agent_comments' sx={{ marginBottom: '0.25rem', marginLeft: '0.5rem' }}>
                *Agents Coments
              </TextLabel>
              <TextInput
                fullWidth
                id='agent_comments'
                name='agent_comments'
                type='text'
                variant='outlined'
                placeholder='Enter agent comments'
                {...formik.getFieldProps('agent_comments')}
                // className={common.TextField}
                error={formik.touched.agent_comments && Boolean(formik.errors.agent_comments)}
                helperText={formik.touched.agent_comments && formik.errors.agent_comments}
              />
            </FieldWrapper>
          </Grid>
          <Grid item xs={12}>
            <FieldWrapper>
              <TextLabel id='customer_comments' sx={{ marginBottom: '0.25rem', marginLeft: '0.5rem' }}>
                Customer Coments
              </TextLabel>
              <TextInput
                fullWidth
                id='customer_comments'
                name='customer_comments'
                type='text'
                variant='outlined'
                placeholder='Enter customer comments'
                {...formik.getFieldProps('customer_comments')}
                // className={common.TextField}
                error={formik.touched.customer_comments && Boolean(formik.errors.customer_comments)}
                helperText={formik.touched.customer_comments && formik.errors.customer_comments}
              />
            </FieldWrapper>
          </Grid>
        </AddFormDialog>
      </Grid>
      <ToastContainer style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }} />
    </>
  )
}

export default Dashboard

Dashboard.acl = {
  action: 'manage',
  subject: 'manage-dashboard'
}

Dashboard.AuthGuard = true
