/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import UsersHeader from 'src/views/catalogs/users/users-header'
import UsersTable from 'src/views/catalogs/users/users-table'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllRolesAction } from 'src/store/settings/roles/rolesActions'
import { getAllCustomersAction } from 'src/store/settings/customers/customersActions'
import { getAllUsersAction, handleLimitAction, handlePageAction } from 'src/store/catalogs/users/usersActions'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'
import CustomersHeader from 'src/views/catalogs/customers/customer-header'
import CustomersTable from 'src/views/catalogs/customers/customer-table'
import WaslCustomersHeader from 'src/views/catalogs/customers/wasl-customers/wasl-customer-header'
import WaslCustomersTable from 'src/views/catalogs/customers/wasl-customers/wasl-customer-table'

import { styled, useTheme } from '@mui/material/styles'
import { Box, Tab, Tabs } from '@mui/material'

function Catalogs() {
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch()
  const { loading, getAllUsersList } = useSelector(state => state.users)
  const { getAllRolesList } = useSelector(state => state.roles)
  const { getAllCustomersList } = useSelector(state => state.customers)

  const rows = getAllUsersList?.data
  const page = getAllUsersList?.page
  const total = getAllUsersList?.total
  const limit = getAllUsersList?.limit
  const rolesList = getAllRolesList?.data
  const customersList = getAllCustomersList?.data

  // ** State
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [wasl, setWasl] = useState(false)

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
    if (name === 'customer_id') setCustomerId(value)
  }

  // ** Handle Modal
  const handleOpen = () => {
    setOpen(true)
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))

    // dispatch(getAllRolesAction({ page: 1, limit: 100 }))
  }
  const handleClose = () => setOpen(false)

  useEffect(() => {
    dispatch(getAllUsersAction({ page, limit, slug, customer_id: customerId }))
  }, [page, limit, slug, customerId])

  useEffect(() => {
    dispatch(getAllCustomersAction({ page: 1, limit: 100 }))
  }, [])

  const handleLimitChange = e => {
    dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAction({ page: pg, limit }))
  }

  const redirectWasl = value => {
    setWasl(value)
  }

  // ** Styled Components
  const CatalogsWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.common.white
  }))

  return !wasl ? (
    <CatalogsWrapper>
      <CustomersHeader
        open={open}
        slug={slug}
        ability={ability}
        rolesList={rolesList}
        handleOpen={handleOpen}
        handleClose={handleClose}
        customerId={customerId}
        customersList={customersList}
        onChangeHandler={onChangeHandler}
        redirectWasl={redirectWasl}
      />
      <CustomersTable
        rows={rows}
        page={page}
        limit={limit}
        total={total}
        ability={ability}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </CatalogsWrapper>
  ) : (
    <CatalogsWrapper>
      <WaslCustomersHeader
        open={open}
        slug={slug}
        ability={ability}
        rolesList={rolesList}
        handleOpen={handleOpen}
        handleClose={handleClose}
        customerId={customerId}
        customersList={customersList}
        onChangeHandler={onChangeHandler}
        redirectWasl={redirectWasl}
      />
      <WaslCustomersTable
        rows={rows}
        page={page}
        limit={limit}
        total={total}
        ability={ability}
        loading={loading}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </CatalogsWrapper>
  )
}

Catalogs.acl = {
  action: 'manage',
  subject: 'manage-customer'
}

Catalogs.AuthGuard = true

export default Catalogs
