import React from 'react'

// ** MUI
import { Autocomplete, Grid, TextField } from '@mui/material'

// ** Third Party Packages
import moment from 'moment'
import DatePicker from 'react-datepicker'

// ** Custom Components
import { SettingsWrapper } from 'src/styles/pages/settings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { FieldWrapper, TextInput, TextLabel } from 'src/styles/components/input'
import { useDatepickerStyles } from 'src/styles/components/datepicker'
import { useCustomStyles } from 'src/styles/pages/catalogs'

const accounts = [
  { name: 'Account 1' },
  { name: 'Account 2' },
  { name: 'Account 3' },
  { name: 'Account 4' },
  { name: 'Account 5' }
]

const assets = [{ name: 'Asset 1' }, { name: 'Asset 2' }, { name: 'Asset 3' }, { name: 'Asset 4' }, { name: 'Asset 5' }]

function AddEditLiveLocationForm({ router, formik }) {
  const datepickerStyles = useDatepickerStyles()
  const customStyles = useCustomStyles()

  console.log('formik values : ', formik.values)
  console.log('formik errors : ', formik.errors)

  return (
    <SettingsWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Account <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='account'
                  name='account'
                  options={accounts}
                  className={customStyles.AutoCompleteSelect}
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
              <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                Start Date
              </TextLabel>
              <DatePickerWrapper>
                <DatePicker
                  fullWidth
                  id='start-date'
                  name='start-date'
                  selected={formik.values.startDate}
                  onChange={date => formik.setFieldValue('startDate', date)}
                  dateFormat='dd/MM/yyyy'
                  className={datepickerStyles.datepicker}
                  placeholderText='Select start date'
                />
              </DatePickerWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Asset<span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  id='asset'
                  name='asset'
                  options={accounts}
                  className={customStyles.AutoCompleteSelect}
                  getOptionLabel={option => option.name}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('asset', newValue.name)
                  }}
                  value={assets.find(asset => assets.name === formik.values.asset)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select asset'
                      error={formik.touched.asset && Boolean(formik.errors.asset)}
                      helperText={formik.touched.asset && formik.errors.asset}
                    />
                  )}
                />
              </FieldWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                End Date
              </TextLabel>
              <DatePickerWrapper>
                <DatePicker
                  fullWidth
                  id='start-date'
                  name='start-date'
                  selected={formik.values.endDate}
                  onChange={date => formik.setFieldValue('endDate', date)}
                  dateFormat='dd/MM/yyyy'
                  className={datepickerStyles.datepicker}
                  placeholderText='Select start date'
                />
              </DatePickerWrapper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={8}>
              <FieldWrapper>
                <TextLabel id='live-location-name' className='header-label' sx={{ marginBottom: '0.25rem' }}>
                  Link
                </TextLabel>
                <TextInput
                  fullWidth
                  id='link'
                  name='link'
                  type='text'
                  placeholder='Enter link'
                  className={customStyles.TextField}
                  {...formik.getFieldProps('link')}
                  error={formik.touched.link && Boolean(formik.errors.link)}
                  helperText={formik.touched.link && formik.errors.link}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditLiveLocationForm
