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
      name: 'Account',
      selector: row => row?.account
    },
    {
      name: 'Name',
      selector: row => row?.name
    },
    {
      name: 'Actions',
      width: '150px',
      cell: row => (
        <>
          {ability.can('update', 'update-zone') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/zone/edit/${row.id}`)}
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

          {ability.can('delete', 'delete-zone') && (
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
            iconColor='#FC3B61'
            open={deleteOpen}
            id='delete-Modal'
            icon='tabler:bell-ringing'
            close={() => handleDeleteClose()}
            submit={() =>
              console.log('dispatch(deleteOfficeLocationAction({id: idx, callBack: () => handleDeleteClose()}))')
            }
            context='Are you sure you want to delete this zone record?'
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  },
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  },
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  },
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  },
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  },
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  },
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  },
  {
    account: 'Tracking',
    name: 'Haris Ahmad Khan'
  }
]
