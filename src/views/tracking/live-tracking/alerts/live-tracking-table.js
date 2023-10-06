import React from 'react'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/spinner'
import { tableStyles, useStyles } from 'src/styles/common'
import { TableWrapper } from 'src/styles/pages/tracking'

function LiveTrackingAlertTable({ columns, getAllAssetList, loading }) {
  const classes = useStyles({ selectable: true, tableHeight: '65px' })

  const rows = getAllAssetList?.data

  return (
    <TableWrapper sx={{ height: '40vh', overflowY: 'auto' }} className='expiry-table'>
      {/* {loading && <Spinner />} */}
      <DataTable
        columns={columns()}
        data={rows}
        pointerOnHover
        progressPending={loading}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        // rowsPerPage={limit}
        customStyles={tableStyles}
        className={classes.DataTable}
        progressComponent={<Spinner />}
        fixedHeader
      />
      {/* <ReactPagination
        total={total}
        limit={limit}
        page={page}
        handleLimit={e => handleLimitChange(e)}
        handlePagination={(e, page) => handlePageChange(page)}
      /> */}
    </TableWrapper>
  )
}

export default LiveTrackingAlertTable
