import React, { useRef } from 'react'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { tableStyles } from 'src/styles/common'
import { TableWrapper } from 'src/styles/pages/tracking'

function LiveTravelersMapTable({ getTableHeight }) {
  // const classes = useStyles()
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)
  const total = rows.length
  const tableRef = useRef('')

  const handleLimitChange = e => {
    setLimit(e.target.value)
  }

  const handlePageChange = pg => {
    setPage(pg)
  }

  getTableHeight(tableRef)

  return (
    <TableWrapper tableheight='auto' ref={tableRef}>
      <DataTable
        columns={columns()}
        data={rows}
        pointerOnHover
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        rowsPerPage={limit}
        className='tracking-table'
        customStyles={tableStyles}
        progressComponent={<Spinner />}
      />
    </TableWrapper>
  )
}

export default LiveTravelersMapTable
