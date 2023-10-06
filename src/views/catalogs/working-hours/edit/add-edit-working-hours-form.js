import React from 'react'

// ** MUI
import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material'

// ** Third Party Packages
import moment from 'moment'
import DatePicker from 'react-datepicker'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { FieldHorizontalWrapper, FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { useCommonStyles } from 'src/styles/common'


const accounts = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' },
  { name: 'Account 4' },
  { name: 'Account 5' }
]

const assets = [{ name: 'Asset 1' }, { name: 'Asset 2' }, { name: 'Asset 3' }, { name: 'Asset 4' }, { name: 'Asset 5' }]

function AddEditWorkingHoursForm({ router, formik }) {
  const datepickerStyles = useDatepickerStyles()

  const styles = useCommonStyles()


  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
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
              <TextLabel id='live-location-name' sx={{ marginBottom: '0.25rem' }}>
                Start Time <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <DatePickerWrapper
                sx={{
                  '& input': { borderColor: formik.touched.startTime && Boolean(formik.errors.startTime) && 'red' }
                }}
              >
                <DatePicker
                  fullWidth
                  id='start-time'
                  name='start-time'
                  selected={formik.values.startTime}
                  onChange={date => formik.setFieldValue('startTime', date)}
                  className={datepickerStyles.datepicker}
                  placeholderText='Select start time'
                />
              </DatePickerWrapper>
              {formik.errors.startTime && (
                <TextField
                  variant='outlined'
                  placeholder='Select account'
                  error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                  helperText={formik.touched.startTime && formik.errors.startTime}
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
    </SettingsWrapper>
  )
}

export default AddEditWorkingHoursForm
