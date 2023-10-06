/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'

import AssetTypesHeader from 'src/views/services/asset-types/asset-type-header'
import AssetTypesTable from 'src/views/services/asset-types/asset-type-table'

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

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ServiceWrapper } from 'src/styles/pages/services'

function AllocateAssets() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  const [values, setValues] = useState({
    account: '',
    asset_name: '',
    vehicle_no: ''
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

  const onChangeHandler = (name, value) => {
    setValues({ ...values, [name]: value })
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
      <AssetTypesHeader
        slug={slug}
        ability={ability}
        customers={data}
        handleOpen={handleOpen}
        onChangeHandler={onChangeHandler}
        values={values}
        redirectURL='/services/add'
      />
      <AssetTypesTable
        dense
        rows={data}
        page={1}
        // total={total}
        total={data?.length}
        // limit={limit}
        limit={5}
        ability={ability}
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
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 1',
    asset_name: 'Driver',
    allocation: 'Mohamed Ibrahim',
    license_no: '23412231',
    license_type: 'Permanent',
    sponsor: 'N/A',
    vehicle_condition: 'A Grade',
    current_odometer: '100 Km/h',
    emp_id: '121',
    emp_status: 'Part time',
    nationality: 'Emirati',
    mobile_no: '009221231',
    asset_type: 'Light Vehicle',
    days_used: '5',
    status: 'Active',
    total_amount: '234',
    address: '123 Main Street, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '16 May 2021'
  },
  {
    id: '2',
    driver_name: 'Shoaib',
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 2',
    asset_name: 'Driver',
    allocation: 'Shoaib',
    license_no: '8892231',
    license_type: 'Permanent',
    sponsor: 'N/A',
    vehicle_condition: 'B Grade',
    current_odometer: '80 Km/h',
    emp_id: '122',
    emp_status: 'full time',
    nationality: 'Indian',
    mobile_no: '009254412',
    asset_type: 'Light Vehicle',
    days_used: '3',
    status: 'Expired',
    total_amount: '884',
    address: '456 Oak Avenue, Abu Dhabi, 54321, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '2 Dec 2021'
  },
  {
    id: '3',
    driver_name: 'Ali Raza',
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 3',
    asset_name: 'Driver',
    allocation: 'Ali Raza',
    license_no: '76712231',
    license_type: 'Temporary',
    sponsor: 'N/A',
    vehicle_condition: 'A Grade',
    current_odometer: '95 Km/h',
    emp_id: '123',
    emp_status: 'full time',
    nationality: 'Pakistani',
    mobile_no: '0092445333',
    asset_type: 'Heavy Vehicle',
    days_used: '3',
    status: 'Active',
    total_amount: '884',
    address: '654 Cedar Drive, Ajman, 86420, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '6 June 2021'
  },
  {
    id: '4',
    driver_name: 'Sara',
    name: 'Mohamed',
    last_name: 'Ibrahim',
    assignment_type: 'N/A',
    customer: 'Tracking 4',
    asset_name: 'Driver',
    allocation: 'Sara',
    license_type: 'Temporary',
    sponsor: 'N/A',
    license_no: '9877721',
    vehicle_condition: 'A Grade',
    current_odometer: '92 Km/h',
    emp_id: '124',
    emp_status: 'Part time',
    nationality: 'Emirati',
    mobile_no: '009211289',
    asset_type: 'Heavy Vehicle',
    days_used: '1',
    status: 'Expired',
    total_amount: '233',
    address: '321 Pine Road, Sharjah, 13579, UAE',
    date: '2021-05-01T12:00:00',
    created_at: '26 June 2021'
  }
]

AllocateAssets.acl = {
  action: 'manage',
  subject: 'manage-allocate-asset'
}

AllocateAssets.AuthGuard = true

export default AllocateAssets
