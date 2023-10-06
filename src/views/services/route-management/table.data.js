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
import AlertDialog from 'src/components/Dialogs/AlertDialog'


export const columns = () => {
  const dispatch = useDispatch()
  const { getCustomerType } = useSelector(state => state.customerTypes)

  // ** Modal Stats
  const [updateOpen, setUpdateOpen] = useState(false)
  const [idx, setIdx] = useState(null)

  const [deleteOpen, setDeleteOpen] = useState({})

  // ** Handle Modal
  const handleDeleteModal = id => {
    setIdx(id);
    setDeleteOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state for the specific row
    }));
  };

  const handleDelete = id => {
    handleDeleteModal()
  }



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
      name: 'Trip Code',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.trip_code}
        </Typography>
      )
    },

    {
      name: 'Trip Name',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.trip_name}
        </Typography>
      )
    },

    {
      name: 'Zone Details',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.trip_zone}
        </Typography>
      )
    },

    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between '>
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

            <CustomChip
              onClick={() => handleDeleteModal(row.id)}
              size='small'
              skin='light'
              label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
              color='error'
              sx={{
                padding: '0.9rem 0rem',
                marginLeft: '0.8rem'
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

export const rows = [
  {
    trip_code: 'GJHK2354TGHJ45',
    trip_name: 'Jeddah Pickup',
    created_at: '2021-09-01T15:06:11',
    type: 'Circle',
    customerType: 'type',
    lat: 24.7136,
    lng: 46.6753,
    radius: 3000,
    zone: 'zone',
    speed: '77'
  },
  {
    trip_code: 'GJHK2354TGHJ45',
    trip_name: 'Jeddah Pickup',
    geofenceName: 'Jeddah',
    created_at: '2021-09-01T15:06:11',
    type: 'Circle',
    customerType: 'type',
    lat: 24.7136,
    lng: 46.6753,
    radius: 3000,
    zone: 'zone',
    speed: '77'
  },
  {
    trip_code: 'GJHK2354TGHJ45',
    trip_name: 'Jeddah Pickup',
    geofenceName: 'Jeddah',
    created_at: '2021-09-01T15:06:11',
    type: 'Circle',
    customerType: 'type',
    lat: 24.7136,
    lng: 46.6753,
    radius: 3000,
    zone: 'zone',
    speed: '77'
  },
  {
    trip_code: 'GJHK2354TGHJ45',
    trip_name: 'Jeddah Pickup',
    geofenceName: 'Jeddah',
    created_at: '2021-09-01T15:06:11',
    type: 'Circle',
    customerType: 'type',
    lat: 24.7136,
    lng: 46.6753,
    radius: 3000,
    zone: 'zone',
    speed: '77'
  }
]
