import React from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { useStyles } from 'src/styles/common'

function FuelFilledReportTable({ showTableData, tableHeight }) {
  const classes = useStyles({ tableHeight: tableHeight })
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)
  const total = rows.length

  const handleLimitChange = e => {
    setLimit(e.target.value)
  }

  const handlePageChange = pg => {
    setPage(pg)
  }

  return (
    <TableWrapper>
      <DataTable
        columns={columns()}
        data={showTableData && rows}
        pointerOnHover
        rowsPerPage={limit}
        className={classes.table}

        // progressPending={loading}
        progressComponent={<Spinner />}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        fixedHeader
      />

      <ReactPagination
        total={total}
        limit={limit}
        page={page}
        handleLimit={e => handleLimitChange(e)}
        handlePagination={(e, page) => handlePageChange(page)}
      />
    </TableWrapper>
  )
}

export default FuelFilledReportTable
