import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'
import { useTranslation } from 'react-i18next'

// ** MUI
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Box, Button, ListItem, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import * as Yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Custom Components
import ButtonIcon from 'src/components/buttons/ButtonIcon'

// ** Styles
// import { useCommonStyles } from 'src/styles/common'
import { TextInput, HeaderLabel } from 'src/styles/components/input'
import { ServicesWrapper, useCustomStyles } from 'src/styles/pages/services'
import { useTheme } from '@mui/material/styles'
import { useCommonStyles } from 'src/styles/common'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** utils
import { getModifiedValues, isObjEmpty } from 'src/utilities/utils'
import { UpdateUserProfileAction } from '../../../store/profile/profileAction'

const profile = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const user = useJwt.getUserData()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const { updateUserProfilePending } = useSelector(state => state.auth)

  const schema = Yup.object().shape({
    firstName: Yup.string().required(`${t('auth.signup.firstnameRequired')}`),
    lastName: Yup.string().when('firstName', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().required(`${t('auth.signup.lastnameRequired')}`)}),
    email: Yup.string().email('Invalid email'),
    old_password: Yup.string(),
    password: Yup.string()
      .when('old_password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string()
          .required('New password is required')
          .notOneOf([Yup.ref('old_password')], 'New password should not be equal to old password')
      })
      .test(
        'strong-password',
        'Password must contain at least 8 characters, one number, one uppercase letter and one lowercase letter',
        value => {
          if (!value) {
            return true
          }

          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 0
          })
        }
      ),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const formik = useFormik({
    initialValues: {
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1],
      email: user.email,
      old_password: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const modified = getModifiedValues(values, formik.initialValues)

        if (!isObjEmpty(modified) && modified.firstName && modified.lastName && !modified.old_password && !modified.password && !modified.password_confirmation) {
          modified.name = `${modified.firstName} ${modified.lastName}`
          delete modified.firstName
          delete modified.lastName
          console.log('Name : ', modified)
          dispatch(UpdateUserProfileAction({ data: modified }))
        }

        if (!isObjEmpty(modified) && !modified.firstName && !modified.lastName &&  modified.old_password && modified.password && modified.password_confirmation) {
          delete modified.firstName
          delete modified.lastName
          
          console.log('check password', modified)

          dispatch(UpdateUserProfileAction({ data: modified }))
        }

        if (
          !isObjEmpty(modified) &&
          modified.lastName &&
          modified.firstName &&
          modified.password &&
          modified.old_password &&
          modified.password_confirmation
        ) {
          modified.name = `${modified.firstName} ${modified.lastName}`
          delete modified.firstName
          delete modified.lastName
          console.log('check both', modified)

          dispatch(UpdateUserProfileAction({ data: modified }))
        }
      }
    }
  })

  return (
    <ServicesWrapper>
      <Grid container mb={4} spacing={4}>
        <Grid item xs={12} sm mb={{ xs: 2, sm: 0 }}>
          <HeaderLabel>{t('profile.title')}</HeaderLabel>
        </Grid>
        <Grid item>
          <ButtonIcon
            sx={{ width: 120 }}
            color='grey'
            disabled={updateUserProfilePending}
            iconWidth={20}
            iconHeight={15}
            startIcon={!isRTL && 'ic:round-arrow-back-ios-new'}
            endIcon={isRTL && 'ic:round-arrow-back-ios-new'}
            onClick={() => router.back()}
          >
            {t('back')}
          </ButtonIcon>
        </Grid>
        <Grid item>
          <ButtonIcon
            sx={{ width: 120 }}
            color='success'
            iconWidth={30}
            iconHeight={'auto'}
            startIcon={!isRTL && 'material-symbols:check-small-rounded'}
            endIcon={isRTL && 'material-symbols:check-small-rounded'}
            onClick={() => formik.handleSubmit()}
          >
            {t('save')}
          </ButtonIcon>
        </Grid>
        <Grid item>
          <ButtonIcon
            sx={{ width: 120 }}
            color='grey'
            iconWidth={30}
            iconHeight={20}
            startIcon={!isRTL && 'prime:times'}
            endIcon={isRTL && 'prime:times'}
            onClick={() => router.back()}
          >
            {t('cancel')}
          </ButtonIcon>
        </Grid>
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FormControl fullWidth sx={{ mb: 4, mr: 2 }}>
                  <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
                    {t('auth.signup.firstname')}
                  </Typography>
                  <TextInput
                    name='firstName'
                    id='firstName'
                    placeholder={t("auth.signup.enterFirstname")}
                    {...formik.getFieldProps('firstName')}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FormControl fullWidth sx={{ mb: 4, mr: 2 }}>
                  <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
                    {t('auth.signup.lastname')}
                  </Typography>
                  <TextInput
                    name='lastName'
                    id='lastName'
                    placeholder={t("auth.signup.enterLastname")}
                    {...formik.getFieldProps('lastName')}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid item xs={12} md={8}>
                <FormControl fullWidth sx={{ mb: 4, mr: 2 }}>
                  <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
                    {t('auth.email')}
                  </Typography>
                  <TextInput
                    name='email'
                    id='email'
                    disabled
                    placeholder={t("auth.signup.enterEmail")}
                    {...formik.getFieldProps('email')}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <HeaderLabel>{t('profile.changePassword')}</HeaderLabel>

          <Box sx={{ flex: 1, mt: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 4, mr: 2 }}>
                    <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
                    {t('profile.currentPassword')}
                    </Typography>
                    <TextInput
                      name='old_password'
                      id='old_password'
                      type={'password'}
                      placeholder={t("profile.enterCurrentPassword")}
                      {...formik.getFieldProps('old_password')}
                      error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                      helperText={formik.touched.old_password && formik.errors.old_password}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={8}>
                  <FormControl fullWidth sx={{ mb: 4, mr: 2 }}>
                    <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
                    {t('profile.newPassword')}
                    </Typography>
                    <TextInput
                      name='password'
                      id='password'
                      type={'password'}
                      placeholder={t("auth.enterPassword")}
                      {...formik.getFieldProps('password')}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={8}>
                  <FormControl fullWidth sx={{ mb: 4, mr: 2 }}>
                    <Typography variant='body' sx={{ mb: 2, fontWeight: '500' }}>
                      {t('profile.confirmPassword')}
                    </Typography>
                    <TextInput
                      name='password_confirmation'
                      id='password_confirmation'
                      type={'password'}
                      placeholder={t("profile.enterConfirmPassword")}
                      {...formik.getFieldProps('password_confirmation')}
                      error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                      helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </ServicesWrapper>
  )
}

export default profile
