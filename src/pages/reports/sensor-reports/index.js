import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import TempHeader from 'src/views/reports/sensor-report/temp-report/temp-header'
import TempTable from 'src/views/reports/sensor-report/temp-report/temp-table'
import SensorHeader from 'src/views/reports/sensor-report/sensor-report/sensor-header'
import SensorTable from 'src/views/reports/sensor-report/sensor-report/sensor-table'
import LoadingDumpingHeader from 'src/views/reports/sensor-report/loading-dumping-report/loading-dumping-header'
import LoadingDumpingTable from 'src/views/reports/sensor-report/loading-dumping-report/loading-dumping-table'
import OilUsageHeader from 'src/views/reports/sensor-report/oil-usage-report/oil-usage-header'
import OilUsageTable from 'src/views/reports/sensor-report/oil-usage-report/oil-usage-table'
import WasteBinCollectionHeader from 'src/views/reports/sensor-report/waste-bin-collection-report/bin-collection-header'
import WasteBinCollectionTable from 'src/views/reports/sensor-report/waste-bin-collection-report/bin-collection-table'
import { TableUIContext } from 'src/contexts/TableContext'
import { useCommonStyles } from 'src/styles/common'
import { ReportWrapper } from 'src/styles/pages/reports'

function SensorReports() {
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
            <TabList onChange={handleChange} aria-label='Sensor Reports' variant='scrollable' scrollButtons='auto'>
              <Tab label='Temp Report' value='1' />
              <Tab label='Sensor Report' value='2' />
              <Tab label='Loading/Dumping Report' value='3' />
              <Tab label='Oil Usage Report' value='4' />
              <Tab label='Waste Bin Collection Report' value='5' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <TempHeader />
            <TempTable />
          </TabPanel>
          <TabPanel value='2'>
            <SensorHeader />
            <SensorTable />
          </TabPanel>

          <TabPanel value='3'>
            <LoadingDumpingHeader />
            <LoadingDumpingTable />
          </TabPanel>

          <TabPanel value='4'>
            <OilUsageHeader />
            <OilUsageTable />
          </TabPanel>

          <TabPanel value='5'>
            <WasteBinCollectionHeader />
            <WasteBinCollectionTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default SensorReports

SensorReports.acl = {
  action: 'manage',
  subject: 'manage-sensor-reports'
}

SensorReports.AuthGuard = true
