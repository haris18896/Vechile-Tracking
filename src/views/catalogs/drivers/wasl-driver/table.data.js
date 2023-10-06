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
import AlertDialog from 'src/components/Dialogs/AlertDialog'

// ** store & actions
import { useDispatch, useSelector } from 'react-redux'
import { getUserByIdAction, updateUserAction } from 'src/store/catalogs/users/usersActions'
import { getAllPermissionsAction } from 'src/store/settings/permissions/permissionsActions'

// ** utils
import { isObjEmpty } from 'src/store/utils'

// ** Styled Components
import { deleteWaslDriverAction } from 'src/store/catalogs/driver/driversActions'

let rowId = null

export const columns = ({ ability, updateWaslDriver }) => {
  const dispatch = useDispatch()
  const { getUser } = useSelector(state => state.users)
  const { getAllPermissionsList } = useSelector(state => state.permissions)

  // ** Total Permissions
  const totalPermissions = useJwt.getData('totalPermissions')
  const permissionsList = getAllPermissionsList?.data

  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)

  // ** Delete Modal
  const handleDeleteOpen = id => {
    rowId = id
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

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
      name: 'Id',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.id}
        </Typography>
      )
    },

    {
      name: 'Identity No#',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.identity_no}
        </Typography>
      )
    },

    {
      name: 'Date Of Birth',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.dob}
        </Typography>
      )
    },

    {
      name: 'Phone Number',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.mobile_number}
        </Typography>
      )
    },

    {
      name: 'Register Type',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.register_type}
        </Typography>
      )
    },

    {
      name: 'DOB Format',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.dob_format}
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
                onClick={() => updateWaslDriver(row)}
                size='small'
                label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' />}
                color='success'
                skin='light'
                sx={{
                  padding: '0.95rem 0rem'
                }}
              />
            )}

            {ability.can('delete', 'delete-asset') && (
              <CustomChip
                onClick={() => handleDeleteOpen(row.id)}
                size='small'
                skin='light'
                label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                color='error'
                sx={{
                  padding: '0.9rem 0rem',
                  marginLeft: '0.5rem'
                }}
              />
            )}

            <AlertDialog
              IconWd='35'
              IconHt='35'
              open={deleteOpen}
              iconColor='#FC3B61'
              id='delete-Modal'
              icon='tabler:bell-ringing'
              close={() => handleDeleteClose()}
              submit={() => {
                dispatch(
                  deleteWaslDriverAction({
                    id: rowId,
                    callBack: () => {
                      handleDeleteClose()
                    }
                  })
                )
              }}
              context='Are you sure you want to delete this Asset?'
            />
          </div>
        )
      }
    }
  ]
}
