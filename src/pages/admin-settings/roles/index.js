/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useContext, useState } from 'react'

// ** ACL Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Customer components
import Spinner from 'src/@core/components/spinner'
import { useCommonStyles } from 'src/styles/common'
import SettingsHeader from 'src/views/SettingsHeader'
import ReactPagination from 'src/components/pagination'
import { TableWrapper } from 'src/styles/pages/settings'
import AlertDialog from 'src/components/Dialogs/AlertDialog'
import { columns } from 'src/views/settings/roles/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { resetGetAllRoles } from 'src/store/settings/roles/rolesSlice'
import {
  deleteRoleAction,
  getAllRolesAction,
  handleLimitAction,
  handlePageAction
} from 'src/store/settings/roles/rolesActions'

function AdminRoles() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllRolesList } = useSelector(state => state.roles)
  const rows = getAllRolesList?.data
  const page = getAllRolesList?.page
  const total = getAllRolesList?.total
  const limit = getAllRolesList?.limit

  // ** States && constants
  const updateAbility = 'update-super-admin-role'
  const deleteAbility = 'delete-super-admin-role'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** functions
  const handleUpdate = row => router.push(`/admin-settings/roles/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  useEffect(() => {
    dispatch(getAllRolesAction({ page, limit }))

    return () => {
      dispatch(resetGetAllRoles())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-super-admin-roles'}
        title={t('settings.roles.rolesList')}
        addClick={() => router.push(`/admin-settings/roles/add-edit/${0}`)}
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
          close={() => handleCloseDialog()}
          context={t('settings.roles.deleteRolesDesc')}
          submit={() =>
            dispatch(
              deleteRoleAction({
                id: selectedRow?.id,
                callback: () => {
                  handleCloseDialog()
                  dispatch(getAllRolesAction({ page, limit }))
                }
              })
            )
          }
        />
      )}
    </>
  )
}

export default AdminRoles

AdminRoles.acl = {
  action: 'manage',
  subject: 'manage-super-admin-roles'
}
