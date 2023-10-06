import React, { useState } from 'react'
import { Typography } from '@mui/material'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AddFormDialog from 'src/components/Dialogs/AddFormDialog'

// ** utils
import { isObjEmpty } from 'src/configs/utils'

// ** Styled Components
import { TextInput, TextLabel, FieldWrapper } from 'src/styles/components/input'

// ** store & actions
import { useDispatch, useSelector } from 'react-redux'
import { getAssetTypeByIdAction, updateAssetTypeAction } from 'src/store/settings/asset-types/assetTypesAction'

export const columns = () => {
  const dispatch = useDispatch()
  const { getCustomerType } = useSelector(state => state.customerTypes)

  // ** Modal Stats
  const [updateOpen, setUpdateOpen] = useState(false)
  const [idx, setIdx] = useState(null)

  // ** Handle Modal
  const handleUpdateOpen = id => {
    setIdx(id)
    setUpdateOpen(true)
    dispatch(getAssetTypeByIdAction(id))
  }

  const handleUpdateClose = () => {
    setUpdateOpen(false)
  }

  // ** Form Validation
  const schema = Yup.object().shape({
    name: Yup.string().required('Name of customer type is required')
  })

  // ** Formik Values
  const formik = useFormik({
    initialValues: {
      name: getCustomerType?.name || ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('name', values.name)

        dispatch(updateAssetTypeAction({ id: idx, data }))
        resetForm()
        handleUpdateClose()
      }
    }
  })

  return [
    {
      name: 'Asset Name',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.asset_name}
        </Typography>
      )
    },

    {
      name: 'Date/Time',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.date}
        </Typography>
      )
    },

    {
      name: 'Command Sent',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.command}
        </Typography>
      )
    },

    {
      name: 'Input Sent',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.input}
        </Typography>
      )
    },

    {
      name: 'Reply String',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.reply_string}
        </Typography>
      )
    },

    {
      name: 'Did The Device Received The Command?',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.received_command}
        </Typography>
      ),
      minWidth: '320px !important'
    },

    {
      name: 'User',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.received_command}
        </Typography>
      ),

    },

  ]
}
