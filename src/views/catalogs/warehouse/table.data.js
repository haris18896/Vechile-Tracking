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
      name: 'Account',
      selector: row => row?.account
    },
    {
      name: 'Warehouse',
      selector: row => row?.warehouse
    },
    {
      name: 'City',
      selector: row => row?.city
    },
    {
      name: 'License No',
      selector: row => row?.licenseNo
    },
    {
      name: 'Issue Date',
      selector: row => row?.issueDate
    },
    {
      name: 'Expiry Date',
      selector: row => row?.expiryDate
    },
    {
      name: 'Phone',
      selector: row => row?.phone
    },
    {
      name: 'Manager Mobile',
      selector: row => row?.managerMobile
    },
    {
      name: 'Manager Email',
      selector: row => row?.managerEmail
    },
    {
      name: 'Land Area',
      selector: row => row?.landArea
    },
    {
      name: 'WASL Reply',
      cell: row => (
        <CustomChip
          color={row?.waslReplay === 'Active' ? 'success' : 'error'}
          size='small'
          skin='light'
          label={row?.waslReplay}
          sx={{
            padding: '0.4rem 0.5rem',
            margin: '0.25rem',
            '& .MuiChip-label': {
              fontSize: '0.85rem',
              fontWeight: 600
            }
          }}
        />
      )
    },
    {
      name: 'WASL Response',
      cell: row => (
        <CustomChip
          color={row?.waslResponse === 'Active' ? 'success' : 'error'}
          size='small'
          skin='light'
          label={row?.waslResponse}
          sx={{
            padding: '0.4rem 0.5rem',
            margin: '0.25rem',
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
      cell: row => (
        <>
          {ability.can('update', 'update-warehouse') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/warehouse/edit/${row.id}`)}
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

          {ability.can('delete', 'delete-warehouse') && (
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
              console.log('dispatch(deleteOfficeLocationAction({id: idx, callBack: () => handleDeleteClose()}))')
            }
            context='Are you sure you want to delete this warehouse?'
          />
        </>
      )
    },
    {
      name: 'Register',
      cell: row => (
        <>
          <CustomChip
            color='success'
            size='small'
            skin='light'
            label={
              <Icon
                icon='ic:baseline-plus'
                width='15'
                height='15'
                color='error'
                sx={{ verticalAlign: 'middle !important' }}
              />
            }
            onClick={() => handleWaslRegisterModalOpen(row.id)}
            sx={{
              padding: '0.9rem 0rem',
              verticalAlign: 'middle !important'
            }}
          />

          <AlertDialog
            IconWd='35'
            IconHt='35'
            iconColor='#FC3B61'
            open={waslRegister}
            id='wasl-Modal'
            icon='tabler:bell-ringing'
            close={() => setWaslRegister(false)}
            submit={() => setWaslRegister(false)}
            context={`Do you ant to Register ${row?.warehouse} in WASL?`}
            bg="#fff"
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    account: 'Tracking',
    warehouse: 'Riyadh 003',
    city: 'Riyadh',
    licenseNo: '123123',
    issueDate: '2021-02-07',
    expiryDate: '2022-02-07',
    phone: '03459100704',
    managerMobile: '03119524434',
    managerEmail: 'haris@tracking.me',
    landArea: '120',
    waslReplay: 'Active',
    waslResponse: 'Active'
  },
  {
    account: 'Tracking',
    warehouse: 'Riyadh 003',
    city: 'Riyadh',
    licenseNo: '123123',
    issueDate: '2021-02-07',
    expiryDate: '2022-02-07',
    phone: '03459100704',
    managerMobile: '03119524434',
    managerEmail: 'haris@tracking.me',
    landArea: '120',
    waslReplay: 'Active',
    waslResponse: 'Active'
  },
  {
    account: 'Tracking',
    warehouse: 'Riyadh 003',
    city: 'Riyadh',
    licenseNo: '123123',
    issueDate: '2021-02-07',
    expiryDate: '2022-02-07',
    phone: '03459100704',
    managerMobile: '03119524434',
    managerEmail: 'haris@tracking.me',
    landArea: '120',
    waslReplay: 'Failed',
    waslResponse: 'Failed'
  },
  {
    account: 'Tracking',
    warehouse: 'Riyadh 003',
    city: 'Riyadh',
    licenseNo: '123123',
    issueDate: '2021-02-07',
    expiryDate: '2022-02-07',
    phone: '03459100704',
    managerMobile: '03119524434',
    managerEmail: 'haris@tracking.me',
    landArea: '120',
    waslReplay: 'Active',
    waslResponse: 'Active'
  },
  {
    account: 'Tracking',
    warehouse: 'Riyadh 003',
    city: 'Riyadh',
    licenseNo: '123123',
    issueDate: '2021-02-07',
    expiryDate: '2022-02-07',
    phone: '03459100704',
    managerMobile: '03119524434',
    managerEmail: 'haris@tracking.me',
    landArea: '120',
    waslReplay: 'Failed',
    waslResponse: 'Failed'
  }
]
