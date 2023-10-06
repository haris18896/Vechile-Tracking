import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styled Components
export const ReportsWrapper = styled(Box)(({ theme, bordered }) => ({
  marginLeft: theme.spacing(0),
  marginRight: theme.spacing(0),
  margin: '10px 2.125rem 0 2.125rem',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),

  [theme.breakpoints.down('sm')]: {
    margin: '10px 1rem 0 1rem'
  }
}))

export const ReportsBodyWrapper = styled(Box)(({ theme, bordered, align }) => ({
  paddingBottom: theme.spacing(6),
  display: 'flex',
  alignItems: align ? align : 'center',
  flexWrap: 'wrap',
  gap: '20px'
}))

export const PlaceholderText = styled(Box)(({ theme, bordered, align }) => ({
  color: '#C0C5D0'
}))

// ** Reports main wrapper
export const ReportWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white
}))

// Styles
export const useCustomStyles = makeStyles(theme => ({
  Select: {
    borderRadius: '5rem',
    width: '100%',

    borderWidth: '2px',
    borderColor: theme.palette.grey.A300,

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
      fontSize: '0.875rem',

      '@media (max-width: 1366px)': {
        fontSize: '0.8rem'
      }
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
    width: '100%',
    marginBottom: '0',

    '& .MuiInputBase-root': {
      borderRadius: '5rem',
      fontSize: '0.875rem',

      '@media (max-width: 1366px)': {
        fontSize: '0.8rem'
      }
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
  }),

  exportStyles: {
    '& .MuiList-root': {
      background: theme.palette.customColors.darkBg,

      '& .MuiButtonBase-root': {
        color: '#fff',
        fontSize: '0.875rem',

        '&:hover': {
          color: theme.palette.customColors.darkBg
        }
      }
    }
  }
}))
