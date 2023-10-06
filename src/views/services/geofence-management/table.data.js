import React, { useState, useEffect } from 'react'
import { Autocomplete, Box, DialogTitle, TextField, Typography } from '@mui/material'

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
import AlertDialog from 'src/components/Dialogs/AlertDialog'

// ** Google Map
import { SmallMapWrapper, useCommonStyles } from 'src/styles/common'
import { useJsApiLoader, GoogleMap, Marker, Circle } from '@react-google-maps/api'
import GoogleMapLoader from 'src/components/google-map/jsApiLoader'

const users = [
  {
    id: 1,
    name: 'John Doe 1',
    value: 'john.doe1'
  },
  {
    id: 2,
    name: 'Jane Doe 2',
    value: 'jane.doe'
  },
  {
    id: 3,
    name: 'John Doe 3',
    value: 'john.doe3'
  },
  {
    id: 4,
    name: 'Jane Doe 4',
    value: 'jane.doe4'
  }
]

// ** Google Map center
const center = {
  lat: 24.7136,
  lng: 46.6753
}

const containerStyle = {
  width: '700px',
  height: '400px'
}

export const columns = ({ ability, router, setCheckedRows, checkedRows }) => {
  const dispatch = useDispatch()
  const { getCustomerType } = useSelector(state => state.customerTypes)
  const styles = useCommonStyles()

  // ** Modal Stats
  const [idx, setIdx] = useState(null)
  const [map, setMap] = React.useState(null)
  const [deleteOpen, setDeleteOpen] = useState({})
  const [assignUser, setAssignUser] = useState({})
  const [openGeofence, setOpenGeofence] = useState(false)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  // ** Handle Open Geofence Modal
  const handleGeofence = id => {
    setIdx(id)
    setOpenGeofence(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state for the specific row
    }))
  }

  // ** Handle Assign User Modal
  const handleAssignUser = id => {
    setIdx(id)
    setAssignUser(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state for the specific row
    }))
  }

  // ** handle Delete Modal
  const handleDeleteModal = id => {
    setIdx(id)
    setDeleteOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the open state for the specific row
    }))
  }

  // ** Handle Delete
  const handleDelete = id => {
    // dispatch(deleteCustomerTypeAction(id))
    setDeleteOpen(false)
  }

  const handleVehicleModal = row => {
    const isChecked = checkedRows.some(checkedRow => checkedRow === row)
    setIdx(row.id)

    if (isChecked) {
      // Remove the clicked row from the checkedRows array
      const updatedCheckedRows = checkedRows.filter(checkedRow => checkedRow !== row)
      setCheckedRows(updatedCheckedRows)
    } else {
      // Add the clicked row to the checkedRows array
      setCheckedRows([...checkedRows, row])
    }
  }

  // ** Form Validation
  const schema = Yup.object().shape({
    name: Yup.string().required('Geofence name is required'),
    user: Yup.string().required('User is required')
  })

  // ** Formik Values
  const formik = useFormik({
    initialValues: {
      name: '',
      user: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('name', values.name)
        data.append('user', values.user)

        // dispatch(updateAssetTypeAction({ id: idx, data }))
        console.log('values to be submitted : ', values)
        resetForm()
        setAssignUser(false)
      }
    }
  })

  return [
    {
      name: 'Geofence Name',
      sortable: false,
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type='checkbox' onChange={() => handleVehicleModal(row)} checked={checkedRows.indexOf(row) !== -1} />
          {row.geofenceName}
        </div>
      )
    },
    {
      name: 'Creation Date',
      sortable: false,
      selector: row => `${row?.created_at.split('T')[0]} ${row?.created_at.split('T')[1]}`
    },
    {
      name: 'Geofence Type',
      sortable: false,
      selector: row => row?.type
    },
    {
      name: 'Customer Type',
      sortable: false,
      selector: row => row?.customerType
    },
    {
      name: 'Bounds',
      sortable: false,
      selector: row => `${row?.lat}, ${row?.lng}`
    },
    {
      name: 'Radius',
      sortable: false,
      selector: row => row?.radius
    },
    {
      name: 'Zone',
      sortable: false,
      selector: row => row?.zone
    },
    {
      name: 'Actions',
      sortable: false,
      minWidth: '220px',
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            <CustomChip
              onClick={() => handleAssignUser(row.id)}
              size='small'
              label={
                <Icon
                  icon='mdi:user-arrow-left-outline'
                  width='15'
                  height='15'
                  color='success'
                  style={{ marginTop: '4px' }}
                />
              }
              color='info'
              skin='light'
              sx={{
                padding: '0.95rem 0rem',
                marginRight: '0.25rem'
              }}
            />
            {/* {ability.can('update', 'update-geofence-management') && (
              <CustomChip
                onClick={() => router.push(`/services/geofence-management/edit/${row.id}`)}
                size='small'
                label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
                color='success'
                skin='light'
                sx={{
                  padding: '0.95rem 0rem',
                  marginRight: '0.25rem'
                }}
              />
            )} */}

            <CustomChip
              onClick={() => router.push('/services/geofence-management/assign-vehicles')}
              size='small'
              label={<Icon icon='gis:car' width='15' height='15' color='warning' style={{ marginTop: '4px' }} />}
              color='warning'
              skin='light'
              sx={{
                padding: '0.95rem 0rem',
                marginRight: '0.25rem'
              }}
            />

            <CustomChip
              onClick={() => handleGeofence(row.id)}
              size='small'
              label={
                <Icon
                  icon='ic:baseline-location-on'
                  width='15'
                  height='15'
                  color='success'
                  style={{ marginTop: '4px' }}
                />
              }
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem',
                marginRight: '0.25rem'
              }}
            />

            {/* {ability.can('delete', 'delete-geofence-management') && (
              <CustomChip
                onClick={() => handleDeleteModal(row.id)}
                size='small'
                skin='light'
                label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                color='error'
                sx={{
                  padding: '0.9rem 0rem'
                }}
              />
            )} */}

            <AddFormDialog
              id='geofence-modal'
              title={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                  px={0}
                >
                  <DialogTitle sx={{ padding: 0, fontWeight: '600', color: '#fff' }}>Geofence on Map</DialogTitle>
                  <Icon
                    color='#fff'
                    icon='uil:times'
                    width={25}
                    height={25}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleGeofence(row.id)}
                  />
                </Box>
              }
              close={() => handleGeofence(row.id)}
              open={openGeofence[row.id] || false}
              submit={() => formik.handleSubmit()}
              bg='#fff'
              titleBg='#0F224B'
            >
              <SmallMapWrapper>
                <GoogleMapLoader>
                  {isLoaded =>
                    isLoaded && (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={13}
                        center={{
                          lat: row?.lat,
                          lng: row?.lng
                        }}
                      >
                        <Marker
                          position={{
                            lat: row?.lat,
                            lng: row?.lng
                          }}
                        />
                        <Circle
                          center={{
                            lat: row?.lat,
                            lng: row?.lng
                          }}
                          radius={row?.radius}
                          options={{
                            strokeColor: '#FC3B61',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FC3B61',
                            fillOpacity: 0.35,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            visible: true,
                            radius: 3000,
                            zIndex: 1
                          }}
                        />
                      </GoogleMap>
                    )
                  }
                </GoogleMapLoader>
              </SmallMapWrapper>
            </AddFormDialog>

            <AddFormDialog
              id='assign-user-Modal'
              title={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                  px={0}
                >
                  <DialogTitle sx={{ padding: 0, fontWeight: '600', color: '#556485' }}>
                    Assign Geofence To User
                  </DialogTitle>
                  <Icon
                    color='#000'
                    icon='uil:times'
                    width={25}
                    height={25}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleAssignUser(row.id)}
                  />
                </Box>
              }
              // title='Assign Geofence To User'
              // context={`Assign user to ${row?.geofenceName} Geofence`}
              close={() => handleAssignUser(row.id)}
              open={assignUser[row.id] || false}
              submit={() => formik.handleSubmit()}
              save='Save'
              btnFull={true}
              bg='#fff'
            >
              <form name='add-customer-type' onSubmit={formik.handleSubmit}>
                <FieldWrapper>
                  <TextLabel id='geofence-name' sx={{ marginBottom: '0.25rem' }}>
                    Geofence Name
                  </TextLabel>
                  <TextInput
                    fullWidth
                    id='name'
                    name='name'
                    type='text'
                    variant='outlined'
                    className={styles.TextField}
                    placeholder='Enter Geofence Name'
                    {...formik.getFieldProps('name')}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <TextLabel id='user-name' sx={{ marginBottom: '0.25rem' }}>
                    User
                  </TextLabel>
                  <Autocomplete
                    fullWidth
                    id='user'
                    name='user'
                    type='text'
                    variant='outlined'
                    placeholder='Select User'
                    className={styles.AutoCompleteSelect}
                    value={users.find(user => user.value === formik.values.user)}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('user', newValue?.value)
                    }}
                    error={formik.touched.user && Boolean(formik.errors.user)}
                    helperText={formik.touched.user && formik.errors.user}
                    options={users}
                    getOptionLabel={option => option.name}
                    renderInput={params => <TextField {...params} variant='outlined' placeholder='Select User' />}
                  />
                </FieldWrapper>
              </form>
            </AddFormDialog>

            <AlertDialog
              id='delete-Modal'
              icon='tabler:bell-ringing'
              IconWd='35'
              IconHt='35'
              iconColor='#FC3B61'
              context={`Are you sure you want to delete ${row?.geofenceName} Geofence?`}
              close={() => handleDeleteModal(row.id)}
              open={deleteOpen[row.id] || false}
              submit={() => handleDelete(idx)}
            />
          </div>
        )
      }
    }
  ]
}

export const rows = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
    id: '7',
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
