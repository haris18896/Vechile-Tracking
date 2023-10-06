import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

// ** Components
import FleetSummaryReportHeader from 'src/views/reports/fleet-report/fleet-summary-report/fleet-summary-report-header'
import FleetSummaryReportTable from 'src/views/reports/fleet-report/fleet-summary-report/fleet-summary-report-table'
import MileageReportHeader from 'src/views/reports/fleet-report/mileage-report/mileage-report-header'
import MileageReportTable from 'src/views/reports/fleet-report/mileage-report/mileage-report-table'
import MaintenanceReportHeader from 'src/views/reports/fleet-report/maintenance-report/maintenance-report-header'
import MaintenanceReportTable from 'src/views/reports/fleet-report/maintenance-report/maintenance-report-table'
import VehicleDiagnosticReportHeader from 'src/views/reports/fleet-report/vehicle-diagnostic-report/vehicle-diagnostic-report-header'
import VehicleDiagnosticReportTable from 'src/views/reports/fleet-report/vehicle-diagnostic-report/vehicle-diagnostic-report-table'
import VehiclePerformanceReportHeader from 'src/views/reports/fleet-report/vehicle-performance-report/vehicle-performance-report-header'
import VehiclePerformanceReportTable from 'src/views/reports/fleet-report/vehicle-performance-report/vehicle-performance-report-table'
import FuelFilledReportHeader from 'src/views/reports/fleet-report/fuel-filled-report/fuel-filled-report-header'
import FuelFilledReportTable from 'src/views/reports/fleet-report/fuel-filled-report/fuel-filled-report-table'
import { useCommonStyles } from 'src/styles/common'
import { ReportWrapper } from 'src/styles/pages/reports'

function Reports() {
  const [value, setValue] = useState('1')
  const [showTableData, setShowTableData] = useState(false)
  const [tableHeight, setTableHeight] = useState('')
  const styles = useCommonStyles()

  const handleChange = (event, newValue) => {
    setShowTableData(false)
    setValue(newValue)
  }

  const toggleTableData = tableH => {
    setShowTableData(true)
  }

  const getTableHeight = tableH => {
    setTableHeight(tableH?.current?.offsetHeight + 200 + 'px')
  }

  return (
    <ReportWrapper>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={styles.TabList}>
          <TabList onChange={handleChange} variant='scrollable' scrollButtons='auto'>
            <Tab label='Fleet Summary Report' value='1' />
            <Tab label='Mileage Report' value='2' />
            <Tab label='Maintenance Fleet Report' value='3' />
            <Tab label='Vehicle Diagnostic Report' value='4' />
            <Tab label='Vehicle Performance Report' value='5' />
            <Tab label='Fuel Filled Report' value='6' />
          </TabList>
        </Box>
        <TabPanel value='1' sx={{ padding: 0 }}>
          <FleetSummaryReportHeader toggleTableData={toggleTableData} getTableHeight={getTableHeight} />
          <FleetSummaryReportTable showTableData={showTableData} tableHeight={tableHeight} />
        </TabPanel>
        <TabPanel value='2' sx={{ padding: 0 }}>
          <MileageReportHeader toggleTableData={toggleTableData} getTableHeight={getTableHeight} />
          <MileageReportTable showTableData={showTableData} tableHeight={tableHeight} />
        </TabPanel>
        <TabPanel value='3' sx={{ padding: 0 }}>
          <MaintenanceReportHeader toggleTableData={toggleTableData} getTableHeight={getTableHeight} />
          <MaintenanceReportTable showTableData={showTableData} tableHeight={tableHeight} />
        </TabPanel>
        <TabPanel value='4' sx={{ padding: 0 }}>
          <VehicleDiagnosticReportHeader toggleTableData={toggleTableData} getTableHeight={getTableHeight} />
          <VehicleDiagnosticReportTable showTableData={showTableData} tableHeight={tableHeight} />
        </TabPanel>
        <TabPanel value='5' sx={{ padding: 0 }}>
          <VehiclePerformanceReportHeader toggleTableData={toggleTableData} getTableHeight={getTableHeight} />
          <VehiclePerformanceReportTable showTableData={showTableData} tableHeight={tableHeight} />
        </TabPanel>
        <TabPanel value='6' sx={{ padding: 0 }}>
          <FuelFilledReportHeader toggleTableData={toggleTableData} getTableHeight={getTableHeight} />
          <FuelFilledReportTable showTableData={showTableData} tableHeight={tableHeight} />
        </TabPanel>
      </TabContext>
    </ReportWrapper>
  )
}

export default Reports

Reports.acl = {
  action: 'manage',
  subject: 'manage-fleet-reports'
}

Reports.AuthGuard = true
