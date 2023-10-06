import React, { useContext, useEffect } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import ReactPagination from 'src/components/pagination'
import { useStyles } from 'src/styles/common'
import { TableUIContext } from 'src/contexts/TableContext'
import { columns } from './table.data'
import FallbackSpinner from 'src/@core/components/table-spinner'

// ** Router
import { useRouter } from 'next/router'

// ** Redux Hooks and Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Utils
import { getAllFleetSummaryActions } from 'src/store/reports/fleet/fleetReportAction'

function TrackDataReportTable({ showTableData }) {
  // ** Router
  const router = useRouter()

  // ** Dispatch
  const dispatch = useDispatch()

  // ** Setting Top For Table From the Context By Header Height
  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight + 80 })

  // ** Destructuring Data From Fleet Slice
  const { page, limit, data, total, loading } = useSelector(state => state.fleetReport?.getAllFleetData)

  // ** Fetching Fleet Summary
  useEffect(() => {
    if (showTableData) dispatch(getAllFleetSummaryActions({ page: page, limit: e.target.value }))
  }, [router])

  // ** Handling Limit and Page
  const handleLimitChange = e => {
    if (limit !== e.target.value) dispatch(getAllFleetSummaryActions({ page: page, limit: limit }))
  }

  const handlePageChange = pg => {
    dispatch(getAllFleetSummaryActions({ page: pg, limit: limit }))
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
        progressComponent={<FallbackSpinner />}
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
