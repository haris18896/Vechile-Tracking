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
import { columns } from 'src/views/settings/permissions/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Store & Actions
import {
  handlePageAction,
  handleLimitAction,
  deletePermissionAction,
  getAllPermissionsAction
} from 'src/store/settings/permissions/permissionsActions'
import { useDispatch, useSelector } from 'react-redux'
import { resetPermissions } from 'src/store/settings/permissions/permissionSlice'

function AdminPermissionSettings() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-super-admin-permission'
  const deleteAbility = 'delete-super-admin-permission'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllPermissionsList } = useSelector(state => state.permissions)
  const rows = getAllPermissionsList?.data
  const page = getAllPermissionsList?.page
  const total = getAllPermissionsList?.total
  const limit = getAllPermissionsList?.limit

  // ** functions
  const handleUpdate = row => router.push(`/admin-settings/permissions/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  // ** Get all permissions
  useEffect(() => {
    dispatch(getAllPermissionsAction({ page, limit }))

    return () => {
      dispatch(resetPermissions())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-super-admin-permissions'}
        title={t('settings.permissions.permissionList')}
        addClick={() => router.push(`/admin-settings/permissions/add-edit/${0}`)}
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
          columns={columns({ ability, handleOpenDialog, deleteAbility, updateAbility, handleUpdate })}
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
          context={t('settings.permissions.deletePermissionDesc')}
          close={() => handleCloseDialog()}
          submit={() =>
            dispatch(
              deletePermissionAction({
                id: selectedRow?.id,
                callback: () => {
                  handleCloseDialog()
                  dispatch(getAllPermissionsAction({ page, limit }))
                }
              })
            )
          }
        />
      )}
    </>
  )
}

export default AdminPermissionSettings

AdminPermissionSettings.acl = {
  action: 'manage',
  subject: 'manage-super-admin-permissions'
}
