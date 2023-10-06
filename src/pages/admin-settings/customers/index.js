/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'

// ** ACL Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Customer components
import Spinner from 'src/@core/components/spinner'
import { useCommonStyles } from 'src/styles/common'
import SettingsHeader from 'src/views/SettingsHeader'
import ReactPagination from 'src/components/pagination'
import { TableWrapper } from 'src/styles/pages/settings'
import AlertDialog from 'src/components/Dialogs/AlertDialog'
import { columns } from 'src/views/settings/customer/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  handlePageAction,
  handleLimitAction,
  getAllCustomersAction,
  deleteCustomerTypeAction,
  getAllWASLCustomersAction,
  handleWASLLimitAction,
  handleWASLPageAction
} from 'src/store/settings/customers/customersActions'
import { resetGetAllCustomers } from 'src/store/settings/customers/customersSlice'
import WaslCustomersHeader from 'src/views/settings/customers/wasl-customers/wasl-customer-header'
import WaslCustomersTable from 'src/views/settings/customers/wasl-customers/wasl-customer-table'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Tab, Tabs } from '@mui/material'
import { getAllWASLAssetAction } from 'src/store/catalogs/assets/assetsActions'
import { getAllActivitiesAction } from 'src/store/settings/activity/activityAction'

function AdminCustomers() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-admin-customers'
  const deleteAbility = 'delete-admin-customers'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)
  const [wasl, setWasl] = useState(false)
  const [open, setOpen] = useState(false)
  const [isWaslUpdate, setIsWaslUpdate] = useState(false)
  const [updateData, setUpdateData] = useState({})
  const [slug, setSlug] = useState('')
  const [customerId, setCustomerId] = useState('')

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllCustomersList, getAllWASLCustomersList } = useSelector(state => state.customers)
  const rows = wasl ? getAllWASLCustomersList?.data : getAllCustomersList?.data
  const page = wasl ? getAllWASLCustomersList?.page : getAllCustomersList?.page
  const total = wasl ? getAllWASLCustomersList?.total : getAllCustomersList?.total
  const limit = wasl ? getAllWASLCustomersList?.limit : getAllCustomersList?.limit
  const customersList = getAllCustomersList?.data

  const { getAllRolesList } = useSelector(state => state.roles)
  const rolesList = getAllRolesList?.data

  // ** Get All customers
  useEffect(() => {
    dispatch(getAllActivitiesAction({ page: 1, limit: 'all' }))
    dispatch(getAllWASLCustomersAction({ page: 1, limit: 10 }))
  }, [])
  useEffect(() => {
    dispatch(getAllCustomersAction({ page, limit }))

    return () => {
      dispatch(resetGetAllCustomers())
    }
  }, [router])

  const onChangeHandler = (name, value) => {
    if (name === 'customer_type') setSlug(value)
    if (name === 'customer_id') setCustomerId(value)
  }

  // ** Handle Modal
  const handleOpen = () => {
    setOpen(true)
    setIsWaslUpdate(false)
    setUpdateData({})
  }

  const handleClose = () => {
    setOpen(false)
    setIsWaslUpdate(false)
    setUpdateData({})
  }

  // ** functions
  const handleUpdate = row => router.push(`/admin-settings/customers/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  const redirectWasl = value => {
    setWasl(value)
  }

  const renderCustomers = () => {
    return (
      <>
        <SettingsHeader
          ability={ability}
          addBtnText={t('Add')}
          abilityType={'create-admin-customer'}
          title={t('settings.customers.customersList')}
          addClick={() => router.push(`/admin-settings/customers/add-edit/${0}`)}
          wasl={true}
          waslButtonText={'WASL'}
          waslClick={() => setWasl(true)}
        />
        <TableWrapper>
          <DataTable
            data={rows}
            pointerOnHover
            rowsPerPage={limit}
            progressPending={loading}
            className={common.dataTable}
            progressComponent={<Spinner />}
            sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
            columns={columns({ ability, handleOpenDialog, handleUpdate, updateAbility, deleteAbility })}
          />

          {total > 10 && (
            <ReactPagination
              total={total}
              limit={limit}
              page={page}
              handleLimit={e => dispatch(handleLimitAction({ newLimit: e.target.value, oldLimit: limit }))}
              handlePagination={(e, page) => dispatch(handlePageAction({ page, limit }))}
            />
          )}
        </TableWrapper>
        {dialogType === 'delete' && (
          <AlertDialog
            IconHt='35'
            IconWd='35'
            id='delete-Modal'
            iconColor='#FC3B61'
            open={!!dialogType}
            icon='tabler:bell-ringing'
            context={t('settings.customers.deleteCustomerDesc')}
            close={() => handleCloseDialog()}
            submit={() =>
              dispatch(
                deleteCustomerTypeAction({
                  id: selectedRow?.id,
                  callback: () => {
                    handleCloseDialog()
                    dispatch(getAllCustomersAction({ page, limit }))
                  }
                })
              )
            }
          />
        )}
      </>
    )
  }

  const renderWaslCustomers = () => {
    const CatalogsWrapper = styled(Box)(({ theme }) => ({
      background: theme.palette.common.white
    }))

    const handleLimitChange = e => {
      dispatch(handleWASLLimitAction({ newLimit: e.target.value, oldLimit: limit }))
    }

    const handlePageChange = pg => {
      dispatch(handleWASLPageAction({ page: pg, limit }))
    }

    return (
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
          isUpdate={isWaslUpdate}
          updateData={updateData}
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
          updateWaslCustomer={res => {
            setOpen(true)
            setIsWaslUpdate(true)
            setUpdateData(res)
          }}
        />
      </CatalogsWrapper>
    )
  }

  return <>{wasl ? renderWaslCustomers() : renderCustomers()}</>
}

export default AdminCustomers

AdminCustomers.acl = {
  action: 'manage',
  subject: 'manage-super-admin-customers'
}
