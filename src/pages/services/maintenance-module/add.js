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

function MaintenanceModuleAdd() {
  const dispatch = useDispatch()
  const { getAllCustomersList, loading} = useSelector(state => state.customers)
  const { getAllAssetTypesList } = useSelector(state => state.assetTypes)

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
  }, [slug])

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
      asset_name: Yup.string().required('Asset name is required'),
      driver: Yup.string().required('Driver name is required'),
      service_date: Yup.string().required('Service date is required'),
      service_type: Yup.string().required('Service Type is required'),
    })

    // ** Form Values
    const formik = useFormik({
      initialValues: {
        account: '',
        service_date: '',
        asset_name: '',
        garage_name: '',
        driver: '',
        garage_address: '',
        current_odometer: '',
        work_done: '',
        service_type: '',
        total_amount: '',

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

  return (
    <ServiceWrapper>
      <MaintenanceAddHeader
        slug={slug}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        handleSubmit = {formik.handleSubmit}
        redirectURL='/services/maintenance-module'
      />

      <MaintenanceModule customers={getAllCustomersList?.data} formik={formik} />
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

MaintenanceModuleAdd.acl = {
  action: 'manage',
  subject: 'manage-maintenance-module'
}

MaintenanceModuleAdd.AuthGuard = true

export default MaintenanceModuleAdd
