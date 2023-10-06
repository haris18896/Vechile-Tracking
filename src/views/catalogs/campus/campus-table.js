import React from 'react'
import PropTypes from 'prop-types'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { tableStyles, useCommonStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

function CampusTable(props) {
  const { router, slug, loading, rows, page, limit, total, handleLimitChange, handlePageChange,ability  } = props

  const common = useCommonStyles()

  return (
    <TableWrapper>
      <DataTable
        data={rows}
        pointerOnHover
        rowsPerPage={limit}
        progressPending={loading}
        className={common.dataTable}
        progressComponent={<Spinner />}
        columns={columns({ router, slug, ability })}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
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

export default CampusTable

CampusTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number,
  handleLimitChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
}
