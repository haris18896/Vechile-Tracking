import React from 'react'
import PropTypes from 'prop-types'

// ** MUI
import { Typography } from '@mui/material'

// ** Styled Components
import { NoDataInTable, tableStyles, useCommonStyles } from 'src/styles/common'
import { OilTrackingTableCard, useMapStyles } from 'src/styles/pages/tracking'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import { columns, rows } from './table.data'
import Spinner from 'src/@core/components/spinner'

// ** pagination
import ReactPagination from 'src/components/pagination'
import NoDataAvailable from 'src/components/no-data-available'

function OilTrackingTable(props) {
  const {
    //  rows,
    page,
    limit,
    total,
    loading,
    ability,
    handlePageChange,
    handleLimitChange,
    account
  } = props

  const common = useMapStyles()
  const styles = useCommonStyles();

  return (
    <OilTrackingTableCard>
      <Typography variant='h6' className={common.title}>
        Oil Tracking Detail
      </Typography>
      {rows.length && account ? (
        <DataTable
          data={rows}
          pointerOnHover
          rowsPerPage={limit}
          progressPending={loading}
          progressComponent={<Spinner />}
          columns={columns({ ability })}
          sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        />
      ) : (
        <NoDataAvailable />
      )}
      {total > 10 && (
        <ReactPagination
          total={total}
          limit={limit}
          page={page}
          handleLimit={e => handleLimitChange(e)}
          handlePagination={(e, page) => handlePageChange(page)}
        />
      )}
    </OilTrackingTableCard>
  )
}

export default OilTrackingTable

OilTrackingTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number,
  handleLimitChange: PropTypes.func,
  handlePageChange: PropTypes.func
}
