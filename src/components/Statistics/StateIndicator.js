import React from 'react'

// ** MUI
import { Box } from '@mui/material'

function StateIndicator({ color, circle, text }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
      <Box
        sx={{
          width: '15px',
          height: '15px',
          padding: '5px',
          borderRadius: '50%',
          backgroundColor: `${circle}.light`
        }}
      >
        <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: `${circle}`, zIndex: 1 }} />
      </Box>

      <Box sx={{mt: 1, fontSize: '0.8rem', fontWeight: '700', color: `${color}`, marginTop: '5px' }}>{text}</Box>
    </Box>
  )
}

export default StateIndicator
