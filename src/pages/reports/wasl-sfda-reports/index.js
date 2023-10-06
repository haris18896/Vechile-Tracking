import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import WASLHeader from 'src/views/reports/wasl-sfda-report/wasl-report/wasl-header'
import WASLTable from 'src/views/reports/wasl-sfda-report/wasl-report/wasl-table'
import SFDAReportHeader from 'src/views/reports/wasl-sfda-report/sfda-report/sfda-report-header'
import SFDAReportTable from 'src/views/reports/wasl-sfda-report/sfda-report/sfda-report-table'
import { ReportWrapper } from 'src/styles/pages/reports'
import { TableUIContext } from 'src/contexts/TableContext'
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
            <TabList onChange={handleChange} aria-label='Wasl Sfda Reports'>
              <Tab label='WASL Report' value='1' />
              <Tab label='Inventory Status Report' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <WASLHeader />
            <WASLTable />
          </TabPanel>
          <TabPanel value='2'>
            <SFDAReportHeader />
            <SFDAReportTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default DriverReports

DriverReports.acl = {
  action: 'manage',
  subject: 'manage-wasl-sfda-reports',
}

DriverReports.AuthGuard  = true
