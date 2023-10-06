import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'

import { Box, TextField, Select, InputLabel, FormControl } from '@mui/material'

export const FieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const FieldHorizontalWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const FieldHorizontalFlex = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const FieldHorizontalWrapperBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}))

export const TextInput = styled(TextField)(({ theme, error }) => ({
  fontWeight: 500,
  fontSize: '1rem',

  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem'
  },

  '& .MuiOutlinedInput-input': {
    // padding: theme.spacing(2, 3)
  }
}))

export const PasswordField = styled(OutlinedInput)(({ theme, error, color = false }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  paddingTop: '3px',
  paddingBottom: '3px',
  borderRadius: '5rem',
  border: error ? `1px solid ${theme.palette.error.main}` : !color ? `1px solid ${theme.palette.grey.A300}` : null,

  fontWeight: 500,
  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem',
    fontSize: '0.875rem !important',
    fontWeight: 500,
    border: 'none'
  },

  '& .MuiOutlinedInput-input': {
    color: theme.palette.grey.main,
    padding: '0.35rem 1rem',
    fontSize: '0.875rem !important',
    fontWeight: 500
  }
}))

export const SelectInput = styled(Select)(({ theme }) => ({
  borderRadius: '5rem',

  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2, 3),
    borderRadius: '5rem'
  }
}))

export const TextLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1)
}))

export const HeaderLabel = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.2rem',
  lineHeight: '2.2',
  paddingBottom: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,

  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem'
  }
}))

export const StatsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '-webkit-fill-available'
}))
