import React, { useContext, useEffect } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/table-spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { useStyles } from 'src/styles/common'
import { TableUIContext } from 'src/contexts/TableContext'

// Redux Hooks and Actions
import { getAllTrackDataActions } from 'src/store/reports/tracking/trackingReportAction'
import { useDispatch, useSelector } from 'react-redux'

// ** Router
import { useRouter } from 'next/router'

function TrackDataReportTable({ list }) {
  // ** Router
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Getting Table Height From the context
  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight + 80 })

  // ** Destructuring Data From Fleet Slice
  const { page, limit, data, total, loading } = useSelector(state => state.trackReport?.getAllTrackData)

  // ** Fetching Fleet Summary
  useEffect(() => {
    dispatch(getAllTrackDataActions({ page: page, limit: limit }))
  }, [router])

  // ** Handling Limit and Page
  const handleLimitChange = e => {
    if (limit !== e.target.value) dispatch(getAllTrackDataActions({ page: page, limit: e.target.value }))
  }

  const handlePageChange = pg => {
    dispatch(getAllTrackDataActions({ page: pg, limit: limit }))
  }

  return (
    <TableWrapper>
      <DataTable
        columns={columns()}
        data={data}
        pointerOnHover
        progressPending={loading}
        rowsPerPage={limit}
        className={classes.table}
        progressComponent={<Spinner />}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        fixedHeader
      />

      {data?.length !== 0 && (
        <ReactPagination
          total={total}
          limit={limit}
          page={page}
          handleLimit={e => handleLimitChange(e)}
          handlePagination={(e, page) => handlePageChange(page)}
        />
      )}
    </TableWrapper>
  )
}

export default TrackDataReportTable
