/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from 'react'
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as Yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Custom Components
import Icon from 'src/@core/components/icon'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** Styles
import { useCustomStyles } from 'src/styles/pages/catalogs'
import { SettingsWrapper, Title } from 'src/styles/pages/settings'
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from 'src/store/catalogs/users/usersActions'

// ** utils
import { isObjEmpty } from 'src/configs/utils'
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Typography } from '@mui/material'

// ** Table Context
import { TableUIContext } from 'src/contexts/TableContext'

function UsersHeader(props) {
  const { handleClose, handleOpen, open, ability, refresUserList, state } = props

  // ** Set Header Height To Table Top
  const headerRef = useRef()
  const { getTableHeight } = useContext(TableUIContext)
  getTableHeight(headerRef)

  // Dispatch
  const dispatch = useDispatch()

  // ** Styles
  const common = useCustomStyles()

  // ** States
  const [showPassword, setShowPassword] = useState(false)

  const { loading } = useSelector(state => state.users)

  // ** Formik
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is a required field'),
    email: Yup.string().email('Email must be a valid email').required('Email is a required field'),
    password: Yup.string()
      .required('Password is a required field!')
      .test(
        'strong-password',
        'Password must contain eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character',
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
    password_confirmation: Yup.string()
      .nullable()
      .when('password', {
        is: password => !!password,
        then: Yup.string()
          .nullable()
          .required(`Confirm Password is a required field`)
          .oneOf([Yup.ref('password'), null], `Confirm Password must be same as current password`)
      })
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation
        }
        dispatch(
          registerUserAction({
            data,
            callback: () => {
              resetForm()
              handleClose()
            }
          })
        )
      }
    }
  })

  const handleKeyPress = event => {
    if (event.key === ' ' && !event.target.value) {
      event.preventDefault()
    }
  }

  return (
    <SettingsWrapper ref={headerRef}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Title>Users List</Title>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={4} sx={{ justifyContent: { xs: 'start', md: 'flex-end' } }}>
              <Grid item xs={1} mx={2}>
                <FormControlLabel
                  sx={{ marginRight: { xs: 0, sm: 3 } }}
                  control={<Checkbox defaultValue={false} />}
                  label={
                    <Typography mr={0} sx={{ fontWeight: '600', textAlign: 'center' }}>
                      All
                    </Typography>
                  }
                />
              </Grid>

              {ability.can('create', 'create-user') && (
                <Grid item>
                  <Grid container columnSpacing={3} rowSpacing={3}>
                    <Grid item>
                      <ButtonIcon color='success' startIcon={'ic:baseline-plus'} onClick={() => handleOpen(state)}>
                        Add
                      </ButtonIcon>
                    </Grid>
                    <Grid item>
                      <ButtonIcon
                        loading={loading}
                        color='success'
                        startIcon={'lucide:refresh-cw'}
                        onClick={() => refresUserList()}
                      >
                        Refresh
                      </ButtonIcon>
                    </Grid>
                    <Grid item>
                      <ButtonIcon color='success' startIcon={'material-symbols:arrow-outward-rounded'}>
                        Export
                      </ButtonIcon>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <AddFormDialog
              id='register-Modal'
              title='Register User'
              context='Enter user details to register new user'
              close={() => {
                handleClose()
                formik.resetForm()
              }}
              open={open[state]}
              submit={() => formik.handleSubmit()}
              agree='Register'
              cancel='Cancel'
              bg='#fff'
              zIndex={99999}
            >
              <form name='add-user' onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                        inputProps={{
                          onKeyPress: handleKeyPress // add onKeyPress event handler
                        }}
                        className={common.TextField}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </FieldWrapper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        className={common.TextField}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </FieldWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
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
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        {...formik.getFieldProps('password')}
                        className={common.TextField}
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

                  <Grid item xs={12} sm={6}>
                    <FieldWrapper>
                      <TextLabel id='password-confirmation' sx={{ marginBottom: '0.25rem' }}>
                        Confirm Password
                      </TextLabel>
                      <TextInput
                        fullWidth
                        id='password_confirmation'
                        name='password_confirmation'
                        type='password'
                        variant='outlined'
                        placeholder='*********'
                        inputProps={{
                          onKeyPress: handleKeyPress
                        }}
                        {...formik.getFieldProps('password_confirmation')}
                        className={common.TextField}
                        error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                        helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </form>
            </AddFormDialog>
          </Grid>
        </Grid>
      </Box>
    </SettingsWrapper>
  )
}

export default UsersHeader
