import React from 'react'
import PropTypes from 'prop-types'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { tableStyles, useCommonStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns, rows } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

function WorkingHoursTable(props) {
  const {
    //  rows,
    page,
    limit,
    total,
    router,
    loading,
    ability,
    handleLimitChange,
    handlePageChange
  } = props
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
        columns={columns({ ability, router })}
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

export default WorkingHoursTable

WorkingHoursTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number,
  handleLimitChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
}
