import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import { Typography, Box } from '@mui/material'
import CustomAvatar from '../../@core/components/mui/avatar'
import OutlinedInput from '@mui/material/OutlinedInput'
import { darken, lighten } from '@mui/system'

export const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8)
}))

export const GroupItems = styled('ul')({
  padding: 0
})

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  color: theme.palette.primary.contrastText,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(2)
}))

export const SpaceBetweenWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
}))

export const InLineBlock = styled(Box)(({ theme, phone }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: phone === 'true' ? '-webkit-fill-available' : 'fit-content',
  marginBottom: theme.spacing(2),
  marginTop: phone === 'true' && theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const FileUploaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2),
  borderRadius: '1rem',
  border: '1px dashed #C6C6CD',
  cursor: 'pointer'
}))

export const SmallMapWrapper = styled(Box)(({ theme }) => ({
  minWidth: '250px',
  minHeight: '250px',
  borderRadius: '1rem',
  maxHeight: '500px'
}))

export const NoDataInTable = styled(Box)(({ theme }) => ({
  width: '-webkit-fill-available',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2)
}))

export const PasswordWrapper = styled(OutlinedInput)(({ theme, error, color = false }) => ({
  backgroundColor: 'transparent',
  borderRadius: '5rem',
  '& .MuiOutlinedInput-input': {
    color: theme.palette.grey[700]
    // padding: '0.55rem 1rem',
    // fontSize: '0.875rem !important',
    // fontWeight: 500
  }
}))

export const useCommonStyles = makeStyles(theme => ({
  autoComplete: {
    minWidth: '150px',
    width: '100% !important',

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderStyle: 'solid',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 600,
      borderColor: theme.palette.grey[300],
      borderRadius: '5rem'
    },

    '& .MuiOutlinedInput-input.Mui-disabled::placeholder': {
      color: theme.palette.grey[300]
    },

    '& .MuiOutlinedInput-input': {
      color: theme.palette.grey[300],
      height: '1em'
    },

    '& .MuiAutocomplete-hasClearIcon': {
      color: theme.palette.grey[300]
    },

    '& .MuiSelect-icon': {
      top: 'calc(50% - 12px)',
      color: theme.palette.grey[300]
    },

    '& .MuiAutocomplete-endAdornment': {
      '& button': {
        '& svg': {
          color: theme.palette.grey[300]
        }
      }
    },

    '& .MuiInputLabel-root': {
      color: theme.palette.grey[300],
      top: '-6px !important'
    },

    '& .MuiInputLabel-root.Mui-focused': {
      top: '0 !important'
    },

    '& .MuiAutocomplete-clearIndicator': {
      color: theme.palette.grey[300]
    },

    '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
      padding: '6px 14px !important',
      fontFamily: 'Poppins !important',
      fontWeight: 400,
      color: theme.palette.grey[900]
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    }

    // '& .MuiOutlinedInput-root': {
    //   borderRadius: '5rem',
    //
    //   '& fieldset': {
    //     borderColor: theme.palette.grey[300]
    //   },
    //   '&:hover fieldset': {
    //     borderColor: theme.palette.grey[300]
    //   },
    //   '&.Mui-focused fieldset': {
    //     borderColor: theme.palette.grey[300]
    //   },
    //   '&:hover .MuiOutlinedInput-notchedOutline': {
    //     borderColor: theme.palette.grey[300]
    //   },
    //   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //     borderColor: theme.palette.grey[300]
    //   }
    // }
  },

  Select: {
    borderRadius: '5rem',
    width: '100%',

    borderWidth: '2px',
    borderColor: theme.palette.grey.A300,

    // input color
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey.A300,
      borderWidth: '2px'
    },

    '& .MuiOutlinedInput-input': {
      padding: '0.6rem 1rem',
      fontSize: '0.875rem',
      color: theme.palette.grey[300],

      '@media (max-width: 1366px)': {
        fontSize: '0.8rem'
      }
    },

    '& .MuiSelect-select.Mui-disabled~.MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.grey.A300}`
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

  datePickerForm: {
    width: '-webkit-fill-available',
    padding: '0.5rem 0.75rem',
    borderRadius: '5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#C6C6CD',
    cursor: 'pointer',
    font: 'inherit'
  },

  MuiDatePicker: {
    width: '-webkit-fill-available !important',

    '& .MuiOutlinedInput-root': {
      borderRadius: '5rem !important'
    },

    '& .MuiOutlinedInput-input': {
      padding: '9px 16px !important'
    }
  },

  AutoCompleteSelect: {
    borderRadius: '5rem',
    width: '100%',
    flexShrink: '0',
    borderWidth: '2px',
    borderColor: theme.palette.grey.A300,
    paddingTop: '0',

    '&.MuiAutocomplete-root .MuiInputBase-root': {
      paddingRight: '1rem !important'
    },

    // input color
    '& .MuiOutlinedInput-input': {
      color: theme.palette.grey[300]
    },

    '& .MuiOutlinedInput-input.Mui-disabled::placeholder': {
      color: theme.palette.grey.A500
    },

    '& .MuiOutlinedInput-input::placeholder': {
      color: theme.palette.grey.A500,
      opacity: '1',
      fontWeight: 400
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey.A300,
      borderWidth: '2px'
    },

    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.text.main} !important`
    },

    '& .MuiAutocomplete-input.MuiOutlinedInput-input': {
      padding: '0.2rem 0.6rem',
      fontSize: '0.875rem',
      color: '#000',
      '@media (max-width: 1366px)': {
        fontSize: '0.8rem'
      }
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },

    '& .MuiSelect-icon': {
      top: 'calc(50% - 12px)'
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '5rem',
      padding: '6px',

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
      fontSize: '0.875rem',

      '@media (max-width: 1366px)': {
        fontSize: '0.8rem'
      }
    },

    '& .MuiInputBase-input': {
      padding: '0.4rem 1rem',

      '&::placeholder': {
        color: theme.palette.grey.A500,
        opacity: 1,
        fontWeight: 400
      }
    },

    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.contrastText
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.primary.contrastText
    }
  }),

  FileInput: props => ({
    width: '100%',
    marginBottom: '0',

    '& .MuiInputBase-root': {
      fontSize: '0.875rem'
    },

    '& .MuiInputBase-input': {
      padding: '0.6rem 1rem',

      '&::placeholder': {
        color: theme.palette.grey.A500,
        opacity: 1,
        fontWeight: 400
      }
    },

    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent'
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '0px',
      borderColor: 'transparent'
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
      padding: '0',

      '&::placeholder': {
        color: theme.palette.grey.A500,
        opacity: 1,
        fontWeight: 400
      }
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: theme.palette.grey.A300
    }
  }),

  DatePicker: {
    width: '-webkit-fill-available',
    padding: '0.5rem 0.75rem',
    borderRadius: '5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#C6C6CD',
    cursor: 'pointer',
    font: 'inherit'
  },

  AccordionStyles: {
    '&.MuiPaper-root': {
      backgroundColor: 'orange'
    },

    '&.MuiButtonBase-root': {
      minHeight: '42px',
      maxHeight: '42px'
    },

    '& .MuiAccordionSummary-expandIconWrapper': {
      background: '#fff',
      borderRadius: '6px',
      height: '25px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    '& .MuiAccordionSummary-expandIconWrapper > svg': {
      color: '#FF8B00'
    },

    expandIcon: {
      order: -1,
      color: '#fff'
    }
  },

  labelStyles: {
    '& .MuiTypography-root': {
      fontWeight: '700'
    }
  },

  checkboxOrange: {
    backgroundColor: '#FF8B00 !important',
    color: '#fff',
    border: '2px solid #FF8B00 !important',
    borderRadius: '40px !important',
    width: '-webkit-fill-available !important',
    marginLeft: '1rem !important',

    '& .MuiSvgIcon-root': {
      color: '#fff !important'
    },
    '& .MuiTypography-root': {
      color: '#fff !important',
      fontWeight: '600'
    }
  },

  modal: {
    root: {},

    '& .MuiPaper-root': {
      padding: theme.spacing(8)
    },
    '& .MuiDialogActions-root': {
      padding: 0,
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(6)
    },

    '& .MuiDialogContent-root': {
      padding: 0
    },

    '& .MuiTypography-root': {
      padding: 0,
      paddingBottom: theme.spacing(3)
    }
  },

  dataTable: {
    height: '100%',
    paddingBottom: '4.5rem',

    '& .rdt_TableCol': {
      minWidth: '160px'
    },

    '& .rdt_TableCell': {
      minWidth: '160px'
    }
  },

  TabList: {
    margin: '10px 2.125rem 0 2.125rem',

    '@media (max-width: 600px)': {
      padding: '10px 0 0 0'
    },

    [theme.breakpoints.down('sm')]: {
      margin: '10px 1rem 0 1rem'
    }
  },

  TabsWrapper: {
    flexDirection: 'column',

    '& .MuiTabPanel-root': {
      padding: '0 0.75rem !important',
      flex: '1 1 0% !important'
    }
  },

  CheckBox: {
    '& .MuiFormControlLabel-root': {
      display: 'none',
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  },

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
  },

  socialStyles: {
    '& .MuiPaper-root': {
      boxShadow: 'rgba(99, 99, 99, 0.06) 0px 2px 6px 0px !important',
      width: '300px',
      zIndex: '1400'
    },

    '& .MuiList-root': {
      background: '#fff',

      '& .MuiButtonBase-root': {
        color: '#00000DE',
        fontSize: '0.875rem',

        '&:hover': {
          color: theme.palette.customColors.darkBg
        }
      }
    },

    '& .MuiTooltip-popper .MuiTooltip-tooltip': {}
  }
}))

export const useStyles = makeStyles((theme, props) => ({
  paginationComponent: {
    background: '#DFE2E6',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: theme.spacing(3)
  },
  table: {
    position: 'absolute !important',
    top: props => `${props?.tableHeight + 'px'} !important`,
    bottom: '68px !important',
    right: '0.75rem !important',
    left: '0.75rem !important',
    width: '98% !important',
    overflow: 'auto !important',

    '@media (max-width: 767px)': {
      height: '100% !important'
    },

    '& .rdt_TableCol': {
      minWidth: '160px'
    },

    '& .rdt_TableCell': {
      minWidth: '160px'
    }
  },

  tableSwipe: {
    position: 'absolute !important',
    top: props => `${props?.tableHeight + 'px'} !important`,
    bottom: props => `${props?.bottom + 'px'} !important`,
    width: '94% !important',
    right: '0.6rem !important',
    left: '0.85rem !important',
    overflow: 'auto !important',

    '@media (max-width: 767px)': {
      height: '100% !important'
    }
  },

  selectableTable: {
    height: props => (props.tableHeight ? `calc(100% - ${props.tableHeight})` : '100%'),
    overflow: 'auto !important'
  },
  selectableTableSwipe: {
    height: '100% !important',
    overflow: 'auto !important'
  }
}))

export const tableStyles = {
  root: {
    overflowX: 'auto'
  },

  header: {
    style: {
      minHeight: '56px'
    }
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: '#F4F8F8',
      borderBottomColor: '#F4F8F8'
    }
  },
  headCells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#F4F8F8'
      }
    }
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#F4F8F8'
      }
    }
  }
}

export const PlaceholderText = styled(Box)(({ theme, bordered, align }) => ({
  color: '#C0C5D0',
  fontWeight: 400
}))

export const Actions = () => {
  const styles = {
    '&.MuiBox-root .MuiTypography-root ': {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#00000DE'
    }
  }

  https: return (
    <Box display='flex' gap={5} sx={styles}>
      <Typography>Edit</Typography>
      <Typography>Remove</Typography>
    </Box>
  )
}

export const Avatar = styled(CustomAvatar)(({ theme }) => ({
  width: 25,
  height: 25,
  borderRadius: 100,
  marginRight: theme.spacing(4)
}))

export const ToastWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
}))

export const ToastTitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBottom: theme.spacing(1)
}))

export const ToastTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px'
}))

export const ToastContent = styled(Typography)(({ theme, title }) => ({
  fontSize: '14px',
  marginRight: title ? 0 : theme.spacing(1)
}))

// export const autoCompleteStyles = {
//   borderRadius: '5rem',
//   marginRight: theme.spacing(2),

//   // input color
//   '& .MuiOutlinedInput-input': {
//     color: theme.palette.grey[500]
//   },

//   '& .MuiOutlinedInput-input': {
//     padding: '7px 14px'
//   },
//   '& .MuiSelect-select:focus': {
//     backgroundColor: 'transparent'
//   },

//   '& .MuiSelect-select': {
//     padding: '7px 14px'
//   },

//   '& .MuiSelect-icon': {
//     top: 'calc(50% - 12px)'
//   },

//   '& .MuiOutlinedInput-root': {
//     borderRadius: '5rem',

//     '& fieldset': {
//       borderColor: theme.palette.grey[500]
//     },
//     '&:hover fieldset': {
//       borderColor: theme.palette.grey[500]
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: theme.palette.grey[500]
//     },

//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: theme.palette.grey[500]
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: theme.palette.grey[500]
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: theme.palette.grey[500]
//     }
//   }
// }
