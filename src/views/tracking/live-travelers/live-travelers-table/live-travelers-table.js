import React from 'react'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { tableStyles } from 'src/styles/common'
import { TableWrapper } from 'src/styles/pages/tracking'
import { Checkbox } from '@mui/material'

function LiveTravelersTable() {
  // const classes = useStyles()
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)
  const total = rows.length

  const handleLimitChange = e => {
    setLimit(e.target.value)
  }

  const handlePageChange = pg => {
    setPage(pg)
  }

  // const conditionalRowStyles = [
  //   {
  //     when: row => row.trackingDate,
  //     style: {
  //       backgroundColor: 'green',
  //       color: 'white',
  //       '&:hover': {
  //         cursor: 'pointer'
  //       }
  //     }
  //   },
  //   // You can also pass a callback to style for additional customization
  //   {
  //     when: row => row.calories < 400,
  //     style: row => ({ backgroundColor: row.isSpecial ? 'pink' : 'inerit' })
  //   }
  // ]

  return (
    <TableWrapper sx={{ overflowY: 'auto'}}>
      {/* {loading && <Spinner />} */}
      <DataTable
        columns={columns()}
        data={rows}
        pointerOnHover
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        rowsPerPage={limit}
        customStyles={tableStyles}
        progressComponent={<Spinner />}
        selectableRowsNoSelectAll

        // conditionalRowStyles={conditionalRowStyles}
        // selectableRowsComponent={<Checkbox></Checkbox>}
      />
    </TableWrapper>
  )
}

export default LiveTravelersTable
