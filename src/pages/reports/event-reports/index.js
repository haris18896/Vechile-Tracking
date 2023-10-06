import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import SpeedViolationReportHeader from 'src/views/reports/event-report/speed-violation-report/speed-violation-report-header'
import SpeedViolationReportTable from 'src/views/reports/event-report/speed-violation-report/speed-violation-report-table'
import AreaSpeedViolationHeader from 'src/views/reports/event-report/area-speed-violation-report/area-speed-violation-header'
import AreaSpeedViolationTable from 'src/views/reports/event-report/area-speed-violation-report/area-speed-violation-table'
import VehiclePollReportHeader from 'src/views/reports/event-report/vehicle-pull-report/vehicle-poll-report-header'
import VehiclePollReportTable from 'src/views/reports/event-report/vehicle-pull-report/vehicle-poll-report-table'
import RulesTriggerReportHeader from 'src/views/reports/event-report/rules-trigger-report/rules-trigger-report-header'
import RulesTriggerReportTable from 'src/views/reports/event-report/rules-trigger-report/rules-trigger-report-table'
import EventReportHeader from 'src/views/reports/event-report/event-report/event-report-header'
import EventReportTable from 'src/views/reports/event-report/event-report/event-report-table'
import { ReportWrapper } from 'src/styles/pages/reports'
import { useCommonStyles } from 'src/styles/common'
import { TableUIContext } from 'src/contexts/TableContext'
import EmailModal from 'src/components/Dialogs/EmailModal'

function EventReports() {
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
            <TabList onChange={handleChange} aria-label='Event Reports Tabs' variant='scrollable' scrollButtons='auto'>
              <Tab label='Speed Violation Report' value='1' />
              <Tab label='Area wise speed violation' value='2' />
              <Tab label='Vehicle Not Poll Report' value='3' />
              <Tab label='Rules Trigger Report' value='4' />
              <Tab label='Event Report' value='5' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <SpeedViolationReportHeader />
            <SpeedViolationReportTable />
          </TabPanel>
          <TabPanel value='2'>
            <AreaSpeedViolationHeader />
            <AreaSpeedViolationTable />
          </TabPanel>
          <TabPanel value='3'>
            <VehiclePollReportHeader />
            <VehiclePollReportTable />
          </TabPanel>
          <TabPanel value='4'>
            <RulesTriggerReportHeader />
            <RulesTriggerReportTable />
          </TabPanel>
          <TabPanel value='5'>
            <EventReportHeader />
            <EventReportTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default EventReports

EventReports.acl = {
  action: 'manage',
  subject: 'manage-event-reports'
}

EventReports.AuthGuard = true
