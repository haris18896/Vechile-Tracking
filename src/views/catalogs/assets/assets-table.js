import React, { useContext } from 'react'
import PropTypes from 'prop-types'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { tableStyles, useCommonStyles, useStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'

// ** pagination
import ReactPagination from 'src/components/pagination'
import { TableUIContext } from 'src/contexts/TableContext'
import FallbackSpinner from 'src/@core/components/table-spinner'

function AssetsTable(props) {
  const { slug, rows, page, limit, total, router, loading, handleLimitChange, handlePageChange, ability } = props

  const { tableHeight } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: tableHeight })

  return (
    <TableWrapper>
      <DataTable
        data={rows}
        pointerOnHover
        rowsPerPage={limit}
        progressPending={loading}
        className={classes.table}
        progressComponent={<FallbackSpinner />}
        columns={columns({ router, slug, ability })}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        fixedHeader
      />

      {rows?.length !== 0 && (
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

export default AssetsTable

AssetsTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number,
  handleLimitChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
}
