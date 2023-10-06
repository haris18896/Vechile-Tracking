/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

// ** jwt hook
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

// ** Components
import FineManagementHeader from 'src/views/services/fine-management/fine-management-header'
import FineManagementTable from 'src/views/services/fine-management/fine-management-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { ServiceWrapper } from 'src/styles/pages/services'
import { getAllAssetTypesAction } from 'src/store/settings/asset-types/assetTypesAction'

function Services() {
  const dispatch = useDispatch()
  const { getAllCustomersList } = useSelector(state => state.customers)
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)

    // ===== Main Variables
  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const limit = getAllAssetTypesList?.limit
  const total = getAllAssetTypesList?.data.length

  // ** State
  const [slug, setSlug] = useState('')

  const [values, setValues] = useState({
    account: '',
    driver: ''
,   from_date: '',
    to_date: '',
    from_time: '',
    to_time: '',
  })

  const { account } = values;

  // ** Slug
  useEffect(() => {
    if (account) {
      useJwt.setSlug(account)
      dispatch(getAllAssetTypesAction({ page, limit, slug }))
    }
  }, [account])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit, slug }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit, account }))
  }

  const handleChange = (name, value) => {
    setValues ({...values, [ name ]: value})
  }

  return (
    <ServiceWrapper>
      <FineManagementHeader
        slug={slug}
        customers = {data}
        open={open}
        onChangeHandler={handleChange}
        values = {values}
        redirectURL='/services/fine-management/add'
      />
      <FineManagementTable
        rows={data}
        page={1}
        total={10}
        limit={100}
        loading={false}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </ServiceWrapper>
  )
}

export const data = [
  {
    id: '1',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '2',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '3',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '4',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '5',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
  {
    id: '6',
    fine_no: '12',
    driver: 'Mohamed Ibrahim',
    customer: 'Demo',
    asset_name: '7685 RKA',
    days_used: '10',
    cost: '4000 SAR',
    amount: '1000 SAR',
    vehicle_id: '6',
    status: 'idle',
    description: 'Lorem Ipsum',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    created_at: '16 May 2021'
  },
]

export default Services
