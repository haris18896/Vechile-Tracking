import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'

export const GoogleWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}))

export const GoogleAnalyticsWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: '1rem',
  paddingTop: '0',
  height: '100%'
}))

export const Analytics = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}))

export const GraphWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '0.5rem',
  marginTop: '1rem',
}))

export const useStyles = makeStyles(theme => ({
  table: {
    height: '100%',
    overflow: 'auto !important'
  },
  assetBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  statesBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  graphBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  boxWrapper: {
    margin: '5px'
  },
  circularBox: {
    margin: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))
