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
  updatePermissionAction,
  getPermissionByIdAction,
  registerPermissionAction
} from 'src/store/settings/permissions/permissionsActions'
import {
  resetUpdatePermission,
  resetGetPermissionById,
  resetRegisterPermission
} from 'src/store/settings/permissions/permissionSlice'

function AddEditAdminPermissions() {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** store
  const dispatch = useDispatch()
  const { loading, error, updatePending, getPermission } = useSelector(state => state.permissions)

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .max(50, `${t('settings.permissions.addEdit.nameMax50')}`)
      .required(`${t('settings.permissions.addEdit.nameRequired')}`),
    group: !edit
      ? Yup.string()
          .required(`${t('settings.permissions.addEdit.groupRequired')}`)
          .max(20, `${t('settings.permissions.addEdit.groupMax20')}`)
      : null
  })

  // ** Formik form handler
  const formik = useFormik({
    initialValues: {
      name: getPermission?.name || '',
      group: getPermission?.group || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = { name: values?.name }

        if (edit) {
          dispatch(updatePermissionAction({ data, id, callback: () => router.push('/admin-settings') }))
        } else {
          data.group = values?.group
          dispatch(
            registerPermissionAction({
              data,
              callback: () => router.push('/admin-settings')
            })
          )
        }
      }
    }
  })

  useEffect(() => {
    if (id && edit) {
      dispatch(getPermissionByIdAction(id))
    }

    return () => {
      dispatch(resetGetPermissionById())
      dispatch(resetRegisterPermission())
      dispatch(resetUpdatePermission())
    }
  }, [id])

  return (
    <SettingsWrapper>
      <SettingsHeaderAddEdit
        isRTL={isRTL}
        back={t('back')}
        loading={loading || updatePending}
        submit={() => formik.handleSubmit()}
        submitText={edit ? t('update') : t('save')}
        backAction={() => router.push('/admin-settings')}
        title={
          edit
            ? `${t('edit')} ${t('settings.permissions.permission')}`
            : `${t('add')} ${t('settings.permissions.permission')}`
        }
      />

      <form name='permissions-form' onSubmit={formik.handleSubmit}>
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={true}
                fullWidth={true}
                maxCharacters={50}
                variant={'outlined'}
                inputName={'permission-name'}
                {...formik.getFieldProps('name')}
                label={t('settings.permissions.addEdit.name')}
                placeholder={t('settings.permissions.addEdit.namePlaceholder')}
                helperText={(formik.touched.name && formik.errors.name) || error?.name}
                error={(formik.touched.name && Boolean(formik.errors.name)) || error?.name}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                type={'text'}
                size={'small'}
                required={true}
                fullWidth={true}
                disabled={edit}
                maxCharacters={20}
                variant={'outlined'}
                inputName={'permission-group'}
                {...formik.getFieldProps('group')}
                label={t('settings.permissions.addEdit.group')}
                placeholder={t('settings.permissions.addEdit.groupPlaceholder')}
                helperText={(formik.touched.group && formik.errors.group) || error?.group}
                error={(formik.touched.group && Boolean(formik.errors.group)) || error?.group}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditAdminPermissions

AddEditAdminPermissions.acl = {
  action: 'manage',
  subject: 'manage-super-admin-permissions'
}
