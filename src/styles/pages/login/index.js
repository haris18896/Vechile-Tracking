import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Styled Components
export const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

export const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '10rem'
}))

export const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(8),
  marginTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 550
  }
}))

export const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

export const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2.4rem',
  color: theme.palette.primary.contrastText,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

export const TypographySubHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '1.20rem',
  color: theme.palette.primary.contrastText,
  letterSpacing: '0.18px',
  marginBottom: '3rem'
}))

export const FormControlLabel = styled(MuiFormControlLabel)(({ theme, color }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: color ? color : theme.palette.primary.contrastText
  }
}))

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  color: theme.palette.primary.contrastText,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(2)
}))

export const EmailField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem',
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.primary.contrastText}`,
    '&:hover': {
      borderColor: 'white' // Updated borderColor on hover
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      border: `2px solid ${theme.palette.primary.contrastText}`
    }
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    padding: '0.25rem 1rem'
  }

  // '& .MuiInputLabel-outlined': {
  //   color: theme.palette.primary.contrastText,
  //   '&.Mui-focused': {
  //     color: theme.palette.primary.contrastText
  //   }
  // }
}))

export const InputField = styled(TextField)(({ theme, error }) => ({
  borderRadius: '5rem',
  backgroundColor: 'transparent',
  fontWeight: 500,
  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem',
    fontSize: '0.875rem !important'
  },

  '& .MuiOutlinedInput-input': {
    color: theme.palette.primary.contrastText,
    borderRadius: '5rem',
    border: error ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.primary.contrastText}`,
    padding: '0.35rem 1rem'
  }
}))

export const InputOutLine = styled(OutlinedInput)(({ theme, error }) => ({
  backgroundColor: 'transparent',
  border: error ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.primary.contrastText}`,
  borderRadius: '5rem',
  fontWeight: 500,
  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem',
    fontSize: '0.875rem !important',
    fontWeight: 500
  },

  '& .MuiOutlinedInput-input': {
    color: theme.palette.primary.contrastText,
    padding: '0.25rem 1rem',
    fontSize: '0.875rem !important',
    fontWeight: 500
  }
}))

export const PasswordField = styled(OutlinedInput)(({ theme, error, color = false }) => ({
  backgroundColor: 'transparent',
  borderRadius: '5rem',
  border: error
    ? `1px solid ${theme.palette.error.main}`
    : !color
    ? `1px solid ${theme.palette.primary.contrastText}`
    : null,

  fontWeight: 500,
  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem',
    fontSize: '0.875rem !important',
    fontWeight: 500,
    border: 'none'
  },

  '& .MuiOutlinedInput-input': {
    color: !color && theme.palette.primary.contrastText,
    padding: '0.35rem 1rem',
    fontSize: '0.875rem !important',
    fontWeight: 500
  }
}))
 
export const LeftWrapper = styled(Box)(({ theme }) => ({
  flex: 0.6,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center'
}))

export const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

export const SignUpWrapperBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center'
}))

export const RightWrapperBox = styled(Box)(({ theme }) => ({
  p: 7,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
  // overflowY:'auto',
  // overflowX:'none'
}))

export const LogoBox = styled(Box)(({ theme }) => ({
  top: 30,
  left: 40,
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center'
}))

export const LogoTitle = styled(Typography)(({ theme }) => ({
  ml: 2,
  color: 'white',
  lineHeight: 1,
  fontWeight: 700,
  fontSize: '1.5rem !important'
}))

// ** Styles
export const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.contrastText
  },
  checkbox: {
    color: theme.palette.primary.contrastText,
    '&.Mui-checked': {
      color: theme.palette.primary.contrastText
    }
  },
  button: {
    backgroundColor: theme.palette.common.orange,
    color: theme.palette.primary.contrastText,
    borderRadius: '5rem',
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconRight: {
    color: theme.palette.primary.contrastText,
    marginLeft: 'auto !important'
  },
  iconLeft: {
    color: theme.palette.primary.contrastText,
    marginRight: 'auto !important'
  },
  translator: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '12rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '0.5rem',
    padding: '0.1rem 0.2rem',
    border: `2px solid ${theme.palette.primary.contrastText}`
  },
  selector: {
    color: theme.palette.primary.contrastText,
    marginLeft: '1rem',

    '& svg': {
      display: 'none'
    },

    '& div': {
      paddingRight: '0 !important'
    }
  },
  language: {
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    fontSize: '1rem'
  }
}))
