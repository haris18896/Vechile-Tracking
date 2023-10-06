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
import { useCommonStyles } from 'src/styles/common'
import { useRouter } from 'next/router'
import AlertDialog from 'src/components/Dialogs/AlertDialog'

export const columns = () => {
  const dispatch = useDispatch()
  const { getCustomerType } = useSelector(state => state.customerTypes)
  const router = useRouter();
  const { pathname } = router;

  // ** Modal Stats
  const [idx, setIdx] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState({})
  const styles = useCommonStyles();

  // ** Handle Modal
  const handleUpdateModal = id => {
    // dispatch(getAssetTypeByIdAction(id))
    router.push(pathname + '/' + id)
    setIdx(id)
  }

  const handleDeleteModal = id => {
    setIdx(id);
    setDeleteOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state for the specific row
    }));
  };


  const handleDelete = id => {
    // dispatch(deletePermissionAction(id))
    handleDeleteModal()
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
        handleUpdateModal()
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
      name: 'Current Odometer',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.odometer}
        </Typography>
      )
    },

    {
      name: 'Garage Name',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.garage || "Garage "+ row.id}
        </Typography>
      )
    },

    {
      name: 'Garage Address',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.address || 'N/A'}
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
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            <CustomChip
              onClick={() => handleUpdateModal(row.id)}
              size='small'
              label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem'
              }}
            />

            <CustomChip
              onClick={() => handleDeleteModal(row.id)}
              size='small'
              label={<Icon icon='uil:times' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='error'
              skin='light'
              sx={{
                padding: '0.95rem 0rem',
                marginLeft: 3
              }}
            />

            <AlertDialog
              id='delete-Modal'
              icon='tabler:bell-ringing'
              IconWd='35'
              IconHt='35'
              iconColor='#FC3B61'
              context='Are you sure you want to delete this record?'
              close={() => handleDeleteModal(row.id)}
              open={deleteOpen[row.id] || false}
              submit={() => handleDelete(row.id)}
             
            />

          </div>
        )
      }
    }
  ]
}
