import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormHelperText, ListItem, TextareaAutosize, Typography } from '@mui/material'

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
import { useCommonStyles } from 'src/styles/common'
import { Required } from 'src/styles/pages/services/edit'
import { useDatepickerStyles } from 'src/styles/components/datepicker'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Icon } from '@iconify/react'

// ** Google Map
import { Marker } from '@react-google-maps/api'
import { TextField } from '@mui/material'
import { ServicesWrapper } from 'src/styles/pages/services'
import { PlaceholderText } from 'src/styles/common'

function FineManagement({ slug, customers, formik }) {
  const styles = useCommonStyles()
  const dateStyles = useDatepickerStyles()


  // ** State
  const [open, setOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [location, setLocation] = useState({})


  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ========= Options =========

  const accountOptions = customers?.map(data => {
    return {
      label: data.customer,
      value: data.id,
    }
  })

  const statusOptions = customers?.map(data => {
    return {
      label: data.status,
      value: data.status,
    }
  })

  const driverOptions = []

  const vehicleOptions = customers?.map(data => {
    return {
      label: data.vehicle_id,
      value: data.vehicle_id,
    }
  })

  const timeOptions = [
    {
      label : '10 am',
      value: '10am'
    },
    {
      label : '11 am',
      value: '11am'
    },

  ]

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={20} alignItems="flex-start">

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Fine Number<Required>*</Required>
              </Typography>
              <TextField
                name='fine_no'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
               {...formik.getFieldProps('fine_no')}
              error={formik.touched.fine_no && Boolean(formik.errors.fine_no)}
              helperText={formik.touched.fine_no && formik.errors.fine_no}
              placeholder='Enter Fine No.'
              sx={{ marginTop: 1 }}
              ></TextField>

            <Grid item xs={12} mt={4}>
              <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
                Account<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='account'
              name='account'
              options={accountOptions || []}
              onChange={(event, value) => {
                formik.setFieldValue('account', value?.label)
              }}
              value={formik.values.account ? (accountOptions ? accountOptions.find(data => data.label === formik.values.account ) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
              },
              marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Account'
                  error={formik.touched.account && Boolean(formik.errors.account)}
                  helperText={formik.touched.account && formik.errors.account}
                />
              )}
              className={styles.AutoCompleteSelect}
            />
              </Grid>

          </Grid>  


          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Fine Description<Required>*</Required>
              </Typography>
              <TextField
                name='fine_desc'
                id='outlined-basic'
                variant='outlined'
                rows={4}
                className={styles.TextArea}
                multiline
                sx={{ marginTop: 1 }}
                error={formik.touched.fine_desc && Boolean(formik.errors.fine_desc)}
                helperText={formik.touched.fine_desc && formik.errors.fine_desc}
                placeholder='Enter Fine Description'
              {...formik.getFieldProps('fine_desc')}

              ></TextField>          
              </Grid>



            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Fine Cost/Amount<Required>*</Required>
              </Typography>
              <TextField
                name='amount'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                placeholder='Add Amount'
                {...formik.getFieldProps('amount')}
                sx={{ marginTop: 1 }}
              ></TextField>
          </Grid>   


            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Assigned Driver<Required>*</Required>
              </Typography>
              <Box display="flex" alignItems="flex-start">
              <Autocomplete
              fullWidth
              id='driver'
              name='driver'
              options={driverOptions || []}
              value={formik.values.driver ? (driverOptions ? driverOptions.find(data => data.value === formik.values.driver) : '') : ''}
              sx={{ "& .MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: formik.touched.driver && formik.errors.driver && '#E53E3E !important'
                },
                marginTop: 1
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Driver'
                  error={formik.touched.driver && Boolean(formik.errors.driver)}
                  helperText={formik.touched.driver && formik.errors.driver}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('driver', newValue?.value)
              }}

              className={styles.AutoCompleteSelect}
            />
             </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Fine Status<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='status'
              name='status'
              options={statusOptions || []}
              value={formik.values.status ? (statusOptions ? statusOptions.find(data => data.label === formik.values.status) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.status && formik.errors.status && '#E53E3E !important'
              },
              marginTop: 1  }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Status'
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('status', newValue?.label)
              }}

              className={styles.AutoCompleteSelect}
            />
            </Grid>     

            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Vehicle ID<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='vehicle_id'
              name='vehicle_id'
              options={vehicleOptions || []}
              value={formik.values.vehicle_id ? (vehicleOptions ? vehicleOptions.find(data => data.value === formik.values.vehicle_id) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.vehicle_id && formik.errors.vehicle_id && '#E53E3E !important'
              },
              marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Asset'
                  error={formik.touched.vehicle_id && Boolean(formik.errors.vehicle_id)}
                  helperText={formik.touched.vehicle_id && formik.errors.vehicle_id}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('vehicle_id', newValue?.value)
              }}
              className={styles.AutoCompleteSelect}
            />
          </Grid>   

          <Grid item xs={12} sm={6} md={5}  visibility={{ md: 'hidden'}}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Extra Works Done
              </Typography>
              <TextField
                name='mobile_no'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
              {...formik.getFieldProps('work_done')}
              error={formik.touched.work_done && Boolean(formik.errors.work_done)}
              helperText={formik.touched.work_done && formik.errors.work_done}
              sx={{ marginTop: 1 }}
              ></TextField>
          </Grid>          

          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Fine Date<Required>*</Required>
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.fine_date && formik.errors.fine_date && '#E53E3E !important' }
              }}
              >
              <DatePicker
                selected={formik.values.fine_date || null}
                id='service-type'
                className={dateStyles.datepicker}
                onChange={date => formik.setFieldValue('fine_date', date)}
                dateFormat='yyyy-MM-dd'
                placeholderText="Select Date"
              />
              {/* show error  */}
              {formik.touched.fine_date &&
                Boolean(formik.errors.fine_date) && (
                  <FormHelperText error>{formik.errors.fine_date}</FormHelperText>
                )}
                </DatePickerWrapper>
            </Grid>

              

          <Grid item xs={12} sm={6} md={5} visibility={{ md: 'hidden'}}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Total Amount
              </Typography>
              <TextField
                name='total_amount'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
                error={formik.touched.total_amount && Boolean(formik.errors.total_amount)}
                helperText={formik.touched.total_amount && formik.errors.total_amount}
              {...formik.getFieldProps('total_amount')}
              sx={{ marginTop: 1 }}
              ></TextField>
           </Grid>      

          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
              Fine Time<Required>*</Required>
            </Typography>
            <Select
              variant='outlined'
              displayEmpty
              value={formik.values.fine_time ? timeOptions.find(time => time.value == formik.values.fine_time).value : ""}
              name='fine_time'
              onChange={(event) => formik.setFieldValue("fine_time", event.target.value)}
              className={styles.Select}
              error={formik.touched.fine_time && Boolean(formik.errors.fine_time)}
            >
              <MenuItem value=''>
                    <PlaceholderText>Select Time</PlaceholderText>
              </MenuItem>
              {timeOptions?.map((data, index) => (
                  <MenuItem key={index} value={data.value}>
                    {data.label}
                  </MenuItem>
                )
              )}
            </Select>
            {formik.touched.fine_time && Boolean(formik.errors.fine_time) && (
                      <FormHelperText sx={{ color: '#E53E3E', margin: '3px 14px 0 14px' }}>
                        {formik.touched.fine_time && formik.errors.fine_time}
             </FormHelperText>
                    )}
           </Grid>      
          </Grid>         
    </ServicesWrapper>

  )
}

export default FineManagement

FineManagement.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
