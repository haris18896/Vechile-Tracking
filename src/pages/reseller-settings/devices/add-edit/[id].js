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

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import {
  updateDeviceTypeAction,
  getDeviceTypeByIdAction,
  registerDeviceTypeAction
} from 'src/store/settings/device-types/deviceTypesAction'
import {
  resetUpdateDeviceType,
  resetGetDeviceTypeById,
  resetRegisterDeviceType
} from 'src/store/settings/device-types/deviceTypesSlice'
import { Grid } from '@mui/material'

function AddEditResellerDeviceTypes() {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** store
  const dispatch = useDispatch()
  const { loading, error, getDeviceType } = useSelector(state => state.deviceTypes)

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .required(`${t('settings.deviceTypes.addEdit.nameRequired')}`)
      .max(30, `${t('settings.deviceTypes.addEdit.nameMax30')}`)
  })

  const formik = useFormik({
    initialValues: {
      name: getDeviceType?.name || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        if (edit) {
          dispatch(
            updateDeviceTypeAction({ data: values, id, callback: () => router.push('/reseller-settings/devices') })
          )
        } else {
          dispatch(
            registerDeviceTypeAction({ data: values, callback: () => router.push('/reseller-settings/devices') })
          )
        }
      }
    }
  })

  useEffect(() => {
    if (id && edit) {
      dispatch(getDeviceTypeByIdAction(id))
    }

    return () => {
      dispatch(resetGetDeviceTypeById())
      dispatch(resetRegisterDeviceType())
      dispatch(resetUpdateDeviceType())
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
        backAction={() => router.push('/reseller-settings/devices')}
        title={
          edit
            ? `${t('edit')} ${t('settings.deviceTypes.deviceTypes')}`
            : `${t('add')} ${t('settings.deviceTypes.deviceTypes')}`
        }
      />

      <form name='deviceTypes-form' onSubmit={formik.handleSubmit}>
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
                inputName={'deviceTypes-name'}
                label={t('settings.deviceTypes.addEdit.name')}
                {...formik.getFieldProps('name')}
                placeholder={t('settings.deviceTypes.addEdit.namePlaceholder')}
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

export default AddEditResellerDeviceTypes

AddEditResellerDeviceTypes.acl = {
  action: 'manage',
  subject: 'manage-reseller-devices'
}
