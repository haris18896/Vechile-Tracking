import React, { useState } from 'react'

// ** MUI
import { Box, Typography } from '@mui/material'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

export const columns = ({ ability, handleOpenDialog, handleUpdate, updateAbility, deleteAbility }) => {
  return [
    {
      name: 'Name',
      width: '150px',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.name}
        </Typography>
      )
    },
    {
      name: 'Status',
      sortable: false,
      width: '100px',
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
      name: 'Permissions',
      sortable: false,
      minWidth: '500px',
      cell: row => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {row?.permissions?.map((permission, index) => (
            <CustomChip
              key={index}
              color='info'
              size='small'
              skin='light'
              label={permission.name
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
              sx={{
                padding: '0.4rem 0.5rem',
                margin: '0.25rem',
                '& .MuiChip-label': {
                  fontSize: '0.85rem',
                  fontWeight: 600
                }
              }}
            />
          ))}
        </Box>
      )
    },

    {
      name: 'Created At',
      sortable: true,
      width: '100px',
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.created_at.split('T')[0]}
        </Typography>
      )
    },
    {
      name: 'Actions',
      sortable: false,
      width: '100px',
      cell: row => {
        return (
          <>
            {/*{row?.protected !== 1 && (*/}
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
                  label={
                    <Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />
                  }
                  color='error'
                  sx={{
                    padding: '0.9rem 0rem'
                  }}
                />
              )}
            </div>
            {/*)}*/}
          </>
        )
      }
    }
  ]
}
