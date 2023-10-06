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
  updateAssetTypeAction,
  getAssetTypeByIdAction,
  registerAssetTypeAction
} from 'src/store/settings/asset-types/assetTypesAction'
import {
  resetGetAssetType,
  resetUpdateAssetType,
  resetRegisterAssetType
} from 'src/store/settings/asset-types/assetTypesSlice'

function AddEditCustomerAssetTypes() {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** store
  const dispatch = useDispatch()
  const { loading, error, getAssetType } = useSelector(state => state.assetTypes)

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .required(`${t('settings.assetTypes.addEdit.nameRequired')}`)
      .max(30, `${t('settings.assetTypes.addEdit.nameMax30')}`)
  })

  const formik = useFormik({
    initialValues: {
      name: getAssetType?.name || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        if (edit) {
          dispatch(
            updateAssetTypeAction({ data: values, id, callback: () => router.push('/customer-settings/assets') })
          )
        } else {
          dispatch(registerAssetTypeAction({ data: values, callback: () => router.push('/customer-settings/assets') }))
        }
      }
    }
  })

  useEffect(() => {
    if (id && edit) {
      dispatch(getAssetTypeByIdAction(id))
    }

    return () => {
      dispatch(resetGetAssetType())
      dispatch(resetUpdateAssetType())
      dispatch(resetRegisterAssetType())
    }
  }, [id])

  return (
    <SettingsWrapper>
      <SettingsHeaderAddEdit
        isRTL={isRTL}
        back={t('back')}
        loading={loading}
        backAction={() => router.push('/customer-settings/assets')}
        submit={() => formik.handleSubmit()}
        submitText={edit ? t('update') : t('save')}
        title={
          edit
            ? `${t('edit')} ${t('settings.assetTypes.assetTypes')}`
            : `${t('add')} ${t('settings.assetTypes.assetTypes')}`
        }
      />

      <form name='assetTypes-form' onSubmit={formik.handleSubmit}>
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
                inputName={'assetTypes-name'}
                label={t('settings.assetTypes.addEdit.name')}
                {...formik.getFieldProps('name')}
                placeholder={t('settings.assetTypes.addEdit.namePlaceholder')}
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

export default AddEditCustomerAssetTypes

AddEditCustomerAssetTypes.acl = {
  action: 'manage',
  subject: 'manage-customer-assets'
}
