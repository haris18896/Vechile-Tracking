import React from 'react'

// ** MUI
import { Box, Card, CardContent, Typography } from '@mui/material'

// ** Third Party Packages
import { Icon } from '@iconify/react'

function CardStatsVertical({ icon, title, bg, stats, iconColor }) {
  return (
    <Card
      sx={{
        backgroundColor: `${bg}`,
        width: '100%',
        height: 130,
        position: 'relative'
      }}
    >
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 130, padding: '1rem' }}
      >
        <Box
          sx={{
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `rgba(255, 255, 255, 0.1)`,
            padding: '0.3rem',
            borderRadius: '50%'
          }}
        >
          <Icon icon={icon} color={iconColor} width='30' height='30' />
        </Box>

        <Typography variant='body' sx={{ mb: 1, mt: 1, fontWeight: '600', textAlign: 'center', color: 'white',fontSize:'0.875rem'  }}>
          {title}
        </Typography>
        <Typography variant='h5' sx={{ fontWeight: '700', color: 'white' }}>
          {stats}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
