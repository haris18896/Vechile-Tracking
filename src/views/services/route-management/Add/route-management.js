import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material'

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
import { SmallMapWrapper, tableStyles, useCommonStyles } from 'src/styles/common'
import {
  PlaceholderText,
  Required,
  SelectItem,
  useCustomStyles,
  useDatepickerStyles
} from 'src/styles/pages/services/edit'

// import { InputDatePicker, useDatepickerStyles } from 'src/styles/pages/services/edit'

import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { ServicesWrapper } from 'src/styles/pages/services'

// ** Google Map
import GoogleMapComponent from 'src/components/google-map'
import DataTable from 'react-data-table-component'
import { getAllAccountsAction } from 'src/store/graphs/speed/speedActions'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './modal'

function RouteManagement({ slug, onChangeHandler, address, locationSelections, mapCenter, handleMapClick, markers }) {
  const common = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})
  const [assignVehicleModal, setAssignVehicleModal] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const schema = Yup.object().shape({})

  const dispatch = useDispatch()

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

  const vehicles = [{ name: '3575 VAB' }, { name: '4573 CAA' }, { name: '5633 DDA' }, { name: '2122 MNS' }]

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

  const center = {
    lat: 24.7136,
    lng: 46.6753
  }

  const columns = [
    {
      name: 'Sequence No',
      selector: row => row.title
    }
  ]

  const columns2 = [
    {
      name: 'Pickup Time',
      selector: row => row.title
    }
  ]

  const data2 = [
    {
      id: 1,
      title: '',
      year: '1988'
    }
  ]

  const data = [
    {
      id: 1,
      title: '12/23/2023',
      year: '1988'
    }
  ]

  const handleSubmit = () => {
    setAssignVehicleModal(false)
  }

  return (
    <ServicesWrapper className='services-wrapper'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={5}>
          <Grid item xs={12} md={6} sx={{ padding: { md: '0 3rem 0 0', lg: '0 4rem 0 0' } }}>
            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Customer
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <Select
                  id='customer_type'
                  name='time'
                  variant='outlined'
                  sx={{ flex: 1 }}
                  displayEmpty
                  value={time}
                  onChange={onChangeHandler}
                  className={customStyles.Select}
                >
                  {timeOptions.map((name, index) =>
                    index === 0 ? (
                      <MenuItem key={name} value=''>
                        <PlaceholderText>Select Customer Type</PlaceholderText>
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

            <Grid container sx={{ alignItems: { xs: 'start', sm: 'center' } }}>
              <Grid item xs={12} sm={2} mb={{ xs: 1, sm: 5 }}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Account
                </Typography>
              </Grid>

              <Grid item xs={12} sm={10} lg={4} sx={{ paddingLeft: { xs: 0, sm: 3 } }} mb={5}>
                <Select
                  id='customer_type'
                  name='time'
                  variant='outlined'
                  displayEmpty
                  value={time}
                  onChange={onChangeHandler}
                  className={customStyles.Select}
                  fullWidth
                >
                  {timeOptions.map((name, index) =>
                    index === 0 ? (
                      <MenuItem key={name} value=''>
                        <PlaceholderText>Select Account</PlaceholderText>
                      </MenuItem>
                    ) : (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>

              <Grid item xs={12} sm={2} lg={1.5} sx={{ marginLeft: 'auto' }} mb={{ xs: 1, sm: 5 }}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Vehicle
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} lg={3.5} sx={{ paddingLeft: { xs: 0, sm: 3 } }} mb={5}>
                <ButtonIcon
                  sx={{ padding: '0.4rem 0 !important', width: '100%' }}
                  color='orange-outlined'
                  startIcon={'ion:car-sport'}
                  onClick={handleOpen}
                >
                  Assign Vehicle
                </ButtonIcon>
              </Grid>
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  By Asset ID
                </Typography>
              </Grid>
              <Grid item xs sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <Select
                  id='customer_type'
                  name='time'
                  variant='outlined'
                  sx={{ flex: 1 }}
                  displayEmpty
                  value={time}
                  onChange={onChangeHandler}
                  className={customStyles.Select}
                >
                  {timeOptions.map((name, index) =>
                    index === 0 ? (
                      <MenuItem key={name} value=''>
                        <PlaceholderText>No Vehicles (Select By Groups)</PlaceholderText>
                      </MenuItem>
                    ) : (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>
              <FormControlLabel
                className={customStyles.Check}
                control={<Checkbox defaultValue={false} />}
                label={<Typography sx={{ fontWeight: '500' }}>All</Typography>}
              />
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Trip Code
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <TextField
                  name='assetName'
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Type Trip Code'
                  value={assetName}
                  onChange={changeHandler}
                  className={customStyles.TextField}
                ></TextField>
              </Grid>
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Trip Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <TextField
                  name='assetName'
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Type Trip Name'
                  sx={{ flex: 1 }}
                  value={assetName}
                  onChange={changeHandler}
                  className={customStyles.TextField}
                ></TextField>
              </Grid>
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  E-mail ID
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <TextField
                  name='assetName'
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Type E-mail ID'
                  sx={{ flex: 1 }}
                  value={assetName}
                  onChange={changeHandler}
                  className={customStyles.TextField}
                ></TextField>
              </Grid>
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Zone
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <TextField
                  name='assetName'
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Type Zone'
                  value={assetName}
                  onChange={changeHandler}
                  className={customStyles.TextField}
                ></TextField>
              </Grid>
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Select Address
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <Select
                  id='customer_type'
                  name='address'
                  variant='outlined'
                  sx={{ flex: 1 }}
                  displayEmpty
                  value={address}
                  onChange={onChangeHandler}
                  className={customStyles.Select}
                >
                  {locationSelections?.map((item, index) =>
                    index === 0 ? (
                      <MenuItem key={item.name} value=''>
                        <PlaceholderText>Select Address</PlaceholderText>
                      </MenuItem>
                    ) : (
                      <MenuItem key={item} value={item.name}>
                        {item.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Point Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <TextField
                  name='assetName'
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Type Point Name'
                  sx={{ flex: 1 }}
                  value={assetName}
                  onChange={changeHandler}
                  className={customStyles.TextField}
                ></TextField>
              </Grid>
            </Grid>

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Sequence
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <Select
                  id='customer_type'
                  name='time'
                  variant='outlined'
                  sx={{ flex: 1 }}
                  displayEmpty
                  value={time}
                  onChange={onChangeHandler}
                  className={customStyles.Select}
                >
                  {timeOptions.map((name, index) =>
                    index === 0 ? (
                      <MenuItem key={name} value=''>
                        <PlaceholderText>Select Sequence</PlaceholderText>
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

            <Grid container mb={5} sx={{ alignItems: { xs: 'start', sm: 'center' } }} rowSpacing={1}>
              <Grid item xs={12} sm={2}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  Valid From
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4.5} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
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

              <Grid item xs={12} sm={0.5} sx={{ marginLeft: 'auto' }}>
                <Typography variant='body' sx={{ fontWeight: '500' }}>
                  To
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4.5} sx={{ paddingLeft: { xs: 0, sm: 3 } }}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={date && date}
                    id=''
                    sx={{ flex: 1, flexShrink: 0 }}
                    placeholderText={moment(new Date()).format('DD/MM/YYYY')}
                    className={datepickerStyles.datepicker}
                    onChange={date => setDate(date)}
                    dateFormat='yyyy-MM-dd'
                  />
                </DatePickerWrapper>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container rowSpacing={1}>
                <Grid item xs={12} sm={2}>
                  <Typography variant='body' sx={{ fontWeight: '500' }}>
                    Select Days
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Grid container>
                    <Grid item xs={6} md={4} xl={3}>
                      <FormControlLabel
                        className={customStyles.Check}
                        control={<Checkbox defaultValue={false} />}
                        label={
                          <Typography
                            sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}
                          >
                            Sunday
                          </Typography>
                        }
                      />{' '}
                    </Grid>
                    <Grid item xs={6} md={4} xl={3}>
                      <FormControlLabel
                        className={customStyles.Check}
                        control={<Checkbox defaultValue={false} />}
                        label={
                          <Typography
                            sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}
                          >
                            Monday
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4} xl={3}>
                      <FormControlLabel
                        className={customStyles.Check}
                        control={<Checkbox defaultValue={false} />}
                        label={
                          <Typography
                            sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}
                          >
                            Tuesday
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4} xl={3}>
                      <FormControlLabel
                        className={customStyles.Check}
                        control={<Checkbox defaultValue={false} />}
                        label={
                          <Typography
                            sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}
                          >
                            Wednesday
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4} xl={3}>
                      <FormControlLabel
                        className={customStyles.Check}
                        control={<Checkbox defaultValue={false} />}
                        label={
                          <Typography
                            sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}
                          >
                            Thursday
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4} xl={3}>
                      <FormControlLabel
                        className={customStyles.Check}
                        control={<Checkbox defaultValue={false} />}
                        label={
                          <Typography
                            sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}
                          >
                            Friday
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4} xl={3}>
                      <FormControlLabel
                        className={customStyles.Check}
                        control={<Checkbox defaultValue={false} />}
                        label={
                          <Typography
                            sx={{ fontWeight: '500', textAlign: 'center', fontSize: { xs: '0.9rem', xl: '1rem' } }}
                          >
                            Saturday
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} md={6} item>
            <FieldHorizontalWrapper sx={{ width: '100%', height: '50vh' }}>
              <GoogleMapComponent
                zoom={6}
                center={mapCenter}
                mapClick={e => handleMapClick(e)}
                markerPosition={mapCenter}
                markers={markers}
                route={true}
              />
            </FieldHorizontalWrapper>
            <FieldHorizontalWrapper sx={{ width: '100%', gap: '20px' }}>
              <DataTable
                columns={columns}
                data={data2}
                customStyles={tableStyles}

                // progressPending={loading}
                // progressComponent={<Spinner />}
                sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' className={common.dataTable} />}
              />
              <DataTable
                columns={columns2}
                data={data}
                customStyles={tableStyles}

                // progressPending={loading}
                // progressComponent={<Spinner />}
                sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' className={common.dataTable} />}
              />
            </FieldHorizontalWrapper>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        handleClose={() => handleClose()}
        handleSubmit={handleSubmit}
        title='Assign Vehicle'
        vehicles={vehicles}
        markers={markers}
      />
    </ServicesWrapper>
  )
}

export default RouteManagement

RouteManagement.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
