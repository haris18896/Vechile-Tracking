import React, { useState } from 'react'

// ** MUI
import { Typography } from '@mui/material'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

// ** store & actions
import AlertDialog from 'src/components/Dialogs/AlertDialog'

let rowId = null

export const columns = ({ router, slug, ability }) => {
  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)

  // ** Delete Modal
  const handleDeleteOpen = id => {
    rowId = id
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

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
      name: 'Plate No#',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.plate_no}
        </Typography>
      )
    },
    {
      name: 'Insurance Number',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.insurance_number}
        </Typography>
      )
    },
    {
      name: 'Registration No#',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.registration_no}
        </Typography>
      )
    },

    {
      name: 'Registration Expiry date',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.registration_expiry_date}
        </Typography>
      )
    },
    {
      name: 'Brand',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.brand}
        </Typography>
      )
    },

    {
      name: 'Model',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.model}
        </Typography>
      )
    },
    {
      name: 'Year',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.year}
        </Typography>
      )
    },
    {
      name: 'Color',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.color}
        </Typography>
      )
    },
    {
      name: 'VIN',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.vin}
        </Typography>
      )
    },
    {
      name: 'Customer',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.customer_id}
        </Typography>
      )
    },
    {
      name: 'Device Id',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.device_id}
        </Typography>
      )
    },
    {
      name: 'Asset Type',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.asset_type_id}
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

          // color={row?.status === 'Active' ? 'success' : 'error'}
          //   label={row.status}
        />
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('update', 'update-asset') && (
              <CustomChip
                onClick={() => router.push(`/catalogs/assets/add-edit/${row?.id}`)}
                size='small'
                label={
                  <Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />
                }
                color='success'
                skin='light'
                sx={{
                  padding: '0.95rem 0rem'
                }}
              />
            )}

            {ability.can('delete', 'delete-asset') && (
              <CustomChip
                onClick={() => handleDeleteOpen(row.id)}
                size='small'
                skin='light'
                label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
                color='error'
                sx={{
                  padding: '0.9rem 0rem',
                  marginLeft: '0.5rem'
                }}
              />
            )}

            <AlertDialog
              IconWd='35'
              IconHt='35'
              open={deleteOpen}
              iconColor='#FC3B61'
              id='delete-Modal'
              icon='tabler:bell-ringing'
              close={() => handleDeleteClose()}
              submit={() => {
                alert(rowId)
              }}
              context='Are you sure you want to delete this Asset?'
            />
          </div>
        )
      }
    }
  ]
}
