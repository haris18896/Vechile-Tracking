import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styled Components
export const SettingsWrapper = styled(Box)(({ theme, swipe }) => ({
  padding: !swipe && theme.spacing(6),
  // paddingLeft: theme.spacing(6),
  // paddingRight: theme.spacing(6),
  // paddingTop: theme.spacing(6),
  // paddingBottom: theme.spacing(6),

  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.4rem',
  color: theme.palette.primary.text,
  letterSpacing: '0.18px',
  [theme.breakpoints.down(1300)]: {
    fontSize: '1.25rem'
  }
}))

export const TableWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'transparent'
}))
