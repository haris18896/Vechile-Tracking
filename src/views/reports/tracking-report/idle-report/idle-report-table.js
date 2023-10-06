import React, { useContext } from 'react'

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
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material'
import { TableUIContext } from 'src/contexts/TableContext'

function IdleReportTable({ showTableData }) {
  const { tableHeight, tableData } = useContext(TableUIContext)
  const classes = useStyles({ tableHeight: +tableHeight.split("px")[0] + 65 + 'px'  })
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

  const [expanded, setExpanded] = React.useState('')

  const handleChange = panel => (event, newExpanded) => {
    if (!newExpanded && panel === 'panel1') {
      setExpanded('panel2')
    } else if (!newExpanded && expanded === 'panel2') {
      setExpanded('panel1')
    } else {
      setExpanded(newExpanded ? panel : false)
    }
  }

  return (
    <TableWrapper>
      {/* {loading && <Spinner />} */}
      <Grid mb={4}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className={commonStyles.AccordionStyles}
        style={{marginBottom: '10px'}}
      >
        <AccordionSummary
          aria-controls='panel1d-content'
          id='panel1d-header'
          className={commonStyles.AccordionStyles}
          expandIcon={
            expanded === 'panel1' ? (
              <Icon icon='ic:sharp-minus' width='28' height='28' />
            ) : (
              <Icon icon='ic:round-plus' width='28' height='28' />
            )
          }
          IconButtonProps={{ className: commonStyles.AccordionStyles }}
        ></AccordionSummary>
        <AccordionDetails sx={{ height: { xs: '100%',  sm: `calc(100vh - ${tableHeight}` } }} overflowY="hidden" style={{ padding: 0, background: '#fff', paddingBottom: '1.5rem'}}>
          <DataTable
            columns={columns()}
            data={tableData && rows}
            pointerOnHover
            rowsPerPage={limit}
            className={classes.table}

            // progressPending={loading}
            progressComponent={<Spinner />}
            sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
            fixedHeader
          />
          {tableData &&
          <ReactPagination
            total={total}
            limit={limit}
            page={page}
            handleLimit={e => handleLimitChange(e)}
            handlePagination={(e, page) => handlePageChange(page)}
          />}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        className={commonStyles.AccordionStyles}
      >
        <AccordionSummary
          aria-controls='panel2d-content'
          id='panel2d-header'
          className={commonStyles.AccordionStyles}
          expandIcon={
            expanded === 'panel2' ? (
              <Icon icon='ic:sharp-minus' width='28' height='28' />
            ) : (
              <Icon icon='ic:round-plus' width='28' height='28' />
            )
          }
          IconButtonProps={{ className: commonStyles.AccordionStyles }}
          style={{ color: '#fff', fontWeight: 'bold' }}
        >
          Total Idle Report
        </AccordionSummary>
        <AccordionDetails sx={{ height: { xs: '100%',  sm: `calc(100vh - ${tableHeight}` } }} overflowY="hidden" style={{ padding: 0, background: '#fff', paddingBottom: '1.5rem'}}>
          <DataTable
            columns={columns()}
            data={tableData && rows}
            pointerOnHover
            rowsPerPage={limit}
            className={classes.table}

            // progressPending={loading}
            progressComponent={<Spinner />}
            sortIcon={<Icon icon='lucide:chevrons-up-down' width='13' height='13' />}
            fixedHeader
          />
          {tableData &&
          <ReactPagination
            total={total}
            limit={limit}
            page={page}
            handleLimit={e => handleLimitChange(e)}
            handlePagination={(e, page) => handlePageChange(page)}
          />}
        </AccordionDetails>
      </Accordion>
      </Grid>
    </TableWrapper>
  )
}

export default IdleReportTable
