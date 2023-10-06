import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'

// ** utils
import useJwt from 'src/auth/jwt/useJwt'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** store & actions
import { useDispatch, useSelector } from 'react-redux'
import { getUserByIdAction, updateUserAction } from 'src/store/catalogs/users/usersActions'
import { getAllPermissionsAction } from 'src/store/settings/permissions/permissionsActions'

// ** utils
import { isObjEmpty } from 'src/store/utils'

// ** Styled Components
import SelectMultiple from 'src/components/form-element/select-multiple'
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'

export const columns = ({ ability }) => {
  const dispatch = useDispatch()
  const { getUser } = useSelector(state => state.users)
  const { getAllPermissionsList } = useSelector(state => state.permissions)

  // ** Total Permissions
  const totalPermissions = useJwt.getData('totalPermissions')
  const permissionsList = getAllPermissionsList?.data

  // ** Modal Stats
  const [updateOpen, setUpdateOpen] = useState(false)
  const [permissionValues, setPermissionValues] = useState([])
  const [idx, setIdx] = useState(null)

  // ** Handle adding permissions to array
  const handleChange = event => {
    setPermissionValues(event.target.value)
  }

  // ** Handle Modal
  const handleUpdateOpen = id => {
    setIdx(id)
    setUpdateOpen(true)
    dispatch(getUserByIdAction(id))
    dispatch(getAllPermissionsAction({ page: 1, limit: totalPermissions }))
  }

  const handleUpdateClose = () => {
    setUpdateOpen(false)
  }

  // ** Form Validation
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    permissions: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().required()
      })
    )
  })

  // ** Formik Values
  const formik = useFormik({
    initialValues: {
      name: getUser?.data?.name || '',
      permissions: getUser?.data?.roles[0]?.permissions || []
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          permissions: permissionValues

          // permissions: values.permissions.map(permission => permission.id)
        }
        dispatch(updateUserAction({ id: idx, data }))
        resetForm()
        handleUpdateClose()
      }
    }
  })

  console.log('formik.values', formik.values)

  return [
    {
      name: 'Account',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Commercial Record',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Commercial Record',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Phone Number',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Extension Number',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Email ID',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Manager Name',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Manager Phone',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Mobile Number',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Reply',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'WASL Key',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Identity Number',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Activity',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Register Date',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('update', 'update-user') && (
              <CustomChip
                onClick={() => handleUpdateOpen(row.id)}
                size='small'
                label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' />}
                color='success'
                skin='light'
                sx={{
                  padding: '0.95rem 0rem'
                }}
              />
            )}

            <AddFormDialog
              id='update-Modal'
              title='Update User'
              context='Enter new details for the user and click update'
              close={() => handleUpdateClose()}
              open={updateOpen}
              submit={() => formik.handleSubmit()}
              agree='Update'
              cancel='Cancel'
            >
              <form name='user-update' onSubmit={formik.handleSubmit}>
                <FieldWrapper>
                  <TextLabel id='password' sx={{ marginBottom: '0.25rem' }}>
                    User Name
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='name'
                    name='name'
                    type='text'
                    variant='outlined'
                    placeholder='Enter User Name'
                    {...formik.getFieldProps('name')}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </FieldWrapper>

                <div sx={{ marginTop: '0.25rem' }}>
                  <SelectMultiple
                    name='Permissions'
                    values={permissionValues}
                    data={permissionsList}
                    handleChange={handleChange}
                    initialData={getUser?.data?.roles[0]?.permissions}
                  />
                </div>
              </form>
            </AddFormDialog>
          </div>
        )
      }
    }
  ]
}
