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
import { columns } from 'src/views/settings/activity/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  handlePageAction,
  handleLimitAction,
  deleteActivityAction,
  getAllActivitiesAction
} from 'src/store/settings/activity/activityAction'
import { resetGetAllActivities } from 'src/store/settings/activity/activitySlice'

function AdminActivity() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-admin-activity'
  const deleteAbility = 'delete-admin-activity'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllActivities } = useSelector(state => state.activity)
  const rows = getAllActivities?.data
  const page = getAllActivities?.page
  const total = getAllActivities?.total
  const limit = getAllActivities?.limit

  // ** functions
  const handleUpdate = row => router.push(`/admin-settings/activity/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  useEffect(() => {
    dispatch(getAllActivitiesAction({ page, limit }))

    return () => {
      dispatch(resetGetAllActivities())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-admin-activity'}
        title={t('settings.activity.activityList')}
        addClick={() => router.push(`/admin-settings/activity/add-edit/${0}`)}
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
          id='delete-Modal-activity'
          icon='tabler:bell-ringing'
          context={t('settings.activity.deleteActivityDesc')}
          close={() => handleCloseDialog()}
          submit={() =>
            dispatch(
              deleteActivityAction({
                id: selectedRow?.id,
                callback: () => {
                  handleCloseDialog()
                  dispatch(getAllActivitiesAction({ page, limit }))
                }
              })
            )
          }
        />
      )}
    </>
  )
}

export default AdminActivity

AdminActivity.acl = {
  action: 'manage',
  subject: 'manage-super-admin-activity'
}
