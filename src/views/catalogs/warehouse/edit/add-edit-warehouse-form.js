import React from 'react'

// ** MUI
// import { DatePicker } from '@mui/lab'
import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'

// ** Custom Components
import DatePicker from 'react-datepicker'
import { SettingsWrapper } from 'src/styles/pages/settings'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useCommonStyles } from 'src/styles/common'

const autoCompleteStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    cursor: 'pointer !important'
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

  // '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
  //   '&:hover fieldset': {
  //     borderColor: 'rgba(0, 0, 0, 0.23)',
  //     cursor: 'pointer'
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'rgba(0, 0, 0, 0.23)',
  //     cursor: 'pointer'
  //   }
  // }
}

const accounts = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' },
  { name: 'Account 4' },
  { name: 'Account 5' }
]

function AddEditWarehouseForm({ router, formik }) {
  const datepickerStyles = useDatepickerStyles()
  const styles = useCommonStyles()

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Account
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
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Land Coordinates
                </TextLabel>
                <TextInput
                  fullWidth
                  id='landCoordinates'
                  name='landCoordinates'
                  type='text'
                  className={styles.TextField}
                  variant='outlined'
                  placeholder='Enter Land Coordinates'
                  {...formik.getFieldProps('landCoordinates')}
                  error={formik.touched.landCoordinates && Boolean(formik.errors.landCoordinates)}
                  helperText={formik.touched.landCoordinates && formik.errors.landCoordinates}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Name of Warehouse <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='name'
                  name='name'
                  type='text'
                  variant='outlined'
                  className={styles.TextField}
                  placeholder='Enter Name of Warehouse'
                  {...formik.getFieldProps('name')}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  License Number <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='licenseNumber'
                  name='licenseNumber'
                  type='text'
                  variant='outlined'
                  placeholder='Enter License Number'
                  className={styles.TextField}
                  {...formik.getFieldProps('licenseNumber')}
                  error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
                  helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  City <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='city'
                  name='city'
                  type='text'
                  variant='outlined'
                  placeholder='Enter City'
                  className={styles.TextField}
                  {...formik.getFieldProps('city')}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  License Issue Date <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <DatePickerWrapper>
                  <DatePicker
                    fullWidth
                    id='licenseIssueDate'
                    name='licenseIssueDate'
                    selected={formik.values.licenseIssueDate}
                    onChange={date => formik.setFieldValue('licenseIssueDate', date)}
                    dateFormat='dd/MM/yyyy'
                    className={datepickerStyles.datepicker}
                    placeholderText={new Date().toLocaleDateString()}
                  />
                </DatePickerWrapper>
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Address of Warehouse <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='address'
                  name='address'
                  type='textarea'
                  variant='outlined'
                  rows={4}
                  className={styles.TextField}
                  placeholder='Enter Address of Warehouse'
                  {...formik.getFieldProps('address')}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      color='primary'
                      name='addressFromMap'
                      checked={formik.values.addressFromMap}
                      onChange={e => formik.setFieldValue('addressFromMap', !formik.values.addressFromMap)}
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: '600', color: '#4B5563', textAlign: 'center' }}>
                      Select From Map
                    </Typography>
                  }
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  License Expiry Date <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <DatePickerWrapper>
                  <DatePicker
                    fullWidth
                    id='licenseExpiryDate'
                    name='licenseExpiryDate'
                    selected={formik.values.licenseExpiryDate}
                    onChange={date => formik.setFieldValue('licenseExpiryDate', date)}
                    dateFormat='dd/MM/yyyy'
                    className={datepickerStyles.datepicker}
                    placeholderText={new Date().toLocaleDateString()}
                  />
                </DatePickerWrapper>
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Phone <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='phone'
                  name='phone'
                  type='tel'
                  variant='outlined'
                  placeholder='Enter Phone Number'
                  {...formik.getFieldProps('phone')}
                  className={styles.TextField}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Latitude <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='latitude'
                  name='latitude'
                  type='number'
                  variant='outlined'
                  placeholder='Enter Latitude'
                  {...formik.getFieldProps('latitude')}
                  className={styles.TextField}
                  error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                  helperText={formik.touched.latitude && formik.errors.latitude}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Mobile Number <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='mobileNumber'
                  name='mobileNumber'
                  type='tel'
                  variant='outlined'
                  placeholder='Enter Mobile Number'
                  {...formik.getFieldProps('mobileNumber')}
                  className={styles.TextField}
                  error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                  helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Longitude <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='longitude'
                  name='longitude'
                  type='number'
                  variant='outlined'
                  placeholder='Enter Longitude'
                  {...formik.getFieldProps('longitude')}
                  className={styles.TextField}
                  error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                  helperText={formik.touched.longitude && formik.errors.longitude}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Manager Email Address <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='managerEmailAddress'
                  name='managerEmailAddress'
                  type='email'
                  variant='outlined'
                  placeholder='Manager Email Address'
                  {...formik.getFieldProps('managerEmailAddress')}
                  className={styles.TextField}
                  error={formik.touched.managerEmailAddress && Boolean(formik.errors.managerEmailAddress)}
                  helperText={formik.touched.managerEmailAddress && formik.errors.managerEmailAddress}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Land Area (Sq.mt) <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <TextInput
                  fullWidth
                  id='landArea'
                  name='landArea'
                  type='number'
                  variant='outlined'
                  placeholder='Enter Land Area (Sq.mt)'
                  {...formik.getFieldProps('landArea')}
                  className={styles.TextField}
                  error={formik.touched.landArea && Boolean(formik.errors.landArea)}
                  helperText={formik.touched.landArea && formik.errors.landArea}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditWarehouseForm
