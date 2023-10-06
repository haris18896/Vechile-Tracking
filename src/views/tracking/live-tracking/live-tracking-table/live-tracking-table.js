import React, { useContext, useEffect } from 'react'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** MUI
import { Grid } from '@mui/material'

// ** Custom Components
import FallbackSpinner from 'src/@core/components/table-spinner'
import ReactPagination from 'src/components/pagination'
import { columns } from './table.data'
import { tableStyles, useStyles } from 'src/styles/common'
import { TableWrapperSwipe } from 'src/styles/pages/tracking'
import LiveTrackingFooter from './live-tracking-footer'

// ** Redux Action
import { useDispatch } from 'react-redux'
import { handleLimitAssetListAction, handlePageAssetListAction } from 'src/store/tracking/index/trackingAction'

// ** Context
import { TableUIContext } from 'src/contexts/TableContext'

function LiveTrackingTable({ rows, handleChange, handleSelectedRows, loading, page, limit, total, setRefresh }) {
  // ** Getting Table Height From the context
  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight + 20, bottom: 170 })

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Handling Limit and Page Action
  const handleLimitChange = e => {
    if (e.target.value !== limit) dispatch(handleLimitAssetListAction({ page, limit: e.target.value }))
  }

  const handlePageChange = pg => {
    dispatch(handlePageAssetListAction({ page: pg, limit }))
  }

  return (
    <TableWrapperSwipe>
      <DataTable
        columns={columns()}
        data={rows}
        progressPending={loading}
        pointerOnHover
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        rowsPerPage={limit}
        customStyles={tableStyles}
        className={classes.tableSwipe}
        progressComponent={<FallbackSpinner />}
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={e => {
          handleSelectedRows(e)
        }}
        fixedHeader
      />

      <Grid
        style={{
          position: 'absolute',
          bottom: '0',
          left: 0,
          right: 0,
          height: 'auto',
          zIndex: '999',
          background: 'white'
        }}
      >
        <LiveTrackingFooter handleChange={handleChange} setRefresh={setRefresh} />
        <ReactPagination
          total={total}
          limit={limit}
          page={page}
          handleLimit={e => handleLimitChange(e)}
          handlePagination={(e, page) => handlePageChange(page)}
        />
      </Grid>
    </TableWrapperSwipe>
  )
}

export default LiveTrackingTable
