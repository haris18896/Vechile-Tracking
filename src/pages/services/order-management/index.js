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
import OrderManagementHeader from 'src/views/services/order-management/order-management-header'
import OrderManagementTable from 'src/views/services/order-management/order-management-table'
import { ServiceWrapper } from 'src/styles/pages/services'

function OrderManagement() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

  const [values, setValues] = useState({
    account: '',
    vehicle_id: ''
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
    setValues({...values, [name]: value})
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
      <OrderManagementHeader
        slug={slug}
        open={open}
        changeHandler={onChangeHandler}
        redirectURL='/services/order-management/add'
        data = {data}
        values = {values}
      />
      <OrderManagementTable
        rows={rows}
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
    id: '1',
    customer: 'Tracking 1',
    asset_name: '716 FTG',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '716 FTG',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
  {
    id: '2',
    customer: 'Tracking 2',
    asset_name: '1234 TGH',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '1234 TGH',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
  {
    id: '3',
    customer: 'Tracking 3',
    asset_name: '788 GTH',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '788 GTH',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
  {
    id: '4',
    customer: 'Tracking 4',
    asset_name: '099 YQT',
    cost: '500 AED',
    work_order_no: '50',
    labor_time: '48',
    vehicle_id: '099 YQT',
    order_status: 'Pending',
    service_type: 'Repair',
    date_in: '2021-05-01T12:00:00',
    technician_name: 'Imran',
    date_out: '2021-05-01T12:00:00',
    location: 'King Fahad Road, Riyadh, Saudi Arabia',
    solution: 'N/A',
    created_at: '16 May 2021'
  },
]

export default OrderManagement
