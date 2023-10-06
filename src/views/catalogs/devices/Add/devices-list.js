import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'
import { Autocomplete, Typography } from '@mui/material'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'

import { TextField } from '@mui/material'
import { ServicesWrapper } from 'src/styles/pages/services'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getAllDevicesMakeAction } from 'src/store/catalogs/device-make/devicesMakeAction'
import { getAllDevicesModelAction } from 'src/store/catalogs/device-model/devicesModelAction'
import { FieldWrapper, TextLabel } from 'src/styles/components/input'

function DevicesList({ formik }) {
  // ** Custem Styles
  const common = useCustomStyles()

  // ** Router
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Selectors
  const devicesMake = useSelector(state => state.devicesMake?.getAllDevicesMakeList?.data)
  const devicesModel = useSelector(state => state.devicesModel?.getAllDevicesModelList?.data)

  // ** List
  const devicesMakeList = devicesMake?.map(device => {
    return {
      value: device.id,
      label: device.name
    }
  })

  const devicesModelList = devicesModel?.map(device => {
    return {
      value: device.id,
      label: device.name
    }
  })

  // ** Fetch Data for Device Make
  useEffect(() => {
    dispatch(
      getAllDevicesMakeAction({
        page: 1,
        limit: 'all'
      })
    )

    // ** Clear the device make input
    if (!!formik.values.device_make_id) return formik.setFieldValue('device_make_id', null)
  }, [router])

  // ** Fetch Data for Device Model
  useEffect(() => {
    dispatch(
      getAllDevicesModelAction({
        page: 1,
        limit: 'all'
      })
    )

    // ** Clear the device make input
    if (!!formik.values.device_model_id) return formik.setFieldValue('device_model_id', null)
  }, [router])

  // ** prevent space form being enter
  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      event.preventDefault()
    }
  }

  return (
    <ServicesWrapper className='services-wrapper'>
      <Grid container rowSpacing={4} columnSpacing={20} alignItems='flex-end'>
        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500' }} mb={2}>
            IMEI Number<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            name='imei'
            type='number'
            id='outlined-basic'
            variant='outlined'
            className={common.TextField}
            sx={{ marginTop: 1 }}
            error={formik.touched.imei && Boolean(formik.errors.imei)}
            helperText={formik.touched.imei && formik.errors.imei}
            placeholder='Enter IMEI Number'
            {...formik.getFieldProps('imei')}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Typography variant='body' sx={{ fontWeight: '500' }} mb={2}>
            Serial Number <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            name='serial_number'
            type='number'
            id='outlined-basic'
            variant='outlined'
            className={common.TextField}
            sx={{ marginTop: 1 }}
            error={formik.touched.serial_number && Boolean(formik.errors.serial_number)}
            helperText={formik.touched.serial_number && formik.errors.serial_number}
            placeholder='Enter Serial Number'
            {...formik.getFieldProps('serial_number')}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Grid>
            <FieldWrapper>
              <TextLabel id='device-make' sx={{ marginBottom: '0.25rem' }}>
                Device Make <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <Autocomplete
                fullWidth
                id='device_make_id'
                name='device_make_id'
                options={devicesMakeList}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('device_make_id', value?.value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.device_make_id && formik.errors.device_make_id && '#E53E3E !important'
                  }
                }}
                value={devicesMakeList?.find(customer => customer.value === parseInt(formik.values.device_make_id))}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Asset Type'
                    error={formik.touched.device_make_id && Boolean(formik.errors.device_make_id)}
                    helperText={formik.touched.device_make_id && formik.errors.device_make_id}
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

        <Grid item xs={12} sm={6} md={5} padding={0}>
          <Grid item>
            <FieldWrapper>
              <TextLabel id='device-model' sx={{ marginBottom: '0.25rem' }}>
                Device Model <span style={{ color: 'red' }}>*</span>
              </TextLabel>
              <Autocomplete
                fullWidth
                id='device_model_id'
                name='device_model_id'
                options={devicesModelList}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                getOptionLabel={option => option.label}
                onChange={(e, value) => {
                  formik.setFieldValue('device_model_id', value?.value)
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: formik.touched.device_model_id && formik.errors.device_model_id && '#E53E3E !important'
                  }
                }}
                value={devicesModelList?.find(customer => customer.value === parseInt(formik.values.device_model_id))}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    placeholder='Select Asset Type'
                    error={formik.touched.device_model_id && Boolean(formik.errors.device_model_id)}
                    helperText={formik.touched.device_model_id && formik.errors.device_model_id}
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
        {/*
          <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ fontWeight: '500'}} mb={2}>
                Model<Required>*</Required>
              </Typography>
              <Autocomplete
              fullWidth
              id='model'
              name='model'
              options={modelOptions || []}
              value={formik.values.model ? (modelOptions ? modelOptions.find(data => data.label === formik.values.model) : '') : ''}
              sx={{ "&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root":{ paddingRight: '1rem'},
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: formik.touched.model && formik.errors.model && '#E53E3E !important'
              },
              marginTop: 1  }}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Enter Model No.'
                  error={formik.touched.model && Boolean(formik.errors.model)}
                  helperText={formik.touched.model && formik.errors.model}
                />
              )}
              onChange={(event, newValue) => {
                formik.setFieldValue('model', newValue?.label)
              }}

              className={styles.AutoCompleteSelect}
            />
          </Grid> */}

        {/* <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Shipment Received Date<Required>*</Required>
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.shipment_date && formik.errors.shipment_date && '#E53E3E !important' }
              }}
              >
                    <DatePicker
                      selected={formik.values.shipment_date || ""}
                      id='service-type'
                      className={dateStyles.datepicker}
                      onChange={date => formik.setFieldValue('shipment_date', date)}
                      dateFormat='yyyy-MM-dd'
                      placeholderText= {moment().format('YYYY-MM-DD')}
                    />
                    {formik.touched.shipment_date &&
                      Boolean(formik.errors.shipment_date) && (
                        <FormHelperText error>{formik.errors.shipment_date}</FormHelperText>
                      )}
                </DatePickerWrapper>
            </Grid> */}

        {/* <Grid item xs={12} sm={6} md={5}>
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500'}}>
                Warranty Validity Date<Required>*</Required>
              </Typography>
              <DatePickerWrapper
              sx={{
              '& input': { borderColor: formik.touched.warranty_date && formik.errors.warranty_date && '#E53E3E !important' }
              }}
              >
                    <DatePicker
                      selected={formik.values.warranty_date || ''}
                      className={dateStyles.datepicker}
                      onChange={date => formik.setFieldValue('warranty_date', date)}
                      dateFormat='yyyy-MM-dd'
                      placeholderText= {moment().format('YYYY-MM-DD')}
                    />
                    {formik.touched.warranty_date &&
                      Boolean(formik.errors.warranty_date) && (
                        <FormHelperText error>{formik.errors.warranty_date}</FormHelperText>
                      )}
                </DatePickerWrapper>
              </Grid> */}
      </Grid>
    </ServicesWrapper>
  )
}

export default DevicesList

DevicesList.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
