import React from 'react'

// ** MUI
import { Box, Card, CardContent, Typography } from '@mui/material'

function CardCircular({ online, onlineStates, bg, stats, offlineStates, offline }) {
  return (
    <Card
      sx={{
        margin: '5px',
        backgroundColor: `${bg}`,
        width: 150,
        height: 150,
        borderRadius: '50%',
        position: 'relative',
        '@media (max-width: 768px)': {
          width: 75,
          height: 75
        },
        
      }}
    >
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
      ></CardContent>
    </Card>
  )
}

export default CardCircular
