import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SpeedDial } from '@mui/material'

// ** Styled Components
export const TrackingMapWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 64px)',
  background: '#fff'
}))

export const KPADashboardHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '-webkit-fill-available',
  justifyContent: 'space-between',

  [theme.breakpoints.down(1600)]: {
    flexWrap: 'wrap'
  },

  [theme.breakpoints.down(992)]: {
    flexDirection: 'column',
    gap: '1rem'
  }
}))

export const KPADashboardStatsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginLeft: '0.25rem',
  marginRight: '0.25rem'
}))

export const KPADashboardFiltersWrapper = styled(Box)(({ theme }) => ({
  width: '-webkit-fill-available',
  marginLeft: '0.25rem',
  marginRight: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
}))

export const KPADashboardActionsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginLeft: '0.25rem',
  marginRight: '0.25rem',

  '& > button:first-child': {
    marginRight: '1rem'
  }
}))

export const TableWrapper = styled(Box)(({ theme, tableheight }) => ({
  width: '100%',
  height: tableheight ? tableheight : '75vh',
  backgroundColor: 'transparent',
  overflowY: 'auto'
}))

export const TableWrapperSwipe = styled(Box)(({ theme, tableheight }) => ({
  width: '100%',
  height: '100%',
  minHeight: '100%',
  display: 'grid',
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'column'
}))

export const TrackingWrapper = styled(Box)(({ theme, bordered }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  borderBottom: bordered && '1px solid #DFE2E6'
}))

export const SwipperWrapper = styled(Box)(({ theme, bordered }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  borderBottom: bordered && '1px solid #DFE2E6'
}))

export const OilTrackingStatCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '2rem',
  borderRadius: '0.5rem',
  height: '10rem',
  minWidth: '15rem',
  margin: '0.5rem',
  width: '-webkit-fill-available',
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.down(800)]: {
    width: 'fit-content',
    minWidth: '18rem'
  },

  [theme.breakpoints.down(700)]: {
    width: '-webkit-fill-available',
    minWidth: '15rem'
  }
}))

export const OilTrackingTableCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  // borderRadius: '8px',
  marginLeft: '1rem',
  marginRight: '1rem',
  marginTop: '1rem',
  height: '300px'
}))

export const OilTrackingGraphsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  // flexWrap: 'wrap',
  width: '-webkit-fill-available',
  [theme.breakpoints.down(900)]: {
    flexDirection: 'column'
  }
}))

export const OilTrackingGraphCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  marginLeft: '1rem',
  marginRight: '1rem',
  marginTop: '1rem',
  height: '300px',
  width: '50%',

  [theme.breakpoints.down(900)]: {
    width: '-webkit-fill-available'
  }
}))

export const DetailedTrackingHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '-webkit-fill-available',
  justifyContent: 'space-between',
  flexDirection: 'row',

  [theme.breakpoints.down(1000)]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}))

export const DetailedTrackingStatsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  [theme.breakpoints.down(500)]: {
    flexWrap: 'wrap'
  }
}))

export const DetailedTrackingFiltersWrapper = styled(Box)(({ theme }) => ({
  // width: '-webkit-fill-available',
  display: 'flex',

  // flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  [theme.breakpoints.down(700)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '-webkit-fill-available'
  }

  // [theme.breakpoints.up(530)]: {
  //   justifyContent: 'flex-start',
  //   flexWrap: 'nowrap',

  // }
}))

export const InputWrapper = styled(Box)(({ theme }) => ({
  marginBottom: '0.5rem',
  marginRight: '0.25rem',

  '& button-wrapper': {
    width: 'fit-content'
  },

  [theme.breakpoints.down(700)]: {
    marginRight: '0rem',
    width: '-webkit-fill-available'
  }

  // [theme.breakpoints.up(530)]: {
  //   // width: '160px',
  //   display: 'flex',
  //   flex: '1 1 0',
  //   minWidth: '235px',
  //   marginRight: '0.5rem'
  // }
}))

// ** Styles
export const useMapStyles = makeStyles(theme => ({
  Map: {
    justifyContent: 'end',
    gap: '1rem',
    marginRight: '5rem',

    '& button': {
      marginTop: '0.5rem',

      '&:hover': {
        '& .MuiButton-startIcon svg': {
          color: '#fff !important'
        }
      }
    }
  },

  HeatMap: {
    '& .MuiSpeedDial-root': {
      borderRadius: '50px',
      padding: '0.6rem',

      [theme.breakpoints.down(1080)]: {
        flexDirection: 'column-reverse',
        alignItems: 'flex-end'
      },

      '& .MuiButtonBase-root.MuiFab-circular': {
        background: theme.palette.customColors.darkBg,

        // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        width: '3.5rem',
        height: '3.5rem',

        [theme.breakpoints.down(767)]: {
          margin: '0.3rem'
        }
      },

      '& .MuiButtonBase-root': {
        [theme.breakpoints.down(767)]: {
          padding: '0.5rem 0.4rem',
          width: '165px',
          fontSize: '12px'
        }
      },

      '& .MuiSpeedDial-actions': {
        marginRight: '-55px',
        paddingRight: '65px',
        background: theme.palette.customColors.darkBg,
        borderRadius: '50px',

        [theme.breakpoints.down(1080)]: {
          flexDirection: 'column',
          marginRight: '0',
          padding: '1rem'
        },

        [theme.breakpoints.down(767)]: {
          padding: '0.6rem'
        }
      },

      '& .MuiSpeedDial-actions.MuiSpeedDial-actionsClosed': {
        background: 'none'
      },

      '& .MuiSpeedDial-actions .MuiButtonBase-root.MuiSpeedDialAction-fab': {
        width: 'auto',
        borderRadius: '0',
        background: 'none'
      }
    }
  },

  LiveTracking: {
    '&#alert-buttons': {
      position: 'absolute',
      bottom: 'calc(0% + 38px)',
      right: '4.5rem',

      [theme.breakpoints.down(500)]: {
        '& > div': {
          marginBottom: '10px'
        }
      },

      '& .MuiButtonBase-root': {
        background: '#FC3B61',
        color: '#fff',
        gap: '10px',

        '& .MuiButton-startIcon': {
          backgroundColor: '#ffffff4d',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
    },

    '& .MuiSpeedDial-root': {
      // borderRadius: '50px',
      // padding: '0.6rem',

      '& .MuiButtonBase-root.MuiFab-circular': {
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      },

      '& .MuiSpeedDial-actions': {
        background: theme.palette.customColors.darkBg,
        borderRadius: '50px',
        position: 'relative',
        top: '25px',
        paddingBottom: '65px'
      },

      '& .MuiSpeedDial-actions .MuiSpeedDial-actions .MuiFab-circular:hover': {
        background: 'red'
      },

      '& .MuiSpeedDial-actions.MuiSpeedDial-actionsClosed': {
        background: 'none'
      },

      '& .MuiSpeedDial-actions .MuiButtonBase-root.MuiFab-circular': {
        height: '50px',
        width: '50px'
      }
    }
  },

  tooltip: {
    '& .MuiTooltip-tooltip': {
      background: theme.palette.customColors.darkBg,
      backgroundColor: theme.palette.customColors.darkBg
    }
  },

  title: {
    padding: '1rem'
  },

  oilTrackingBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',

    // backgroundColor: theme.palette.background.default,

    [theme.breakpoints.down(800)]: {
      flexWrap: 'wrap'
    },

    [theme.breakpoints.down(700)]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },

  geofence: {
    position: 'absolute',
    bottom: 'calc(0% + 38px)',
    right: '50%',
    left: '40%',

    '& .MuiButton-root:hover': {
      backgroundColor: 'transparent'
    }
  }
}))

export const useDrawerStyles = makeStyles(theme => ({
  drawer: {
    '& .MuiPaper-root': {
      width: props => (props.drawerWidth ? props.drawerWidth : '450px'),
      transform: props =>
        props.drawerOpen
          ? `translateX(${props.sidebarW}px)`
          : props.slideVal
          ? `translateX(${props.slideVal})`
          : 'translateX(-190px)',
      transition: 'transform .5s ease',
      background: '#fff',
      overflow: 'visible',
      border: 'none',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',

      [theme.breakpoints.down(1200)]: {
        width: props => (props.widthLg ? props.widthLg : '80%'),
        transform: props =>
          props.drawerOpen ? 'translateX(0px)' : props.slideVal ? 'translateX(-100%)' : 'translateX(-450px)'
      },

      [theme.breakpoints.down(500)]: {
        transform: props => (props.drawerOpen ? 'translateX(0px)' : 'translateX(-300px)'),
        width: '300px !important'
      }
    }
  },

  puller: {
    width: '90px',
    height: '30px',
    backgroundColor: '#fff',
    borderRadius: 3,
    position: 'absolute',
    transform: 'rotate(90deg) translateY(-50%)',
    position: 'absolute',
    top: '50%',
    left: 'calc(100% - 45px)',
    padding: 0,
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',

    '& svg': {
      transform: 'rotate(275deg)',
      color: '#000'
    },

    '&:hover': {
      backgroundColor: `${theme.palette.grey[100]} !important`
    }
  }
}))

export const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: 'calc(0% + 118px)',
    right: '4.5rem'

    // [theme.breakpoints.down(500)]: {
    //   bottom: '200px',
    //   right: '2.5rem'
    // }
  }
}))
