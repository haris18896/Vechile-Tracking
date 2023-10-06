/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import { MenuItem, Select, TextField } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Custom Components
import Icon from 'src/@core/components/icon'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { PasswordField } from 'src/styles/pages/login/index'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, SelectInput, FieldHorizontalWrapper } from 'src/styles/components/input'
import DatePickerElement from 'src/components/form-element/DatePickerElement'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from 'src/store/catalogs/users/usersActions'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Autocomplete, Box, IconButton, InputAdornment } from '@mui/material'
import { getAllRolesAction } from 'src/store/settings/roles/rolesActions'
import { CatalogsWrapper, useCustomStyles } from 'src/styles/pages/catalogs'
import {
  getAllWASLCustomersAction,
  registerWASLCustomerAction,
  updateWaslCustomerAction
} from 'src/store/settings/customers/customersActions'
import moment from 'moment'

function WaslCustomersHeader(props) {
  const {
    slug,
    onChangeHandler,
    customerId,
    customersList,
    handleClose,
    handleOpen,
    rolesList,
    open,
    ability,
    redirectWasl,
    isUpdate,
    updateData
  } = props

  const dispatch = useDispatch()
  const common = useCustomStyles()

  console.log('customerId', customerId)

  // ** States
  const [showPassword, setShowPassword] = useState(false)

  const { loading, getAllActivities } = useSelector(state => state.activity)
  const activities = getAllActivities?.data

  const activitiesList = activities?.map(activity => {
    return {
      value: activity.id,
      label: activity.name
    }
  })

  const schema = Yup.object().shape({
    manager_name: Yup.string().required('required'),
    manager_email: Yup.string().email('Invalid email format').required('required'),
    manager_phone: Yup.string()
      .matches(/^\d{11}$/, 'Must be 11 digits')
      .required('required'),
    identity_number: Yup.string().matches(/^\d+$/, 'Must be a number').required('required'),
    extension_no: Yup.string().matches(/^\d+$/, 'Must be a number').required('required'),
    commercial_record_no: Yup.string().matches(/^\d+$/, 'Must be a number').required('required'),
    commercial_record_issue_date: Yup.string().required('required'),
    dob: Yup.string().required('required'),
    activity_id: Yup.string().required('required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      manager_name: isUpdate ? updateData?.manager_name : '',
      manager_email: isUpdate ? updateData?.email_address : '',
      manager_phone: isUpdate ? updateData?.manager_phone : '',
      identity_number: isUpdate ? updateData?.identity_number : '',
      extension_no: isUpdate ? updateData?.extension_no : '',
      commercial_record_no: isUpdate ? updateData?.commercial_record_no : '',
      commercial_record_issue_date: isUpdate ? updateData?.commercial_record_issue_date : '',
      dob: isUpdate ? updateData?.dob : '',
      activity_id: isUpdate ? updateData?.activity_id : ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        if (isUpdate) {
          let data = {
            ...values,
            customer_id: 2,
            identity_no: updateData?.identity_number,
            commercial_record_issue_date: moment(values.commercial_record_issue_date).format('YYYY-MM-DD'),
            dob: moment(values.dob).format('YYYY-MM-DD')
          }
          dispatch(
            updateWaslCustomerAction({
              id: updateData?.id,
              data: data,
              callback: () => getListing(resetForm)
            })
          )
        } else {
          const data = new FormData()
          data.append('manager_name', values.manager_name)
          data.append('manager_email', values.manager_email)
          data.append('manager_phone', values.manager_phone)
          data.append('identity_number', values.identity_number)
          data.append('extension_no', values.extension_no)
          data.append('commercial_record_no', values.commercial_record_no)
          data.append('commercial_record_issue_date', moment(values.commercial_record_issue_date).format('YYYY-MM-DD'))
          data.append('dob', moment(values.dob).format('YYYY-MM-DD'))
          data.append('activity_id', values.activity_id)
          data.append('identity_no', values.identity_number)
          dispatch(
            registerWASLCustomerAction({
              data,
              callback: () => getListing(resetForm)
            })
          )
        }
      }
    }
  })

  const getListing = resetForm => {
    dispatch(getAllWASLCustomersAction({ page: 1, limit: 10 }))
    resetForm()
    handleClose()
  }

  useEffect(() => {
    if (formik.values.customer_id) {
      dispatch(getAllRolesAction({ page: 1, limit: 100, customer_id: formik.values.customer_id }))
    }
  }, [formik.values.customer_id])

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      event.preventDefault()
    }
  }

  return (
    <CatalogsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={6} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={9} lg={9} xl={9}>
            <Title>WASL Customers List</Title>
          </Grid>

          {/* {ability.can('create', 'create-user') && ( */}
          <Grid item xs={12} md={3} xl={3}>
            <Grid container columnSpacing={2} rowSpacing={2} flexWrap='wrap'>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 120 }}
                  iconWidth={15}
                  iconHeight={20}
                  color='success'
                  startIcon={'ic:round-arrow-back-ios-new'}
                  onClick={() => redirectWasl(false)}
                >
                  Back
                </ButtonIcon>
              </Grid>
              <Grid item>
                <ButtonIcon
                  sx={{ width: 130 }}
                  color='success'
                  startIcon={'ic:baseline-plus'}
                  onClick={() => handleOpen()}
                >
                  Register
                </ButtonIcon>
              </Grid>
            </Grid>
          </Grid>

          <AddFormDialog
            id='register-Modal'
            title='Register User'
            context='Enter user details to register new user'
            close={() => handleClose()}
            open={open}
            submit={() => formik.handleSubmit()}
            agree={isUpdate ? 'Update' : 'Register'}
            cancel='Cancel'
            bg='#fff'
            zIndex={99999}
          >
            <form name='add-customer' sx={{ backgroundColor: 'white' }} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='manager_name' sx={{ marginBottom: '0.25rem' }}>
                        Manager Name
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='manager_name'
                        name='manager_name'
                        type='manager_name'
                        variant='outlined'
                        placeholder='Enter manager name'
                        {...formik.getFieldProps('manager_name')}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={common.TextField}
                        error={formik.touched.manager_name && Boolean(formik.errors.manager_name)}
                        helperText={formik.touched.manager_name && formik.errors.manager_name}
                      />
                    </FieldWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='manager_email' sx={{ marginBottom: '0.25rem' }}>
                        Manager Email
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='manager_email'
                        name='manager_email'
                        type='manager_email'
                        variant='outlined'
                        placeholder='Enter email'
                        {...formik.getFieldProps('manager_email')}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={common.TextField}
                        error={formik.touched.manager_email && Boolean(formik.errors.manager_email)}
                        helperText={formik.touched.manager_email && formik.errors.manager_email}
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='manager_phone' sx={{ marginBottom: '0.25rem' }}>
                        Manager Phone
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='manager_phone'
                        name='manager_phone'
                        type='manager_phone'
                        variant='outlined'
                        placeholder='Enter manager phone'
                        {...formik.getFieldProps('manager_phone')}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={common.TextField}
                        error={formik.touched.manager_phone && Boolean(formik.errors.manager_phone)}
                        helperText={formik.touched.manager_phone && formik.errors.manager_phone}
                      />
                    </FieldWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='identity_number' sx={{ marginBottom: '0.25rem' }}>
                        Identity Number
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='identity_number'
                        name='identity_number'
                        type='identity_number'
                        variant='outlined'
                        placeholder='Enter number'
                        {...formik.getFieldProps('identity_number')}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={common.TextField}
                        error={formik.touched.identity_number && Boolean(formik.errors.identity_number)}
                        helperText={formik.touched.identity_number && formik.errors.identity_number}
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
                          activitiesList?.find(customer => customer.value === parseInt(formik.values.activity_id)) ||
                          null
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
                        className={common.AutoCompleteSelect}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='commercial_record_no' sx={{ marginBottom: '0.25rem' }}>
                        Commercial Recoed No#
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='commercial_record_no'
                        name='commercial_record_no'
                        type='commercial_record_no'
                        variant='outlined'
                        placeholder='Enter number'
                        {...formik.getFieldProps('commercial_record_no')}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={common.TextField}
                        error={formik.touched.commercial_record_no && Boolean(formik.errors.commercial_record_no)}
                        helperText={formik.touched.commercial_record_no && formik.errors.commercial_record_no}
                      />
                    </FieldWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {' '}
                    {/* Adjust the xs and sm values based on your layout */}
                    <DatePickerElement
                      fullWidth={true}
                      inputName={'commercial_record_issue_date'}
                      // disableFuture={true}
                      format={'DD-MM-YYYY'}
                      // backendError={error?.dob?.[0]}
                      formikValue={formik.values.commercial_record_issue_date}
                      formikError={formik.errors.commercial_record_issue_date}
                      formikTouched={formik.touched.commercial_record_issue_date}
                      label={'Commercial Issue Date'}
                      onChange={newValue => formik.setFieldValue('commercial_record_issue_date', newValue)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='extension_no' sx={{ marginBottom: '0.25rem' }}>
                        Extension Number
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='extension_no'
                        name='extension_no'
                        type='extension_no'
                        variant='outlined'
                        placeholder='Enter number'
                        {...formik.getFieldProps('extension_no')}
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={common.TextField}
                        error={formik.touched.extension_no && Boolean(formik.errors.extension_no)}
                        helperText={formik.touched.extension_no && formik.errors.extension_no}
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </AddFormDialog>
        </Grid>
      </Box>
    </CatalogsWrapper>
  )
}

export default WaslCustomersHeader
