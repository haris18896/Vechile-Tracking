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
import { handleKeyPress, isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ReportsWrapper } from 'src/styles/pages/reports'
import { ServicesWrapper, ServiceWrapper } from 'src/styles/pages/services'

function FuelDetailForm({ slug, onChangeHandler, customers, formik, data }) {
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
                <Grid item xs={12} mb={2}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Petrol
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id='petrol'
                    name='petrol'
                    type='text'
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        padding: '0.35rem 1.5rem'
                      }
                    }}
                    className={styles.TextField}
                    placeholder='Enter Petrol'
                    value={formik?.values?.petrol}
                    onChange={e =>  formik.setFieldValue('petrol', e.target.value)}
                    error={formik.touched.petrol && Boolean(formik.errors.petrol)}
                    helperText={formik.touched.petrol && formik.errors.petrol}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
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
                <Grid item xs={12} mb={2}>
                  <Typography variant='body' sx={{ fontWeight: '500', textAlign: 'center' }}>
                    Diesel
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='diesel'
                    id='outlined-basic'
                    variant='outlined'
                    value={formik?.values?.diesel}
                    onChange={e =>  formik.setFieldValue('diesel', e.target.value)}
                    className={styles.TextField}
                    {...formik.getFieldProps('diesel')}
                    placeholder='Enter Diesel'
                    error={( formik.touched.diesel && Boolean(formik.errors.diesel))}
                    helperText={( formik.touched.diesel && formik.errors.diesel)}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} mb={2}>
                  <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '500', textAlign: 'center' }}>
                    Date<Required>*</Required>
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
                  selected={formik.values?.date || new Date()}
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

          </Grid>
        </Grid>
      </Grid>
    </Box>
  </ServicesWrapper>
  )
}

export default FuelDetailForm

FuelDetailForm.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
