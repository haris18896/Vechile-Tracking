import { Box, Icon, Typography } from '@mui/material'
import React, { useContext } from 'react'

// ** ACL
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Components
import OilTrackingHeader from 'src/views/tracking/oil-tracking/oil-tracking-header'
import OilTrackingStat from 'src/views/tracking/oil-tracking/oil-tracking-stats'

// ** Styles
import { OilTrackingGraphCard, OilTrackingGraphsWrapper, useMapStyles } from 'src/styles/pages/tracking'
import OilTrackingTable from 'src/views/tracking/oil-tracking/oil-tracking-table'
import { NoDataInTable } from 'src/styles/common'
import NoDataAvailable from 'src/components/no-data-available'
import OilTrackingGraph from 'src/views/tracking/oil-tracking/oil-tracking-graph'

function OilTracking() {
  const classes = useMapStyles()
  const ability = useContext(AbilityContext)
  const [account, setAccount] = React.useState('')

  const onChangeHandler = (name, value) => {
    if (name === 'account') setAccount(value)
  }

  const oilStatsList = [
    {
      src: '/images/icons/tracking-icons/tank-ic.svg',
      title: 'Total Tank',
      value: '0',
      color: '#FF8B00',
      iconColor: 'warning'
    },
    {
      src: '/images/icons/tracking-icons/online-ic.svg',
      title: 'Online',
      value: '0',
      color: '#2FC17E',
      iconColor: 'success'
    },
    {
      src: '/images/icons/tracking-icons/offline-ic.svg',
      title: 'Offline',
      value: '0',
      color: '#FC3B61',
      iconColor: 'error'
    }
  ]

  //   Graph Data
  const oilLevelData = [
    {
      name: '14-09-2021 08:53:09',
      level: 0.1
    },
    {
      name: '11-08-2021 08:53:09',
      level: 0.2
    },
    {
      name: '19-09-2021 10:52:08',
      level: 0.3
    },
    {
      name: '19-08-2020 12:50:01',
      level: 0.4,
      pv: 0.8,
      amt: '3866 TJA'
    },
    {
      name: '09-01-2019 10:10:21',
      level: 0.5
    },
    {
      name: '29-01-2022 11:52:02',
      level: 0.6
    },
    {
      name: '24-02-2019 11:52:11',
      level: 0.7
    },
    {
      name: '24-02-2019 11:52:11',
      level: 0.8
    },
    {
      name: '24-02-2019 11:52:11',
      level: 0.9
    }
  ]

  //   Graph Data
  const oilUsageData = [
    {
      name: '14-09-2021 08:53:09',
      level: 0.1
    },
    {
      name: '11-08-2021 08:53:09',
      level: 0.2
    },
    {
      name: '19-09-2021 10:52:08',
      level: 0.3
    },
    {
      name: '19-08-2020 12:50:01',
      level: 0.4
    },
    {
      name: '09-01-2019 10:10:21',
      level: 0.5
    },
    {
      name: '29-01-2022 11:52:02',
      level: 0.6
    },
    {
      name: '24-02-2019 11:52:11',
      level: 0.7
    },
    {
      name: '24-02-2019 11:52:11',
      level: 0.8
    },
    {
      name: '24-02-2019 11:52:11',
      level: 0.9
    }
  ]

  const handlePageChange = () => {}
  const handleLimitChange = () => {}

  return (
    <Box sx={{ backgroundColor: '#F4F8F8', paddingBottom: '2rem' }}>
      <OilTrackingHeader account={account} ability={ability} onChangeHandler={onChangeHandler} />

      <Box className={classes.oilTrackingBox}>
        {oilStatsList.map((item, index) => (
          <OilTrackingStat key={index} {...item} />
        ))}
      </Box>

      <OilTrackingTable
        page={1}
        total={0}
        limit={10}
        loading={false}
        ability={ability}
        handleLimitChang={handleLimitChange}
        handlePageChange={handlePageChange}
        account={account}
      />

      <OilTrackingGraphsWrapper>
        <OilTrackingGraphCard>
          <Typography variant='h6' className={classes.title}>
            Current Level
          </Typography>

          {account ? <OilTrackingGraph title='Oil Level %' data={oilLevelData} /> : <NoDataAvailable />}
        </OilTrackingGraphCard>

        <OilTrackingGraphCard>
          <Typography variant='h6' className={classes.title}>
            Current Day Usage
          </Typography>
          {account ? <OilTrackingGraph title='Oil Usage' data={oilUsageData} /> : <NoDataAvailable />}
        </OilTrackingGraphCard>
      </OilTrackingGraphsWrapper>
    </Box>
  )
}

OilTracking.acl = {
  action: 'manage',
  subject: 'manage-oil-tracking'
}

OilTracking.AuthGuard = true

export default OilTracking
