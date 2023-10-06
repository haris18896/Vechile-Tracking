/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, use } from 'react'

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
import GprsAddHeader from 'src/views/services/gprs-command/Add/gprs-add-header'
import GprsCommand from 'src/views/services/gprs-command/Add/gprs-command'
import { ServiceWrapper } from 'src/styles/pages/services'
import GprsHeader from 'src/views/services/gprs-command/gprs-header'
import GprsTable from 'src/views/services/gprs-command/gprs-table'
import GPRSCommand from './index'

function GPRSCommandEdit() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)
  const [showReport, setShowReport] = useState(false)

  // ===== Main Variables
  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

  const customers = [
    {
      company_name: 'Gorex'
    }
  ]

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

  console.log('slug', slug)

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
    asset_name: Yup.string().required('Asset Name is required'),
    command: Yup.string().required('Command is required')
  })

  // ** Form Values
  const formik = useFormik({
    initialValues: {
      account: '',
      command_type: '',
      asset_name: '',
      parameter: '',
      command: '',
      all_assets: ''
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

  const handleReportShow = state => {
    setShowReport(state)
  }

  return (
    <ServiceWrapper>
      {showReport ? (
        <>
          <GprsHeader
            slug={slug}
            open={open}
            customers={customers}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onChangeHandler={onChangeHandler}
          />
          <GprsTable
            rows={rows}
            page={page}
            total={total}
            limit={limit}
            loading={loading}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <GprsAddHeader handleReport={handleReportShow} handleSubmit={formik.handleSubmit} />
          <GprsCommand customers={getAllCustomersList?.data} formik={formik} />
        </>
      )}
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

GPRSCommandEdit.acl = {
  action: 'manage',
  subject: 'manage-gprs-command'
}

GPRSCommandEdit.AuthGuard = true

export default GPRSCommandEdit
