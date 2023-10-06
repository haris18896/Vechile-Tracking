import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormHelperText, ListItem, Typography } from '@mui/material'

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
import { ServicesWrapper } from 'src/styles/pages/services'

function TaskManagement({ slug, onChangeHandler, customers, formik }) {
  const styles = useCommonStyles()
  const dateStyles = useDatepickerStyles()

  // ========= Options =========

  const assetOptions = [
    { label: 'Select', value: '' },
    { label: 'Asset1', value: 'asset-11' },
    { label: 'Asset2', value: 'asset-12' }
  ]

  const searchOptions = []

  const jobOptions = [
    { label: 'Pickup', value: 'pickup' },
    { label: 'Dropoff', value: 'dropoff' },
  ]

  const accountOptions = customers?.map(customer => {
    return {
      label: customer.company_name,
      value: customer.id,
    }
  })

  const allocateOptions = []

  const driverOptions = []

  const serviceOptions = []

  const assignOptions = [
    {
    label : 'Driver',
    value: 'driver'
    },
]

const timeOptions = [
  { label: '10 am', value: '10am' },
  { label: '12 pm', value: '12pm' },
  { label: '5 pm', value: '5pm' },
];

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={20} alignItems="flex-end" >
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
                formik.setFieldValue('account', value?.value)
              }}
              value={formik.values.account ? (accountOptions ? accountOptions.find(data => data.value === parseInt(formik.values.account) ) : '') : ''}
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
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Invoice No.
          </Typography>
          <TextField
            name='garage_address'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.garage_address && Boolean(formik.errors.garage_address)}
            helperText={formik.touched.garage_address && formik.errors.garage_address}
            placeholder='Enter Invoice No.'
          {...formik.getFieldProps('garage_address')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>


      <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Assign Job<Required>*</Required>
          </Typography>
          <Autocomplete
          fullWidth
          id='assign_job'
          name='assign_job'
          options={assignOptions || []}
          value={formik.values.assign_job ? (assignOptions ? assignOptions.find(data => data.value === formik.values.assign_job) : '') : ''}
          sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: formik.touched.assign_job && formik.errors.assign_job && '#E53E3E !important'
          },

          marginTop: 1  }}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              placeholder='Please Select'
              error={formik.touched.assign_job && Boolean(formik.errors.assign_job)}
              helperText={formik.touched.assign_job && formik.errors.assign_job}
            />
          )}
          onChange={(event, newValue) => {
            formik.setFieldValue('assign_job', newValue?.value)
          }}

          className={styles.AutoCompleteSelect}
        />
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <TextLabel  sx={{ marginBottom: '0.25rem' }}>
            Upload Invoice
          </TextLabel>

          <Grid item sx={{ display: 'flex', gap: '10px'}} alignItems="center">
          <Button
          variant="contained"
          component="label"
          sx={{ background: '#FF8B00', borderRadius:'50px', flex: 0.3, boxShadow: 'none',
              "&.MuiButtonBase-root:hover":{
                backgroundColor: '#e57d00'
              }
        }}
        >
          Browse
          <input
            type="file"
            name="file"
            {...formik.getFieldProps('file')}
            error={formik.touched.file && Boolean(formik.errors.file)}
            helperText={formik.touched.file && formik.errors.file}
            hidden
          />
        </Button>

          <TextField
            fullWidth
            max={10}
            id='file'
            name='file'
            type='text'
            variant='outlined'
            placeholder=''
            className={styles.TextField}
            sx={{ flex: 1,           
              '& .MuiOutlinedInput-notchedOutline':{
              border: 'none'
            }, }}
            InputProps={{
              readOnly: true,
            }}

            {...formik.getFieldProps('file')}
            error={formik.touched.file && Boolean(formik.errors.file)}
            helperText={formik.touched.file && formik.errors.file}
          />
        </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Job<Required>*</Required>
          </Typography>
          <Autocomplete
          fullWidth
          id='job'
          name='job'
          options={jobOptions || []}
          value={formik.values.job ? (jobOptions ? jobOptions.find(data => data.value === formik.values.job) : '') : ''}
          sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: formik.touched.job && formik.errors.job && '#E53E3E !important'
          },

          marginTop: 1  }}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              placeholder='Please Select Job Type'
              error={formik.touched.job && Boolean(formik.errors.job)}
              helperText={formik.touched.job && formik.errors.job}
            />
          )}
          onChange={(event, newValue) => {
            formik.setFieldValue('job', newValue?.value)
          }}

          className={styles.AutoCompleteSelect}
        />
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Invoice Amount
          </Typography>
          <TextField
            name='invoice_amount'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.invoice_amount && Boolean(formik.errors.invoice_amount)}
            helperText={formik.touched.invoice_amount && formik.errors.invoice_amount}
            placeholder='Enter Invoice Amount'
          {...formik.getFieldProps('invoice_amount')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>


          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Asset Name<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='asset_name'
              name='asset_name'
              options={allocateOptions || []}
              value={formik.values.asset_name ? (assetOptions ? assetOptions.find(data => data.value === formik.values.asset_name) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
              },
              marginTop: 1  }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Asset'
                  error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                  helperText={formik.touched.asset_name && formik.errors.asset_name}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('asset_name', newValue?.value)
              }}

              className={styles.AutoCompleteSelect}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Material Description
          </Typography>
          <TextField
            name='material_desc'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.material_desc && Boolean(formik.errors.material_desc)}
            helperText={formik.touched.material_desc && formik.errors.material_desc}
            placeholder='Enter Material Description'
          {...formik.getFieldProps('material_desc')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Mobile Number
          </Typography>
          <TextField
            name='mobile_no'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
            helperText={formik.touched.mobile_no && formik.errors.mobile_no}
            placeholder='Enter Mobile No.'
          {...formik.getFieldProps('mobile_no')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>


          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Quantity
          </Typography>
          <TextField
            name='quantity'
            type='number'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            placeholder='Enter Quantity'
          {...formik.getFieldProps('quantity')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
            Customer Name
          </Typography>
          <TextField
            name='customer'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.customer && Boolean(formik.errors.customer)}
            helperText={formik.touched.customer && formik.errors.customer}
            placeholder='Enter Customer Name'
          {...formik.getFieldProps('customer')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>


            <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Delivery Date
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.delivery_date && formik.errors.delivery_date && '#E53E3E !important' }
              }}
              >
                    <DatePicker
                      selected={formik.values.delivery_date}
           
                      id='service-type'
                      className={dateStyles.datepicker}
                      onChange={date => formik.setFieldValue('delivery_date', date)}
                      dateFormat='yyyy-MM-dd'
                      placeholderText={moment().format('DD-MM-YYYY')}
                    />
                    {/* show error  */}
                    {formik.touched.delivery_date &&
                      Boolean(formik.errors.delivery_date) && (
                        <FormHelperText error>{formik.errors.delivery_date}</FormHelperText>
                      )}
                </DatePickerWrapper>
            </Grid>

          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
           Customer Mobile Number<Required>*</Required>
          </Typography>
          <TextField
            name='customer_mobile'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.customer_mobile && Boolean(formik.errors.customer_mobile)}
            helperText={formik.touched.customer_mobile && formik.errors.customer_mobile}
            placeholder='Enter Customer Mobile No.'
          {...formik.getFieldProps('customer_mobile')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
               Delivery Time<Required>*</Required>
              </Typography>
              <Select
                variant='outlined'
                displayEmpty
                value={formik.values.delivery_time}
                name='delivery_time'
                onChange={(e) => formik.setFieldValue("delivery_time", e.target.value) }
                className={styles.Select}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.delivery_time && formik.errors.delivery_time && '#E53E3E !important'
                  }
                }}

              >
                    <MenuItem value=''>
                      <PlaceholderText>00:00</PlaceholderText>
                    </MenuItem>
                {timeOptions?.map((data, index) =>
                    <MenuItem key={index} value={data.value}>
                      {data.label}
                    </MenuItem>
                )}
              </Select>
              {/* show error  */}
              {formik.touched.delivery_time &&
              Boolean(formik.errors.delivery_time) && (
                <FormHelperText error>{formik.errors.delivery_time}</FormHelperText>
              )}
              </Grid>

          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
           Notification Email
          </Typography>
          <TextField
            name='notification_email'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.notification_email && Boolean(formik.errors.notification_email)}
            helperText={formik.touched.notification_email && formik.errors.notification_email}
            placeholder='Enter Notification Email'
          {...formik.getFieldProps('notification_email')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>    

          <Grid item xs={12} sm={6} md={5}>
            <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
               Halt Time
              </Typography>
              <Select
                variant='outlined'
                displayEmpty
                value={formik.values.halt_time}
                name='halt_time'
                onChange={(e) => formik.setFieldValue("halt_time", e.target.value) }
                className={styles.Select}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.halt_time && formik.errors.halt_time && '#E53E3E !important'
                  }
                }}
              >
                    <MenuItem value=''>
                      <PlaceholderText>00:00</PlaceholderText>
                    </MenuItem>
                {timeOptions?.map((data, index) =>
                    <MenuItem key={index} value={data.value}>
                      {data.label}
                    </MenuItem>
                )}
              </Select>
              {/* show error  */}
              {formik.touched.halt_time &&
              Boolean(formik.errors.halt_time) && (
                <FormHelperText error>{formik.errors.halt_time}</FormHelperText>
              )}
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Search By
              </Typography>
              <Autocomplete
              fullWidth
              id='search_by'
              name='search_by'
              options={searchOptions || []}
              value={formik.values.search_by ? (searchOptions ? searchOptions.find(data => data.value === formik.values.search_by) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.search_by && formik.errors.search_by && '#E53E3E !important'
              },
              marginTop: 1  }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select by Search'
                  error={formik.touched.search_by && Boolean(formik.errors.search_by)}
                  helperText={formik.touched.search_by && formik.errors.search_by}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('search_by', newValue?.value)
              }}
              className={styles.AutoCompleteSelect}
            />
          </Grid>


          <Grid item xs={12} sm={6} md={5} visibility="hidden">
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
           Note to Driver
          </Typography>
          <TextField
            name='driver_note'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.driver_note && Boolean(formik.errors.driver_note)}
            helperText={formik.touched.driver_note && formik.errors.driver_note}
          {...formik.getFieldProps('driver_note')}
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>    

          <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
           Note to Driver
          </Typography>
          <TextField
            name='driver_note'
            id='outlined-basic'
            variant='outlined'
            className={styles.TextField}
            error={formik.touched.driver_note && Boolean(formik.errors.driver_note)}
            helperText={formik.touched.driver_note && formik.errors.driver_note}
          {...formik.getFieldProps('driver_note')}
          placeholder='Enter Note to Driver'
          sx={{ marginTop: 1 }}
          ></TextField>
          </Grid>  
        
          </Grid>        
    </ServicesWrapper>

  )
}

export default TaskManagement

TaskManagement.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
