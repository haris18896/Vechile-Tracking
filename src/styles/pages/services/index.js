import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styled Components
export const ServicesWrapper = styled(Box)(({ theme, bordered }) => ({
  marginLeft: theme.spacing(12),
  marginRight: theme.spacing(12),
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  borderBottom: bordered && '1px solid #DFE2E6',

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6),
  },
}))

export const ServicesBodyWrapper = styled(Box)(({ theme, bordered, align }) => ({
  paddingBottom: theme.spacing(6),
  display: 'flex',
  alignItems: align ? align : 'center',
  flexWrap: 'wrap',
  gap: '20px'
}))

export const PlaceholderText = styled(Box)(({ theme, bordered, align }) => ({
  color: '#C0C5D0'
}))

// ** Styled Components
export const ServiceWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white
}))
  

// Styles
export const useCustomStyles = makeStyles(theme => ({
  Select: {
    borderRadius: '5rem',
    width: '12rem',
    marginRight: theme.spacing(2),
    flexShrink: '0',
    borderWidth: '2px',
    borderColor: theme.palette.grey.A300,
    marginBottom: 0,

    // input color
    '& .MuiOutlinedInput-input': {
      color: theme.palette.grey[300]
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey.A300,
      borderWidth: '2px'
    },

    '& .MuiOutlinedInput-input': {
      padding: '0.6rem 1rem',
      fontSize: '0.875rem'
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },

    // '& .MuiSelect-select': {
    //   padding: '0.8rem 1rem'
    // },

    '& .MuiSelect-icon': {
      top: 'calc(50% - 12px)'
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '5rem',

      '& fieldset': {
        borderColor: theme.palette.grey.A300
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey.A300
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey.A300
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey.A300
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey.A300
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey.A300
      }
    }
  },

  TextField: props => ({
    width: props.width ? props.width : '15rem',
    marginRight: theme.spacing(2),
    flexShrink: '0',
    marginBottom: '0',

    '& .MuiInputBase-root': {
      borderRadius: '5rem',
      fontSize: '0.875rem'
    },

    '& .MuiInputBase-input': {
      padding: '0.6rem 1rem',

      '&::placeholder': {
        color: '#C0C5D0',
        opacity: 1
      }
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.grey.A300
    }
  })
}))

export const IconWrapper = styled(Box)(({ theme, bg, border, width, height, circle }) => ({
  width: width ? width : '30px',
  height: height ? height : '30px',
  background: bg ? bg : '',
  border: '2px solid',
  borderColor: border ? border : bg,
  borderRadius: circle ? '50%' : '',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: '.3s all ease',
  cursor: 'pointer',

  '&:hover': {
    background: 'none',

    svg: {
      color: bg + '!important'
    }
  }
}))
