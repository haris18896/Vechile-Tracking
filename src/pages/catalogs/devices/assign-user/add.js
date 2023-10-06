/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllAssetTypesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/asset-types/assetTypesAction'

import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Tab, Tabs } from '@mui/material'
import MaintenanceAddHeader from 'src/views/services/maintenance-module/Add/maintenance-add-header'
import MaintenanceModule from 'src/views/services/maintenance-module/Add/maintenance-module'
import { ServiceWrapper } from 'src/styles/pages/services'
import DevicesAddHeader from 'src/views/catalogs/devices/Add/devices-add-header'
import DevicesList from 'src/views/catalogs/devices/Add/devices-list'
import AssignUserAddHeader from 'src/views/catalogs/devices/AssignUser/Add/assign-user-add-header'
import AssignUser from 'src/views/catalogs/devices/AssignUser/Add/assign-user'
import { useRouter } from 'next/router'

function AssignUserAdd() {
  const dispatch = useDispatch()
  const { getAllCustomersList, loading } = useSelector(state => state.customers)
  const { getAllAssetTypesList } = useSelector(state => state.assetTypes)

  // ** Router Change
  const router = useRouter()

  // ===== Main Variables
  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
  }

  // ** Customers
  useEffect(() => {
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }, [])

  // ** Handle Modal
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** Slug
  useEffect(() => {
    if (slug) {
      useJwt.setSlug(slug)
      dispatch(getAllAssetTypesAction({ page, limit, slug }))
    }
  }, [slug, router])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit, slug }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit, slug }))
  }

  // FORMIK

  // ** Form Validation
  const schema = Yup.object().shape({
    account: Yup.string().required('Account is required'),
    user: Yup.string().required('User is required'),
    assign_date: Yup.string().required('Please select a date')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      deviceList: [
        { title: 'Device 1', id: 1, year: 1994 },
        { title: 'Device 2', id: 2, year: 1972 },
        { title: 'Device 3', id: 3, year: 1974 },
        { title: 'Device 4', id: 4, year: 2008 },
        { title: 'Device 5', id: 5, year: 1957 },
        { title: 'Device 6', id: 6, year: 1993 },
        { title: 'Device 7', id: 7, year: 1994 }
      ],
      account: '',
      user: '',
      assign_date: '',
      assignedDevicesList: []
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (isObjEmpty(formik.errors)) {
        const data = {}

        const role = useJwt.getUserData().role

        if (role === 'admin') {
          data.user_type = 'main_db_admin'
        }

        if (slug) {
          data.slug = slug
        }

        console.log('data to be submitted', data)

        resetForm()
        handleClose()
      }
    }
  })

  console.log('getAllCustomersList?.data', getAllCustomersList?.data)

  return (
    <ServiceWrapper>
      <AssignUserAddHeader handleSubmit={formik.handleSubmit} redirectURL='/services/maintenance-module' />

      <AssignUser customers={getAllCustomersList?.data} formik={formik} />
    </ServiceWrapper>
  )
}

export const data = [
  {
    driver_name: 'Mohamed Ibrahim',
    id: '1',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    days_used: '5',
    asset_name: '770IJA',
    total_amount: '234',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '16 May 2021'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    days_used: '5',
    asset_name: '770IJA',
    total_amount: '234',
    id: '2',
    status: 'driving',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '44',
    odometer: '1234567',
    ignition_status: 'on',
    gps_status: 'on',
    gsm_status: 'on',
    battery: '100',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '16 Feb 2021'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    asset_name: '770IJA',
    days_used: '5',
    total_amount: '234',
    id: '3',
    status: 'stopped',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '13 Jan 2023'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    asset_name: '770IJA',
    days_used: '5',
    total_amount: '234',
    id: '4',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '11 July 2022'
  },
  {
    driver_name: 'Mohamed Ibrahim',
    asset_name: '770IJA',
    days_used: '5',
    total_amount: '234',
    id: '5',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890',
    created_at: '11 June 2022'
  }
]

export default AssignUserAdd

AssignUserAdd.acl = {
  action: 'manage',
  subject: 'manage-device'
}

AssignUserAdd.AuthGuard = true
