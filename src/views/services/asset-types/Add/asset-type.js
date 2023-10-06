import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Button, ListItem, Typography } from '@mui/material'

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
import { PlaceholderText, SelectItem, useCustomStyles } from 'src/styles/pages/services/edit'
import { InputDatePicker, useDatepickerStyles } from 'src/styles/pages/services/edit'
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
import Modal from './modal'
import { useRouter } from 'next/router'

function AssetTypesFrom({ slug, onChangeHandler, customers, formik, data, filteredData }) {
  const router = useRouter()
  const { pathname } = router

  // ** State
  const [open, setOpen] = useState(false)

  // Styles
  const styles = useCommonStyles()

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Form Validation
  const driverSchema = Yup.object().shape({
    account: Yup.string().required('Account is required').max(100, 'The name must not be greater than 100 characters.'),

    name: Yup.string().required('Name is required'),

    last_name: Yup.string().required('Last name is required'),

    username: Yup.string().required('Username is required'),

    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    mobile_no: Yup.string()
      .required('Mobile No. is required')
      .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    email_id: Yup.string().email('Invalid email').required('Email ID is required'),
    photo_id: Yup.mixed().test('fileType', 'Invalid file format', value => {
      if (!value) return false
      const supportedFormats = ['image/png', 'image/jpeg']
      const fileExtension = value?.split('.').pop().toLowerCase()

      return supportedFormats.includes(fileExtension)
    })
  })

  // ** Form Values
  const addDriverformik = useFormik({
    initialValues: {
      account: filteredData?.customer || '',
      name: filteredData?.name || '',
      last_name: filteredData?.last_name || '',
      employeeId: filteredData?.emp_id || '',
      emp_status: filteredData?.emp_status || '',
      nationality: filteredData?.nationality || '',
      sponsor: filteredData?.sponsor || '',
      address: filteredData?.address || '',
      license_type: filteredData?.license_type || '',
      asset_type: filteredData?.asset_type || '',
      username: filteredData?.username || '',
      password: filteredData?.password || '',
      confirm_password: filteredData?.confirm_password || '',
      mobile_no: filteredData?.mobile_no || '',
      email_id: filteredData?.email_id || '',
      dob_format: filteredData?.dob_format || '',
      dob: filteredData?.dob || '',
      track: filteredData?.track || false,
      asset_name: filteredData?.asset_name || '',
      tag_id1: filteredData?.tag_id1 || '',
      tag_id2: filteredData?.tag_id2 || '',
      tag_id3: filteredData?.tag_id3 || '',
      photo_id: filteredData?.photo_id || ''
    },
    validationSchema: driverSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

  // ========= Options =========
  const accountOptions = data?.map(data => {
    return {
      label: data.customer,
      value: data.id
    }
  })

  const assetOptions = data?.map(data => {
    return {
      label: data.asset_name,
      value: data.id
    }
  })

  const allocateOptions = data?.map(data => {
    return {
      label: data.allocation,
      value: data.id
    }
  })

  const driverOptions = data?.map(data => {
    return {
      label: data.driver_name,
      value: data.id
    }
  })

  const employmentOptions = [
    {
      id: 1,
      label: 'Part time'
    },
    {
      id: 2,
      label: 'Full Time'
    }
  ]

  const licenseOptions = [
    {
      id: 1,
      label: 'Permanent'
    },
    {
      id: 2,
      label: 'Temporary'
    }
  ]

  const nationalityOptions = [
    {
      id: 1,
      label: 'Pakistani'
    },
    {
      id: 2,
      label: 'Emirati'
    }
  ]

  const sponsorOptions = [
    {
      id: 1,
      label: 'Sponsor 1'
    },
    {
      id: 2,
      label: 'Sponsor 2'
    }
  ]

  const dobOptions = [
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

  const handleSubmit = () => {
    console.log('form submitted.')
  }

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      // prevent space character from being entered
      event.preventDefault()
    }
  }

  console.log('employmentOptions', employmentOptions)

  return (
    <ServicesWrapper className='services-wrapper'>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Account <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='account'
                  name='account'
                  options={accountOptions || []}
                  onChange={(event, value) => {
                    formik.setFieldValue('account', value?.label)
                  }}
                  value={
                    formik.values.account
                      ? accountOptions
                        ? accountOptions.find(data => data.label === formik.values.account)
                        : ''
                      : ''
                  }
                  sx={{
                    '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.account && formik.errors.account && '#E53E3E !important'
                    },
                    marginTop: 1
                  }}
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
              <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
                Assignment Type
              </Typography>
              <TextField
                name='assignment_type'
                id='outlined-basic'
                variant='outlined'
                className={styles.TextField}
                sx={{ marginTop: 1 }}
                placeholder='Enter Assignment Type'
                error={formik.touched.assignment_type && Boolean(formik.errors.assignment_type)}
                helperText={formik.touched.assignment_type && formik.errors.assignment_type}
                {...formik.getFieldProps('assignment_type')}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Allocate to <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='allocate_to'
                  name='allocate_to'
                  options={allocateOptions || []}
                  onChange={(event, value) => {
                    formik.setFieldValue('allocate_to', value?.label)
                  }}
                  value={
                    formik.values.allocate_to
                      ? allocateOptions
                        ? allocateOptions.find(data => data.label === formik.values.allocate_to)
                        : ''
                      : ''
                  }
                  sx={{
                    '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.allocate_to && formik.errors.allocate_to && '#E53E3E !important'
                    },
                    marginTop: 1
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Allocation'
                      error={formik.touched.allocate_to && Boolean(formik.errors.allocate_to)}
                      helperText={formik.touched.allocate_to && formik.errors.allocate_to}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>Mobile Number(+966)</TextLabel>
                  <TextInput
                    fullWidth
                    id='mobile_no'
                    name='mobile_no'
                    variant='outlined'
                    placeholder='Enter Mobile No.'
                    {...formik.getFieldProps('mobile_no')}
                    className={styles.TextField}
                    error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
                    helperText={formik.touched.mobile_no && formik.errors.mobile_no}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Asset Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='asset_name'
                  name='asset_name'
                  options={assetOptions || []}
                  onChange={(event, value) => {
                    formik.setFieldValue('asset_name', value?.label)
                  }}
                  value={
                    formik.values.asset_name
                      ? assetOptions
                        ? assetOptions.find(data => data.label === formik.values.asset_name)
                        : ''
                      : ''
                  }
                  sx={{
                    '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.asset_name && formik.errors.asset_name && '#E53E3E !important'
                    },
                    marginTop: 1
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Asset Name'
                      error={formik.touched.asset_name && Boolean(formik.errors.asset_name)}
                      helperText={formik.touched.asset_name && formik.errors.asset_name}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>Employee ID</TextLabel>
                  <TextInput
                    fullWidth
                    id='emp_id'
                    name='emp_id'
                    variant='outlined'
                    placeholder='Enter Employee ID'
                    {...formik.getFieldProps('emp_id')}
                    className={styles.TextField}
                    error={formik.touched.emp_id && Boolean(formik.errors.emp_id)}
                    helperText={formik.touched.emp_id && formik.errors.emp_id}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} display='flex' alignItems='center'>
              <Grid item xs={12} md={7}>
                <TextLabel sx={{ marginBottom: '0.25rem' }}>
                  Driver Name <span style={{ color: 'red' }}>*</span>
                </TextLabel>
                <Autocomplete
                  fullWidth
                  id='driver_name'
                  name='driver_name'
                  options={driverOptions || []}
                  onChange={(event, value) => {
                    formik.setFieldValue('driver_name', value?.label)
                  }}
                  value={
                    formik.values.driver_name
                      ? driverOptions
                        ? driverOptions.find(data => data.label === formik.values.driver_name)
                        : ''
                      : ''
                  }
                  sx={{
                    '&.MuiAutocomplete-root .MuiFormControl-root .MuiInputBase-root': { paddingRight: '1rem' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: formik.touched.driver_name && formik.errors.driver_name && '#E53E3E !important'
                    },
                    marginTop: 1
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Driver Name'
                      error={formik.touched.driver_name && Boolean(formik.errors.driver_name)}
                      helperText={formik.touched.driver_name && formik.errors.driver_name}
                    />
                  )}
                  className={styles.AutoCompleteSelect}
                />
              </Grid>

              <Grid item xs={1} mt={6} ml={3}>
                <Button
                  onClick={() => setOpen(true)}
                  marginLeft='auto'
                  sx={{
                    minWidth: '35px',
                    minHeight: '35px',
                    marginLeft: 'auto',
                    padding: '5px',
                    borderRadius: '50%',
                    background: '#2FC17E !important',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon='ic:round-plus' fontSize={28} color='#fff' />
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>Current Odometer</TextLabel>
                  <TextInput
                    fullWidth
                    id='current_odometer'
                    name='current_odometer'
                    variant='outlined'
                    placeholder='Enter Current Odometer'
                    {...formik.getFieldProps('current_odometer')}
                    className={styles.TextField}
                    error={formik.touched.current_odometer && Boolean(formik.errors.current_odometer)}
                    helperText={formik.touched.current_odometer && formik.errors.current_odometer}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>License Number</TextLabel>
                  <TextInput
                    fullWidth
                    id='license_no'
                    name='license_no'
                    variant='outlined'
                    placeholder='Enter License No.'
                    {...formik.getFieldProps('license_no')}
                    className={styles.TextField}
                    error={formik.touched.license_no && Boolean(formik.errors.license_no)}
                    helperText={formik.touched.license_no && formik.errors.license_no}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FieldWrapper>
                  <TextLabel sx={{ marginBottom: '0.25rem' }}>Current Vehicle Condition</TextLabel>
                  <TextInput
                    fullWidth
                    id='vehicle_condition'
                    name='vehicle_condition'
                    variant='outlined'
                    placeholder='Enter Current Vehicle Condition'
                    {...formik.getFieldProps('vehicle_condition')}
                    className={styles.TextField}
                    error={formik.touched.vehicle_condition && Boolean(formik.errors.vehicle_condition)}
                    helperText={formik.touched.vehicle_condition && formik.errors.vehicle_condition}
                    inputProps={{
                      onKeyPress: handleKeyPress // add onKeyPress event handler
                    }}
                  />
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>

      <Modal
        open={open}
        handleClose={() => handleClose()}
        handleSubmit={handleSubmit}
        title={pathname === '/services/[id]' ? 'Edit Driver' : 'Add Driver'}
        vehicles={assetOptions}
        accountOptions={accountOptions}
        employmentOptions={employmentOptions}
        nationalityOptions={nationalityOptions}
        licenseOptions={licenseOptions}
        sponsorOptions={sponsorOptions}
        dobOptions={dobOptions}
        assetOptions={assetOptions}
        formik={addDriverformik}
      />
    </ServicesWrapper>
  )
}

export default AssetTypesFrom

AssetTypesFrom.propTypes = {
  slug: PropTypes.string,
  onChangeHandler: PropTypes.func
}
