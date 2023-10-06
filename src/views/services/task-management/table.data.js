import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'

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
import AlertDialog from 'src/components/Dialogs/AlertDialog'

export const columns = () => {
  const dispatch = useDispatch()
  const { getCustomerType } = useSelector(state => state.customerTypes)

  // ** Modal Stats
  const [deleteOpen, setDeleteOpen] = useState({})
  const [openState, setOpenState] = useState({})
  const [idx, setIdx] = useState(null)

  // ** Handle Modal
  const handleDeleteModal = id => {
    setIdx(id);
    setDeleteOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state for the specific row
    }));
  };
  
  const handleUpdateModal = id => {
    // dispatch(getPermissionByIdAction(id));
    setIdx(id);
    setOpenState(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state for the specific row
    }));
  };

  const handleDelete = id => {
    // dispatch(deletePermissionAction(id))
    handleDeleteModal()
  }

  const handleUpdateClose = () => {
    setOpenState(false)
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

  const Title = () => {
    const styles = {
      '&.MuiBox-root .MuiTypography-root ':{
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '#00000DE'
      }
    }

    return (
      <Box display="flex" gap={5} sx={styles}>
      <Typography>Finish</Typography>
      <Typography>Delete</Typography>
      </Box>
    )
  }

  return [
    {
      name: 'Vehicle Number',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.vehicle_no}
        </Typography>
      )
    },

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
      name: 'Mobile No.',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.mobile_no}
        </Typography>
      )
    },

    {
      name: 'Customer Name',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.customer}
        </Typography>
      )
    },

    {
      name: 'Customer Mobile No.',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.customer_mobile}
        </Typography>
      )
    },

    {
      name: 'Job To',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.job}
        </Typography>
      )
    },

    {
      name: 'Job Date',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.job_date}
        </Typography>
      )
    },

    {
      name: 'Job Time',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.job_time}
        </Typography>
      )
    },


    {
      name: 'Job Type',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.job_type}
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
      name: <Title />,
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            <CustomChip
              onClick={() => handleUpdateModal(row.id)}
              size='small'
              label={<Icon icon='lucide:edit-3' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem'
              }}
            />


          <CustomChip
              onClick={() => handleDeleteModal(row.id)}
              size='small'
              skin='light'
              label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
              color='error'
              sx={{
                padding: '0.9rem 0rem',
                marginLeft: 5
              }}
            />

            <AlertDialog
              id='update-Modal'
              icon='fluent-mdl2:completed-solid'
              IconWd='38'
              IconHt='38'
              iconColor='#2FC17E'
              context='Are you sure you want to finish the job?'
              close={() => handleUpdateClose()}
              open={openState[row.id] || false}
              submit={() => formik.handleSubmit()}
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
