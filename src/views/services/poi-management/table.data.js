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
      name: 'Driver Name',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.driver_name}
        </Typography>
      )
    },

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
      name: 'Allocate Date',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.created_at}
        </Typography>
      )
    },

    {
      name: 'Days Used',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.days_used}
        </Typography>
      )
    },

    {
      name: 'Total Amount',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.total_amount}
        </Typography>
      )
    },

    {
      name: 'Status',
      sortable: false,
      cell: row => (
        <CustomChip
          size='small'
          color={row?.status === 'Active' ? 'success' : 'error'}
          label={row.status}
          skin='light'
          sx={{
            padding: '0.4rem 0.5rem',
            '& .MuiChip-label': {
              fontSize: '0.85rem',
              fontWeight: 600
            }
          }}
        />
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            <CustomChip
              onClick={() => handleUpdateOpen(row.id)}
              size='small'
              label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem'
              }}
            />

            <AddFormDialog
              id='update-Modal'
              title='Update Asset Type'
              context='Enter new details for the Asset Type and click update'
              close={() => handleUpdateClose()}
              open={updateOpen}
              submit={() => formik.handleSubmit()}
              agree='Update Type'
              cancel='Cancel'
            >
              <form name='add-customer-type' onSubmit={formik.handleSubmit}>
                <FieldWrapper>
                  <TextLabel id='customer-type-name' sx={{ marginBottom: '0.25rem' }}>
                    Name
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='name'
                    name='name'
                    type='text'
                    variant='outlined'
                    placeholder='Enter Customer type Name'
                    {...formik.getFieldProps('name')}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </FieldWrapper>
              </form>
            </AddFormDialog>
          </div>
        )
      }
    }
  ]
}
