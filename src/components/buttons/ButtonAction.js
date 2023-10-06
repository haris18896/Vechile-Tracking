import React from 'react'

// ** MUI
import Fab from '@mui/material/Fab'

// ** Third Party Components
import { Icon } from '@iconify/react'

function ButtonAction({ color, icon, width, height, children, ...rest }) {
  return (
    <Fab color={color} variant='extended' sx={{ '& svg': { mr: 1 } }} {...rest}>
      <Icon icon={icon} width={width} height={height} />
      {children}
    </Fab>
  )
}

export default ButtonAction
