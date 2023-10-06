import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import GeofencePOIHeader from 'src/views/reports/geofence-report/geofence-or-poi-report/geofence-poi-header'
import GeofencePOITable from 'src/views/reports/geofence-report/geofence-or-poi-report/geofence-poi-table'
import GeofenceSummaryHeader from 'src/views/reports/geofence-report/geofence-summary-report/geofence-summary-header'
import GeofenceSummaryTable from 'src/views/reports/geofence-report/geofence-summary-report/geofence-summary-table'
import GeofenceVisitHeader from 'src/views/reports/geofence-report/geofence-visit/geofence-visit-report-header'
import GeofenceVisitTable from 'src/views/reports/geofence-report/geofence-visit/geofence-visit-report-table'
import GeofenceListHeader from 'src/views/reports/geofence-report/geofence-list/geofence-list-report-header'
import GeofenceListTable from 'src/views/reports/geofence-report/geofence-list/geofence-list-report-table'
import { useCommonStyles } from 'src/styles/common'
import { ReportWrapper } from 'src/styles/pages/reports'
import { TableUIContext } from 'src/contexts/TableContext'

function GeofenceReports() {
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
              aria-label='Geofence Reports Tabs'
              variant='scrollable'
              scrollButtons='auto'
            >
              <Tab label='Geofence or POI In Out Report' value='1' />
              <Tab label='Geofence Summary Report' value='2' />
              <Tab label='Geofence Visit Report' value='3' />
              <Tab label='Geofences List Report' value='4' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <GeofencePOIHeader />
            <GeofencePOITable />
          </TabPanel>
          <TabPanel value='2'>
            <GeofenceSummaryHeader />
            <GeofenceSummaryTable />
          </TabPanel>
          <TabPanel value='3'>
            <GeofenceVisitHeader />
            <GeofenceVisitTable />
          </TabPanel>
          <TabPanel value='4'>
            <GeofenceListHeader />
            <GeofenceListTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default GeofenceReports

GeofenceReports.acl = {
  action: 'manage',
  subject: 'manage-geofence-reports'
}

GeofenceReports.AuthGuard = true
