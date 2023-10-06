import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, FormHelperText, ListItem, Typography } from '@mui/material'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { PlaceholderText, Required, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/components/datepicker'
import { GraphsWrapper } from 'src/styles/pages/graphs'
import { TextInput, TextLabel, FieldWrapper, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { ServicesWrapper, ServiceWrapper } from 'src/styles/pages/services'

function FuelConsumed({ slug, onChangeHandler, customers, formik, data }) {
  const styles = useCommonStyles()
  const datepickerStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})


  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

    // ========= Options =========

  const accountOptions = data?.map((data) => {
    return{
      label: data.customer,
      value: data.id
    }
  })

  const driverOptions = data?.map((data) => {
    return{
      label: data.driver_name,
      value: data.id
    }
  })

  const assetOptions = data?.map((data) => {
    return{
      label: data.asset_name,
      value: data.id
    }
  })
  
  

  return (
    <ServicesWrapper className='services-wrapper'>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={5} pr={{ sm: 16 }}>
          <Grid container rowSpacing={5}>
            <Grid item xs={12}>
              <Grid container>
                <Grid mb={1} xs={12}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Account<Required>*</Required>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Autocomplete
                    fullWidth
                    displayEmpty
                    id='account'
                    name='account'
                    variant='outlined'
                    options={accountOptions || []}
                    getOptionLabel={option => option.label}
                    className={styles.AutoCompleteSelect}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                      }
                    }}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('account', newValue?.label)
                    }}
                    value={accountOptions.find(account => account.label === formik.values.account)}
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
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid mb={1} xs={12}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Asset Name<Required>*</Required>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Autocomplete
                    fullWidth
                    displayEmpty
                    id='asset'
                    name='asset'
                    variant='outlined'
                    options={assetOptions}
                    getOptionLabel={option => option.label}
                    className={styles.AutoCompleteSelect}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.asset && formik.errors.asset && '#E53E3E !important'
                      }
                    }}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('asset', newValue?.label)
                    }}
                    value={assetOptions.find(asset => asset.label === formik.values.asset)}
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
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} mb={2}>
                  <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '500', textAlign: 'center' }}>
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                <DatePickerWrapper
                sx={{
                  '& input': { borderColor: formik.touched.date && Boolean(formik.errors.date) && 'red' }
                }}
              >
                <DatePicker
                  fullWidth
                  id='date'
                  name='date'
                  selected={formik.values.date || new Date()}
                  onChange={date => formik.setFieldValue('date', date)}
                  className={datepickerStyles.datepicker}
                  placeholderText=''
                />
              </DatePickerWrapper>
              {formik.errors.date && (
                <TextField
                  variant='outlined'
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                  sx={{
                    '& .MuiInputBase-root': {
                      display: 'none'
                    }
                  }}
                />
              )}

                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} mb={2}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Time
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id='time'
                    name='time'
                    type='text'
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        padding: '0.35rem 1.5rem'
                      }
                    }}
                    className={styles.TextField}
                    placeholder='Enter Time'
                    value={formik?.values?.time}
                    onChange={e =>  formik.setFieldValue('time', e.target.value)}
                    error={formik.touched.time && Boolean(formik.errors.time)}
                    helperText={formik.touched.time && formik.errors.time}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} sm={5} pl={{ sm: 16 }}>
          <Grid container rowSpacing={5}>

          <Grid item xs={12}>
              <Grid container>
                <Grid mb={1} xs={12}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Driver Name<Required>*</Required>
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Autocomplete
                    fullWidth
                    displayEmpty
                    id='driver'
                    name='driver'
                    variant='outlined'
                    options={driverOptions || []}
                    getOptionLabel={option => option.label}
                    className={styles.AutoCompleteSelect}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.driver && formik.errors.driver && '#E53E3E !important'
                      }
                    }}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('driver', newValue?.label)
                    }}
                    value={driverOptions.find(driver => driver.label === formik.values.driver)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Driver Name'
                        error={formik.touched.driver && Boolean(formik.errors.driver)}
                        helperText={formik.touched.driver && formik.errors.driver}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} mb={2}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Fuel Filled(Liter)
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='fuel_filled'
                    id='outlined-basic'
                    variant='outlined'
                    value={formik?.values?.fuel_filled}
                    onChange={e =>  formik.setFieldValue('fuel_filled', e.target.value)}
                    className={styles.TextField}
                    placeholder="Enter Fuel Filled(Liter)"
                    {...formik.getFieldProps('fuel_filled')}
                    error={( formik.touched.fuel_filled && Boolean(formik.errors.fuel_filled))}
                    helperText={( formik.touched.fuel_filled && formik.errors.fuel_filled)}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>

            
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} mb={2}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Odometer
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='odometer'
                    id='outlined-basic'
                    variant='outlined'
                    value={formik?.values?.odometer}
                    onChange={e =>  formik.setFieldValue('odometer', e.target.value)}
                    placeholder='Enter Odometer'
                    className={styles.TextField}
                    {...formik.getFieldProps('odometer')}
                    error={( formik.touched.odometer && Boolean(formik.errors.odometer))}
                    helperText={( formik.touched.odometer && formik.errors.odometer)}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </ServicesWrapper>
  )
}

export default FuelConsumed

FuelConsumed.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
