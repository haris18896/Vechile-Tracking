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
import { columns } from 'src/views/settings/device-types/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  handlePageAction,
  handleLimitAction,
  deleteDeviceTypeAction,
  getAllDeviceTypesAction
} from 'src/store/settings/device-types/deviceTypesAction'
import { resetGetAllDeviceTypes } from 'src/store/settings/device-types/deviceTypesSlice'
import { deleteRoleAction, getAllRolesAction } from 'src/store/settings/roles/rolesActions'

function AdminDeviceTypes() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-admin-device-types'
  const deleteAbility = 'delete-admin-device-types'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllDeviceTypesList } = useSelector(state => state.deviceTypes)
  const rows = getAllDeviceTypesList?.data
  const page = getAllDeviceTypesList?.page
  const total = getAllDeviceTypesList?.total
  const limit = getAllDeviceTypesList?.limit

  // ** functions
  const handleUpdate = row => router.push(`/admin-settings/device-types/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  useEffect(() => {
    dispatch(getAllDeviceTypesAction({ page, limit }))

    return () => {
      dispatch(resetGetAllDeviceTypes())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-admin-device-types'}
        title={t('settings.deviceTypes.deviceTypesList')}
        addClick={() => router.push(`/admin-settings/device-types/add-edit/${0}`)}
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
          context={t('settings.deviceTypes.deleteDeviceTypeDesc')}
          submit={() =>
            dispatch(
              deleteDeviceTypeAction({
                id: selectedRow?.id,
                callback: () => {
                  handleCloseDialog()
                  dispatch(getAllDeviceTypesAction({ page, limit }))
                }
              })
            )
          }
        />
      )}
    </>
  )
}

export default AdminDeviceTypes

AdminDeviceTypes.acl = {
  action: 'manage',
  subject: 'manage-super-admin-device-types'
}
