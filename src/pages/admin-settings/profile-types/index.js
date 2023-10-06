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
import { columns } from 'src/views/settings/profile-types/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  handleLimitAction,
  handlePageAction,
  deleteProfileTypeAction,
  getAllProfileTypesAction
} from 'src/store/settings/profile-types/profileTypesAction'
import { resetGetAllProfileTypes } from 'src/store/settings/profile-types/profileTypesSlice'
import { deletePermissionAction, getAllPermissionsAction } from '../../../store/settings/permissions/permissionsActions'

function ProfileTypes() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-super-admin-profile-types'
  const deleteAbility = 'delete-super-admin-profile-types'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllProfileTypesList } = useSelector(state => state.profileTypes)
  const rows = getAllProfileTypesList?.data
  const page = getAllProfileTypesList?.page
  const total = getAllProfileTypesList?.total
  const limit = getAllProfileTypesList?.limit

  // ** functions
  const handleUpdate = row => router.push(`/admin-settings/profile-types/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  useEffect(() => {
    dispatch(getAllProfileTypesAction({ page, limit }))

    return () => {
      dispatch(resetGetAllProfileTypes())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-super-admin-profile-types'}
        title={t('settings.profileTypes.profileTypesList')}
        addClick={() => router.push(`/admin-settings/profile-types/add-edit/${0}`)}
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
          context={t('settings.profileTypes.deleteProfileTypeDesc')}
          close={() => handleCloseDialog()}
          submit={() =>
            dispatch(
              deleteProfileTypeAction({
                id: selectedRow?.id,
                callback: () => {
                  handleCloseDialog()
                  dispatch(getAllProfileTypesAction({ page, limit }))
                }
              })
            )
          }
        />
      )}
    </>
  )
}

export default ProfileTypes

ProfileTypes.acl = {
  action: 'manage',
  subject: 'manage-super-admin-profile-types'
}
