import React from 'react'
import PropTypes from 'prop-types'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { tableStyles, useStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

function AssignUserTable(props) {
  const { loading, rows, page, limit, total, handleLimitChange, handlePageChange, ability } = props
  const common = useStyles()

  return (
    <TableWrapper>
      <DataTable
        data={rows}
        pointerOnHover
        progressPending={loading}
        className={common.table}
        columns={columns({ ability })}
        progressComponent={<Spinner />}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        rowsPerPage={limit}
        customStyles={tableStyles}
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

export default AssignUserTable

AssignUserTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number,
  handleLimitChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
}
