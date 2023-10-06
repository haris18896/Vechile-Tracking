import React, { useState } from 'react'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

// ** MUI
import { Typography } from '@mui/material'

export const columns = ({ ability, handleOpenDialog, handleUpdate, updateAbility, deleteAbility }) => {
  return [
    {
      name: 'ID',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.id}
        </Typography>
      )
    },

    {
      name: 'Name',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },

    {
      name: 'Created At',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.created_at}
        </Typography>
      )
    },

    {
      name: 'Status',
      sortable: false,
      cell: row => (
        <CustomChip
          size='small'
          label='Active'
          color='success'
          skin='light'
          sx={{
            padding: '0.4rem 0.5rem',
            '& .MuiChip-label': {
              fontSize: '0.85rem',
              fontWeight: 600
            }
          }}
        />
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
