import React, { useState } from 'react'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'

export const columns = ({ ability, router }) => {
  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [idx, setIdx] = useState(null)

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
      name: 'Device',
      selector: row => `Device Group #${row.device}`
    },
    {
      name: 'Edit',
      width: '60px',
      cell: row => (
        <>
          {ability.can('update', 'update-group') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/group/edit/${row.id}`)}
              size='small'
              label={<Icon icon='ri:edit-2-line' width='15' height='15' color='success' style={{ marginTop: '4px' }} />}
              color='success'
              skin='light'
              sx={{
                padding: '0.95rem 0rem',
                marginRight: '0.5rem',

                '& .MuiChip-label': {
                  overflow: 'visible'
                }
              }}
            />
          )}
        </>
      )
    },
    {
      name: 'Remove',
      width: '150px',
      cell: row => (
        <>
          {ability.can('delete', 'delete-group') && (
            <CustomChip
              onClick={() => handleDeleteOpen(row.id)}
              size='small'
              skin='light'
              label={<Icon icon='iconoir:cancel' width='15' height='15' color='error' style={{ marginTop: '4px' }} />}
              color='error'
              sx={{
                padding: '0.9rem 0rem'
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
            submit={() => console.log('dispatch(deleteGroupAction({id: idx, callBack: () => handleDeleteClose()}))')}
            context='Are you sure you want to delete this Group?'
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    id: 1,
    device: '1'
  },
  {
    id: 2,
    device: '2'
  },
  {
    id: 3,
    device: '3'
  },
  {
    id: 4,
    device: '4'
  },
  {
    id: 5,
    device: '5'
  },
  {
    id: 6,
    device: '6'
  },
  {
    id: 7,
    device: '7'
  }
]
