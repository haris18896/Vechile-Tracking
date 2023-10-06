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
import { useCommonStyles } from 'src/styles/common'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper, SelectInput, FieldHorizontalWrapper } from 'src/styles/components/input'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from 'src/store/catalogs/users/usersActions'

// ** utils
import { isObjEmpty } from 'src/store/utils'
import { Autocomplete, Box, IconButton, InputAdornment } from '@mui/material'
import { getAllRolesAction } from 'src/store/settings/roles/rolesActions'
import { CatalogsWrapper, useCustomStyles } from 'src/styles/pages/catalogs'

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
    redirectWasl
  } = props

  const dispatch = useDispatch()
  const common = useCustomStyles()

  console.log('customerId', customerId)

  // ** States
  const [showPassword, setShowPassword] = useState(false)

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    role: Yup.string().required(),
    customer_id: Yup.string().required(),
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
      c_password: ''
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
          c_password: values.c_password
        }

        dispatch(registerUserAction(data))
        handleClose()
        resetForm()
      }
    }
  })

  console.log('formik', formik.values)

  useEffect(() => {
    if (formik.values.customer_id) {
      dispatch(getAllRolesAction({ page: 1, limit: 100, customer_id: formik.values.customer_id }))
    }
  }, [formik.values.customer_id])

  return (
    <CatalogsWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={6} xs={{ alignItems: 'center' }}>
          <Grid item xs={12} md={3}>
            <Title>WASL Customers List</Title>
          </Grid>

          <Grid item xs={12} md={6} display='flex' flexWrap='wrap' marginLeft='auto'>
            <Grid container columnSpacing={3} rowSpacing={2} justifyContent='end'>
              <Grid item xs={12} sm={6} md={4}>
                <TextInput placeholder='Account Name' className={common.TextField} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextInput placeholder='Identity Number' className={common.TextField} />
              </Grid>
            </Grid>
          </Grid>

          {/* {ability.can('create', 'create-user') && ( */}
          <Grid item xs={12} md={3} xl={3}>
            <Grid container columnSpacing={2} rowSpacing={2} flexWrap='wrap'>
              <Grid item>
                {/*<ButtonIcon*/}
                {/*  sx={{ width: 120 }}*/}
                {/*  iconWidth={15}*/}
                {/*  iconHeight={20}*/}
                {/*  color='success'*/}
                {/*  startIcon={'ic:round-arrow-back-ios-new'}*/}
                {/*  onClick={() => redirectWasl(false)}*/}
                {/*>*/}
                {/*  Back*/}
                {/*</ButtonIcon>*/}
              </Grid>
              <Grid item>
                {/*<ButtonIcon*/}
                {/*  sx={{ width: 130 }}*/}
                {/*  color='success'*/}
                {/*  startIcon={'ic:baseline-plus'}*/}
                {/*  onClick={() => handleOpen()}*/}
                {/*>*/}
                {/*  Register*/}
                {/*</ButtonIcon>*/}
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
            agree='Register'
            cancel='Cancel'
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
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </FieldWrapper>
                </Grid>

                <Grid item xs={6}>
                  <TextLabel id='customer' sx={{ marginBottom: '0.25rem' }}>
                    Customer
                  </TextLabel>
                  <SelectInput
                    fullWidth
                    defaultValue={formik.values.customer_id}
                    {...formik.getFieldProps('customer_id')}
                    placeholder='Select Customer...'
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {customersList.map((customer, index) => (
                      <MenuItem key={index} value={`${customer.id}`}>
                        {customer.company_name}
                      </MenuItem>
                    ))}
                  </SelectInput>
                </Grid>
                <Grid item xs={6}>
                  <FieldWrapper>
                    <TextLabel id='role' sx={{ marginBottom: '0.25rem' }}>
                      Role
                    </TextLabel>
                    <SelectInput
                      fullWidth
                      disabled={!formik.values.customer_id}
                      defaultValue={formik.values.role}
                      {...formik.getFieldProps('role')}
                      placeholder='Select Role...'
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {rolesList.map((role, index) => (
                        <MenuItem key={index} value={role.name}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </SelectInput>
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

export default WaslCustomersHeader
