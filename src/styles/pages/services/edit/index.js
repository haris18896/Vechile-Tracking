import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styled Components
export const ServicesWrapper = styled(Box)(({ theme, bordered }) => ({
  marginLeft: theme.spacing(8),
  marginRight: theme.spacing(8),
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  borderBottom: bordered && '1px solid #DFE2E6'
}))

export const ServicesBodyWrapper = styled(Box)(({ theme, bordered, align }) => ({
  paddingBottom: theme.spacing(6),
  display: 'flex',
  alignItems: align ? align : 'center',
  flexWrap: 'wrap',
  gap: '20px'
}))

export const PlaceholderText = styled(Box)(({ theme, bordered, align, required }) => ({
  color: '#C0C5D0'
}))

// Styles
export const useCustomStyles = makeStyles((theme, props) => ({
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

  TextField: {
    width: '100%',

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
  },

  TextArea: {
    width: '50%',
    marginRight: theme.spacing(2),
    flexShrink: '0',
    marginBottom: '1rem',

    '& .MuiInputBase-root': {
      fontSize: '0.875rem',
      borderRadius: '1.5rem'
    },

    '& .MuiInputBase-input': {
      padding: '0.6rem 1rem',
      height: '8rem',

      '&::placeholder': {
        color: '#C0C5D0',
        opacity: 1
      }
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.grey.A300
    }
  },

  Check: {
    marginRight: '0',
    marginLeft: 'auto'
  },

  Modal: {
    '& .MuiPaper-root': {
      background: props => props.modalBg,
      padding: '1rem'
    }
  }
}))

// export const useDatepickerStyles = makeStyles(theme => ({
//   datepicker: {
//     '& .react-datepicker__input-container': {
//       width: '50%',
//       marginBottom: '1rem'
//     },

//     '& .react-datepicker__input-container input': {
//       width: '100%',
//       color: '#0F224B',
//       borderRadius: '5rem',
//       fontSize: '0.875rem',
//       padding: '0.8rem 1rem',
//       borderWidth: '2px',
//       borderStyle: 'solid',
//       borderColor: theme.palette.grey.A300,
//       cursor: 'pointer'
//     },

//     background: 'none',
//     '&:hover': {
//       backgroundColor: 'transparent'
//     },
//     '&:before': {
//       content: 'a string'
//     }
//   }
// }))

export const useDatepickerStyles = makeStyles(theme => ({
  datepicker: {
    width: '100%',
    color: '#0F224B',
    borderRadius: '5rem',
    fontSize: '0.875rem',
    padding: '0.8rem 1rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#F4F8F8',
    cursor: 'pointer',
    background: 'none',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}))

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.4rem',
  color: theme.palette.text.main,
  letterSpacing: '0.18px',
  borderBottom: '4px solid',
  borderColor: theme.palette.text.main,
  width: 'max-content'
}))

export const Required = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  display: 'inline-block',
  fontSize: '20px',
  marginLeft: '3px'
}))
