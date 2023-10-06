import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

export const useStyles = makeStyles(theme => ({
  buttonIcon: {
    fontWeight: 700,
    // textTransform: 'capitalize',
    color: theme.palette.success.contrastText,
    borderRadius: '5rem',
    padding: '0.25rem 1.4rem',
    '&:hover': {
      backgroundColor: 'transparent'
    },

    '& .Mui-disabled': {
      backgroundColor: 'transparent !important',
      color: `${theme.palette.grey.main} !important`,
      borderColor: `${theme.palette.grey.main} !important`
    },

    // '& .MuiButton-endIcon': {
    //   marginLeft: 'auto !important'
    // },
    //
    // '& .MuiButton-startIcon': {
    //   marginRight: 'auto !important'
    // },
    //
    '& .MuiLoadingButton-loading': {
      marginLeft: 'auto !important'
    }
  },

  primary: {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,

    '&:hover': {
      color: theme.palette.primary.main
    }
  },

  success: {
    border: `2px solid ${theme.palette.success.main}`,
    backgroundColor: theme.palette.success.main,

    '&:hover': {
      color: theme.palette.success.main
    }
  },

  success_outlined: {
    border: `2px solid ${theme.palette.success.main}`,
    color: theme.palette.success.main,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.primary.contrastText
    }
  },

  error: {
    border: `2px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.main,

    '&:hover': {
      color: theme.palette.error.main
    }
  },

  warning: {
    border: `2px solid ${theme.palette.warning.main}`,
    backgroundColor: theme.palette.warning.main,

    '&:hover': {
      color: theme.palette.warning.main
    }
  },

  info: {
    border: `2px solid ${theme.palette.info.main}`,
    backgroundColor: theme.palette.info.main,

    '&:hover': {
      color: theme.palette.info.main
    }
  },

  grey: {
    border: `2px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey.main,
    '&:hover': {
      color: theme.palette.grey[500],
      backgroundColor: ''
    }
  },

  orange: {
    border: '2px solid #FF8B00',
    backgroundColor: '#FF8B00',
    '& .Mui-disabled': {
      backgroundColor: 'transparent !important',
      color: `${theme.palette.grey.main} !important`,
      borderColor: `${theme.palette.grey.main} !important`
    },
    '&:hover': {
      color: '#FF8B00',
      backgroundColor: 'transparent'
    }
  },

  mainDark: {
    background: '#47587969',
    color: '#fff',
    padding: '0.8rem 0.8rem',
    '&:hover': {}
  },

  primary_outlined: {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    }
  },

  error_outlined: {
    border: `2px solid ${theme.palette.error.main}`,
    color: theme.palette.error.main,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: '#fff'
    }
  },

  main: {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: '600',
    boxShadow: '0px 15px 10px -21px #111',
    padding: '0.8rem 1rem',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff'
    }
  },

  light: {
    border: `2px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[300],

    '&:hover': {
      color: theme.palette.grey[300]
    }
  },

  dark: {
    border: `2px solid ${theme.palette.grey[900]}`,
    backgroundColor: theme.palette.grey[900],

    '&:hover': {
      color: theme.palette.grey[900]
    }
  },

  darkBlue: {
    border: `2px solid ${theme.palette.secondary.darkBlue}`,
    backgroundColor: theme.palette.secondary.darkBlue,

    '&:hover': {
      color: theme.palette.grey[900]
    }
  },

  darkBlueNoHover: {
    border: `2px solid ${theme.palette.secondary.darkBlue}`,
    backgroundColor: theme.palette.secondary.darkBlue,

    '&:hover': {
      border: `2px solid ${theme.palette.secondary.darkBlue}`,
      backgroundColor: theme.palette.secondary.darkBlue
    }
  },

  orange_outlined: {
    border: `2px solid ${theme.palette.orange.main}`,
    color: theme.palette.orange.main,
    backgroundColor: 'transparent',

    '&:hover': {
      background: theme.palette.orange.main,
      color: 'white'
    }
  },

  orange_outlined_white: {
    border: `2px solid #fff`,
    color: '#000',
    backgroundColor: '#fff',

    '&:hover': {
      background: '#FF8B00',
      border: `2px solid #FF8B00`,
      color: 'white'
    }
  }
}))
