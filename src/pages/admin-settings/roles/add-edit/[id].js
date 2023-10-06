/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** Third Party Packages
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Utils && hooks
import { isObjEmpty } from 'src/configs/utils'

// ** Custom Styles
import FormElement from 'src/components/form-element'
import ButtonIcon from 'src/components/buttons/ButtonIcon'
import { SettingsWrapper } from 'src/styles/pages/settings'
import SettingsHeaderAddEdit from 'src/views/SettingsHeaderAddEdit'

// ** Mui
import { Grid, FormControlLabel, Checkbox, FormGroup, FormControl } from '@mui/material'

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { getAllPermissionsAction } from '../../../../store/settings/permissions/permissionsActions'
import { resetGetRoleById, resetRegisterRole, resetUpdateRole } from 'src/store/settings/roles/rolesSlice'
import { getRoleByIdAction, updateRoleAction, registerRoleAction } from 'src/store/settings/roles/rolesActions'

function AddEditAdminRoles({ props }) {
  // ** Translation
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ** router
  const router = useRouter()
  const { id, edit } = router.query

  // ** store
  const dispatch = useDispatch()
  const { loading, getRole, error } = useSelector(state => state.roles)

  const roleName = getRole?.data?.name
  const permissions = useJwt.getUserData().permissions
  const permissionsArray = getRole?.data?.permissions.map(permission => permission.id)

  // ** Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .max(20, `${t('settings.roles.addEdit.nameMax20')}`)
      .required(`${t('settings.roles.addEdit.nameRequired')}`),
    permissions: Yup.array().of(Yup.number().required(`${t('settings.roles.addEdit.permissionRequired')}`))
  })

  // ** Formik form handler
  const formik = useFormik({
    initialValues: {
      name: roleName || '',
      permissions: permissionsArray || []
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        if (edit) {
          dispatch(updateRoleAction({ data: values, id, callback: () => router.push('/admin-settings/roles') }))
        } else {
          dispatch(registerRoleAction({ data: values, callback: () => router.push('/admin-settings/roles') }))
        }
      }
    }
  })

  useEffect(() => {
    if (id && edit) {
      dispatch(getRoleByIdAction(id))
    }

    return () => {
      dispatch(resetGetRoleById())
      dispatch(resetRegisterRole())
      dispatch(resetUpdateRole())
    }
  }, [id])

  // ** Permissions Group
  const permissionsGroup = permissions.reduce((acc, permission) => {
    if (!acc.includes(permission.group)) {
      acc.push(permission.group)
    }

    return acc
  }, [])

  // ** Permissions By Group
  const getPermissionsByGroup = group => {
    return permissions.filter(permission => permission.group === group)
  }

  return (
    <SettingsWrapper>
      <SettingsHeaderAddEdit
        isRTL={isRTL}
        back={t('back')}
        loading={loading}
        backAction={() => router.push('/admin-settings/roles')}
        submit={() => formik.handleSubmit()}
        submitText={edit ? t('update') : t('save')}
        title={edit ? `${t('edit')} ${t('settings.roles.roles')}` : `${t('add')} ${t('settings.roles.roles')}`}
      />

      <form name='roles-form' onSubmit={formik.handleSubmit}>
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={10} md={8}>
              <FormElement
                size={'small'}
                type={'text'}
                required={true}
                fullWidth={true}
                maxCharacters={20}
                variant={'outlined'}
                inputName={'role-name'}
                label={t('settings.roles.addEdit.name')}
                {...formik.getFieldProps('name')}
                placeholder={t('settings.roles.addEdit.namePlaceholder')}
                helperText={(formik.touched.name && formik.errors.name) || error?.name}
                error={(formik.touched.name && Boolean(formik.errors.name)) || error?.name}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 5 }}>
            <FormGroup sx={{ mt: 6, mx: '8px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id='all'
                    name='all'
                    type='checkbox'
                    sx={{ padding: 0, marginRight: 3 }}
                    onChange={e => {
                      if (e.target.checked) {
                        formik.setFieldValue(
                          'permissions',
                          permissions.map(permission => permission.id)
                        )
                      } else {
                        formik.setFieldValue('permissions', [])
                      }
                    }}
                    checked={formik.values.permissions?.length === permissions?.length}
                  />
                }
                label='Select All'
              />
            </FormGroup>

            <FormControl sx={{ mx: '8px' }}>
              <FormGroup sx={{ mt: 6 }}>
                <Grid container spacing={2}>
                  {permissionsGroup.map((group, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        mb: 4
                      }}
                    >
                      <FormControlLabel
                        sx={{ mt: 3, mb: 1 }}
                        control={
                          <Checkbox
                            id={group}
                            name={group}
                            type='checkbox'
                            sx={{ padding: 0, marginRight: 3 }}
                            onChange={e => {
                              if (e.target.checked) {
                                formik.setFieldValue(
                                  'permissions',
                                  formik.values?.permissions.concat(
                                    getPermissionsByGroup(group).map(permission => permission.id)
                                  )
                                )
                              } else {
                                formik.setFieldValue(
                                  'permissions',
                                  formik.values?.permissions.filter(
                                    permission =>
                                      !getPermissionsByGroup(group)
                                        .map(permission => permission?.id)
                                        .includes(permission)
                                  )
                                )
                              }
                            }}
                            checked={
                              formik.values?.permissions.filter(permission =>
                                getPermissionsByGroup(group)
                                  .map(permission => permission?.id)
                                  .includes(permission)
                              )?.length === getPermissionsByGroup(group)?.length
                            }
                          />
                        }
                        label={group && group.toUpperCase().replace('-', ' ')}
                      />
                      {/* // ** Permissions by Groups */}
                      {getPermissionsByGroup(group).map((permission, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            sx={{ ml: 6, mt: 1 }}
                            control={
                              <Checkbox
                                id={permission.name}
                                name={permission.name}
                                type='checkbox'
                                sx={{ padding: 0, marginRight: 3 }}
                                onChange={e => {
                                  if (e.target.checked) {
                                    formik.setFieldValue('permissions', formik.values.permissions.concat(permission.id))
                                  } else {
                                    formik.setFieldValue(
                                      'permissions',
                                      formik.values.permissions.filter(permissionId => permissionId !== permission.id)
                                    )
                                  }
                                }}
                                checked={formik.values.permissions.includes(permission.id)}
                              />
                            }
                            label={permission.name
                              .split('-')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          />
                        )
                      })}
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </SettingsWrapper>
  )
}

export default AddEditAdminRoles

AddEditAdminRoles.acl = {
  action: 'manage',
  subject: 'manage-super-admin-roles'
}
