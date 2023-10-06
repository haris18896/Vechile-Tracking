/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

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
import RulesAdminHeader from 'src/views/services/rules-admin/rules-admin-header'
import RulesAdminTable from 'src/views/services/rules-admin/rules-admin-table'
import { ServiceWrapper } from 'src/styles/pages/services'
import FuelDetailHeader from 'src/views/services/fuel-details/fuel-detail-header'
import FuelDetailTable from 'src/views/services/fuel-details/fuel-detail-table'

function FuelDetails() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  // ===== Main Variables
  // const rows = getAllAssetTypesList?.data
  // const page = getAllAssetTypesList?.page
  // const limit = getAllAssetTypesList?.limit
  // const total = getAllAssetTypesList?.data.length

  // ===== Test Variables
  const rows = data
  const page = 1
  const limit = data?.limit
  const total = data?.length

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

  return (
    <ServiceWrapper>
      <FuelDetailHeader
        slug={slug}
        open={open}
        customers={customers}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        redirectURL='/services/fuel-details/add'
      />
      <FuelDetailTable
        rows={rows}
        page={page}
        total={total}
        limit={5}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </ServiceWrapper>
  )
}

export const data = [
  {
    id: '1',
    driver_name: 'Mohamed Ibrahim',
    customer: 'Tracking 1',
    petrol: '2 Liter',
    diesel: '5 Liter',
    status: 'Expired',
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
    customer: 'Tracking 2',
    petrol: '2 Liter',
    diesel: '5 Liter',
    days_used: '5',
    asset_name: '770IJA',
    total_amount: '234',
    id: '2',
    status: 'Active',
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
    customer: 'Tracking 3',
    petrol: '2 Liter',
    diesel: '5 Liter',
    asset_name: '770IJA',
    days_used: '5',
    total_amount: '234',
    id: '3',
    status: 'Active',
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
    customer: 'Tracking 4',
    petrol: '2 Liter',
    diesel: '5 Liter',
    asset_name: '770IJA',
    days_used: '5',
    total_amount: '234',
    id: '4',
    status: 'Expired',
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
    customer: 'Tracking 5',
    petrol: '2 Liter',
    diesel: '5 Liter',
    asset_name: '770IJA',
    days_used: '5',
    total_amount: '234',
    id: '5',
    status: 'Expired',
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

FuelDetails.acl = {
  action: 'manage',
  subject: 'manage-fuel-details'
}

FuelDetails.AuthGuard = true

export default FuelDetails
