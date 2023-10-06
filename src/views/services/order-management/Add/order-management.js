import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Checkbox, FormControlLabel, FormHelperText, ListItem, Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Styles
import { useCommonStyles } from 'src/styles/common'
import { PlaceholderText, Required, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
import { useDatepickerStyles } from 'src/styles/pages/services/edit'
import { FieldHorizontalWrapper } from 'src/styles/components/input'

// ** Google Map
import { TextField } from '@mui/material'
import { ServicesWrapper } from 'src/styles/pages/services'

function OrderManagement({ slug, onChangeHandler, data, formik }) {
  const styles = useCommonStyles()
  const dateStyles = useDatepickerStyles()

  // ** State
  const [open, setOpen] = useState(false)

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  // ========= Options =========

  const accountOptions = data?.map(account => {
    return {
      label: account.customer,
      id: account.id
    }
  })

  const vehicleOptions = data?.map(veh => {
    return {
      label: veh.vehicle_id,
      id: veh.id
    }
  })

  const orderOptions = [
  {
    label: 'Open',
    value: 'open'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  ]


  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={20}>

      <Grid item xs={12} sm={6} md={5}>
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
      
      <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
          Cost<Required>*</Required>
          </Typography>
          <TextField
                name='cost'
                id='cost'
                variant='outlined'
                className={styles.TextField}
                sx={{ marginTop: 1 }}
                error={formik.touched.cost && Boolean(formik.errors.cost)}
                helperText={formik.touched.cost && formik.errors.cost}
                placeholder='Enter Cost'
              {...formik.getFieldProps('cost')}
              ></TextField>     
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
          Work Order Number<Required>*</Required>
          </Typography>
          <TextField
                name='work_order_no'
                id='work_order_no'
                variant='outlined'
                className={styles.TextField}
                sx={{ marginTop: 1 }}
                error={formik.touched.work_order_no && Boolean(formik.errors.work_order_no)}
                helperText={formik.touched.work_order_no && formik.errors.work_order_no}
                placeholder='Enter Work Order No.'
              {...formik.getFieldProps('work_order_no')}
              ></TextField>     
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
          Labor Time (Hours)<Required>*</Required>
          </Typography>
          <TextField
                name='labor_time'
                id='labor_time'
                variant='outlined'
                className={styles.TextField}
                sx={{ marginTop: 1 }}
                error={formik.touched.labor_time && Boolean(formik.errors.labor_time)}
                helperText={formik.touched.labor_time && formik.errors.labor_time}
                placeholder='Enter Labor Time'
              {...formik.getFieldProps('labor_time')}
              ></TextField>     
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
            Vehicle ID<Required>*</Required>
          </Typography>
            <Autocomplete
              fullWidth
              id='vehicle_id'
              name='vehicle_id'
              options={vehicleOptions || []}
              onChange={(event, value) => {
                formik.setFieldValue('vehicle_id', value?.label)
              }}
              value={formik.values.vehicle_id ? (vehicleOptions ? vehicleOptions.find(data => data.label === formik.values.vehicle_id ) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.vehicle_id && formik.errors.vehicle_id && '#E53E3E !important'
              },
              marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Vehicle ID'
                  error={formik.touched.vehicle_id && Boolean(formik.errors.vehicle_id)}
                  helperText={formik.touched.vehicle_id && formik.errors.vehicle_id}
                />
              )}
              className={styles.AutoCompleteSelect}
            />
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
            Order Status<Required>*</Required>
          </Typography>
            <Autocomplete
              fullWidth
              id='order_status'
              name='order_status'
              options={orderOptions || []}
              onChange={(event, value) => {
                formik.setFieldValue('order_status', value?.label)
              }}
              value={formik.values.order_status ? (orderOptions ? orderOptions.find(data => data.label === formik.values.order_status ) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.order_status && formik.errors.order_status && '#E53E3E !important'
              },
              marginTop: 1 }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Status'
                  error={formik.touched.order_status && Boolean(formik.errors.order_status)}
                  helperText={formik.touched.order_status && formik.errors.order_status}
                />
              )}
              className={styles.AutoCompleteSelect}
            />
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
          Type of Service<Required>*</Required>
          </Typography>
          <TextField
                name='service_type'
                id='service_type'
                variant='outlined'
                className={styles.TextField}
                sx={{ marginTop: 1 }}
                error={formik.touched.service_type && Boolean(formik.errors.service_type)}
                helperText={formik.touched.service_type && formik.errors.service_type}
                placeholder='Enter type of service'
              {...formik.getFieldProps('service_type')}
              ></TextField>     
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Date In<Required>*</Required>
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.date_in && formik.errors.date_in && '#E53E3E !important' }
              }}
              >
                    <DatePicker
                      selected={formik.values.date_in}
           
                      id='service-type'
                      className={dateStyles.datepicker}
                      onChange={date => formik.setFieldValue('date_in', date)}
                      dateFormat='yyyy-MM-dd'
                      placeholderText="Enter Date In"
                    />
                    {/* show error  */}
                    {formik.touched.date_in &&
                      Boolean(formik.errors.date_in) && (
                        <FormHelperText error sx={{ padding: '3px 1rem'}}>{formik.errors.date_in}</FormHelperText>
                      )}
                </DatePickerWrapper>
            </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
          Technician Name<Required>*</Required>
          </Typography>
          <TextField
                name='technician_name'
                id='technician_name'
                variant='outlined'
                className={styles.TextField}
                sx={{ marginTop: 1 }}
                error={formik.touched.technician_name && Boolean(formik.errors.technician_name)}
                helperText={formik.touched.technician_name && formik.errors.technician_name}
                placeholder='Enter Technician Name'
              {...formik.getFieldProps('technician_name')}
              ></TextField>     
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Date Out<Required>*</Required>
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.date_out && formik.errors.date_out && '#E53E3E !important' }
              }}
              >
                    <DatePicker
                      selected={formik.values.date_out}
           
                      id='date_out'
                      className={dateStyles.datepicker}
                      onChange={date => formik.setFieldValue('date_out', date)}
                      dateFormat='yyyy-MM-dd'
                      placeholderText="Enter Date Out"
                    />
                    {/* show error  */}
                    {formik.touched.date_out &&
                      Boolean(formik.errors.date_out) && (
                        <FormHelperText error sx={{ padding: '3px 1rem'}}>{formik.errors.date_out}</FormHelperText>
                      )}
                </DatePickerWrapper>
            </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
          Location<Required>*</Required>
          </Typography>
          <TextField
                name='location'
                id='location'
                variant='outlined'
                className={styles.TextField}
                sx={{ marginTop: 1 }}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
                placeholder='Enter Location'
              {...formik.getFieldProps('location')}
              ></TextField>     
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
          Solution<Required>*</Required>
          </Typography>
          <TextField
                name='solution'
                id='solution'
                variant='outlined'
                className={styles.TextArea}
                multiline
                rows={4}
                sx={{ marginTop: 1 }}
                error={formik.touched.solution && Boolean(formik.errors.solution)}
                helperText={formik.touched.solution && formik.errors.solution}
                placeholder='Enter Solution'
              {...formik.getFieldProps('solution')}
              ></TextField>     
        </Grid>
      </Grid>
    </ServicesWrapper>
  )
}

export default OrderManagement

OrderManagement.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
