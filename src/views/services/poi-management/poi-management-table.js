import React, { useEffect } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { customStyles, tableStyles, useCommonStyles } from 'src/styles/common'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

function PoiManagementTable(props) {
  const { handlePageChange, handleLimitChange, loading, limit, total, page, rows } = props
  const common = useCommonStyles()

  return (
    <TableWrapper>
      <DataTable
        columns={columns()}
        data={rows}
        pointerOnHover
        rowsPerPage={limit}
        fixedHeader={true}
        customStyles={tableStyles}
        progressPending={loading}
        className={common.dataTable}
        progressComponent={<Spinner />}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
      />

      <ReactPagination
        total={total}
        limit={limit}
        page={page}
        handleLimit={e => handleLimitChange(e)}
        handlePagination={(e, page) => handlePageChange(page)}
      />
    </TableWrapper>
  )
}

export default PoiManagementTable
