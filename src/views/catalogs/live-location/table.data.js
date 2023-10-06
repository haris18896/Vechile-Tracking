import React, { useState } from 'react'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'

export const columns = ({ ability, router }) => {
  // ** States
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [waslRegister, setWaslRegister] = useState(false)
  const [idx, setIdx] = useState(null)

  // ** Delete Modal
  const handleDeleteOpen = id => {
    setIdx(id)
    setDeleteOpen(true)
  }

  const handleWaslRegisterModalOpen = id => {
    setIdx(id)
    setWaslRegister(true)
  }

  return [
    {
      name: 'Company Name',
      selector: row => row.companyName
    },
    {
      name: 'Asset No',
      selector: row => row.assetNo
    },
    {
      name: 'Link Start Date',
      selector: row => `${row.linkStartDate} ${row.linkStartTime}`
    },
    {
      name: 'Link End Date',
      selector: row => `${row.linkEndDate} ${row.linkEndTime}`
    },
    {
      name: 'Live Location URL',
      selector: row => row.liveLocationUrl
    },
    {
      name: 'Actions',
      width: '150px',
      cell: row => (
        <>
          {ability.can('update', 'update-live-location') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/live-location/edit/${row.id}`)}
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

          {ability.can('delete', 'delete-live-location') && (
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
            close={() => setDeleteOpen(false)}
            submit={() =>
              console.log('dispatch(deleteLiveLocationAction({id: idx, callBack: () => handleDeleteClose()}))')
            }
            context='Are you sure you want to delete this live location record?'
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    companyName: 'TMPL PK',
    assetNo: '123456',
    linkStartDate: '2021-09-03',
    linkStartTime: '15:14:45',
    linkEndDate: '2021-09-03',
    linkEndTime: '15:14:45',
    liveLocationUrl: 'https://www.google.com/maps'
  },
  {
    companyName: 'TMPL PK',
    assetNo: '123456',
    linkStartDate: '2021-09-03',
    linkStartTime: '15:14:45',
    linkEndDate: '2021-09-03',
    linkEndTime: '15:14:45',
    liveLocationUrl: 'https://www.google.com/maps'
  },
  {
    companyName: 'TMPL PK',
    assetNo: '123456',
    linkStartDate: '2021-09-03',
    linkStartTime: '15:14:45',
    linkEndDate: '2021-09-03',
    linkEndTime: '15:14:45',
    liveLocationUrl: 'https://www.google.com/maps'
  },

  {
    companyName: 'TMPL PK',
    assetNo: '123456',
    linkStartDate: '2021-09-03',
    linkStartTime: '15:14:45',
    linkEndDate: '2021-09-03',
    linkEndTime: '15:14:45',
    liveLocationUrl: 'https://www.google.com/maps'
  },
  {
    companyName: 'TMPL PK',
    assetNo: '123456',
    linkStartDate: '2021-09-03',
    linkStartTime: '15:14:45',
    linkEndDate: '2021-09-03',
    linkEndTime: '15:14:45',
    liveLocationUrl: 'https://www.google.com/maps'
  },
  {
    companyName: 'TMPL PK',
    assetNo: '123456',
    linkStartDate: '2021-09-03',
    linkStartTime: '15:14:45',
    linkEndDate: '2021-09-03',
    linkEndTime: '15:14:45',
    liveLocationUrl: 'https://www.google.com/maps'
  }
]
