import React, { useEffect } from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'
import { tableStyles } from 'src/styles/common'
import { useCustomStyles } from 'src/styles/pages/catalogs'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns } from './table.data'
import FallbackSpinner from 'src/@core/components/table-spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'

// Redux Action and Slices
import { useDispatch, useSelector } from 'react-redux'
import { getAllZoneAction, handleLimitAction, handlePageAction } from 'src/store/catalogs/zone/zoneActions'

function ZoneTable(props) {
  const { router, ability } = props

  const dispatch = useDispatch()

  // ** Styles
  const common = useCustomStyles()

  // Destructure Loading state and Data State
  const { loading, getAllZoneList } = useSelector(state => state.zone)
  const { data, limit, page, total } = getAllZoneList

  // ** Fectching Zone List
  useEffect(() => {
    dispatch(getAllZoneAction({ page, limit }))
  }, [])

  // ** Handling Limis and Page
  const handleLimitChange = e => {
    handleLimitAction({ newLimit: e, oldLimit: limit })
  }

  const handlePageChange = pg => {
    handlePageAction({ page: pg, limit: limit })
  }

  return (
    <TableWrapper>
      <DataTable
        data={data}
        pointerOnHover
        rowsPerPage={limit}
        progressPending={loading}
        className={common.dataTable}
        progressComponent={<FallbackSpinner />}
        columns={columns({ ability, router })}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        customStyles={tableStyles}
      />
      {data?.length !== 0 && (
        <ReactPagination
          total={total}
          limit={limit}
          page={page}
          handleLimit={e => handleLimitChange(e)}
          handlePagination={(e, page) => handlePageChange(pg)}
        />
      )}
    </TableWrapper>
  )
}

export default ZoneTable
