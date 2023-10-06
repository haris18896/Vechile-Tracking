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
      name: 'Working Time From',
      selector: row => row?.workingTimeFrom
    },
    {
      name: 'Working Time To',
      selector: row => row?.workingTimeTo
    },
    {
      name: 'Actions',
      width: '150px',
      cell: row => (
        <>
          {ability.can('update', 'update-working-hours') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/working-hours/edit/${row.id}`)}
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

          {ability.can('delete', 'delete-working-hours') && (
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
              console.log('dispatch(deleteWorkingHourAction({id: idx, callBack: () => handleDeleteClose()}))')
            }
            context='Are you sure you want to delete this working hour record?'
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    account: 'Tracking',
    workingTimeFrom: '12:00 AM',
    workingTimeTo: '11:59 PM',
    shiftName: 'Morning'
  },
  {
    account: 'Tracking',
    workingTimeFrom: '12:00 AM',
    workingTimeTo: '11:59 PM',
    shiftName: 'Morning'
  },
  {
    account: 'Tracking',
    workingTimeFrom: '12:00 AM',
    workingTimeTo: '11:59 PM',
    shiftName: 'Morning'
  },
  {
    account: 'Tracking',
    workingTimeFrom: '12:00 AM',
    workingTimeTo: '11:59 PM',
    shiftName: 'Morning'
  },
  {
    account: 'Tracking',
    workingTimeFrom: '12:00 AM',
    workingTimeTo: '11:59 PM',
    shiftName: 'Morning'
  }
]
