import React from 'react'
import PropTypes from 'prop-types'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { useCommonStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns, rows } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

import { tableStyles } from 'src/styles/common'

function AddEditInventoryTable(props) {
  const {
    // rows,
    page,
    limit,
    total,
    router,
    ability,
    loading,
    handleLimitChange,
    handlePageChange
  } = props
  const common = useCommonStyles()

  return (
    <TableWrapper>
      {loading && <Spinner />}
      <DataTable
        data={rows}
        pointerOnHover
        rowsPerPage={limit}
        columns={columns({ ability, router })}
        className={common.dataTable}
        customStyles={tableStyles}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
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

export default AddEditInventoryTable

AddEditInventoryTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number,
  handleLimitChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
}
