import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

// ** Components
import { styled, useTheme } from '@mui/material/styles'
import EmailReportAddHeader from 'src/views/reports/admin-reports/email-report/Add/email-add-header'
import EmailReportManagement from 'src/views/reports/admin-reports/email-report/Add/email-report'

function AdminReports() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // ** Styled Components
  const ReportsWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.common.white
  }))

  return (
    <ReportsWrapper>
      <EmailReportAddHeader />
      <EmailReportManagement />
    </ReportsWrapper>
  )
}

export default AdminReports
