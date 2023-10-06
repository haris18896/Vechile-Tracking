import React from 'react'
import { Typography } from '@mui/material'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export const columns = ({ability}) => {
// ** States
const [deleteOpen, setDeleteOpen] = useState(false)
const [idx, setIdx] = useState(false)


// ** Delete Modal
const handleDeleteOpen = id => {
setIdx(id)
setDeleteOpen(true)
}

const handleDeleteClose = () => {
setDeleteOpen(false)
}

  return [
    {
      name: 'ID',
      sortable: true,
      selector: row => row.id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.id}
        </Typography>
      )
    },
    {
      name: 'Asset ID',
      sortable: true,
      selector: row => row.asset_id,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.asset_id || '--'}
        </Typography>
      )
    },
    {
      name: 'Asset Name',
      sortable: true,
      selector: row => row.asset_name,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.asset_name || '--'}
        </Typography>
      )
    },
    {
      name: 'Plate No.',
      sortable: true,
      selector: row => row.plate_no,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.plate_no || '--'}
        </Typography>
      )
    },
    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
      {ability.can('delete', 'delete-device') && (
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
            submit={() => console.log('dispatch(deleteCustomerAction({id: idx, callBack: () => handleDeleteClose()}))')}
            context='Are you sure you want to delete this Device?'
          />
          </div>
        )
      }
    }

  ]
}
