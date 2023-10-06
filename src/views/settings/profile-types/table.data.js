import React from 'react'

// ** MUI
import { Box } from '@mui/material'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

export const columns = ({ ability, handleOpenDialog, handleUpdate, updateAbility, deleteAbility }) => {
  return [
    {
      name: 'ID',
      sortable: true,
      selector: row => row.id
    },
    {
      name: 'Name',
      sortable: false,
      cell: row => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <CustomChip
            color='primary'
            size='small'
            skin='light'
            label={row.name
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
        </Box>
      )
    },
    {
      name: 'Created At',
      sortable: false,
      selector: row => row.created_at.split('T')[0]
    },
    {
      name: 'Edit',
      sortable: false,
      cell: row => (
        <div className='flex items-center justify-content-between'>
          {ability.can('update', `${updateAbility}`) && (
            <CustomChip
              onClick={() => handleUpdate(row)}
              size='small'
              label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
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
  ]
}

export const rows = []
