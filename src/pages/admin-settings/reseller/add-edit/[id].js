/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// ** Third Party Packages
import * as Yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'

// ** Utils && hooks
import { NoSpaceAtFirstPosition, isObjEmpty } from 'src/utilities/utils'

// ** Custom Styles
import Icon from 'src/@core/components/icon'
import FormElement from 'src/components/form-element'
import { SettingsWrapper } from 'src/styles/pages/settings'
import { PasswordField, Title } from 'src/styles/pages/login'
import SettingsHeaderAddEdit from 'src/views/SettingsHeaderAddEdit'
import PasswordElement from 'src/components/form-element/PasswordElement'

// ** Mui
import { Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import {
  getResellerByIdAction,
  registerResellerAction,
  updateResellerAction
} from 'src/store/settings/reseller/resellerAction'
import {
  resetRegisterReseller,
  resetUpdateReseller,
  resetGetResellerById
} from 'src/store/settings/reseller/resellerSlice'

function AddEditAdminReseller() {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** store
  const dispatch = useDispatch()
  const { loading, getReseller, error } = useSelector(state => state.reseller)

  // ** Validation Schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .email(`${t('auth.inValidEmail')}`)
      .required(`${t('settings.reseller.addEdit.emailRequired')}`),
    name: Yup.string()
      .required(`${t('settings.reseller.addEdit.nameRequired')}`)
      .max(30, `${t('settings.reseller.addEdit.nameMax30')}`),
    contact: Yup.string()
      .required(`${t('settings.reseller.addEdit.contactRequired')}`)
      .min(11, `${t('settings.reseller.addEdit.contactMin11')}`)
      .max(11, `${t('settings.reseller.addEdit.contactMax11')}`),
    password: Yup.string()
      .test({
        name: 'requiredIfEdit',
        exclusive: true,
        message: `${t('settings.reseller.addEdit.passwordRequired')}`,
        test: function (value) {
          return !edit ? !!value : true
        }
      })
      .test('', `${t('auth.signup.passwordTest')}`, value => {
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
      }),
    password_confirmation: Yup.string()
      .when('password', {
        is: password => !!password,
        then: Yup.string()
          .required(`${t('settings.reseller.addEdit.password_confirmationRequired')}`)
          .oneOf([Yup.ref('password'), null], `${t('settings.reseller.addEdit.password_confirmationMatch')}`)
      })
  })

  const formik = useFormik({
    initialValues: {
      name: getReseller?.data?.name || '',
      email: getReseller?.data?.user?.email || '',
      contact: getReseller?.data?.contact || '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        if (edit) {
          const payload = Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== ''))
          dispatch(updateResellerAction({ data: payload, id, callback: () => router.push('/admin-settings/reseller') }))
        } else {
          dispatch(registerResellerAction({ data: values, callback: () => router.back('/admin-settings/reseller') }))
        }
      }
    }
  })

  console.log('formik values : ', formik.values)

  useEffect(() => {
    if (id && edit) {
      dispatch(getResellerByIdAction(id))
    }

    return () => {
      dispatch(resetGetResellerById())
      dispatch(resetRegisterReseller())
      dispatch(resetUpdateReseller())
    }
  }, [id])

  return (
    <SettingsWrapper>
      <SettingsHeaderAddEdit
        isRTL={isRTL}
        back={t('back')}
        loading={loading}
        backAction={() => router.push('/admin-settings/reseller')}
        submit={() => formik.handleSubmit()}
        submitText={edit ? t('update') : t('save')}
        title={
          edit ? `${t('edit')} ${t('settings.reseller.reseller')}` : `${t('add')} ${t('settings.reseller.reseller')}`
        }
      />

      <form name='reseller-forms' onSubmit={formik.handleSubmit}>
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={30}
                variant={'outlined'}
                inputName={'reseller-name'}
                label={t('settings.reseller.addEdit.name')}
                {...formik.getFieldProps('name')}
                placeholder={t('settings.reseller.addEdit.namePlaceholder')}
                helperText={(formik.touched['name'] && formik.errors['name']) || error?.name}
                error={(formik.touched['name'] && Boolean(formik.errors['name'])) || error?.name}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'email'}
                size={'small'}
                required={true}
                fullWidth={true}
                variant={'outlined'}
                inputName={'reseller-email'}
                label={t('settings.reseller.addEdit.email')}
                {...formik.getFieldProps('email')}
                placeholder={t('settings.reseller.addEdit.emailPlaceholder')}
                helperText={(formik.touched['email'] && formik.errors['email']) || error?.email}
                error={(formik.touched['email'] && Boolean(formik.errors['email'])) || error?.email}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                size={'small'}
                type={'text'}
                required={true}
                fullWidth={true}
                maxCharacters={11}
                variant={'outlined'}
                inputName={'reseller-contact'}
                label={t('settings.reseller.addEdit.contact')}
                {...formik.getFieldProps('contact')}
                placeholder={t('settings.reseller.addEdit.contactPlaceholder')}
                helperText={(formik.touched['contact'] && formik.errors['contact']) || error?.contact}
                error={(formik.touched['contact'] && Boolean(formik.errors['contact'])) || error?.contact}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <PasswordElement
                size={'small'}
                fullWidth={true}
                variant={'outlined'}
                required={!edit && true}
                backendError={error?.password}
                inputName={'reseller-password'}
                formikError={formik.errors['password']}
                formikTouched={formik.touched['password']}
                label={t('settings.reseller.addEdit.password')}
                {...formik.getFieldProps('password')}
                placeholder={t('settings.reseller.addEdit.passwordPlaceholder')}
                error={(formik.touched['password'] && Boolean(formik.errors['password'])) || Boolean(error?.password)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <PasswordElement
                size={'small'}
                fullWidth={true}
                variant={'outlined'}
                required={!edit && true}
                backendError={error?.password}
                inputName={'reseller-confirm-password'}
                formikError={formik.errors['password_confirmation']}
                formikTouched={formik.touched['password_confirmation']}
                label={t('settings.reseller.addEdit.password_confirmation')}
                {...formik.getFieldProps('password_confirmation')}
                placeholder={t('settings.reseller.addEdit.password_confirmationPlaceholder')}
                error={
                  (formik.touched['password_confirmation'] && Boolean(formik.errors['password_confirmation'])) ||
                  Boolean(error?.password)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditAdminReseller

AddEditAdminReseller.acl = {
  action: 'manage',
  subject: 'manage-super-admin-reseller'
}
