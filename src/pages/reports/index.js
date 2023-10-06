import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import TrackDataReportTable from 'src/views/reports/tracking-report/track-data-report/track-data-report-table'
import TrackDataReportHeader from 'src/views/reports/tracking-report/track-data-report/track-data-report-header'
import TravelReportHeader from 'src/views/reports/tracking-report/travel-report/travel-report-header'
import TravelReportTable from 'src/views/reports/tracking-report/travel-report/travel-report-table'
import StoppageReportHeader from 'src/views/reports/tracking-report/stoppage-report/stoppage-report-header'
import StoppageReportTable from 'src/views/reports/tracking-report/stoppage-report/stoppage-report-table'
import TripReportHeader from 'src/views/reports/tracking-report/trip-report/trip-report-header'
import TripReportTable from 'src/views/reports/tracking-report/trip-report/trip-report-table'
import IdleReportHeader from 'src/views/reports/tracking-report/idle-report/idle-report-header'
import IdleReportTable from 'src/views/reports/tracking-report/idle-report/idle-report-table'
import ExIdleReportHeader from 'src/views/reports/tracking-report/ex-idle-report/exidle-report-header'
import ExIdleReportTable from 'src/views/reports/tracking-report/ex-idle-report/exidle-report-table'
import DistanceReportHeader from 'src/views/reports/tracking-report/distance-report/distance-report-header'
import DistanceReportTable from 'src/views/reports/tracking-report/distance-report/distance-report-table'
import EspnReportHeader from 'src/views/reports/tracking-report/espn-polling-report/espn-report-header'
import EspnReportTable from 'src/views/reports/tracking-report/espn-polling-report/espn-report-table'
import ObdReportHeader from 'src/views/reports/tracking-report/OBD-report/obd-report-header'
import ObdReportTable from 'src/views/reports/tracking-report/OBD-report/obd-report-table'
import DailyWorkingReportHeader from 'src/views/reports/tracking-report/daily-working-hours/daily-working-header'
import DailyWorkingTable from 'src/views/reports/tracking-report/daily-working-hours/daily-working-table'
import WorkingHoursTable from 'src/views/reports/tracking-report/working-hours-report/working-hours-table'
import WorkingHoursReportHeader from 'src/views/reports/tracking-report/working-hours-report/working-hours-header'

// ** Styles
import { TableUIContext } from 'src/contexts/TableContext'
import { ReportWrapper } from 'src/styles/pages/reports'
import { useCommonStyles } from 'src/styles/common'

function Reports() {
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
            <TabList
              onChange={handleChange}
              aria-label='Track data report tabs'
              variant='scrollable'
              scrollButtons='auto'
            >
              <Tab label='Track Data Report' value='1' />
              <Tab label='Travel Report' value='2' />
              <Tab label='Stoppage Report' value='3' />
              <Tab label='Trip Report' value='4' />
              <Tab label='Idle Report' value='5' />
              <Tab label='EX-Idle Report' value='6' />
              <Tab label='Distance Report' value='7' />
              <Tab label='ESN Polling Report' value='8' />
              <Tab label='OBD Report' value='9' />
              <Tab label='Daily Working Hours Report' value='10' />
              <Tab label='Working Hours Report' value='11' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <TrackDataReportHeader />
            <TrackDataReportTable />
          </TabPanel>
          <TabPanel value='2'>
            <TravelReportHeader />
            <TravelReportTable />
          </TabPanel>
          <TabPanel value='3'>
            <StoppageReportHeader />
            <StoppageReportTable />
          </TabPanel>
          <TabPanel value='4'>
            <TripReportHeader />
            <TripReportTable />
          </TabPanel>
          <TabPanel value='5'>
            <IdleReportHeader />
            <IdleReportTable />
          </TabPanel>
          <TabPanel value='6'>
            <ExIdleReportHeader />
            <ExIdleReportTable />
          </TabPanel>
          <TabPanel value='7'>
            <DistanceReportHeader />
            <DistanceReportTable />
          </TabPanel>
          <TabPanel value='8'>
            <EspnReportHeader />
            <EspnReportTable />
          </TabPanel>
          <TabPanel value='9'>
            <ObdReportHeader />
            <ObdReportTable />
          </TabPanel>
          <TabPanel value='10'>
            <DailyWorkingReportHeader />
            <DailyWorkingTable />
          </TabPanel>
          <TabPanel value='11'>
            <WorkingHoursReportHeader />
            <WorkingHoursTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default Reports

Reports.acl = {
  action: 'manage',
  subject: 'read-tracking-report'
}

Reports.AuthGuard = true
