import React, { useEffect } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { useCommonStyles, tableStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

function WaslCustomersTable(props) {
  const { rows, page, limit, total, loading, handleLimitChange, handlePageChange, ability } = props
  const common = useCommonStyles()

  return (
    <TableWrapper>
      {loading && <Spinner />}
      <DataTable
        columns={columns({ ability })}
        className={common.dataTable}
        data={rows}
        pointerOnHover
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        rowsPerPage={limit}
        customStyles={tableStyles}

        // customStyles={customStyles}
        // paginationDefaultPage={page + 1}
      />

      {total > 10 && (
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

export default WaslCustomersTable
