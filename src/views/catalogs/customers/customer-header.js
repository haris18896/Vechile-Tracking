/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

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
import { CatalogsWrapper, useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, SelectInput, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from 'src/store/catalogs/users/usersActions'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Autocomplete, Box, FormHelperText, IconButton, InputAdornment, TextField } from '@mui/material'
import { getAllRolesAction } from 'src/store/settings/roles/rolesActions'
import { useRouter } from 'next/router'
import { PlaceholderText } from 'src/styles/common'

function CustomersHeader(props) {
  const {
    slug,
    onChangeHandler,
    customerId,
    customersList,
    handleClose,
    handleOpen,
    rolesList,
    ability,
    redirectWasl,
    open
  } = props

  const dispatch = useDispatch()
  const common = useCustomStyles()
  const router = useRouter()

  // ** States
  const [showPassword, setShowPassword] = useState(false)

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is a required field'),
    email: Yup.string().email().required('Email is a required field'),
    role: Yup.string().required('Role is a required field'),
    customer_id: Yup.string().required('Customer is a required field'),
    status: Yup.string().required(),
    password: Yup.string()
      .required('Password is a required field!')
      .test(
        'strong-password',
        'Password must contain at least 8 characters, one number and one lowercase letter',
        value => {
          if (!value) {
            return true
          }

          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 0,
            minSymbols: 0
          })
        }
      ),
    c_password: Yup.string()
      .required('Confirm password is a required field!')
      .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
      customer_id: '',
      password: '',
      c_password: '',
      status: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          email: values.email,
          role: values.role,
          customer_id: values.customer_id,
          password: values.password,
          c_password: values.c_password,
          status: values.status
        }

        dispatch(registerUserAction(data))
        handleClose()
        resetForm()
      }
    }
  })

  useEffect(() => {
    if (formik.values.customer_id) {
      dispatch(getAllRolesAction({ page: 1, limit: 100, customer_id: formik.values.customer_id }))
    }
  }, [formik.values.customer_id])

  let customersListOptions = customersList?.map(item => {
    return { id: item.id, label: item.company_name }
  })

  let statusOptions = [
    { id: 1, label: 'All' },
    { id: 2, label: 'tracking' },
    { id: 3, label: 'tracking2' }
  ]

  return (
    <CatalogsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={6} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={2}>
            <Title>Customers List</Title>
          </Grid>

          <Grid item xs={12} md={6} xl={7} display='flex' flexWrap='wrap' marginLeft='auto'>
            <Grid container columnSpacing={3} rowSpacing={2}>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <Autocomplete
                  id='customer_id'
                  name='customer_id'
                  options={
                    customersList
                      ? customersList?.map(item => {
                          return { id: item.id, label: item.company_name }
                        })
                      : []
                  }
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => onChangeHandler('customer_id', value?.id)}
                  value={customersListOptions?.find(customer => customer.id === customerId)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Select Customer'
                      error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                      helperText={formik.touched.customer_id && formik.errors.customer_id}
                    />
                  )}
                  className={common.AutoCompleteSelect}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <TextInput placeholder='Email ID' className={common.TextField} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <TextInput placeholder='Identity Number' className={common.TextField} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <Autocomplete
                  fullWidth
                  id='status'
                  name='status'
                  options={statusOptions}
                  getOptionLabel={option => option.label}
                  onChange={(e, value) => onChangeHandler('status', value?.id)}
                  value={statusOptions.find(option => option.id === formik.values.status)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Status'
                      error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                      helperText={formik.touched.customer_id && formik.errors.customer_id}
                    />
                  )}
                  className={common.AutoCompleteSelect}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* {ability.can('create', 'create-user') && ( */}
          <Grid item xs={12} md={4} xl={3}>
            <Grid container columnSpacing={2} rowSpacing={2} flexWrap='wrap'>
              {/*<Grid item>*/}
              {/*  <ButtonIcon*/}
              {/*    sx={{ width: 120 }}*/}
              {/*    color='success'*/}
              {/*    startIcon={'ic:baseline-plus'}*/}
              {/*    onClick={() => redirectWasl(true)}*/}
              {/*  >*/}
              {/*    Wasl*/}
              {/*  </ButtonIcon>*/}
              {/*</Grid>*/}
              {/*<Grid item>*/}
              {/*  <ButtonIcon*/}
              {/*    sx={{ width: 120 }}*/}
              {/*    color='success'*/}
              {/*    startIcon={'ic:baseline-plus'}*/}
              {/*    onClick={() => handleOpen()}*/}
              {/*  >*/}
              {/*    Assign*/}
              {/*  </ButtonIcon>*/}
              {/*</Grid>*/}
              <Grid item>
                {/*<ButtonIcon*/}
                {/*  sx={{ width: 145 }}*/}
                {/*  color='success'*/}
                {/*  startIcon={'ic:baseline-plus'}*/}
                {/*  onClick={() => handleOpen()}*/}
                {/*>*/}
                {/*  Add User*/}
                {/*</ButtonIcon>*/}
              </Grid>
            </Grid>
          </Grid>
          {/* )} */}
          <AddFormDialog
            id='register-Modal'
            title='Register User'
            context='Enter user details to register new user'
            close={() => handleClose()}
            open={open}
            submit={() => formik.handleSubmit()}
            agree='Register'
            cancel='Cancel'
            bg='#fff'
          >
            <form name='add-user' onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FieldWrapper>
                    <TextLabel id='name' sx={{ marginBottom: '0.25rem' }}>
                      Name
                    </TextLabel>
                    <TextInput
                      fullWidth
                      id='name'
                      name='name'
                      type='text'
                      variant='outlined'
                      placeholder='Enter User Name'
                      {...formik.getFieldProps('name')}
                      className={common.TextField}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={6}>
                  <FieldWrapper>
                    <TextLabel id='email' sx={{ marginBottom: '0.25rem' }}>
                      Email
                    </TextLabel>
                    <TextInput
                      fullWidth
                      id='email'
                      name='email'
                      type='email'
                      variant='outlined'
                      placeholder='Enter User Email'
                      {...formik.getFieldProps('email')}
                      className={common.TextField}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </FieldWrapper>
                </Grid>

                <Grid item xs={6}>
                  <TextLabel id='customer' sx={{ marginBottom: '0.25rem' }}>
                    Customer
                  </TextLabel>
                  <Select
                    fullWidth
                    defaultValue={formik.values.customer_id}
                    placeholder='Select Customer...'
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    {...formik.getFieldProps('customer_id')}
                    className={common.Select}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant='outlined'
                        placeholder='Select Asset'
                        error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                        helperText={formik.touched.customer_id && formik.errors.customer_id}
                      />
                    )}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: formik.touched.customer_id && formik.errors.customer_id && '#E53E3E !important'
                      }
                    }}
                  >
                    {customersList?.map((customer, index) =>
                      index === 0 ? (
                        <MenuItem key={index} value=''>
                          <PlaceholderText>Select Customer</PlaceholderText>
                        </MenuItem>
                      ) : (
                        <MenuItem key={index} value={`${customer.id}`}>
                          {customer.company_name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {formik.touched.customer_id && Boolean(formik.errors.customer_id) && (
                    <FormHelperText sx={{ color: '#E53E3E', margin: '3px 14px 0 14px' }}>
                      {formik.touched.customer_id && formik.errors.customer_id}
                    </FormHelperText>
                  )}

                  {/* <SelectInput
                    fullWidth
                    defaultValue={formik.values.customer_id}
                    {...formik.getFieldProps('customer_id')}
                    placeholder='Select Customer...'
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className={common.AutoCompleteSelect}
                  >
                    {customersList.map((customer, index) => (
                      <MenuItem key={index} value={`${customer.id}`}>
                        {customer.company_name}
                      </MenuItem>
                    ))}
                  </SelectInput> */}
                </Grid>
                <Grid item xs={6}>
                  <FieldWrapper>
                    <TextLabel id='role' sx={{ marginBottom: '0.25rem' }}>
                      Role
                    </TextLabel>
                    <Select
                      fullWidth
                      // disabled={!formik.values.role}
                      defaultValue={formik.values.role}
                      {...formik.getFieldProps('role')}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      className={common.Select}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: formik.touched.role && formik.errors.role && '#E53E3E !important'
                        }
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant='outlined'
                          placeholder='Select Role'
                          error={formik.touched.role && Boolean(formik.errors.role)}
                          helperText={formik.touched.role && formik.errors.role}
                        />
                      )}
                    >
                      {rolesList.map((role, index) =>
                        index === 0 ? (
                          <MenuItem key={index} value=''>
                            <PlaceholderText>Select Role</PlaceholderText>
                          </MenuItem>
                        ) : (
                          <MenuItem key={index} value={role.name}>
                            {role.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    {formik.touched.role && Boolean(formik.errors.role) && (
                      <FormHelperText sx={{ color: '#E53E3E', margin: '3px 14px 0 14px' }}>
                        {formik.touched.role && formik.errors.role}
                      </FormHelperText>
                    )}
                  </FieldWrapper>
                </Grid>

                <Grid item xs={12}>
                  <FieldWrapper>
                    <TextLabel id='password' sx={{ marginBottom: '0.25rem' }}>
                      Password
                    </TextLabel>
                    <TextInput
                      fullWidth
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      variant='outlined'
                      placeholder='*********'
                      {...formik.getFieldProps('password')}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      className={common.TextField}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FieldWrapper>
                </Grid>

                <Grid item xs={12}>
                  <FieldWrapper>
                    <TextLabel id='confirm-password' sx={{ marginBottom: '0.25rem' }}>
                      Confirm Password
                    </TextLabel>
                    <TextInput
                      fullWidth
                      id='c_password'
                      name='c_password'
                      type='password'
                      variant='outlined'
                      placeholder='*********'
                      {...formik.getFieldProps('c_password')}
                      className={common.TextField}
                      error={formik.touched.c_password && Boolean(formik.errors.c_password)}
                      helperText={formik.touched.c_password && formik.errors.c_password}
                    />
                  </FieldWrapper>
                </Grid>
              </Grid>
            </form>
          </AddFormDialog>
        </Grid>
      </Box>
    </CatalogsWrapper>
  )
}

export default CustomersHeader
