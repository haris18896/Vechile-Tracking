import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import PassengerLogHeader from 'src/views/reports/employee-reports/passenger-log-report/passengerLog-header'
import PassengerLogTable from 'src/views/reports/employee-reports/passenger-log-report/passengerLog-table'
import AttendanceReportHeader from 'src/views/reports/employee-reports/attendance-report/attendance-header'
import AttendanceReportTable from 'src/views/reports/employee-reports/attendance-report/attendance-table'
import { TableUIContext } from 'src/contexts/TableContext'
import { useCommonStyles } from 'src/styles/common'
import { ReportWrapper } from 'src/styles/pages/reports'

function EmployeeRelatedReports() {
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
            <TabList onChange={handleChange} aria-label='Employee Reports' variant='scrollable' scrollButtons='auto'>
              <Tab label='Passenger Log Report' value='1' />
              <Tab label='Attendance Report' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <PassengerLogHeader />
            <PassengerLogTable />
          </TabPanel>
          <TabPanel value='2'>
            <AttendanceReportHeader />
            <AttendanceReportTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default EmployeeRelatedReports

EmployeeRelatedReports.acl = {
  action: 'manage',
  subject: 'manage-employee-related-reports'
}

EmployeeRelatedReports.AuthGuard = true
