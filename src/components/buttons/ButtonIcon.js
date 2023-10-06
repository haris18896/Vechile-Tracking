import React from 'react'

// ** MUI
import { LoadingButton } from '@mui/lab'

// ** Third Party Components
import { Icon } from '@iconify/react'

// ** styles
import { useStyles } from 'src/styles/components/buttons'
import classNames from 'classnames'

function ButtonIcon({
  onCLick,
  color,
  sx,
  endIcon,
  children,
  startIcon,
  iconColor,
  iconWidth = '20',
  iconHeight = '20',
  loading = false,
  fullWidth = false,
  ...rest
}) {
  const classes = useStyles()

  return (
    <LoadingButton
      sx={sx}
      onClick={onCLick}
      // color={color}
      loading={loading}
      disabled={loading}
      variant='contained'
      fullWidth={fullWidth}
      loadingPosition='start'
      endIcon={<Icon icon={endIcon} width='20' height='20' color={iconColor} />}
      startIcon={<Icon icon={startIcon} color={iconColor} width={iconWidth} height={iconHeight} />}
      className={classNames({
        [classes.buttonIcon]: true,
        [classes.info]: color === 'info',
        [classes.error]: color === 'error',
        [classes.success]: color === 'success',
        [classes.warning]: color === 'warning',
        [classes.primary]: color === 'primary',
        [classes.white]: color === 'white',
        [classes.dark]: color === 'dark',
        [classes.grey]: color === 'grey',
        [classes.orange]: color === 'orange',
        [classes.darkBlue]: color === 'darkBlue',
        [classes.darkBlueNoHover]: color === 'darkBlueNoHover',
        [classes.mainDark]: color === 'mainDark',
        [classes.info_outlined]: color === 'info-outlined',
        [classes.error_outlined]: color === 'error-outlined',
        [classes.orange_outlined]: color === 'orange-outlined',
        [classes.orange_outlined_white]: color === 'orange_outlined_white',
        [classes.success_outlined]: color === 'success-outlined',
        [classes.warning_outlined]: color === 'warning-outlined',
        [classes.primary_outlined]: color === 'primary-outlined',
        [classes.white_outlined]: color === 'white-outlined'
      })}
      {...rest}
    >
      {children}
    </LoadingButton>
  )
}

export default ButtonIcon
