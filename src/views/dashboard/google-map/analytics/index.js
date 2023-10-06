import React, { useEffect } from 'react'

// ** MUI
import { Box, Grid, Typography } from '@mui/material'

// ** Custom Components
import { Analytics, GoogleAnalyticsWrapper, GraphWrapper, useStyles } from 'src/styles/pages/dashboard'
import CardStatsVertical from 'src/components/Statistics/CardStatsVertical'
import CardCircular from 'src/components/Statistics/CardCircular'
import StateIndicator from 'src/components/Statistics/StateIndicator'
import BarChartGraph from 'src/components/charts/bar-chart/index.js'
import RadialBarChart from 'src/components/charts/radial-bar-chart'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssetCountAction } from 'src/store/tracking/index/trackingAction'
import { useRouter } from 'next/router'

function GoogleAnalytics() {
  // ** ruoter
  const router = useRouter()

  const classes = useStyles()
  const dispatch = useDispatch()

  const { getAlertsList } = useSelector(state => state.alerts)

  // ** Selector
  const { getAllAssetCount } = useSelector(state => state?.tracking)

  // ** Gettigng Labels and Data for graph
  const getStatusCounts = Object.entries(getAllAssetCount?.status_counts ?? [])?.map(status => {
    const val = Object.values(status)

    return {
      label: val[0],
      value: val[1]
    }
  })

  // ** Getting Vehicle/Asset Total Count
  const assetCount = getAllAssetCount?.asset_type_counts?.reduce((accum, current) => {
    return accum + current.assets_count
  }, 0)

  // ** Getting All Asset Count Data
  const assetCountData = getAllAssetCount?.asset_type_counts

  // ** Fethcing the Data for asset Count
  useEffect(() => {
    dispatch(getAllAssetCountAction({}))
  }, [router])

  const States = [
    {
      title: 'Alerts',
      stats: `${getAlertsList?.total || 0}`,
      icon: 'ph:bell-fill',
      color: '#FC3B11'
    },
    {
      title: 'Notification',
      stats: '23',
      icon: 'ph:bell-fill',
      color: '#FF8B00'
    },
    {
      title: 'Vehicle Expiry Alert',
      stats: '284',
      icon: 'ph:bell-fill',
      color: '#FC3B61'
    }
    // {
    //   title: 'Account Expiry Alert',
    //   stats: '17',
    //   icon: 'ph:bell-fill',
    //   color: '#FC3B61'
    // }
  ]

  return (
    <Grid container pt={{ xs: 15, sm: 25 }} sx={{ height: '100%' }}>
      <Grid item xs={12} sx={{ height: '100%' }}>
        <GoogleAnalyticsWrapper>
          <Analytics>
            {/* States */}
            <Box className={classes.statesBox}>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={{ xs: 4, md: 2 }}
                sx={{ marginTop: { xs: 5, md: 0 }, marginBottom: { xs: 5, md: 0 } }}
              >
                {States.map((state, index) => (
                  <Grid key={index} item xs={4} sm={4}>
                    <CardStatsVertical
                      icon={state.icon}
                      title={state.title}
                      bg={state.color}
                      stats={state.stats}
                      iconColor='#fff'
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Graphs */}
            <GraphWrapper sx={{ overflowY: { xs: 'auto', md: 'auto' }, height: '100%' }}>
              <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '500', textAlign: 'center' }}>
                Monitor Center
              </Typography>

              {/* Radial Graph */}

              <Box className={classes.statesBox} sx={{ mb: 1 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Box className={classes.boxWrapper}>
                      <RadialBarChart
                        labels={getStatusCounts?.map(x => x.label) ?? ['No Data']}
                        data={getStatusCounts?.map(x => x.value) ?? [0]}
                      />
                    </Box>
                  </Grid>

                  {/* <Grid item xs={6} sm={6}>
                    <Box className={classes.circularBox}>
                      <CardCircular bg='#FC3B61' />
                      <Box className={classes.indicatorWrapper}>
                        <StateIndicator circle='success' color='#2FC17E' text='ONSITE' />
                        <StateIndicator circle='error' color='#FC3B61' text='OFFSITE' />
                      </Box>
                    </Box>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Box className={classes.boxWrapper}>
                      <Typography variant='body' sx={{ mb: 5, mt: 1, fontWeight: '500', textAlign: 'center' }}>
                        Total Vehicles: {assetCount}
                      </Typography>
                    </Box>
                    <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                      <BarChartGraph data={assetCountData} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </GraphWrapper>
          </Analytics>
        </GoogleAnalyticsWrapper>
      </Grid>
    </Grid>
  )
}

export default GoogleAnalytics
