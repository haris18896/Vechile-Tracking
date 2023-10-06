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
import { columns } from 'src/views/settings/customer-types/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  handleLimitAction,
  handlePageAction,
  deleteCustomerTypeAction,
  getAllCustomersTypesAction
} from 'src/store/settings/customer-types/customerTypesAction'
import { resetGetAllCustomerTypes } from 'src/store/settings/customer-types/customerTypesSlice'

function CustomerTypes() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-admin-customer-types'
  const deleteAbility = 'delete-admin-customer-types'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllCustomerTypesList } = useSelector(state => state.customerTypes)
  const rows = getAllCustomerTypesList?.data
  const page = getAllCustomerTypesList?.page
  const total = getAllCustomerTypesList?.total
  const limit = getAllCustomerTypesList?.limit

  // ** functions
  const handleUpdate = row => router.push(`/admin-settings/customer-types/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  useEffect(() => {
    dispatch(getAllCustomersTypesAction({ page, limit }))

    return () => {
      dispatch(resetGetAllCustomerTypes())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-admin-customer-types'}
        title={t('settings.customerTypes.customerTypesList')}
        addClick={() => router.push(`/admin-settings/customer-types/add-edit/${0}`)}
      />

      <TableWrapper>
        <DataTable
          data={rows}
          pointerOnHover
          rowsPerPage={limit}
          progressPending={loading}
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
          context={t('settings.customerTypes.deleteCustomerTypeDesc')}
          close={() => handleCloseDialog()}
          submit={() =>
            dispatch(
              deleteCustomerTypeAction({
                id: selectedRow?.id,
                callback: () => {
                  handleCloseDialog()
                  dispatch(getAllCustomersTypesAction({ page, limit }))
                }
              })
            )
          }
        />
      )}
    </>
  )
}

export default CustomerTypes

CustomerTypes.acl = {
  action: 'manage',
  subject: 'manage-super-admin-customer-types'
}
