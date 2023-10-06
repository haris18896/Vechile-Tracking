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
  updateActivityAction,
  getActivityByIdAction,
  registerActivityAction
} from 'src/store/settings/activity/activityAction'
import {
  resetUpdateActivity,
  resetGetActivityById,
  resetRegisterActivity
} from 'src/store/settings/activity/activitySlice'

function AddEditAdminActivity() {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** store
  const dispatch = useDispatch()
  const { loading, getActivity, error } = useSelector(state => state.activity)

  // ** Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .required(`${t('settings.activity.addEdit.nameRequired')}`)
      .max(30, `${t('settings.activity.addEdit.nameMax30')}`)
  })

  const formik = useFormik({
    initialValues: {
      name: getActivity?.data?.name || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        if (edit) {
          const payload = Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== ''))
          dispatch(updateActivityAction({ data: payload, id, callback: () => router.push('/admin-settings/activity') }))
        } else {
          dispatch(registerActivityAction({ data: values, callback: () => router.back('/admin-settings/activity') }))
        }
      }
    }
  })

  console.log('formik values : ', formik.values)

  useEffect(() => {
    if (id && edit) {
      dispatch(getActivityByIdAction(id))
    }

    return () => {
      dispatch(resetUpdateActivity())
      dispatch(resetGetActivityById())
      dispatch(resetRegisterActivity())
    }
  }, [id])

  return (
    <SettingsWrapper>
      <SettingsHeaderAddEdit
        isRTL={isRTL}
        back={t('back')}
        loading={loading}
        submit={() => formik.handleSubmit()}
        submitText={edit ? t('update') : t('save')}
        backAction={() => router.push('/admin-settings/activity')}
        title={
          edit ? `${t('edit')} ${t('settings.activity.activity')}` : `${t('add')} ${t('settings.activity.activity')}`
        }
      />

      <form name='activity-forms' onSubmit={formik.handleSubmit}>
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
                inputName={'activity-name'}
                label={t('settings.activity.addEdit.name')}
                {...formik.getFieldProps('name')}
                placeholder={t('settings.activity.addEdit.namePlaceholder')}
                helperText={(formik.touched['name'] && formik.errors['name']) || error?.name}
                error={(formik.touched['name'] && Boolean(formik.errors['name'])) || error?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditAdminActivity

AddEditAdminActivity.acl = {
  action: 'manage',
  subject: 'manage-super-admin-activity'
}
