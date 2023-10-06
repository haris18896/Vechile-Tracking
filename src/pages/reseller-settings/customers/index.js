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
  deleteCustomerTypeAction
} from 'src/store/settings/customers/customersActions'
import { resetGetAllCustomers } from 'src/store/settings/customers/customersSlice'

function ResllerCustomers() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-reseller-customers'
  const deleteAbility = 'delete-reseller-customers'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllCustomersList } = useSelector(state => state.customers)
  const rows = getAllCustomersList?.data
  const page = getAllCustomersList?.page
  const total = getAllCustomersList?.total
  const limit = getAllCustomersList?.limit

  // ** functions
  const handleUpdate = row => router.push(`/reseller-settings/customers/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  // ** Get All customers
  useEffect(() => {
    dispatch(getAllCustomersAction({ page, limit }))

    return () => {
      dispatch(resetGetAllCustomers())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-reseller-customers'}
        title={t('settings.customers.customersList')}
        addClick={() => router.push(`/reseller-settings/customers/add-edit/${0}`)}
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
          iconColor='#FC3B61'
          open={!!dialogType}
          icon='tabler:bell-ringing'
          id='delete-Modal-reseller'
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

export default ResllerCustomers

ResllerCustomers.acl = {
  action: 'manage',
  subject: 'manage-reseller-customers'
}
