import React from 'react'

// ** MUI
import { Box } from '@mui/material'

// ** Components
import { Icon } from '@iconify/react'

function KPAStats({ state, icon, color, tab, bg }) {
  return (
    <Box
      sx={{
        width: '100px',
        height: '100px',
        background: tab ? `${color}` : 'transparent',
        border: '1px solid #C0C5D0',
        borderRadius: '5px',
        margin: '0.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "&:hover":{
          background: hoverColor
        }
      }}
      
    >
      <Icon icon={icon} width='30' height='30' color={tab ? '#fff' : color} />
    </Box>
  )
}

export default KPAStats
