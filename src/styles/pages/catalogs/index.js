import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styled Components
export const CatalogsWrapper = styled(Box)(({ theme, bordered }) => ({
  marginLeft: theme.spacing(8),
  marginRight: theme.spacing(8),
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  borderBottom: bordered && '1px solid #DFE2E6'
}))

// ** Styled Components
export const Catalog = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white
}))

export const ServicesBodyWrapper = styled(Box)(({ theme, bordered, align }) => ({
  paddingBottom: theme.spacing(6),
  display: 'flex',
  alignItems: align ? align : 'center',
  flexWrap: 'wrap',
  gap: '20px'
}))

// Styles
export const useCustomStyles = makeStyles(theme => ({
  root: {
    paddingTop: '0'
  },
  icon: {
    color: theme.palette.grey.main
  },
  Select: {
    borderRadius: '5rem',
    width: '100%',
    flexShrink: '0',
    borderWidth: '2px',
    borderColor: theme.palette.grey.A300,
    paddingTop: '0',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey.A300,
      borderWidth: '2px'
    },

    '& .MuiOutlinedInput-input': {
      padding: '0.6rem 1rem',
      color: theme.palette.grey[300],
      fontSize: '0.875rem'
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },

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
    flexShrink: '0',
    marginBottom: '0',

    '& .MuiInputBase-root': {
      borderRadius: '5rem',
      fontSize: '0.875rem'
    },
    '& .css-1cvtlbj-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
      WebkitTextFillColor: 'black',
      color: 'black'
    },
    '& .Mui-disabled > fieldset': {
      borderWidth: '2px',
      borderColor: `${theme.palette.grey.A300} !important`,
      WebkitTextFillColor: 'black !important'
    },
    '& .css-ywao9a-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E53E3E !important'
    },
    '& .MuiInputBase-input': {
      padding: '0.6rem 1rem',
      textOverflow: 'ellipsis',

      '&::placeholder': {
        color: `${theme.palette.grey.A500} !important`,
        opacity: 1,
        fontWeight: 500
      }
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.grey.A300
    }
  }),

  TextArea: props => ({
    width: '100%',
    flexShrink: '0',
    marginBottom: '0',

    '& .MuiInputBase-root': {
      borderRadius: '24px',
      fontSize: '0.875rem'
    },

    '& .MuiInputBase-input': {
      padding: '0.6rem 1rem',

      '&::placeholder': {
        color: theme.palette.grey.A500,
        opacity: 1,
        fontWeight: 500
      }
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.grey.A300
    }
  }),

  AutoCompleteSelect: {
    borderRadius: '5rem',
    width: '100%',
    flexShrink: '0',
    borderWidth: '2px',
    borderColor: theme.palette.grey.A300,

    // input color
    '& .MuiOutlinedInput-input': {
      color: theme.palette.grey[300]
    },

    '& .MuiOutlinedInput-input::placeholder': {
      color: theme.palette.grey.A500,
      opacity: '1',
      fontWeight: 500
    },

    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.text.main} !important`
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey.A300,
      borderWidth: '2px'
    },

    '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
      padding: '0rem 0.6rem !important',
      fontSize: '0.872rem',
      color: '#000'
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },

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

  AutoCompleteSelectForm: {
    borderRadius: '5rem',
    width: '100%',
    flexShrink: '0',
    borderWidth: '1px',
    borderColor: '#DCDCDC',
    paddingTop: '0',

    // input color
    '& .MuiOutlinedInput-input': {
      color: '#949494'
    },

    '& .MuiOutlinedInput-input::placeholder': {
      color: '#A1A5AB',
      fontWeight: 300,
      opacity: '1'
    },

    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.text.main} !important`
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DCDCDC',
      borderWidth: '1px'
    },

    '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
      padding: '0.09rem 0.6rem',
      fontSize: '0.95rem',
      color: '#000'
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },

    '& .MuiSelect-icon': {
      top: 'calc(50% - 12px)'
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '5rem',

      '& fieldset': {
        borderColor: '#DCDCDC'
      },
      '&:hover fieldset': {
        borderColor: '#DCDCDC'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#DCDCDC'
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DCDCDC'
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DCDCDC'
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DCDCDC'
      }
    }
  }
}))

export const IconWrapper = styled(Box)(({ theme, bg, iconColor, border, width, height, circle }) => ({
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

  svg: {
    color: iconColor
  },

  '&:hover': {
    background: 'none',

    svg: {
      color: bg + ' !important'
    }
  }
}))
