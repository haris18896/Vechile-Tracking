/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { getAllProfilesAction } from 'src/store/catalogs/profile/profileAction'
import { resetProfile } from 'src/store/catalogs/profile/profileSlice'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import DriverHeader from 'src/views/catalogs/drivers/driver-header'
import DriverTable from 'src/views/catalogs/drivers/driver-table'
import WaslDriverHeader from 'src/views/catalogs/drivers/wasl-driver/wasl-driver-header'
import WaslDriverTable from 'src/views/catalogs/drivers/wasl-driver/wasl-driver-table'

import { styled, useTheme } from '@mui/material/styles'
import { Box, Tab, Tabs } from '@mui/material'
import { getAllDriversAction, getAllWASLDriversAction } from 'src/store/catalogs/driver/driversActions'

import useJwt from 'src/auth/jwt/useJwt'
import { getAllActivitiesAction } from 'src/store/settings/activity/activityAction'
import {
  handleWASLLimitAction,
  handleWASLPageAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/catalogs/assets/assetsActions'

function Driver() {
  const ability = useContext(AbilityContext)

  // ** Super Admin
  const is_super_admin = useJwt.getUserData()?.is_super_admin

  const router = useRouter()
  const dispatch = useDispatch()
  const [customerId, setCustomerId] = useState('')
  const [open, setOpen] = useState(false)
  // ** States
  const [slug, setSlug] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [wasl, setWasl] = useState(false)
  const [isWaslUpdate, setIsWaslUpdate] = useState(false)
  const [updateData, setUpdateData] = useState({})

  const { loading } = useSelector(state => state.profile)
  const { getAllDriversList, getAllWASLDriversList } = useSelector(state => state.driver)
  const customers = useSelector(state => state.customers?.getAllCustomersList?.data)
  const { getAllCustomersList } = useSelector(state => state.customers)

  const rows = wasl ? getAllWASLDriversList?.data : getAllDriversList?.data
  const page = wasl ? getAllWASLDriversList?.page : getAllDriversList?.page
  const limit = wasl ? getAllWASLDriversList?.limit : getAllDriversList?.limit
  const total = wasl ? getAllWASLDriversList?.total : getAllDriversList?.total
  const customersList = getAllCustomersList?.data

  // ** Rows filter to get only teachers data
  const filteredRows = rows?.filter(row => row.profile_type?.id === 3)

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
    if (name === 'inputValue') setInputValue(value)
  }

  useEffect(() => {
    if (slug) {
      dispatch(getAllProfilesAction({ page, limit, customer_id: slug, is_super_admin }))
    }
  }, [page, limit, slug])

  useEffect(() => {
    dispatch(getAllActivitiesAction({ page: 1, limit: 'all' }))
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
    dispatch(getAllDriversAction({ page: 1, limit: 10 }))
    dispatch(getAllWASLDriversAction({ page: 1, limit: 10 }))
  }, [])

  const handleLimitChange = e => {
    wasl
      ? dispatch(handleWASLLimitAction({ newLimit: e.target.value, oldLimit: limit }))
      : dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    wasl
      ? dispatch(handleWASLPageAction({ newLimit: e.target.value, oldLimit: limit }))
      : dispatch(handlePageAction({ page: pg, limit }))
  }

  useEffect(() => {
    return () => {
      dispatch(resetProfile())
    }
  }, [])

  const redirectWasl = value => {
    setWasl(value)
  }

  // ** Handle Modal
  const handleOpen = () => {
    setOpen(true)
    setIsWaslUpdate(false)
    setUpdateData({})
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))

    // dispatch(getAllRolesAction({ page: 1, limit: 100 }))
  }

  const handleClose = () => {
    setOpen(false)
    setIsWaslUpdate(false)
    setUpdateData({})
  }

  // ** Styled Components
  const CatalogsWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.common.white
  }))

  return !wasl ? (
    <CatalogsWrapper>
      <DriverHeader
        slug={slug}
        router={router}
        ability={ability}
        customers={customersList}
        inputValue={inputValue}
        onChangeHandler={onChangeHandler}
        redirectWasl={redirectWasl}
      />

      <DriverTable
        slug={slug}
        rows={rows}
        page={page}
        limit={limit}
        total={total}
        router={router}
        ability={ability}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </CatalogsWrapper>
  ) : (
    <CatalogsWrapper>
      <WaslDriverHeader
        open={open}
        slug={slug}
        ability={ability}
        handleOpen={handleOpen}
        handleClose={handleClose}
        customerId={customerId}
        customersList={customersList}
        onChangeHandler={onChangeHandler}
        redirectWasl={redirectWasl}
        isUpdate={isWaslUpdate}
        updateData={updateData}
      />
      <WaslDriverTable
        rows={rows}
        page={page}
        limit={limit}
        total={total}
        ability={ability}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
        updateWaslDriver={res => {
          setOpen(true)
          setIsWaslUpdate(true)
          setUpdateData(res)
        }}
      />
    </CatalogsWrapper>
  )
}

Driver.acl = {
  action: 'manage',
  subject: 'manage-driver-profile'
}

Driver.AuthGuard = true

export default Driver
