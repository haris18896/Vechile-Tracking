import React, { useContext } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { useStyles, useCommonStyles } from 'src/styles/common'
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material'
import { TableUIContext } from 'src/contexts/TableContext'

function WorkingHoursTable() {
  const { tableHeight, tableData } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight })
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)
  const total = rows.length

  return (
    <TableWrapper>
          <DataTable
            columns={columns()}
            data={tableData && rows}
            pointerOnHover
            rowsPerPage={limit}
            className={classes.table}
            progressComponent={<Spinner />}
            sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
            fixedHeader
          />
          {tableData &&
          <ReactPagination
            total={total}
            limit={limit}
            page={page}
            handleLimit={e => handleLimitChange(e)}
            handlePagination={(e, page) => handlePageChange(page)}
          />}
    </TableWrapper>
  )
}

export default WorkingHoursTable
