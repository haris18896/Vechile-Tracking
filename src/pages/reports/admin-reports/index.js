import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import UserLoginHeader from 'src/views/reports/admin-reports/user-login-report/user-login-header'
import UserLoginTable from 'src/views/reports/admin-reports/user-login-report/user-login-table'
import AssetRegisteredHeader from 'src/views/reports/admin-reports/asset-registered-report/asset-registered-header'
import AssetRegisteredTable from 'src/views/reports/admin-reports/asset-registered-report/asset-registered-table'
import HealthCheckHeader from 'src/views/reports/admin-reports/health-check-report/health-check-header'
import HealthCheckTable from 'src/views/reports/admin-reports/health-check-report/health-check-table'
import RawDataHeader from 'src/views/reports/admin-reports/raw-data-report/raw-data-header'
import RawDataTable from 'src/views/reports/admin-reports/raw-data-report/raw-data-table'
import EmailReportHeader from 'src/views/reports/admin-reports/email-report/email-header'
import EmailReportTable from 'src/views/reports/admin-reports/email-report/email-table'
import DistributeActivityHeader from 'src/views/reports/admin-reports/distributor-activity-report/distributor-activity-header'
import DistributeActivityTable from 'src/views/reports/admin-reports/distributor-activity-report/distributor-activity-table'
import TaskManagementHeader from 'src/views/reports/admin-reports/task-management-report/task-management-header'
import TaskManagementTable from 'src/views/reports/admin-reports/task-management-report/task-management-table'
import { TableUIContext } from 'src/contexts/TableContext'
import { ReportWrapper } from 'src/styles/pages/reports'
import { useCommonStyles } from 'src/styles/common'
import DataConsumptionHeader from 'src/views/reports/admin-reports/data-consumption/data-consumption-header'
import DataConsumptionTable from 'src/views/reports/admin-reports/data-consumption/data-consumption-table'

function AdminReports() {
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
            <TabList onChange={handleChange} aria-label='Admin Reports' variant='scrollable' scrollButtons='auto'>
              <Tab label='User Login Report' value='1' />
              <Tab label='Asset Registered Report' value='2' />
              <Tab label='Health Check Report' value='3' />
              <Tab label='Raw Data Report' value='4' />
              <Tab label='Data Consumption Report' value='5' />
              <Tab label='Email Report' value='6' />
              <Tab label='Distributor Activity Report' value='7' />
              <Tab label='Task Management Report' value='8' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <UserLoginHeader />
            <UserLoginTable />
          </TabPanel>
          <TabPanel value='2'>
            <AssetRegisteredHeader />
            <AssetRegisteredTable />
          </TabPanel>
          <TabPanel value='3'>
            <HealthCheckHeader />
            <HealthCheckTable />
          </TabPanel>
          <TabPanel value='4'>
            <RawDataHeader />
            <RawDataTable />
          </TabPanel>
          <TabPanel value='5'>
            <DataConsumptionHeader />
            <DataConsumptionTable />
          </TabPanel>
          <TabPanel value='6'>
            <EmailReportHeader redirectURL='/reports/admin-reports/email-report' />
            <EmailReportTable />
          </TabPanel>
          <TabPanel value='7'>
            <DistributeActivityHeader />
            <DistributeActivityTable />
          </TabPanel>
          <TabPanel value='8'>
            <TaskManagementHeader />
            <TaskManagementTable />
          </TabPanel>
        </TabContext>
      </Box>
    </ReportWrapper>
  )
}

export default AdminReports

AdminReports.acl = {
  action: 'manage',
  subject: 'manage-admin-reports'
}

AdminReports.AuthGuard = true
