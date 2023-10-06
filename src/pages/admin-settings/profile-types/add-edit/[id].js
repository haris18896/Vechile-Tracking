/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// ** Third Party Packages
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Utils && hooks
import { isObjEmpty } from 'src/configs/utils'

// ** Custom Styles
import FormElement from 'src/components/form-element'
import { SettingsWrapper } from 'src/styles/pages/settings'
import SettingsHeaderAddEdit from 'src/views/SettingsHeaderAddEdit'

// ** Mui
import { LoadingButton } from '@mui/lab'
import { Grid } from '@mui/material'

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import {
  updateProfileTypeAction,
  getProfileTypeByIdAction,
  registerProfileTypeAction
} from 'src/store/settings/profile-types/profileTypesAction'
import {
  resetGetProfileTypeById,
  resetRegisterProfileType,
  resetUpdateProfileType
} from 'src/store/settings/profile-types/profileTypesSlice'

function AddEditAdminProfileTypes() {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** store
  const dispatch = useDispatch()
  const { loading, error, getProfileType } = useSelector(state => state.profileTypes)

  // ** Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .required(`${t('settings.profileTypes.addEdit.nameRequired')}`)
      .max(30, `${t('settings.profileTypes.addEdit.nameMax30')}`)
  })

  const formik = useFormik({
    initialValues: {
      name: getProfileType?.data?.name || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        if (edit) {
          dispatch(updateProfileTypeAction({ data: values, id, callback: () => router.push('/admin-settings/profile-types') }))
        } else {
          dispatch(registerProfileTypeAction({ data: values, callback: () => router.push('/admin-settings/profile-types') }))
        }
      }
    }
  })

  useEffect(() => {
    if (id && edit) {
      dispatch(getProfileTypeByIdAction(id))
    }

    return () => {
      dispatch(resetGetProfileTypeById())
      dispatch(resetRegisterProfileType())
      dispatch(resetUpdateProfileType())
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
        backAction={() => router.push('/admin-settings/profile-types')}
        title={
          edit
            ? `${t('edit')} ${t('settings.profileTypes.profileTypes')}`
            : `${t('add')} ${t('settings.profileTypes.profileTypes')}`
        }
      />

      <form name='profileTypes-form' onSubmit={formik.handleSubmit}>
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
                inputName={'profileTypes-name'}
                label={t('settings.profileTypes.addEdit.name')}
                {...formik.getFieldProps('name')}
                placeholder={t('settings.profileTypes.addEdit.namePlaceholder')}
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

export default AddEditAdminProfileTypes

AddEditAdminProfileTypes.acl = {
  action: 'manage',
  subject: 'manage-super-admin-profile-types'
}
