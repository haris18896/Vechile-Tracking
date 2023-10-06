/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'

// ** MUI
import { Autocomplete, Box, Card, FormHelperText, Grid, TextField } from '@mui/material'

// ** Third Party Packages
import DatePicker from 'react-datepicker'

// ** Custom Components
import { useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper } from 'src/styles/pages/settings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { TextInput, TextLabel, FieldWrapper, HeaderLabel } from 'src/styles/components/input'

// ** Store and Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetTypesAction } from 'src/store/settings/asset-types/assetTypesAction'
import { getAllUnAllocatedDevicesAction } from 'src/store/catalogs/devices/devicesAction'
import { useDatepickerStyles } from 'src/styles/components/datepicker'

import { FieldHorizontalFlex } from 'src/styles/components/input'
import { FormControlLabel } from 'src/styles/pages/login'
import Checkbox from '@mui/material/Checkbox'

import { useTheme } from '@mui/material/styles'
import { getAllSimListingAction } from 'src/store/catalogs/sim-listing/simListingAction'
import { getAllCampusesAction } from 'src/store/catalogs/campus/campusAction'
import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { FileUploaderWrapper } from 'src/styles/common'
import FileUploaderRestrictions from 'src/components/FileUploader/file-uploader-restricted'
import { useTranslation } from 'react-i18next'
import { getAllDriversAction } from 'src/store/catalogs/driver/driversActions'

function AddEditAssetForm({ formik }) {
  const dispatch = useDispatch()
  const common = useCustomStyles()

  // ** Translation
  const { t } = useTranslation()

  const theme = useTheme()

  const styles = useDatepickerStyles({
    error: formik.touched.registration_expiry_date && formik.errors.registration_expiry_date
  })

  const errors = useSelector(state => state.assets?.error)
  const devices = useSelector(state => state.devices?.getAllUnAllocatedDevicesList?.data)
  const assetTypes = useSelector(state => state.assetTypes?.getAllAssetTypesList?.data)
  const simListing = useSelector(state => state.simListing?.getAllSimListingList?.data)
  const campus = useSelector(state => state.campus?.getAllCampusesList?.data)
  const drivers = useSelector(state => state.driver?.getAllDriversList?.data)

  // ** Dummy Data
  const simListDummy = []
  const plateTypeListDummy = []
  const communicationListDummy = []
  const paymentTypeListDummy = []
  const installationTypeListDummy = []

  const driversListDummy = [
    { value: 1, label: 'Mohammed Ahmed' },
    { value: 2, label: 'Mohammed Ali' },
    { value: 3, label: 'Mohammed Umer' }
  ]

  const devicesListDummy = [
    { value: 1, label: 'GPS Tracker' },
    { value: 2, label: 'Bluetooth Tracker' }
  ]

  const campusListDummy = [
    { value: 1, label: 'IIUI' },
    { value: 2, label: 'GUI' }
  ]

  // ** Devices List
  const devicesList = devices?.map(device => {
    return {
      value: device.id,
      label: device?.imei || device?.serial_number
    }
  })

  // ** Asset Types List
  const assetTypesList = assetTypes?.map(assetType => {
    return {
      value: assetType.id,
      label: assetType.name
    }
  })

  // ** Sim List
  const simList = simListing?.map(sim => {
    return {
      value: sim.id,
      label: sim.sim_no
    }
  })

  // ** Campus List
  const campusList = campus?.map(campuses => {
    return {
      value: campuses.id,
      label: campuses.name
    }
  })

  // ** Driver List
  const driversList = drivers?.map(driver => {
    return {
      value: driver.id,
      label: `${driver.first_name} ${driver?.last_name}`
    }
  })

  console.log(campusList, 'list')

  // ** For Fetching Customers
  useEffect(() => {
    dispatch(getAllCustomersAction({ page: '1', limit: 'all' }))
  }, [])

  // ** For Fetching Campuses
  useEffect(() => {
    dispatch(getAllCampusesAction({ page: '1', limit: 'all' }))
  }, [])

  // ** For Fetching Sim Listing
  useEffect(() => {
    dispatch(getAllSimListingAction({ page: 1, limit: 'all' }))
  }, [])

  // ** For Fetching Devices
  useEffect(() => {
    dispatch(getAllUnAllocatedDevicesAction({ page: 1, limit: 'all' }))
  }, [])

  // ** For Fetching Assets Types
  useEffect(() => {
    dispatch(getAllAssetTypesAction({ page: 1, limit: 'all' }))
  }, [])

  // ** For Fetching Drivers
  useEffect(() => {
    dispatch(getAllDriversAction({ page: 1, limit: 'all' }))
  }, [])

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      // prevent space character from being entered
      event.preventDefault()
    }
  }

  return (
    <SettingsWrapper sx={{ mx: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={10} md={8}>
              <FieldHorizontalFlex>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formik.values.is_wasl}
                      checked={formik.values.is_wasl === 1}
                      onChange={() => formik.setFieldValue('is_wasl', formik.values.is_wasl === 1 ? 0 : 1)}
                      name='is_wasl'
                      color='primary'
                    />
                  }
                  color={theme.palette.text.primary}
                  label={'Wasl'}
                />
              </FieldHorizontalFlex>
            </Grid>
            {/* textfeild */}
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='profile-first-name' sx={{ marginBottom: '0.25rem' }}>
                    Name <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='name'
                    name='name'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Name of Asset'
                    className={common.TextField}
                    {...formik.getFieldProps('name')}
                    error={(!errors && formik.touched.name && Boolean(formik.errors.name)) || errors?.name}
                    helperText={(!errors && formik.touched.name && formik.errors.name) || errors?.name}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='asset-plate-no' sx={{ marginBottom: '0.25rem' }}>
                    Plate No. <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='plate_no'
                    name='plate_no'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Plate No.'
                    className={common.TextField}
                    {...formik.getFieldProps('plate_no')}
                    error={(!errors && formik.touched.plate_no && Boolean(formik.errors.plate_no)) || errors?.plate_no}
                    helperText={(!errors && formik.touched.plate_no && formik.errors.plate_no) || errors?.plate_no}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='registration_no' sx={{ marginBottom: '0.25rem' }}>
                    Registration No.
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='registration_no'
                    name='registration_no'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Registration No.'
                    className={common.TextField}
                    {...formik.getFieldProps('registration_no')}
                    error={
                      (!errors && formik.touched.registration_no && Boolean(formik.errors.registration_no)) ||
                      errors?.registration_no
                    }
                    helperText={
                      (!errors && formik.touched.registration_no && formik.errors.registration_no) ||
                      errors?.registration_no
                    }
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            {/* date feild */}
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <DatePickerWrapper>
                  <FieldWrapper>
                    <TextLabel id='registration_expiry_date' sx={{ marginBottom: '0.25rem' }}>
                      Registration Expiry Date
                    </TextLabel>
                    <DatePicker
                      showYearDropdown
                      showMonthDropdown
                      selected={formik.values.registration_expiry_date}
                      id='Registration-Expiry-Date'
                      placeholderText='Registration Expiry Date'
                      className={styles.datepicker}
                      onChange={date => formik.setFieldValue('registration_expiry_date', date)}
                      dateFormat='yyyy-MM-dd'
                    />
                    {/* show error  */}
                    {!errors &&
                      formik.touched.registration_expiry_date &&
                      Boolean(formik.errors.registration_expiry_date) && (
                        <FormHelperText error>{formik.errors.registration_expiry_date}</FormHelperText>
                      )}

                    {errors?.registration_expiry_date && (
                      <FormHelperText error>{errors?.registration_expiry_date}</FormHelperText>
                    )}
                  </FieldWrapper>
                </DatePickerWrapper>
              </Grid>
            </Grid>

            {/* date field, installation */}
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <DatePickerWrapper>
                  <FieldWrapper>
                    <TextLabel id='installation_date' sx={{ marginBottom: '0.25rem' }}>
                      Installation Date <span style={{ color: 'red' }}>*</span>
                    </TextLabel>
                    <DatePicker
                      showYearDropdown
                      showMonthDropdown
                      maxDate={new Date()}
                      selected={formik.values.installation_date}
                      id='Installation Date'
                      placeholderText='Installation Date'
                      className={styles.datepicker}
                      onChange={date => formik.setFieldValue('installation_date', date)}
                      dateFormat='yyyy-MM-dd'
                    />
                    {/* show error  */}
                    {!errors && formik.touched.installation_date && Boolean(formik.errors.installation_date) && (
                      <FormHelperText error>{formik.errors.installation_date}</FormHelperText>
                    )}

                    {errors?.installation_date && <FormHelperText error>{errors?.installation_date}</FormHelperText>}
                  </FieldWrapper>
                </DatePickerWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='brand' sx={{ marginBottom: '0.25rem' }}>
                    Brand <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='brand'
                    name='brand'
                    type='text'
                    variant='outlined'
                    placeholder='Enter vehicle brand'
                    className={common.TextField}
                    {...formik.getFieldProps('brand')}
                    error={(!errors && formik.touched.brand && Boolean(formik.errors.brand)) || errors?.brand}
                    helperText={(!errors && formik.touched.brand && formik.errors.brand) || errors?.brand}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='model' sx={{ marginBottom: '0.25rem' }}>
                    Model <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='model'
                    name='model'
                    type='number'
                    variant='outlined'
                    placeholder='Enter model No.'
                    className={common.TextField}
                    {...formik.getFieldProps('model')}
                    error={(!errors && formik.touched.model && Boolean(formik.errors.model)) || errors?.model}
                    helperText={(!errors && formik.touched.model && formik.errors.model) || errors?.model}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='year' sx={{ marginBottom: '0.25rem' }}>
                    Year <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='year'
                    name='year'
                    type='number'
                    variant='outlined'
                    placeholder='Enter Year of registration'
                    className={common.TextField}
                    {...formik.getFieldProps('year')}
                    error={(!errors && formik.touched.year && Boolean(formik.errors.year)) || errors?.year}
                    helperText={(!errors && formik.touched.year && formik.errors.year) || errors?.year}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='color' sx={{ marginBottom: '0.25rem' }}>
                    Color <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='color'
                    name='color'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Vehicle Color'
                    className={common.TextField}
                    {...formik.getFieldProps('color')}
                    error={(!errors && formik.touched.color && Boolean(formik.errors.color)) || errors?.color}
                    helperText={(!errors && formik.touched.color && formik.errors.color) || errors?.color}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='vin' sx={{ marginBottom: '0.25rem' }}>
                    VIN
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='vin'
                    name='vin'
                    type='number'
                    variant='outlined'
                    placeholder='Enter VIN'
                    className={common.TextField}
                    {...formik.getFieldProps('vin')}
                    error={(formik.touched.vin && Boolean(formik.errors.vin)) || errors?.vin}
                    helperText={(formik.touched.vin && formik.errors.vin) || errors?.vin}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='asset-type' sx={{ marginBottom: '0.25rem' }}>
                    Asset Type <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='asset_type_id'
                    name='asset_type_id'
                    options={assetTypesList}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('asset_type_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.asset_type_id && formik.errors.asset_type_id && '#E53E3E !important'
                      }
                    }}
                    value={assetTypesList?.find(customer => customer.value === parseInt(formik.values.asset_type_id))}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Asset Type'
                        error={formik.touched.asset_type_id && Boolean(formik.errors.asset_type_id)}
                        helperText={formik.touched.asset_type_id && formik.errors.asset_type_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='device' sx={{ marginBottom: '0.25rem' }}>
                    Device <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='device_id'
                    name='device_id'
                    options={devicesList ?? devicesListDummy}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('device_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.device_id && formik.errors.device_id && '#E53E3E !important'
                      }
                    }}
                    value={(devicesList ?? devicesListDummy)?.find(
                      customer => customer.value === parseInt(formik.values.device_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Device'
                        error={formik.touched.device_id && Boolean(formik.errors.device_id)}
                        helperText={formik.touched.device_id && formik.errors.device_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            {/* AutoComplete */}
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='driver' sx={{ marginBottom: '0.25rem' }}>
                    Driver <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='driver_id'
                    name='driver_id'
                    options={driversList ?? []}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('driver_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.driver_id && formik.errors.driver_id && '#E53E3E !important'
                      }
                    }}
                    value={driversList?.find(customer => customer.value === parseInt(formik.values.driver_id))}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Driver'
                        error={formik.touched.driver_id && Boolean(formik.errors.driver_id)}
                        helperText={formik.touched.driver_id && formik.errors.driver_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='payment_type_id' sx={{ marginBottom: '0.25rem' }}>
                    Payment Type
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='payment_type_id'
                    name='payment_type_id'
                    options={paymentTypeListDummy}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('payment_type_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:
                          formik.touched.payment_type_id && formik.errors.payment_type_id && '#E53E3E !important'
                      }
                    }}
                    value={paymentTypeListDummy?.find(
                      customer => customer.value === parseInt(formik.values.payment_type_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Payment Type'
                        error={formik.touched.payment_type_id && Boolean(formik.errors.payment_type_id)}
                        helperText={formik.touched.payment_type_id && formik.errors.payment_type_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* installer */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='installer_id' sx={{ marginBottom: '0.25rem' }}>
                    Installer <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='installer_id'
                    name='installer_id'
                    options={[{ value: '12', label: 'Rehman' }]}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('installer_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.installer_id && formik.errors.installer_id && '#E53E3E !important'
                      }
                    }}
                    value={[{ value: '12', label: 'Rehman' }]?.find(
                      customer => customer.value === parseInt(formik.values.installer_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Installer'
                        error={formik.touched.installer_id && Boolean(formik.errors.installer_id)}
                        helperText={formik.touched.installer_id && formik.errors.installer_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='installation_type_id' sx={{ marginBottom: '0.25rem' }}>
                    Installation Type
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='installation_type_id'
                    name='installation_type_id'
                    options={installationTypeListDummy}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('installation_type_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:
                          formik.touched.installation_type_id &&
                          formik.errors.installation_type_id &&
                          '#E53E3E !important'
                      }
                    }}
                    value={installationTypeListDummy?.find(
                      customer => customer.value === parseInt(formik.values.installation_type_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Installer Type'
                        error={formik.touched.installation_type_id && Boolean(formik.errors.installation_type_id)}
                        helperText={formik.touched.installation_type_id && formik.errors.installation_type_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* payment type */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='plate_type_id' sx={{ marginBottom: '0.25rem' }}>
                    Plate Type
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='plate_type_id'
                    name='plate_type_id'
                    options={plateTypeListDummy}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('plate_type_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.plate_type_id && formik.errors.plate_type_id && '#E53E3E !important'
                      }
                    }}
                    value={plateTypeListDummy?.find(
                      customer => customer.value === parseInt(formik.values.plate_type_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Plate Type'
                        error={formik.touched.plate_type_id && Boolean(formik.errors.plate_type_id)}
                        helperText={formik.touched.plate_type_id && formik.errors.plate_type_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* plate type */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='sim_id' sx={{ marginBottom: '0.25rem' }}>
                    Sim
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='sim_id'
                    name='sim_id'
                    options={simList ?? simListDummy}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('sim_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.sim_id && formik.errors.sim_id && '#E53E3E !important'
                      }
                    }}
                    value={(simList ?? simListDummy)?.find(
                      customer => customer.value === parseInt(formik.values.sim_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Sim'
                        error={formik.touched.sim_id && Boolean(formik.errors.sim_id)}
                        helperText={formik.touched.sim_id && formik.errors.sim_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* sim _id */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='campus_id' sx={{ marginBottom: '0.25rem' }}>
                    Campus <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='campus_id'
                    name='campus_id'
                    options={campusList ?? campusListDummy}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('campus_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.campus_id && formik.errors.campus_id && '#E53E3E !important'
                      }
                    }}
                    value={(campusList ?? campusListDummy)?.find(
                      customer => customer.value === parseInt(formik.values.campus_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Campus'
                        error={formik.touched.campus_id && Boolean(formik.errors.campus_id)}
                        helperText={formik.touched.campus_id && formik.errors.campus_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* campus id */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='communication_id' sx={{ marginBottom: '0.25rem' }}>
                    Communication
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='communication_id'
                    name='communication_id'
                    options={communicationListDummy}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => option.label}
                    onChange={(e, value) => {
                      formik.setFieldValue('communication_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:
                          formik.touched.communication_id && formik.errors.communication_id && '#E53E3E !important'
                      }
                    }}
                    value={communicationListDummy?.find(
                      customer => customer.value === parseInt(formik.values.communication_id)
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Communication'
                        error={formik.touched.communication_id && Boolean(formik.errors.communication_id)}
                        helperText={formik.touched.communication_id && formik.errors.communication_id}
                      />
                    )}
                    className={common.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* communication id */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='so' sx={{ marginBottom: '0.25rem' }}>
                    SO <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='so'
                    name='so'
                    type='text'
                    variant='outlined'
                    placeholder='Enter SO'
                    className={common.TextField}
                    {...formik.getFieldProps('so')}
                    error={(!errors && formik.touched.so && Boolean(formik.errors.so)) || errors?.so}
                    helperText={(!errors && formik.touched.so && formik.errors.so) || errors?.so}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* so */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='military_pass_number' sx={{ marginBottom: '0.25rem' }}>
                    Military Pass Number
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='military_pass_number'
                    name='military_pass_number'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Military Pass Number'
                    className={common.TextField}
                    {...formik.getFieldProps('military_pass_number')}
                    error={
                      (!errors && formik.touched.military_pass_number && Boolean(formik.errors.military_pass_number)) ||
                      errors?.military_pass_number
                    }
                    helperText={
                      (!errors && formik.touched.military_pass_number && formik.errors.military_pass_number) ||
                      errors?.military_pass_number
                    }
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* military pass number */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='imei_number' sx={{ marginBottom: '0.25rem' }}>
                    IMEI Number<span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='imei_number'
                    name='imei_number'
                    type='text'
                    variant='outlined'
                    placeholder='Enter IMEI Number'
                    className={common.TextField}
                    {...formik.getFieldProps('imei_number')}
                    error={
                      (!errors && formik.touched.imei_number && Boolean(formik.errors.imei_number)) ||
                      errors?.imei_number
                    }
                    helperText={
                      (!errors && formik.touched.imei_number && formik.errors.imei_number) || errors?.imei_number
                    }
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* imei number */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='idle_limit' sx={{ marginBottom: '0.25rem' }}>
                    Idle Limit <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    type='number'
                    id='idle_limit'
                    name='idle_limit'
                    variant='outlined'
                    placeholder='Enter Idle Limit'
                    className={common.TextField}
                    {...formik.getFieldProps('idle_limit')}
                    error={
                      (!errors && formik.touched.idle_limit && Boolean(formik.errors.idle_limit)) || errors?.idle_limit
                    }
                    helperText={
                      (!errors && formik.touched.idle_limit && formik.errors.idle_limit) || errors?.idle_limit
                    }
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* idle limit */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='sequence_number' sx={{ marginBottom: '0.25rem' }}>
                    Sequence Number<span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='sequence_number'
                    name='sequence_number'
                    type='number'
                    variant='outlined'
                    placeholder='Enter Sequence Number'
                    className={common.TextField}
                    {...formik.getFieldProps('sequence_number')}
                    error={
                      (!errors && formik.touched.sequence_number && Boolean(formik.errors.sequence_number)) ||
                      errors?.sequence_number
                    }
                    helperText={
                      (!errors && formik.touched.sequence_number && formik.errors.sequence_number) ||
                      errors?.sequence_number
                    }
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* sequence number */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='insurance_number' sx={{ marginBottom: '0.25rem' }}>
                    Insurance Number <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='insurance_number'
                    name='insurance_number'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Your Insurance Number'
                    className={common.TextField}
                    {...formik.getFieldProps('insurance_number')}
                    error={
                      (!errors && formik.touched.insurance_number && Boolean(formik.errors.insurance_number)) ||
                      errors?.insurance_number
                    }
                    helperText={
                      (!errors && formik.touched.insurance_number && formik.errors.insurance_number) ||
                      errors?.insurance_number
                    }
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* insurance number */}

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel id='plate_registration_no' sx={{ marginBottom: '0.25rem' }}>
                    Plate Registration Number <span style={{ color: 'red' }}>*</span>
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='plate_registration_no'
                    name='plate_registration_no'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Your Plate Registration Number'
                    className={common.TextField}
                    {...formik.getFieldProps('plate_registration_no')}
                    error={
                      (!errors &&
                        formik.touched.plate_registration_no &&
                        Boolean(formik.errors.plate_registration_no)) ||
                      errors?.plate_registration_no
                    }
                    helperText={
                      (!errors && formik.touched.plate_registration_no && formik.errors.plate_registration_no) ||
                      errors?.plate_registration_no
                    }
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
            {/* plate registration */}

            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextLabel>
                Logo <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <FileUploaderWrapper>
                <FileUploaderRestrictions
                  mb={10}
                  formikValue={formik.values.image}
                  formikError={formik.errors.image}
                  desc={`${t('allowed.fileSize10MB')}`}
                  allowed={`${t('allowed.image-type')}`}
                  heading={`${t('allowed.uploadingHeader')}`}
                  onChange={data => formik.setFieldValue('image', data)}
                />
              </FileUploaderWrapper>
            </Grid>
          </Grid>
        </form>
      </Box>
    </SettingsWrapper>
  )
}

export default AddEditAssetForm
