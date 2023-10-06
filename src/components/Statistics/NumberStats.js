import React from 'react'

// ** MUI
import { Box, Typography } from '@mui/material'

// ** Third Party Components
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

function NumberStats({ type, color, icon, text, textColor }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0.3rem'
      }}
    >
      <p
        style={{
          fontWeight: '600',
          fontSize: '11px',
          display: type ? 'block' : 'none',
          color: `${textColor}`,
          marginBottom: '0.25rem',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {type}
      </p>

      <CustomChip
        size='small'
        label={<Icon icon={icon} width='20' height='20' color={color} style={{ marginTop: '4px' }} />}
        color={color}
        skin='light'
        sx={{
          padding: '0.95rem 0rem',
          '& .MuiChip-label': {
            paddingLeft: '6px',
            paddingRight: '6px'
          }
        }}
      />

      <p style={{ fontSize: '10px', fontWeight: '400', color: 'text.primary' }}>{text}</p>
    </Box>
  )
}

export default NumberStats
