import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import DriverLoginHeader from 'src/views/reports/driver-report/driver-login-report/driver-login-header'
import DriverLoginTable from 'src/views/reports/driver-report/driver-login-report/driver-login-table'
import DriverPerformanceHeader from 'src/views/reports/driver-report/driver-performance-report/driver-performance-header'
import DriverPerformanceTable from 'src/views/reports/driver-report/driver-performance-report/driver-performance-table'
import OvertimeReportHeader from 'src/views/reports/driver-report/overtime-report/overtime-report-header'
import OvertimeReportTable from 'src/views/reports/driver-report/overtime-report/overtime-report-table'
import { TableUIContext } from 'src/contexts/TableContext'
import { ReportWrapper } from 'src/styles/pages/reports'
import { useCommonStyles } from 'src/styles/common'

function DriverReports() {
  const { hideTableData } = useContext(TableUIContext)
  const [value, setValue] = useState('0')
  const styles = useCommonStyles()

  useEffect(() => {
    //for first tab selection animation
    setValue('1')
  }, [])

  const handleChange = (event, newValue) => {
    hideTableData()
    setValue(newValue)
  }

  return (
    <ReportWrapper>
      <Box className={styles.TabsWrapper}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={styles.TabList}>
            <TabList
              onChange={handleChange}
              aria-label='Driver Related Reports Tabs'
              variant='scrollable'
              scrollButtons='auto'
            >
              <Tab label='Driver Login Report' value='1' />
              <Tab label='Driver Performance Report' value='2' />
              <Tab label='Overtime Report' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <DriverLoginHeader />
            <DriverLoginTable />
          </TabPanel>
          <TabPanel value='2'>
            <DriverPerformanceHeader />
            <DriverPerformanceTable />
          </TabPanel>
          <TabPanel value='3'>
            <OvertimeReportHeader />
            <OvertimeReportTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default DriverReports

DriverReports.acl = {
  action: 'manage',
  subject: 'manage-driver-reports'
}

DriverReports.AuthGuard = true
