/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'

// ** MUI
import { Autocomplete, FormControlLabel, FormHelperText, Grid, TextField } from '@mui/material'
import { NoSpaceAtFirstPosition, isObjEmpty } from 'src/utilities/utils'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
// ** Third Party Packages
import DatePicker from 'react-datepicker'
import Checkbox from '@mui/material/Checkbox'

// ** Custom Components
import { useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { TextInput, PasswordField, TextLabel, FieldWrapper, FieldHorizontalFlex } from 'src/styles/components/input'

// ** Store and Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetTypesAction } from 'src/store/settings/asset-types/assetTypesAction'
import { getAllDevicesAction } from 'src/store/catalogs/devices/devicesAction'
import { useDatepickerStyles } from 'src/styles/components/datepicker'

import { useTheme } from '@mui/material/styles'

import countryList from 'country-list'

const allCountries = countryList.getData()

const countries = allCountries.map(item => ({
  label: item.name,
  id: item.code,
  value: item.code
}))

const employementOptions = [
  { label: 'Temporary', value: 'Temporary' },
  { label: 'Permanent', value: 'Permanent' }
]

const licenseOptions = [
  { label: 'Saudi', value: 'saudi' },
  { label: 'US', value: 'us' }
]

const autoCompleteStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.23)'
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    top: '0px !important'
  },
  '& .MuiInputLabel-outlined': {
    top: '-9px !important'
  }
}

function AddEditDriverForm({ edit, formik, router, onChangeHandler, customers }) {
  const dispatch = useDispatch()
  const styles = useCustomStyles()
  const common = useDatepickerStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)

  const theme = useTheme()

  const errors = useSelector(state => state.assets?.error)
  const devices = useSelector(state => state.devices?.getAllDevicesList?.data)
  const assetTypes = useSelector(state => state.assetTypes?.getAllAssetTypesList?.data)

  console.log('errors : ', errors)

  // ** Customers List
  const customersList = customers?.map(customer => {
    return {
      value: customer.id,
      label: customer.company_name,
      slug: customer.slug
    }
  })

  // ** Devices List
  const devicesList = devices?.map(device => {
    return {
      value: device.id,
      label: device.imei
    }
  })

  // ** Asset Types List
  const assetTypesList = assetTypes?.map(assetType => {
    return {
      value: assetType.id,
      label: assetType.name
    }
  })

  useEffect(() => {
    if (formik.values.customer_id) {
      dispatch(
        getAllAssetTypesAction({
          page: 1,
          limit: 999,
          slug: customersList.find(customer => customer.value === formik.values.customer_id)?.slug
        })
      )

      dispatch(getAllDevicesAction({ page: 1, limit: 999 }))
    }
  }, [formik.values.customer_id])

  console.log('formik values : ', formik.values)
  console.log('formik errors : ', formik.errors)

  return (
    <SettingsWrapper sx={{ mx: 4 }}>
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
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          {/* Driver Details */}
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Grid item>
              <Title>Driver Details</Title>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-first-name' sx={{ marginBottom: '0.25rem' }}>
                  First name<span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='first_name'
                  name='first_name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter first name'
                  {...formik.getFieldProps('first_name')}
                  className={styles.TextField}
                  error={
                    (!errors && formik.touched.first_name && Boolean(formik.errors.first_name)) || errors?.first_name
                  }
                  helperText={(!errors && formik.touched.first_name && formik.errors.first_name) || errors?.first_name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-last-name' sx={{ marginBottom: '0.25rem' }}>
                  Last Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='last_name'
                  name='last_name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter last name'
                  {...formik.getFieldProps('last_name')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.last_name && Boolean(formik.errors.last_name)) || errors?.last_name}
                  helperText={(!errors && formik.touched.last_name && formik.errors.last_name) || errors?.last_name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-email' sx={{ marginBottom: '0.25rem' }}>
                  Email <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='email'
                  name='email'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Email'
                  {...formik.getFieldProps('email')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.email && Boolean(formik.errors.email)) || errors?.email}
                  helperText={(!errors && formik.touched.email && formik.errors.email) || errors?.email}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='contact-number' sx={{ marginBottom: '0.25rem' }}>
                  Contact Number <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='contact_number'
                  name='contact_number'
                  type='tel'
                  variant='outlined'
                  placeholder='Enter phone'
                  {...formik.getFieldProps('contact_number')}
                  className={styles.TextField}
                  error={
                    (!errors && formik.touched.contact_number && Boolean(formik.errors.contact_number)) ||
                    errors?.contact_number
                  }
                  helperText={
                    (!errors && formik.touched.contact_number && formik.errors.contact_number) || errors?.contact_number
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-password' sx={{ marginBottom: '0.25rem' }}>
                  Password <span style={{ colr: 'red' }}>*</span>
                </TextLabel>
                <PasswordField
                  placeholder={'password'}
                  id='password-field'
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  inputProps={{
                    onKeyPress: NoSpaceAtFirstPosition
                  }}
                  helperText={(!errors && formik.touched.password && formik.errors.password) || errors?.password}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          className={styles.icon}
                          icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-password-confirmation' sx={{ marginBottom: '0.25rem' }}>
                  Confirm Password <span style={{ colr: 'red' }}>*</span>
                </TextLabel>
                <PasswordField
                  placeholder={'password confirmation'}
                  id='password_confirmation-field'
                  type={showCPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password_confirmation')}
                  error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                  inputProps={{
                    onKeyPress: NoSpaceAtFirstPosition
                  }}
                  helperText={
                    (!errors && formik.touched.password_confirmation && formik.errors.password_confirmation) ||
                    errors?.password_confirmation
                  }
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowCPassword(!showCPassword)}
                      >
                        <Icon
                          className={styles.icon}
                          icon={showCPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <DatePickerWrapper>
                <FieldWrapper>
                  <TextLabel id='dob' sx={{ marginBottom: '0.25rem' }}>
                    Date of Birth
                  </TextLabel>
                  <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={formik.values.dob}
                    id='dob'
                    placeholderText='Date of birth'
                    className={common.datepicker}
                    onChange={date => formik.setFieldValue('dob', date)}
                    dateFormat='yyyy-MM-dd'
                  />
                  {/* show error  */}
                  {!errors && formik.touched.dob && Boolean(formik.errors.dob) && (
                    <FormHelperText error>{formik.errors.dob}</FormHelperText>
                  )}

                  {errors?.dob && <FormHelperText error>{errors?.dob}</FormHelperText>}
                </FieldWrapper>
              </DatePickerWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-address' sx={{ marginBottom: '0.25rem' }}>
                  Address <span style={{ colr: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='address'
                  name='address'
                  type='text'
                  variant='outlined'
                  placeholder='Enter address'
                  {...formik.getFieldProps('address')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.address && Boolean(formik.errors.address)) || errors?.address}
                  helperText={(!errors && formik.touched.address && formik.errors.address) || errors?.address}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-type-name' sx={{ marginBottom: '0.25rem' }}>
                  Asset Type
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset_type_id'
                  name='asset_type_id'
                  disabled={!formik.values.customer_id}
                  className={styles.AutoCompleteSelect}
                  options={assetTypesList}
                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => {
                    formik.setFieldValue('asset_type_id', value?.value)
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
                />

                {!errors?.asset_type_id && formik.touched.asset_type_id && formik.errors.asset_type_id && (
                  <FormHelperText error>{formik.errors.asset_type_id}</FormHelperText>
                )}

                {errors?.asset_type_id && <FormHelperText error>{errors?.asset_type_id}</FormHelperText>}
              </FieldWrapper>
            </Grid>
          </Grid>

          {/*   Tracking Details  */}
          <Grid item xs={12} md={12} lg={12} xl={12} style={{ marginTop: '20px' }}>
            <Grid item>
              <Title>Tracking Details</Title>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <FieldWrapper>
              <TextLabel id='profile-is-track'>Is Track</TextLabel>
              <Checkbox
                defaultValue={false}
                sx={{
                  '&.Mui-checked': {
                    color: '#FF8B00'
                  }
                }}
                checked={formik.values.is_track}
                onChange={() => formik.setFieldValue('is_track', !formik.values.is_track)}
              />
            </FieldWrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='tag_id' sx={{ marginBottom: '0.25rem' }}>
                  Tag ID
                </TextLabel>
                <TextInput
                  fullWidth
                  id='tag_id'
                  name='tag_id'
                  type='text'
                  variant='outlined'
                  placeholder='Enter tag id'
                  {...formik.getFieldProps('tag_id')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.tag_id && Boolean(formik.errors.tag_id)) || errors?.tag_id}
                  helperText={(!errors && formik.touched.tag_id && formik.errors.tag_id) || errors?.tag_id}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='tag_id_1' sx={{ marginBottom: '0.25rem' }}>
                  Tag ID 1
                </TextLabel>
                <TextInput
                  fullWidth
                  id='tag_id_1'
                  name='tag_id_1'
                  type='text'
                  variant='outlined'
                  placeholder='Enter tag id 1'
                  {...formik.getFieldProps('tag_id_1')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.tag_id_1 && Boolean(formik.errors.tag_id_1)) || errors?.tag_id_1}
                  helperText={(!errors && formik.touched.tag_id_1 && formik.errors.tag_id_1) || errors?.tag_id_1}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='tag_id_2' sx={{ marginBottom: '0.25rem' }}>
                  Tag ID 2
                </TextLabel>
                <TextInput
                  fullWidth
                  id='tag_id_2'
                  name='tag_id_2'
                  type='text'
                  variant='outlined'
                  placeholder='Enter tag id 2'
                  {...formik.getFieldProps('tag_id_2')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.tag_id_2 && Boolean(formik.errors.tag_id_2)) || errors?.tag_id_2}
                  helperText={(!errors && formik.touched.tag_id_2 && formik.errors.tag_id_2) || errors?.tag_id_2}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-working-hours' sx={{ marginBottom: '0.25rem' }}>
                  Working Hours
                </TextLabel>
                <TextInput
                  fullWidth
                  id='working_hours'
                  name='working_hours'
                  type='number'
                  variant='outlined'
                  placeholder='Enter working hours'
                  {...formik.getFieldProps('working_hours')}
                  className={styles.TextField}
                  error={
                    (!errors && formik.touched.working_hours && Boolean(formik.errors.working_hours)) ||
                    errors?.working_hours
                  }
                  helperText={
                    (!errors && formik.touched.working_hours && formik.errors.working_hours) || errors?.working_hours
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-overtime-charges' sx={{ marginBottom: '0.25rem' }}>
                  Overtime charges
                </TextLabel>
                <TextInput
                  fullWidth
                  id='overtime_charges'
                  name='overtime_charges'
                  type='number'
                  variant='outlined'
                  placeholder='Enter overtime charges'
                  {...formik.getFieldProps('overtime_charges')}
                  className={styles.TextField}
                  error={
                    (!errors && formik.touched.overtime_charges && Boolean(formik.errors.overtime_charges)) ||
                    errors?.overtime_charges
                  }
                  helperText={
                    (!errors && formik.touched.overtime_charges && formik.errors.overtime_charges) ||
                    errors?.overtime_charges
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          {/*   Employment Details  */}
          <Grid item xs={12} md={12} lg={12} xl={12} style={{ marginTop: '20px' }}>
            <Grid item>
              <Title>Employment Details</Title>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <FieldWrapper>
              <TextLabel id='profile-sponsor'>Sponsor</TextLabel>
              <Checkbox
                defaultValue={false}
                sx={{
                  '&.Mui-checked': {
                    color: '#FF8B00'
                  }
                }}
                checked={formik.values.sponsor}
                onChange={() => formik.setFieldValue('sponsor', !formik.values.sponsor)}
              />
            </FieldWrapper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-employement-status' sx={{ marginBottom: '0.25rem' }}>
                  Employee Status
                </TextLabel>
                <Autocomplete
                  id='employement_status'
                  name='employement_status'
                  options={employementOptions}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('employement_status', newValue?.value)
                  }}
                  value={
                    formik.values.employement_status
                      ? employementOptions
                        ? employementOptions.find(nat => nat.value === formik.values.employement_status)
                        : ''
                      : ''
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Employe Status'
                      error={formik.touched.employement_status && Boolean(formik.errors.employement_status)}
                      helperText={formik.touched.employement_status && formik.errors.employement_status}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-nationality' sx={{ marginBottom: '0.25rem' }}>
                  Nationality <span style={{ colr: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='nationality'
                  name='nationality'
                  options={countries}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('nationality', newValue?.value)
                  }}
                  value={
                    formik.values.nationality
                      ? countries
                        ? countries.find(nat => nat.value === formik.values.nationality)
                        : ''
                      : ''
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Nationality'
                      error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                      helperText={formik.touched.nationality && formik.errors.nationality}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          {/*   Driver Details  */}
          <Grid item xs={12} md={12} lg={12} xl={12} style={{ marginTop: '20px' }}>
            <Grid item>
              <Title>Driver Details</Title>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-license-type' sx={{ marginBottom: '0.25rem' }}>
                  License type
                </TextLabel>
                <Autocomplete
                  id='license_type'
                  name='license_type'
                  options={licenseOptions}
                  className={styles.AutoCompleteSelect}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('license_type', newValue?.value)
                  }}
                  value={
                    formik.values.license_type
                      ? licenseOptions
                        ? licenseOptions.find(nat => nat.value === formik.values.license_type)
                        : ''
                      : ''
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select license type'
                      error={formik.touched.license_type && Boolean(formik.errors.license_type)}
                      helperText={formik.touched.license_type && formik.errors.license_type}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-license-number' sx={{ marginBottom: '0.25rem' }}>
                  License number <span style={{ colr: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='license_number'
                  name='license_number'
                  type='number'
                  variant='outlined'
                  placeholder='Enter license number'
                  {...formik.getFieldProps('license_number')}
                  className={styles.TextField}
                  error={
                    (!errors && formik.touched.license_number && Boolean(formik.errors.license_number)) ||
                    errors?.license_number
                  }
                  helperText={
                    (!errors && formik.touched.license_number && formik.errors.license_number) || errors?.license_number
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <DatePickerWrapper>
                <FieldWrapper>
                  <TextLabel id='license_expire_date' sx={{ marginBottom: '0.25rem' }}>
                    License Expiry Date
                  </TextLabel>
                  <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={formik.values.license_expire_date}
                    id='license_expire_date'
                    placeholderText='Lisence Expiry Date'
                    className={common.datepicker}
                    onChange={date => formik.setFieldValue('license_expire_date', date)}
                    dateFormat='yyyy-MM-dd'
                  />
                  {/* show error  */}
                  {!errors && formik.touched.license_expire_date && Boolean(formik.errors.license_expire_date) && (
                    <FormHelperText error>{formik.errors.license_expire_date}</FormHelperText>
                  )}

                  {errors?.license_expire_date && <FormHelperText error>{errors?.license_expire_date}</FormHelperText>}
                </FieldWrapper>
              </DatePickerWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-other-permit' sx={{ marginBottom: '0.25rem' }}>
                  Other Permit
                </TextLabel>
                <TextInput
                  fullWidth
                  id='other_permit'
                  name='other_permit'
                  type='number'
                  variant='outlined'
                  placeholder='Enter Permit'
                  {...formik.getFieldProps('other_permit')}
                  className={styles.TextField}
                  error={
                    (!errors && formik.touched.other_permit && Boolean(formik.errors.other_permit)) ||
                    errors?.other_permit
                  }
                  helperText={
                    (!errors && formik.touched.other_permit && formik.errors.other_permit) || errors?.other_permit
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='profile-permit-no' sx={{ marginBottom: '0.25rem' }}>
                  Permit Number
                </TextLabel>
                <TextInput
                  fullWidth
                  id='permit_no'
                  name='permit_no'
                  type='number'
                  variant='outlined'
                  placeholder='Enter Permit number'
                  {...formik.getFieldProps('permit_no')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.permit_no && Boolean(formik.errors.permit_no)) || errors?.permit_no}
                  helperText={(!errors && formik.touched.permit_no && formik.errors.permit_no) || errors?.permit_no}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <DatePickerWrapper>
                <FieldWrapper>
                  <TextLabel id='permit_expire_date' sx={{ marginBottom: '0.25rem' }}>
                    Permit Expiry Date
                  </TextLabel>
                  <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={formik.values.permit_expiry_date}
                    id='permit_expiry_date'
                    placeholderText='Permit Expiry Date'
                    className={common.datepicker}
                    onChange={date => formik.setFieldValue('permit_expiry_date', date)}
                    dateFormat='yyyy-MM-dd'
                  />
                  {/* show error  */}
                  {!errors && formik.touched.permit_expiry_date && Boolean(formik.errors.permit_expiry_date) && (
                    <FormHelperText error>{formik.errors.permit_expiry_date}</FormHelperText>
                  )}

                  {errors?.permit_expiry_date && <FormHelperText error>{errors?.permit_expiry_date}</FormHelperText>}
                </FieldWrapper>
              </DatePickerWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <DatePickerWrapper>
                <FieldWrapper>
                  <TextLabel id='visa_expiry_date' sx={{ marginBottom: '0.25rem' }}>
                    Visa Expiry Date
                  </TextLabel>
                  <DatePicker
                    showYearDropdown
                    showMonthDropdown
                    selected={formik.values.permit_expiry_date}
                    id='visa_expiry_date'
                    placeholderText='Visa Expiry Date'
                    className={common.datepicker}
                    onChange={date => formik.setFieldValue('visa_expiry_date', date)}
                    dateFormat='yyyy-MM-dd'
                  />
                  {/* show error  */}
                  {!errors && formik.touched.visa_expiry_date && Boolean(formik.errors.visa_expiry_date) && (
                    <FormHelperText error>{formik.errors.visa_expiry_date}</FormHelperText>
                  )}

                  {errors?.visa_expiry_date && <FormHelperText error>{errors?.visa_expiry_date}</FormHelperText>}
                </FieldWrapper>
              </DatePickerWrapper>
            </Grid>
          </Grid>

          {/*   Emergency Information Details  */}
          <Grid item xs={12} md={12} lg={12} xl={12} style={{ marginTop: '20px' }}>
            <Grid item>
              <Title>Emergency Information Details</Title>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='emergency_contact_number' sx={{ marginBottom: '0.25rem' }}>
                  Emergency Contact Number
                </TextLabel>
                <TextInput
                  fullWidth
                  id='emergency_contact_number'
                  name='emergency_contact_number'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Contact Number'
                  {...formik.getFieldProps('emergency_contact_number')}
                  className={styles.TextField}
                  error={
                    (!errors &&
                      formik.touched.emergency_contact_number &&
                      Boolean(formik.errors.emergency_contact_number)) ||
                    errors?.emergency_contact_number
                  }
                  helperText={
                    (!errors && formik.touched.emergency_contact_number && formik.errors.emergency_contact_number) ||
                    errors?.emergency_contact_number
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='emergency_contact_name' sx={{ marginBottom: '0.25rem' }}>
                  Emergency Contact Name
                </TextLabel>
                <TextInput
                  fullWidth
                  id='emergency_contact_name'
                  name='emergency_contact_name'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Contact Name'
                  {...formik.getFieldProps('emergency_contact_name')}
                  className={styles.TextField}
                  error={
                    (!errors &&
                      formik.touched.emergency_contact_name &&
                      Boolean(formik.errors.emergency_contact_name)) ||
                    errors?.emergency_contact_name
                  }
                  helperText={
                    (!errors && formik.touched.emergency_contact_name && formik.errors.emergency_contact_name) ||
                    errors?.emergency_contact_name
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='blood_group' sx={{ marginBottom: '0.25rem' }}>
                  Blood Group
                </TextLabel>
                <TextInput
                  fullWidth
                  id='blood_group'
                  name='blood_group'
                  type='text'
                  variant='outlined'
                  placeholder='Enter blood group'
                  {...formik.getFieldProps('blood_group')}
                  className={styles.TextField}
                  error={
                    (!errors && formik.touched.blood_group && Boolean(formik.errors.blood_group)) || errors?.blood_group
                  }
                  helperText={
                    (!errors && formik.touched.blood_group && formik.errors.blood_group) || errors?.blood_group
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='notes' sx={{ marginBottom: '0.25rem' }}>
                  Blood Group
                </TextLabel>
                <TextInput
                  fullWidth
                  id='notes'
                  name='notes'
                  type='text'
                  variant='outlined'
                  placeholder='Enter notes'
                  {...formik.getFieldProps('notes')}
                  className={styles.TextField}
                  error={(!errors && formik.touched.notes && Boolean(formik.errors.notes)) || errors?.notes}
                  helperText={(!errors && formik.touched.notes && formik.errors.notes) || errors?.notes}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='asset-plate-no' sx={{ marginBottom: '0.25rem' }}>
                  Plate No
                </TextLabel>
                <TextInput
                  fullWidth
                  id='plate_no'
                  name='plate_no'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Plate No'
                  className={styles.TextField}
                  {...formik.getFieldProps('plate_no')}
                  error={(!errors && formik.touched.plate_no && Boolean(formik.errors.plate_no)) || errors?.plate_no}
                  helperText={(!errors && formik.touched.plate_no && formik.errors.plate_no) || errors?.plate_no}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='registration_no' sx={{ marginBottom: '0.25rem' }}>
                  Registration No
                </TextLabel>
                <TextInput
                  fullWidth
                  id='registration_no'
                  name='registration_no'
                  type='text'
                  variant='outlined'
                  placeholder='Enter Registration No'
                  className={styles.TextField}
                  {...formik.getFieldProps('registration_no')}
                  error={
                    (!errors && formik.touched.registration_no && Boolean(formik.errors.registration_no)) ||
                    errors?.registration_no
                  }
                  helperText={
                    (!errors && formik.touched.registration_no && formik.errors.registration_no) ||
                    errors?.registration_no
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

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
                    className={common.datepicker}
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
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditDriverForm
