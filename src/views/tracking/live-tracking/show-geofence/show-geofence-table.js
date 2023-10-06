import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Mui
import { Grid } from '@mui/material'

// ** Custom Components
import ReactPagination from 'src/components/pagination'
import { columns } from './table.data'
import { TableWrapperSwipe } from 'src/styles/pages/tracking'
import FallbackSpinner from 'src/@core/components/table-spinner'

// Redux Action and Hooks
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllGeofenceListAction,
  handleLimitGeofenceListAction,
  handlePageGeofenceListAction
} from 'src/store/tracking/geofence/geofenceAction'

// ** Context
import { TableUIContext } from 'src/contexts/TableContext'

// ** Styles
import { useStyles } from 'src/styles/common'

function ShowGeofenceTable({ handleSelectedRows }) {
  // ** Getting Table Height From the context
  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight + 80, bottom: 110 })

  // Dispatch
  const dispatch = useDispatch()

  // ** Router
  const router = useRouter()

  // ** Getting Geofence Data From Slice
  const { getAllGeofenceList } = useSelector(state => state.geofence)
  const { data, page, limit, total, loading } = getAllGeofenceList

  // Handling Limits and Change
  const handleLimitChange = e => {
    dispatch(handleLimitGeofenceListAction({ old_limit: limit, new_limit: e.target.value }))
  }

  const handlePageChange = page => {
    dispatch(handlePageGeofenceListAction({ page: page, limit: limit }))
  }

  // ** Fetching GeoFence List
  useEffect(() => {
    dispatch(getAllGeofenceListAction({ page: 1, limit: 10 }))
  }, [router])

  return (
    <TableWrapperSwipe>
      <DataTable
        columns={columns()}
        data={data}
        pointerOnHover
        progressPending={loading}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        rowsPerPage={limit}
        className={classes.tableSwipe}
        progressComponent={<FallbackSpinner />}
        selectableRows
        onSelectedRowsChange={handleSelectedRows}
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
        {data.length !== 0 && (
          <ReactPagination
            total={total}
            limit={limit}
            page={page}
            handleLimit={e => handleLimitChange(e)}
            handlePagination={(e, page) => handlePageChange(page)}
            swipe={true}
          />
        )}
      </Grid>
    </TableWrapperSwipe>
  )
}

export default ShowGeofenceTable
