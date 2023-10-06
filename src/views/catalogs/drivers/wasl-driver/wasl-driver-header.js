import React, { useState } from 'react'
import PropTypes from 'prop-types'

// ** MUI
import Grid from '@mui/material/Grid'
import { Autocomplete, Box, Typography } from '@mui/material'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import SelectAutoComplete from 'src/components/autocomplete-selector'

import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Utils && hooks
import { isObjEmpty } from 'src/configs/utils'

import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Imports
import * as Yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Styles
import { CatalogsWrapper, IconWrapper, useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { FieldHorizontalWrapper, TextInput, FieldWrapper, TextLabel } from 'src/styles/components/input'
import { MenuItem, Select, TextField } from '@mui/material'
import { PlaceholderText } from 'src/styles/common'
import { Icon } from '@iconify/react'
import DatePickerElement from 'src/components/form-element/DatePickerElement'
import {
  getAllWASLDriversAction,
  registerWASLDriverAction,
  updateWaslDriverAction
} from 'src/store/catalogs/driver/driversActions'
import moment from 'moment'

function WaslDriverHeader(props) {
  const {
    router,
    customers,
    slug,
    onChangeHandler,
    inputValue,
    customerId,
    redirectWasl,
    handleClose,
    handleOpen,
    open,
    ability,
    refresUserList,
    isUpdate,
    updateData
  } = props

  // ** Styles
  const common = useCustomStyles()
  const dispatch = useDispatch()
  const { loading, getAllActivities } = useSelector(state => state.activity)
  const activities = getAllActivities?.data
  const { getAllDriversList } = useSelector(state => state.driver)

  const activitiesList = activities?.map(activity => {
    return {
      value: activity.id,
      label: activity.name
    }
  })

  const driversList = getAllDriversList?.data?.map(driver => {
    return {
      value: driver.id,
      label: driver.first_name
    }
  })

  const registerType = [
    { id: 'customer', name: 'Customer' },
    { id: 'individual', name: 'Individual' }
  ]

  const customersList = customers?.map(customer => {
    return {
      value: customer.id,
      label: customer.company_name,
      slug: customer.slug
    }
  })
  const customStyles = useCustomStyles()
  const [value, setValue] = useState('')

  const selectOptions = [
    { name: 'Select', slug: '' },
    { name: 'Tracking', slug: 'track-11' },
    { name: 'Tracking2', slug: 'track-12' }
  ]

  const dobOptions = [
    { id: 0, label: 'Select DOB Format' },
    {
      id: 1,
      label: 'Hijri'
    },
    {
      id: 2,
      label: 'Georgian'
    },
    {
      id: 3,
      label: 'Chinese'
    },
    {
      id: 4,
      label: 'Hebrew'
    }
  ]

  // ** Formik
  const schema = Yup.object().shape({
    profile_id: Yup.string().required('Driver is required'),
    identity_no: Yup.string().required('Identity ID is required'),
    register_type: Yup.string().required('Type is required'),
    activity_id: Yup.string().required('Activity ID is required'),
    // license_number: Yup.string().required('License number is required'),
    dob_format: Yup.string().required('Format is required'),
    dob: Yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
    mobile_number: Yup.string()
      .required('Number is required')
      .matches(/^\d+$/, 'Mobile number must contain only digits')
      .min(11, 'Mobile number must be at least 11 digits long')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      profile_id: isUpdate ? updateData?.profile_id : '',
      identity_no: isUpdate ? updateData?.identity_no : '',
      dob: isUpdate ? updateData?.dob : '',
      mobile_number: isUpdate ? updateData?.mobile_number : '',
      register_type: isUpdate ? updateData?.register_type : '',
      activity_id: isUpdate ? updateData?.activity_id : '',
      dob_format: isUpdate ? updateData?.dob_format : ''
      // license_number: isUpdate ? updateData?.license_number : ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        if (isUpdate) {
          let data = {
            ...values,
            dob: typeof values.dob == 'object' ? moment(values.dob).format('YYYY-MM-DD') : values.dob
          }
          dispatch(
            updateWaslDriverAction({
              id: updateData?.id,
              data: data,
              callBack: () => {
                resetForm()
                handleClose()
              }
            })
          )
        } else {
          const data = new FormData()
          data.append('profile_id', values.profile_id)
          data.append('identity_no', values.identity_no)
          data.append('dob', moment(values.dob).format('YYYY-MM-DD'))
          data.append('mobile_number', values.mobile_number)
          data.append('register_type', values.register_type)
          data.append('activity_id', values.activity_id)
          data.append('dob_format', values.dob_format)
          // data.append('license_number', values.license_number)

          dispatch(
            registerWASLDriverAction({
              data,
              callback: () => {
                resetForm()
                handleClose()
              }
            })
          )
        }
      }
    }
  })

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      event.preventDefault()
    }
  }

  return (
    <CatalogsWrapper>
      <Grid container spacing={2} xs={{ alignItems: 'center' }}>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'start',
            width: '100%',
            flexWrap: 'wrap'
          }}
        >
          <Grid item md={2}>
            <Title>WASL driver List</Title>
          </Grid>

          <Grid item md={6} display='flex' flexWrap='wrap'>
            <FieldHorizontalWrapper xs={{ display: 'flex' }}>
              <Select
                variant='outlined'
                displayEmpty
                value={value}
                name='trackVal'
                onChange={e => setValue(e.target.value)}
                className={customStyles.Select}
              >
                {selectOptions?.map((data, index) =>
                  index === 0 ? (
                    <MenuItem key={index} value=''>
                      <PlaceholderText>Select Account</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={index} value={data.slug}>
                      {data.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper xs={{ display: 'flex' }}>
              <Select
                variant='outlined'
                displayEmpty
                value={value}
                name='trackVal'
                onChange={e => setValue(e.target.value)}
                className={customStyles.Select}
              >
                {selectOptions?.map((data, index) =>
                  index === 0 ? (
                    <MenuItem key={index} value=''>
                      <PlaceholderText>Asset Name</PlaceholderText>
                    </MenuItem>
                  ) : (
                    <MenuItem key={index} value={data.slug}>
                      {data.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper>
              <TextField
                name='brand'
                id='outlined-basic'
                variant='outlined'
                placeholder='Plate No'
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper>
              <TextField
                name='brand'
                id='outlined-basic'
                variant='outlined'
                placeholder='Sequence Number'
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>

            <FieldHorizontalWrapper>
              <TextField
                name='brand'
                id='outlined-basic'
                variant='outlined'
                placeholder='Search EMEI'
                className={customStyles.TextField}
              ></TextField>
            </FieldHorizontalWrapper>
          </Grid>
          <Grid
            item
            md={4}
            display='flex'
            flexWrap='wrap'
            alignItems='flex-start'
            sx={{
              gap: '10px'
            }}
          >
            {ability.can('create', 'create-asset') && (
              <ButtonIcon
                color='primary-outlined'
                iconHeight={15}
                iconWidth={15}
                sx={{ width: 120 }}
                startIcon={'ic:round-arrow-back-ios-new'}
                onClick={() => redirectWasl(false)}
              >
                Back
              </ButtonIcon>
            )}
            <ButtonIcon sx={{ width: 120 }} color='success' startIcon={'ic:baseline-plus'} onClick={() => handleOpen()}>
              Register
            </ButtonIcon>

            <ButtonIcon
              color='primary-outlined'
              sx={{ width: 120 }}
              startIcon={'material-symbols:arrow-outward-rounded'}
              onClick={() => handleOpen()}
            >
              Export
            </ButtonIcon>
          </Grid>
        </Grid>
      </Grid>
      <AddFormDialog
        id='register-Modal'
        title='Register User'
        context='Enter user details to register new user'
        close={() => {
          handleClose()
          formik.resetForm()
        }}
        open={open}
        submit={() => formik.handleSubmit()}
        agree={isUpdate ? 'Update' : 'Register'}
        cancel='Cancel'
        bg='#fff'
        zIndex={99999}
      >
        <form name='add-user' onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FieldWrapper>
                  <TextLabel id='name' sx={{ marginBottom: '0.25rem' }}>
                    Driver Name
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='driver'
                    name='profile_id'
                    options={driversList || []}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => String(option.label)}
                    onChange={(e, value) => {
                      formik.setFieldValue('profile_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.profile_id && formik.errors.profile_id && '#E53E3E !important'
                      }
                    }}
                    value={driversList?.find(customer => customer.value === parseInt(formik.values.profile_id)) || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select driver'
                        error={formik.touched.profile_id && Boolean(formik.errors.profile_id)}
                        helperText={formik.touched.profile_id && formik.errors.profile_id}
                      />
                    )}
                    className={customStyles.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldWrapper>
                  <TextLabel id='identity_no' sx={{ marginBottom: '0.25rem' }}>
                    Identity Number
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='identity_no'
                    name='identity_no'
                    type='identity_no'
                    variant='outlined'
                    placeholder='Enter identity number'
                    {...formik.getFieldProps('identity_no')}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                    className={common.TextField}
                    error={formik.touched.identity_no && Boolean(formik.errors.identity_no)}
                    helperText={formik.touched.identity_no && formik.errors.identity_no}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {' '}
                {/* Adjust the xs and sm values based on your layout */}
                <DatePickerElement
                  fullWidth={true}
                  inputName={'dob'}
                  disableFuture={true}
                  format={'DD-MM-YYYY'}
                  // backendError={error?.dob?.[0]}
                  formikValue={formik.values.dob}
                  formikError={formik.errors.dob}
                  formikTouched={formik.touched.dob}
                  label={'Date of birth'}
                  onChange={newValue => formik.setFieldValue('dob', newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>DOB Format</TextLabel>
                <Autocomplete
                  id='dob_format'
                  name='dob_format'
                  options={dobOptions || []}
                  className={customStyles.AutoCompleteSelect}
                  getOptionLabel={option => option.label}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('dob_format', newValue.label)
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.dob_format && formik.errors.dob_format && '#E53E3E !important'
                    }
                  }}
                  value={dobOptions?.find(dob => dob.label === formik.values.dob_format) || dobOptions[0]}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select DOB Format'
                      error={formik.touched.dob_format && Boolean(formik.errors.dob_format)}
                      helperText={formik.touched.dob_format && formik.errors.dob_format}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {' '}
                {/* Adjust the xs and sm values based on your layout */}
                <FieldWrapper>
                  <TextLabel id='mobile_number' sx={{ marginBottom: '0.25rem' }}>
                    Mobile Number
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='mobile_number'
                    name='mobile_number'
                    type='mobile_number'
                    variant='outlined'
                    placeholder='Enter identity number'
                    {...formik.getFieldProps('mobile_number')}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                    className={common.TextField}
                    error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
                    helperText={formik.touched.mobile_number && formik.errors.mobile_number}
                  />
                </FieldWrapper>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                {' '}
                <FieldWrapper>
                  <TextLabel id='license_number' sx={{ marginBottom: '0.25rem' }}>
                    License Number
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='license_number'
                    name='license_number'
                    type='license_number'
                    variant='outlined'
                    placeholder='Enter License number'
                    {...formik.getFieldProps('license_number')}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                    className={common.TextField}
                    error={formik.touched.license_number && Boolean(formik.errors.license_number)}
                    helperText={formik.touched.license_number && formik.errors.license_number}
                  />
                </FieldWrapper>
              </Grid> */}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FieldWrapper>
                  <TextLabel id='register_type' sx={{ marginBottom: '0.25rem' }}>
                    Registration type
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='register_type'
                    name='register_type'
                    options={registerType || []}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => String(option.id)}
                    onChange={(e, value) => {
                      formik.setFieldValue('register_type', value?.id.toString()) // Convert to string
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.register_type && formik.errors.register_type && '#E53E3E !important'
                      }
                    }}
                    value={registerType?.find(customer => customer.id === formik.values.register_type) || null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select plate type'
                        error={formik.touched.register_type && Boolean(formik.errors.register_type)}
                        helperText={formik.touched.register_type && formik.errors.register_type}
                      />
                    )}
                    className={customStyles.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldWrapper>
                  <TextLabel id='activity_id' sx={{ marginBottom: '0.25rem' }}>
                    Activity ID
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='activity_id'
                    name='activity_id'
                    options={activitiesList || []}
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={option => String(option.label)}
                    onChange={(e, value) => {
                      formik.setFieldValue('activity_id', value?.value)
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.activity_id && formik.errors.activity_id && '#E53E3E !important'
                      }
                    }}
                    value={
                      activitiesList?.find(customer => customer.value === parseInt(formik.values.activity_id)) || null
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select activity'
                        error={formik.touched.activity_id && Boolean(formik.errors.activity_id)}
                        helperText={formik.touched.activity_id && formik.errors.activity_id}
                      />
                    )}
                    className={customStyles.AutoCompleteSelect}
                    inputProps={{
                      onKeyPress: handleKeyPress
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </AddFormDialog>
    </CatalogsWrapper>
  )
}

export default WaslDriverHeader

WaslDriverHeader.propTypes = {
  slug: PropTypes.object || PropTypes.string,
  customers: PropTypes.array,
  inputValue: PropTypes.string,
  onChangeHandler: PropTypes.func
}
