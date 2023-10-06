import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styled Components
export const GraphsWrapper = styled(Box)(({ theme, bordered }) => ({
  marginLeft: theme.spacing(8),
  marginRight: theme.spacing(8),
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  borderBottom: bordered && '1px solid #DFE2E6'
}))

export const GraphBodyWrapper = styled(Box)(({ theme, bordered, align }) => ({
  paddingBottom: theme.spacing(4)
}))

export const customDot = styled(Box)(({ theme, bordered }) => ({
  background: '#FF8B00',
  borderRadius: '50%'
}))

export const Title = styled(Box)(({ theme, bordered }) => ({
  fontSize: '1.5rem',
  color: '#00ABBE',
  fontWeight: 'bold'
}))

export const TextWrapper = styled(Box)(({ theme, bordered }) => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const Subtitle = styled(Box)(({ theme, size, color }) => ({
  fontSize: size ? size : '1rem',
  fontWeight: '600',
  color: color ? color : '#0F224B'
}))

export const ImgWrapper = styled(Box)(({ theme }) => ({
  width: '25px',
  height: '25px',
  marginRight: '0.7rem'
}))

export const ContentContainer = styled(Box)(({ theme, align }) => ({
  display: 'flex',
  alignItems: align ? align : 'start'
}))

export const TextSm = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#C0C5D0'
}))

export const PlaceholderText = styled(Box)(({ theme, bordered, align }) => ({
  color: '#C0C5D0'
}))

// Styles
export const useCustomStyles = makeStyles(theme => ({
  Select: {
    borderRadius: '5rem',
    marginRight: theme.spacing(2),
    flexShrink: '0',

    '&:hover': {},

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

    '@media (max-width: 1366px)': {
      '& .MuiOutlinedInput-input': {
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
        borderColor: theme.palette.grey[500]
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey[500]
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[500]
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

  Tooltip: {
    background: theme.palette.customColors.darkBg,
    borderRadius: '0.5rem',
    width: '200px',
    padding: '0.8rem',
    gap: '0',

    '& .label': {
      color: '#fff',
      fontSize: '12px',
      marginBottom: '0.3rem'
    },

    '& .value': {
      color: '#fff',
      fontSize: '12px',
      fontWeight: 700
    }
  }
}))

export const Bullet = styled(Box)(({ theme, dot, outer }) => ({
  width: '25px',
  height: '25px',
  background: outer,
  borderRadius: '50%',
  position: 'relative',
  marginRight: '0.5rem',
  '&:after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    background: dot
  }
}))

export const GraphWrapper = styled(Box)(({ theme, bordered, align }) => ({
  background: '#fff',
  height: 'max-content',
  padding: '0 0 3rem 0'
}))
