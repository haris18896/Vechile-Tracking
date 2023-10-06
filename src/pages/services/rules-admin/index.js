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
import RulesAdminHeader from 'src/views/services/rules-admin/rules-admin-header'
import RulesAdminTable from 'src/views/services/rules-admin/rules-admin-table'
import { ServiceWrapper } from 'src/styles/pages/services'
import RulesAddHeader from 'src/views/services/rules-admin/Add/rules-add-header'
import RulesAdminForm from 'src/views/services/rules-admin/Add/rules-admin'

function RulesAdmin() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  const [values, setValues] = useState({
    account: ''
  })

  // ===== Main Variables
  // const rows = getAllAssetTypesList?.data
  // const page = getAllAssetTypesList?.page
  // const limit = getAllAssetTypesList?.limit
  // const total = getAllAssetTypesList?.data.length

  // ===== Test Variables
  const rows = data
  const page = 3
  const limit = data?.limit
  const total = data?.length

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')

  console.log('slug', slug)

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
    else {
      setValues({ ...values, [name]: value })
    }
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

  // Filtering data based on account
  const filteredData = data?.filter(data => data.id === values.account)

  return (
    <ServiceWrapper>
      <RulesAdminHeader
        slug={slug}
        open={open}
        customers={rows}
        values={values}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onChangeHandler={onChangeHandler}
        redirectURL='/services/rules-admin/add'
      />
      <RulesAdminTable
        // rows={rows}
        rows={filteredData}
        page={page}
        total={total}
        limit={limit}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </ServiceWrapper>
  )
}

export const data = [
  {
    rule_id: '1',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'Yes',
    driver_name: 'Mohamed Ibrahim',
    id: '1',
    status: 'Expired',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    days_used: '5',
    account: 'Tracking 1',
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
    rule_id: '2',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'No',
    driver_name: 'Mohamed Ibrahim',
    days_used: '5',
    account: 'Tracking 2',
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
    rule_id: '3',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'Yes',
    driver_name: 'Mohamed Ibrahim',
    account: 'Tracking 3',
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
    rule_id: '4',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'No',
    driver_name: 'Mohamed Ibrahim',
    account: 'Tracking 4',
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
    rule_id: '5',
    description: 'Car Moving',
    cron_rule: '5min',
    active: 'No',
    driver_name: 'Mohamed Ibrahim',
    account: 'Tracking 5',
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

export default RulesAdmin

RulesAdmin.acl = {
  action: 'manage',
  subject: 'manage-rules-admin'
}

RulesAdmin.AuthGuard = true
