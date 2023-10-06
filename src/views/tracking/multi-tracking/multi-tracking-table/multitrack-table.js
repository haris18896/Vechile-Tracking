import React, { useState } from 'react'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { SmallMapWrapper, tableStyles } from 'src/styles/common'
import { TableWrapper } from 'src/styles/pages/tracking'
import { Grid, Typography } from '@mui/material'
import { useJsApiLoader, GoogleMap, Marker, Circle } from '@react-google-maps/api'


function MultiTrackTable({sidebar, checkedRows, setCheckedRows}) {
  // const classes = useStyles()
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)
  const total = rows.length


  const handleLimitChange = e => {
    setLimit(e.target.value)
  }

  const handlePageChange = pg => {
    setPage(pg)
  }

  return (
    <TableWrapper>
      {/* {loading && <Spinner />} */}
      <DataTable
        columns={columns({sidebar, checkedRows, setCheckedRows})}
        data={rows}
        pointerOnHover
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        rowsPerPage={limit}
        customStyles={tableStyles}
        progressComponent={<Spinner />}
      />
    </TableWrapper>
  )
}

export default MultiTrackTable
