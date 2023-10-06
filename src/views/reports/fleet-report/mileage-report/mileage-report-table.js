import React from 'react'

// ** Styled Components
import { TableWrapper } from 'src/styles/pages/settings'

// ** Third Party Components
import { Icon } from '@iconify/react'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Spinner from 'src/@core/components/spinner'
import ReactPagination from 'src/components/pagination'
import { columns, rows } from './table.data'
import { useStyles, useCommonStyles } from 'src/styles/common'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

function MileageReportTable({ showTableData, tableHeight }) {
  const classes = useStyles({ tableHeight: tableHeight })
  const commonStyles = useCommonStyles()
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)
  const total = rows.length

  const handleLimitChange = e => {
    setLimit(e.target.value)
  }

  const handlePageChange = pg => {
    setPage(pg)
  }

  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <TableWrapper>
      {/* {loading && <Spinner />} */}
      {/* <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className={commonStyles.AccordionStyles}
      >
        <AccordionSummary
          aria-controls='panel1d-content'
          id='panel1d-header'
          className={commonStyles.AccordionStyles}
          expandIcon={<Icon icon='ic:sharp-minus' width='28' height='28' />}
          IconButtonProps={{ className: commonStyles.AccordionStyles }}
        ></AccordionSummary>
        <AccordionDetails style={{ padding: 0, height: '80vh', overflowY: 'auto' }}>
          <DataTable
            columns={columns()}
            data={rows}
            pointerOnHover
            sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
            rowsPerPage={limit}
            className={classes.table}
            progressComponent={<Spinner />}
          />
          <ReactPagination
            total={total}
            limit={limit}
            page={page}
            handleLimit={e => handleLimitChange(e)}
            handlePagination={(e, page) => handlePageChange(page)}
          />
        </AccordionDetails>
      </Accordion> */}

      <DataTable
        columns={columns()}
        data={showTableData && rows}
        pointerOnHover
        rowsPerPage={limit}
        className={classes.table}

        // progressPending={loading}
        progressComponent={<Spinner />}
        sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
        fixedHeader
      />
      <ReactPagination
        total={total}
        limit={limit}
        page={page}
        handleLimit={e => handleLimitChange(e)}
        handlePagination={(e, page) => handlePageChange(page)}
      />

      {/* <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        className={commonStyles.AccordionStyles}
      >
        <AccordionSummary
          aria-controls='panel2d-content'
          id='panel2d-header'
          className={commonStyles.AccordionStyles}
          expandIcon={<Icon icon='ic:sharp-minus' width='30' height='30' />}
          IconButtonProps={{ className: commonStyles.AccordionStyles }}
          style={{ color: '#fff', fontWeight: 'bold' }}
        >
          Total Travel Report
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0, height: '80vh', overflowY: 'auto' }}>
          <DataTable
            columns={columns()}
            data={rows}
            pointerOnHover
            sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
            rowsPerPage={limit}
            className={classes.table}
            progressComponent={<Spinner />}
          />
        </AccordionDetails>
      </Accordion> */}
    </TableWrapper>
  )
}

export default MileageReportTable
