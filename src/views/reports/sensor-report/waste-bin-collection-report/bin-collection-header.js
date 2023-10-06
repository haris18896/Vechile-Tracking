import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, Checkbox, FormControlLabel, ListItem, Menu, Typography } from '@mui/material'

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
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import Modal from '../modal'
import { exportOptions } from 'src/utilities/utils'
import EmailModal from 'src/components/Dialogs/EmailModal'
import { TableUIContext } from 'src/contexts/TableContext'

function WasteBinCollectionHeader({ slug, onChangeHandler, customers }) {
  const { getTableHeight, showTableData, tableData } = useContext(TableUIContext)
  const common = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})
  const [err, setErr] = useState('')
  const headerRef = useRef()

  // Passing Header to find Table height
  getTableHeight(headerRef)

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

  const filterOptions = ['All', 'All', 'Moving']

  //Export Options
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
        <Grid container rowSpacing={5} columnSpacing={6} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={12} xl={9} flexWrap='wrap'>
            <Grid container columnSpacing={5} rowSpacing={4}>
              <Grid item xs={12} sm={6} md={2.5}>
                <Grid container rowSpacing={3} alignItems='center'>
                  <Grid item xs={12}>
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

                  <Grid item xs={12}>
                    <Select
                      name='assetName'
                      variant='outlined'
                      displayEmpty
                      value={assetName}
                      onChange={changeHandler}
                      className={customStyles.Select}
                      fullWidth
                    >
                      {assetOptions?.map((asset, index) =>
                        index === 0 ? (
                          <MenuItem key={index} value=''>
                            <PlaceholderText>Asset Name</PlaceholderText>
                          </MenuItem>
                        ) : (
                          <MenuItem key={index} value={asset.slug}>
                            {asset.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Grid container alignItems='center' rowSpacing={1} mb={3}>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' className='header-label' mr={2}>
                      From Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9} md={7.5}>
                    <DatePickerWrapper>
                      <DatePicker
                        selected={date && date}
                        id=''
                        placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                        className={datepickerStyles.datepicker}
                        onChange={date => setDate(date)}
                        dateFormat='yyyy-MM-dd'
                      />
                    </DatePickerWrapper>
                  </Grid>
                </Grid>

                <Grid container rowSpacing={1} alignItems='center'>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      To
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={9} md={7.5}>
                    <DatePickerWrapper>
                      <DatePicker
                        selected={date}
                        id=''
                        placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                        className={datepickerStyles.datepicker}
                        onChange={date => setDate(date)}
                        dateFormat='yyyy-MM-dd'
                      />
                    </DatePickerWrapper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Grid container alignItems='center' rowSpacing={1} mb={3}>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '600', textAlign: 'center' }}>
                      From Time
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9} md={7.5}>
                    <Select
                      id='customer_type'
                      name='time'
                      variant='outlined'
                      displayEmpty
                      value={time}
                      onChange={onChangeHandler}
                      className={customStyles.Select}
                    >
                      {timeOptions.map((name, index) =>
                        index === 0 ? (
                          <MenuItem key={name} value=''>
                            <PlaceholderText>12:00 am</PlaceholderText>
                          </MenuItem>
                        ) : (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Grid>
                </Grid>

                <Grid container rowSpacing={1} alignItems='center'>
                  <Grid item xs={12} sm={3} md={4.5}>
                    <Typography variant='body' className='header-label' sx={{ mb: 1, mt: 1, textAlign: 'center' }}>
                      To
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={9} md={7.5}>
                    <Select
                      id='customer_type'
                      name='time'
                      variant='outlined'
                      displayEmpty
                      value={time}
                      onChange={onChangeHandler}
                      className={customStyles.Select}
                    >
                      {timeOptions.map((name, index) =>
                        index === 0 ? (
                          <MenuItem key={name} value=''>
                            <PlaceholderText>12:00 am</PlaceholderText>
                          </MenuItem>
                        ) : (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Grid container alignItems='center' rowSpacing={1}>
                  <Grid item xs={12} sm={3} md={3}>
                    <Typography variant='body' sx={{ mt: 1, fontWeight: '600', textAlign: 'center' }}>
                      Filter
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={9} md={8}>
                    <Select
                      name='time'
                      variant='outlined'
                      displayEmpty
                      value={time}
                      onChange={onChangeHandler}
                      className={customStyles.Select}
                    >
                      {filterOptions.map((name, index) =>
                        index === 0 ? (
                          <MenuItem key={name} value=''>
                            <PlaceholderText> All data </PlaceholderText>
                          </MenuItem>
                        ) : (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} xl={3}>
            <Grid container rowSpacing={4} columnSpacing={3} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon sx={{ width: 120 }} color='primary-outlined' onClick={showTableData}>
                  Show
                </ButtonIcon>
              </Grid>

              <Grid item>
                <div>
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
                </div>
              </Grid>
              <Grid item>
                <ButtonIcon
                  color='primary-outlined'
                  sx={{ width: 120 }}
                  startIcon={'ic:round-email'}
                  onClick={() => handleOpen()}
                >
                  Email
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <EmailModal open={open} handleClose={() => handleClose()} handleSubmit={handleSubmit} title='Send Email' />
      </Box>
    </ReportsWrapper>

  )
}

export default WasteBinCollectionHeader

WasteBinCollectionHeader.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
