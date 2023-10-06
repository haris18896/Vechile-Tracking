/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Tab, Tabs } from '@mui/material'
import RouteAddHeader from 'src/views/services/route-management/Add/routes-add-header'
import RouteManagement from 'src/views/services/route-management/Add/route-management'
import { getAllCountriesAction, getAllStatesAction, getAllCitiesAction } from 'src/store/locations/locationsAction'

// ** Third Party Imports
import * as Yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import { ServiceWrapper } from 'src/styles/pages/services'
import AddTrip from 'src/views/tracking/live-tracking/create-assign-trip/add/add-trip'
import AddTripHeader from 'src/views/tracking/live-tracking/create-assign-trip/add/add-trip-header'
import Trip from '../index'

function CreateAssignTripAdd() {
  const dispatch = useDispatch()
  const countries = useSelector(state => state.locations?.getAllCountriesList?.data)
  const cities = useSelector(state => state.locations?.getAllCitiesList?.data)
  const MarkerAddress = useSelector(state => state.locations?.getAddressList?.data)

  const [address, setAddress] = useState('')
  const [mapCenter, setMapCenter] = useState({ lat: 24.7136, lng: 46.6753 })
  const [tableData, setTableData] = useState([])

  let initialMapValues = { lat: 24.7136, lng: 46.6753 }

  const [markers, setMarkers] = useState([
    {
      position: initialMapValues,
      icon: '/images/map-markers/marker.svg'
    }
  ])

  // ===== Main Variables
  // const rows = getAllAssetTypesList?.data
  // const page = getAllAssetTypesList?.page
  // const limit = getAllAssetTypesList?.limit
  // const total = getAllAssetTypesList?.data.length

  const customers = [
    {
      company_name: 'Gorex'
    }
  ]

  // ** State
  const [open, setOpen] = useState(false)

  const onChangeHandler = e => {
    const { name, value } = e.target
    switch (name) {
      case 'address':
        setAddress(value)
    }
  }

  // ** Routes
  useEffect(() => {
    // dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
    dispatch(getAllCountriesAction({ page: 1, limit: 100 }))
    dispatch(getAllCitiesAction({ page: 1, limit: 10, stateId: 1 }))
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Styled Components
  const ReturnAssetWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.common.white
  }))

  // ============== FORMIK

  const schema = Yup.object().shape({
    customer: Yup.string().required('Customer is required'),
    account: Yup.string().trim().required('Account is required'),
    bus_no: Yup.string().required('Bus No. is required'),
    trip_code: Yup.number().required('Trip code is required'),
    trip_name: Yup.number().required('Trip Name is required'),
    emailID: Yup.string().required('Email is required'),
    zone: Yup.string().required('Zone is required'),
    address: Yup.string().required('Address is required'),
    point_name: Yup.string().required('Point Name is required'),
    sequence: Yup.string().required('Sequence is required'),
    valid_from: Yup.string().required('Valid From is required'),
    valid_to: Yup.string().required('Valid To is required')
  })

  const formik = useFormik({
    initialValues: {
      customer: '',
      account: '',
      bus_no: '',
      trip_code: '',
      trip_name: '',
      emailID: '',
      zone: '',
      address: '',
      point_name: '',
      sequence: '',
      valid_from: '',
      valid_to: ''
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = new FormData()
        data.append('customer', values.vin)
        console.log('values to be submitted : ', values)

        // dispatch(
        //   registerAssetAction({
        //     data,
        //     callBack: () => {
        //       router.back()
        //       resetForm()
        //     }
        //   })
        // )
      }
    }
  })

  // Address Options
  const locationOptions = [
    {
      id: 1,
      name: 'Select'
    },
    {
      id: 2,
      name: 'Search on map'
    },
    {
      id: 3,
      name: 'Geofence'
    },
    {
      id: 4,
      name: 'History'
    }
  ]

  // Map Click Handler
  const handleMapClick = event => {
    setMapCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() })
    setMarkers([
      ...markers,
      {
        position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        icon: '/images/map-markers/marker.svg'
      }
    ])
  }

  const clearMap = () => {
    setMarkers([
      {
        position: initialMapValues,
        icon: '/images/map-markers/marker.svg'
      }
    ])
  }

  return (
    <ServiceWrapper>
      <AddTripHeader
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        title='Create/Assign Trip'
        clearMap={clearMap}
        submitHandler={formik.handleSubmit}
      />

      <AddTrip
        onChangeHandler={onChangeHandler}
        address={address}
        locationSelections={locationOptions}
        mapCenter={mapCenter}
        tableData={tableData}
        handleMapClick={handleMapClick}
        markers={markers}
        formik={formik}
      />
    </ServiceWrapper>
  )
}

export default CreateAssignTripAdd

CreateAssignTripAdd.acl = {
  action: 'manage',
  subject: 'manage-live-tracking-create-assign-trip'
}

CreateAssignTripAdd.AuthGuard = true
