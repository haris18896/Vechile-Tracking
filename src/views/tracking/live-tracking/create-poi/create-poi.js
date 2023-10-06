import { Icon } from '@iconify/react'
import { Button, DialogTitle, Grid, Menu, MenuItem, SwipeableDrawer, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { FieldHorizontalWrapper, HeaderLabel } from 'src/styles/components/input'

// Modal
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'

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
import { useCommonStyles } from 'src/styles/common'
import CustomChip from 'src/@core/components/mui/chip'
import Image from 'next/image'


// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}
function CreatePOI(props) {
  const { window } = props
  const [open, setOpen] = useState(false)
  const { sidebarHover } = useContext(MainUIContext)
  const [socialOpen, setSocialOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)


  const commonStyles = useCommonStyles();

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
    account: Yup.string().required('Account is required'),
    address: Yup.string().required('Address is required'),
    vehicle_location: Yup.boolean(),
    name: Yup.string().required('Name is required'),
    accountText: Yup.string().required('Account is required'),
    type: Yup.string().required('Type is required'),
    phone_no: Yup.string().required('Phone No. is required')
  })

  const formik = useFormik({
    initialValues: {
      account: '',
      vehicle_location: false,
      address: '',
      name: '',
      accountText: '',
      type: '',
      image: '',
      phone_no: '',
      asset_no: ''
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

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const socialOptions = [
    { name: 'Facebook', icon: 'ri:facebook-box-fill' },
    { name: 'Twitter', icon: 'mdi:twitter', },
    { name: 'Email', icon: 'ic:baseline-email', },
    { name: 'Skype', icon: 'mdi:skype',  },
    { name: 'Whatsapp', icon: 'ri:whatsapp-fill' }
  ]

  const handleSocialOpen = () => {
    setSocialOpen(true)
  }

  const handleSocialClose = () => {
    setSocialOpen(false)
  }

  const handleTooltipClose = () => {
    setSocialOpen(false)
  }

  const handleTooltipOpen = text => {
    setTooltipOpen(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => {
      setTooltipOpen(false)
    }, 2000)
  }

  //Export Options
  const handleOption = event => {
    const { value } = event.currentTarget.dataset
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
                  <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <HeaderLabel sx={{ color: '#556485', fontSize: '1rem' }}>Create New POI</HeaderLabel>
                    <ButtonIcon
                      sx={{ width: 120 }}
                      color='primary-outlined'
                      iconWidth={30}
                      iconHeight={'auto'}
                      onClick={handleSocialOpen}
                    >
                      Share
                    </ButtonIcon>
                  </Grid>
                  <CreatePOIForm formik={formik} />
                </Grid>
              </TrackingWrapper>
            </Grid>
          </SwipeableDrawer>
        </Grid>

        <Grid item xs={12}>
          <GoogleMapComponent zoom={6} center={center} tracking={true} liveTracking={true} />
        </Grid>

        <Dialog open={socialOpen} onClose={handleSocialClose} className={commonStyles.modal}
    PaperProps={{
      style: {
        backgroundColor: "#fff"
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
      <DialogTitle id='add-permission' sx={{ fontWeight: '600', color: '#556485'}}>Share POI</DialogTitle>
      <Icon icon="iconamoon:sign-times" cursor="pointer" fontSize={23} onClick={handleSocialClose} />
      </Box>
      <DialogContent>
      <div>
              {socialOptions.map((item, index) => (
                <MenuItem
                  onClick={handleOption}
                  sx={{ width: '100%', display: 'flex', color: '#556485', alignItems: 'center', gap: '10px', paddingLeft:'0',  fontSize:'0.875rem', fontWeight: '500' }}
                  key={item.name}
                  data-value={item.name}
                >
                  <Icon icon={item.icon} fontSize={25} color='#FF8B00' style={{ flexShrink: 0 }} />
                  {item.name}
                </MenuItem>
              ))}

              <Box >
                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center'}} my={3}>
                <Icon icon="material-symbols:attachment-rounded"  fontSize={23} />
                <Typography sx={{ fontWeight: '600', color: '#556485', fontSize:'0.875rem',paddingBottom: '0 !important' }}> Get Link</Typography>
                </Box>
                <Tooltip
                  onClose={handleTooltipClose}
                  open={tooltipOpen}
                  sx={{
                    '& .MuiTooltip-popper': {
                      background: '#000'
                    }
                  }}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title='Link Copied'
                >
                  <TextField
                    variant='standard'
                    onClick={() => handleTooltipOpen("https://www.google.com/maps?q=224556676866...")}
                    defaultValue={"https://www.google.com/maps?q=224556676866..."}
                    InputProps={{
                      readOnly: true
                    }}
                    sx={{
                      width: '100%',

                      '& .MuiInputBase-input': {
                        cursor: 'pointer'
                      },

                      '& .MuiInputBase-root:before': {
                        borderBottom: '2px solid #d5d5d5'
                      },
                      '& .MuiInputBase-root:before': {
                        borderBottom: '2px solid #d5d5d5'
                      }
                    }}
                  />

                </Tooltip>

                <Button mt={4} variant='normal' sx={{width: '100%', "& .MuiButtonBase-root:hover":{ background: 'none'} }} onClick={() => handleTooltipOpen("https://www.google.com/maps?q=224556676866...")}>
                <Typography sx={{ fontWeight: '600', color: '#556485', fontSize:'0.875rem', textAlign: 'center' }}>Copy Link</Typography>
                </Button>

              </Box>
          </div>
      </DialogContent>
    </Dialog>

      </Grid>
    </TrackingMapWrapper>
  )
}

export default CreatePOI
