import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import FuelRefillHeader from 'src/views/reports/canbus-obd-reports/fuel-refill-report/fuel-refill-header'
import FuelRefillTable from 'src/views/reports/canbus-obd-reports/fuel-refill-report/fuel-refill-table'
import OBDReportHeader from 'src/views/reports/canbus-obd-reports/obd-report/obd-header'
import OBDReportTable from 'src/views/reports/canbus-obd-reports/obd-report/obd-table'
import { ReportWrapper } from 'src/styles/pages/reports'
import { TableUIContext } from 'src/contexts/TableContext'
import { useCommonStyles } from 'src/styles/common'

function CanbusOBDReports() {
  const { hideTableData } = useContext(TableUIContext)
  const [value, setValue] = useState('0')
  const styles = useCommonStyles()

  const handleChange = (event, newValue) => {
    hideTableData()
    setValue(newValue)
  }

  useEffect(() => {
    //for first tab selection animation
    setValue('1')
  }, [])

  return (
    <ReportWrapper>
      <Box className={styles.TabsWrapper}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={styles.TabList}>
            <TabList onChange={handleChange} aria-label='Canbus OBD Reports' variant='scrollable' scrollButtons='auto'>
              <Tab label='Fuel Refill Report' value='1' />
              <Tab label='OBD Report' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <FuelRefillHeader />
            <FuelRefillTable />
          </TabPanel>
          <TabPanel value='2'>
            <OBDReportHeader />
            <OBDReportTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default CanbusOBDReports

CanbusOBDReports.acl = {
  action: 'manage',
  subject: 'manage-canbus-obd-reports'
}

CanbusOBDReports.AuthGuard = true
