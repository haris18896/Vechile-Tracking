import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, ListItem, Menu, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { PlaceholderText, SelectItem, useCustomStyles } from 'src/styles/pages/reports'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import FleetModal from '../fleet-modal'
import { exportOptions } from 'src/utilities/utils'
import { TableUIContext, useTableContext } from 'src/contexts/TableContext'
import EmailModal from 'src/components/Dialogs/EmailModal'

function VehiclePollReportHeader({ slug, onChangeHandler, customers }) {
  const common = useCommonStyles()
  const customStyles = useCustomStyles()
  const { getTableHeight, showTableData, tableData } = useContext(TableUIContext)
  const [err, setErr] = useState('');
  const headerRef = useRef()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Handle Submit
  const handleSubmit = email => {
    if (!email) {
      setErr('Email is required')
    } else {
      handleClose()
    }
  }

  // Passing Header to find Table height
  getTableHeight(headerRef)

  // ** Form Validation
  const schema = Yup.object().shape({})

  // ** Form Values
  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

  // ========= Options =========

  const trackDataOptions = [
    { name: 'Select', slug: '' },
    { name: 'Tracking', slug: 'track-11' },
    { name: 'Tracking2', slug: 'track-12' }
  ]

  const assetOptions = [
    { name: 'Select', slug: '' },
    { name: 'Asset1', slug: 'asset-11' },
    { name: 'Asset2', slug: 'asset-12' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

  const handleExportOption = event => {
    const { value } = event.currentTarget.dataset
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  // ========= States =========
  const [date, setDate] = useState('')

  const [values, setValues] = useState({
    trackVal: '',
    assetName: '',
    time: ''
  })

  // Change Handler
  const changeHandler = e => {
    e.preventDefault()
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
  }

  // Destructuring values
  const { trackVal, assetName, time } = values

  return (
    <ReportsWrapper className='report-wrapper' bordered ref={headerRef}>
      <Box sx={{ flexGrow: 1, marginBottom: { xs: !tableData && "4rem", md: '0'} }}>
        <Grid container spacing={5} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={8} lg={7} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4} justifyContent='space-between'>
              <Grid item xs={12} sm={5} md={3}>
                <Select
                  variant='outlined'
                  displayEmpty
                  value={trackVal}
                  name='trackVal'
                  onChange={changeHandler}
                  className={customStyles.Select}
                  fullWidth
                >
                  {trackDataOptions?.map((data, index) =>
                    index === 0 ? (
                      <MenuItem key={index} value=''>
                        <PlaceholderText>Select Account</PlaceholderText>
                      </MenuItem>
                    ) : (
                      <MenuItem key={index} value={data.slug}>
                        {data.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>

              <Grid item xs={12} sm={6} md={4.5}>
                <Grid container alignItems='center' rowSpacing={1}>
                  <Grid item xs={12} sm md sx={{ marginRight: 3, flex: { sm: '0 0 auto' } }}>
                    <Typography variant='body' className='header-label'>
                      Time (Min)
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm md>
                    <TextField
                      name='assetName'
                      id='outlined-basic'
                      variant='outlined'
                      placeholder='0'
                      value={assetName}
                      onChange={changeHandler}
                      className={customStyles.TextField}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={4.5}>
                <Grid container alignItems='center' rowSpacing={1}>
                  <Grid item xs={12} sm md sx={{ marginRight: 3, flex: { sm: '0 0 auto' } }}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      Vehicle No.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm md>
                    <TextField
                      name='assetName'
                      id='outlined-basic'
                      variant='outlined'
                      placeholder='XC123'
                      value={assetName}
                      onChange={changeHandler}
                      className={customStyles.TextField}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <Grid container rowSpacing={4} columnSpacing={5} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={showTableData}>
                  Show
                </ButtonIcon>
              </Grid>

              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='grey'
                  iconWidth={25}
                  iconHeight={22}
                  startIcon={'uil:times'}

                  // onClick={() => handleOpen()}
                >
                  Clear
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='primary-outlined'
                  startIcon={'material-symbols:arrow-outward-rounded'}
                  onClick={handleClick}
                >
                  Export
                </ButtonIcon>

                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                  className={customStyles.exportStyles}
                >
                  {exportOptions.map((item, index) => (
                    <MenuItem
                      onClick={handleExportOption}
                      sx={{ width: 120, display: 'flex', alignItems: 'center', gap: '10px' }}
                      key={item.name}
                      data-value={item.name}
                    >
                      {item.icon}
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  color='primary-outlined'
                  startIcon={'ic:round-email'}
                  onClick={() => handleOpen()}
                >
                  Email
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <EmailModal open={open} handleClose={() => handleClose()} handleSubmit={handleSubmit} title='Send Email' />
    </ReportsWrapper>
  )
}

export default VehiclePollReportHeader

VehiclePollReportHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
