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
import { columns } from 'src/views/settings/asset-types/table.data'

// ** Third Party Components
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  handlePageAction,
  handleLimitAction,
  deleteAssetTypeAction,
  getAllAssetTypesAction
} from 'src/store/settings/asset-types/assetTypesAction'
import { resetGetAllAssetTypes } from 'src/store/settings/asset-types/assetTypesSlice'

function ResellerAssetTypes() {
  // ** Ability
  const ability = useContext(AbilityContext)

  // ** Styles
  const common = useCommonStyles()

  // ** Translation && router
  const router = useRouter()
  const { t } = useTranslation()

  // ** States && constants
  const updateAbility = 'update-reseller-assets'
  const deleteAbility = 'delete-reseller-assets'
  const [dialogType, setDialogType] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  // ** Store
  const dispatch = useDispatch()
  const { loading, getAllAssetTypesList } = useSelector(state => state.assetTypes)
  const rows = getAllAssetTypesList?.data
  const page = getAllAssetTypesList?.page
  const total = getAllAssetTypesList?.total
  const limit = getAllAssetTypesList?.limit

  // ** functions
  const handleUpdate = row => router.push(`/reseller-settings/assets/add-edit/${row?.id}?edit=${true}`)

  const handleOpenDialog = (type, rowData) => {
    setDialogType(type)
    setSelectedRow(rowData)
  }

  const handleCloseDialog = () => {
    setDialogType(null)
    setSelectedRow(null)
  }

  useEffect(() => {
    dispatch(getAllAssetTypesAction({ page, limit }))

    return () => {
      dispatch(resetGetAllAssetTypes())
    }
  }, [router])

  return (
    <>
      <SettingsHeader
        ability={ability}
        addBtnText={t('Add')}
        abilityType={'create-reseller-assets'}
        title={t('settings.assetTypes.assetTypesList')}
        addClick={() => router.push(`/reseller-settings/assets/add-edit/${0}`)}
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
          iconColor='#FC3B61'
          open={!!dialogType}
          id='delete-Modal-reseller'
          icon='tabler:bell-ringing'
          context={t('settings.assetTypes.deleteAssetTypeDesc')}
          close={() => handleCloseDialog()}
          submit={() =>
            dispatch(
              deleteAssetTypeAction({
                id: selectedRow?.id,
                callback: () => {
                  handleCloseDialog()
                  dispatch(getAllAssetTypesAction({ page, limit }))
                }
              })
            )
          }
        />
      )}
    </>
  )
}

export default ResellerAssetTypes

ResellerAssetTypes.acl = {
  action: 'manage',
  subject: 'manage-reseller-assets'
}
