import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material'

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
import { PlaceholderText, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
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
import { ServicesWrapper } from 'src/styles/pages/services'

function AllocateVehicle({ slug, onChangeHandler, customers, formik }) {
  const styles = useCommonStyles()
  const customStyles = useCustomStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})


  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  // ========= Options =========

  const accounts = [
    { name: 'Account 1' },
    { name: 'Account 2' },
    { name: 'Account 3' },
    { name: 'Account 4' },
    { name: 'Account 5' }
  ]

  const assetOptions = [
    { name: 'Select', slug: '' },
    { name: 'Asset1', slug: 'asset-11' },
    { name: 'Asset2', slug: 'asset-12' }
  ]

  const timeOptions = ['12 am', '1 am', '2 am', '3 am']

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
    <ServicesWrapper className='services-wrapper'>
     <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Account <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='account'
                  name='account'
                  options={accounts}
                  className={styles.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('account', newValue.name)
                  }}
                  value={accounts.find(account => account.name === formik.values.account)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select account'
                      error={formik.touched.account && Boolean(formik.errors.account)}
                      helperText={formik.touched.account && formik.errors.account}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <TextLabel sx={{ marginBottom: '0.25rem' }}>
                Allocate To <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <Autocomplete
                  id='account'
                  name='account'
                  options={accounts}
                  className={styles.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('account', newValue.name)
                  }}
                  value={accounts.find(account => account.name === formik.values.account)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Please Select'
                      error={formik.touched.account && Boolean(formik.errors.account)}
                      helperText={formik.touched.account && formik.errors.account}
                    />
                  )}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Shift Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='shiftName'
                  name='shiftName'
                  type='text'
                  placeholder='Enter Shift Name'
                  {...formik.getFieldProps('shiftName')}
                  className={styles.TextField}
                  error={formik.touched.shiftName && Boolean(formik.errors.shiftName)}
                  helperText={formik.touched.shiftName && formik.errors.shiftName}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                End Time <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <DatePickerWrapper
                sx={{ '& input': { borderColor: formik.touched.endTime && Boolean(formik.errors.endTime) && 'red' } }}
              >
                <DatePicker
                  fullWidth
                  id='end-time'
                  name='end-time'
                  selected={formik.values.endTime}
                  onChange={date => formik.setFieldValue('endTime', date)}
                  className={datepickerStyles.datepicker}
                  placeholderText='Select end time'
                />
              </DatePickerWrapper>
              {Boolean(formik.errors.endTime) && (
                <TextField
                  variant='outlined'
                  placeholder='Select account'
                  error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                  helperText={formik.touched.endTime && formik.errors.endTime}
                  sx={{
                    '& .MuiInputBase-root': {
                      display: 'none'
                    }
                  }}
                />
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                  Assign Asset <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <FieldHorizontalWrapper>
                  <TextInput
                    fullWidth
                    id='assignAsset'
                    name='assignAsset'
                    type='text'
                    placeholder='Assign Asset'
                    {...formik.getFieldProps('assignAsset')}
                    className={styles.TextField}
                    error={formik.touched.assignAsset && Boolean(formik.errors.assignAsset)}
                    helperText={formik.touched.assignAsset && formik.errors.assignAsset}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.allAssets}
                        onChange={event => formik.setFieldValue('allAssets', event.target.checked)}
                        name='allAssets'
                        sx={{ marginLeft: '0.5rem' }}
                        color='primary'
                      />
                    }
                    label='All'
                  />
                </FieldHorizontalWrapper>
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </form>

{/* ======= Allocate Vehicles ======== */}
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
            width: '100%',
            gap: '20px'
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              flex: '1',
              alignItems: 'center'
            }}
          >
            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Account
              </Typography>
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
                      <PlaceholderText>Select Account</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', marginLeft: 'auto', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Allocate To*
              </Typography>
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
                      <PlaceholderText>Please Select</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', marginLeft: 'auto', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Asset Name
              </Typography>
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
                      <PlaceholderText>Select Asset</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', marginLeft: 'auto', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Driver Name
              </Typography>
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
                      <PlaceholderText>Please Select Or Add New</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>
            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                License Number
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                placeholder='Search by Driver Name'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              width: '100%'
            }}
            md={6}
          >
            <FieldHorizontalWrapper sx={{ gap: '10px', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Assignment Type
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Mobile Number
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Employee ID
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Current Odometer
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper
              sx={{ gap: '10px', marginLeft: 'auto', flexDirection: 'column', alignItems: 'start', width: '100%' }}
            >
              <Typography variant='body' sx={{ mt: 1, fontWeight: '700', textAlign: 'center' }}>
                Current Vehicle Condition
              </Typography>
              <TextField
                name='assetName'
                id='outlined-basic'
                variant='outlined'
                value={assetName}
                onChange={changeHandler}
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>
          </Grid>
        </Grid>
      </Grid>
    </ServicesWrapper>
  )
}

export default AllocateVehicle

AllocateVehicle.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
