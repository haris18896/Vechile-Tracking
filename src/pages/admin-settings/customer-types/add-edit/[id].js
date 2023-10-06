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
  updateCustomerTypeAction,
  getCustomerTypeByIdAction,
  registerCustomerTypeAction
} from 'src/store/settings/customer-types/customerTypesAction'
import {
  resetUpdateCustomerType,
  resetGetCustomerTypeById,
  resetRegisterCustomerType
} from 'src/store/settings/customer-types/customerTypesSlice'

function AddEditAdminCustomerTypes() {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** store
  const dispatch = useDispatch()
  const { loading, error, getCustomerType } = useSelector(state => state.customerTypes)

  console.log('getCustomerType : ', getCustomerType)

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .required(`${t('settings.customerTypes.addEdit.nameRequired')}`)
      .max(30, `${t('settings.customerTypes.addEdit.nameMax30')}`)
  })

  const formik = useFormik({
    initialValues: {
      name: getCustomerType?.name || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        if (edit) {
          dispatch(
            updateCustomerTypeAction({
              data: values,
              id,
              callback: () => router.push('/admin-settings/customer-types')
            })
          )
        } else {
          dispatch(
            registerCustomerTypeAction({ data: values, callback: () => router.push('/admin-settings/customer-types') })
          )
        }
      }
    }
  })

  useEffect(() => {
    if (id && edit) {
      dispatch(getCustomerTypeByIdAction(id))
    }

    return () => {
      dispatch(resetUpdateCustomerType())
      dispatch(resetGetCustomerTypeById())
      dispatch(resetRegisterCustomerType())
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
        backAction={() => router.push('/admin-settings/customer-types')}
        title={
          edit
            ? `${t('edit')} ${t('settings.customerTypes.customerTypes')}`
            : `${t('add')} ${t('settings.customerTypes.customerTypes')}`
        }
      />

      <form name='customerTypes-form' onSubmit={formik.handleSubmit}>
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
                inputName={'customerTypes-name'}
                label={t('settings.customerTypes.addEdit.name')}
                {...formik.getFieldProps('name')}
                placeholder={t('settings.customerTypes.addEdit.namePlaceholder')}
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

export default AddEditAdminCustomerTypes

AddEditAdminCustomerTypes.acl = {
  action: 'manage',
  subject: 'manage-super-admin-customer-types'
}
