import React, { useContext } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { useStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'
import FallbackSpinner from 'src/@core/components/table-spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

// ** Context
import { TableUIContext } from 'src/contexts/TableContext'

function UsersTable(props) {
  // ** Destructure the Props Object To get Table Data
  const { rows, page, limit, total, loading, handleLimitChange, handlePageChange, ability } = props

  // ** Table Top From Context
  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight + 20 })

  return (
    <TableWrapper>
      <DataTable
        columns={columns({ ability })}
        data={rows}
        pointerOnHover
        progressPending={loading}
        rowsPerPage={limit}
        className={classes.table}
        progressComponent={<FallbackSpinner />}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        fixedHeader
      />

      {
        <ReactPagination
          total={total}
          limit={limit}
          page={page}
          handleLimit={e => handleLimitChange(e)}
          handlePagination={(e, page) => handlePageChange(page)}
        />
      }
    </TableWrapper>
  )
}

export default UsersTable
