import React from 'react'

// ** MUI
import { Box, Typography } from '@mui/material'

//  ** Styles
import { OilTrackingStatCard } from 'src/styles/pages/tracking'

// ** Components
import { Icon } from '@iconify/react'
import CustomChip from 'src/@core/components/mui/chip'
import Image from 'next/image'

function OilTrackingStat({ src, title, value, color, iconColor }) {
  return (
    <OilTrackingStatCard sx={{ backgroundColor: `${color} !important` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Image src={src} alt={'image'} width={30} height={30} style={{ marginRight: '8px' }} />
        {/* <CustomChip
          onClick={() => router.push(`/settings/roles/add-edit/${row.id}`)}
          size='small'
          label={}
          color={iconColor}
          skin='light'
          sx={{
            padding: '0.95rem 0rem',
            marginRight: '0.5rem',
            backgroundColor: `rgba(255,255,255, 0.1) !important`
          }}
        /> */}

        <Typography component='p' sx={{ color: '#fff' }}>
          {title}
        </Typography>
      </Box>

      <Typography component='h2' sx={{ color: '#fff', textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
        {value}
      </Typography>
    </OilTrackingStatCard>
  )
}

export default OilTrackingStat
