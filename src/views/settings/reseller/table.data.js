import React from 'react'

// ** MUI
import { Box, Typography } from '@mui/material'
import { writeToClipboard } from 'src/configs/utils'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

export const columns = ({ ability, handleOpenDialog, deleteAbility, handleUpdate, updateAbility }) => {
  return [
    {
      name: 'Name',
      sortable: false,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },
    {
      name: 'Contact',
      sortable: false,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.contact}
        </Typography>
      )
    },
    {
      name: 'User',
      sortable: false,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.user?.email}
        </Typography>
      )
    },
    {
      name: 'Referral_code',
      sortable: false,
      cell: row => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Typography variant='body' color='textPrimary'>
            {row.referral_code}
          </Typography>
          <Icon
            icon='line-md:clipboard-check'
            width='25'
            height='25'
            color='#FF8B00'
            onClick={() => writeToClipboard(`https://app.sparning.ai/register/?referral_code=${row.referral_code}`)}
          />
        </Box>
      )
    },

    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('update', `${updateAbility}`) && (
              <CustomChip
                onClick={() => handleUpdate(row)}
                size='small'
                label={
                  <Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />
                }
                color='success'
                skin='light'
                sx={{
                  padding: '0.95rem 0rem',
                  marginRight: '0.5rem'
                }}
              />
            )}

            {ability.can('delete', `${deleteAbility}`) && (
              <CustomChip
                size='small'
                skin='light'
                onClick={() => handleOpenDialog('delete', row)}
                label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                color='error'
                sx={{
                  padding: '0.9rem 0rem'
                }}
              />
            )}
          </div>
        )
      }
    }
  ]
}
