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
      selector: row => row.account
    },
    {
      name: 'Device',
      selector: row => `Device ${row?.device}`
    },
    {
      name: 'Warehouse',
      selector: row => row.warehouse
    },
    {
      name: 'Inventory',
      selector: row => row.inventory
    },
    {
      name: 'Inventory Number',
      selector: row => row.inventoryNumber
    },
    {
      name: 'Storing Category',
      selector: row => row.storingCategory
    },
    {
      name: 'Storing Type',
      selector: row => row.storingType
    },
    {
      name: 'WASL Reply',
      cell: row => (
        <CustomChip
          color={row?.waslReplay === 'Success' ? 'success' : 'error'}
          size='small'
          skin='light'
          label={row?.waslReplay}
          sx={{
            padding: '0.4rem 0.5rem',
            margin: '0.25rem',
            minWidth: '95px',
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
          color={row?.waslResponse === 'Success' ? 'success' : 'error'}
          size='small'
          skin='light'
          label={row?.waslResponse}
          sx={{
            padding: '0.4rem 0.5rem',
            margin: '0.25rem',
            minWidth: '95px',
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
      width: '150px',
      cell: row => (
        <>
          {ability.can('update', 'update-inventory') && (
            <CustomChip
              onClick={() => router.push(`/catalogs/inventory/edit/${row.id}`)}
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

          {ability.can('delete', 'delete-inventory') && (
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
              console.log('dispatch(deleteInventoryAction({id: idx, callBack: () => handleDeleteClose()}))')
            }
            context='Are you sure you want to delete this inventory?'
          />
        </>
      )
    }
  ]
}

export const rows = [
  {
    account: 'Tracking',
    device: '02',
    warehouse: 'Warehouse 1',
    inventory: '48907098',
    inventoryNumber: '12332532',
    storingCategory: 'Category',
    storingType: 'Type',
    waslReplay: 'Success',
    waslResponse: 'Success'
  },
  {
    account: 'Tracking',
    device: '02',
    warehouse: 'Warehouse 1',
    inventory: '48907098',
    inventoryNumber: '12332532',
    storingCategory: 'Category',
    storingType: 'Type',
    waslReplay: 'Failed',
    waslResponse: 'Failed'
  },

  {
    account: 'Tracking',
    device: '02',
    warehouse: 'Warehouse 1',
    inventory: '48907098',
    inventoryNumber: '12332532',
    storingCategory: 'Category',
    storingType: 'Type',
    waslReplay: 'Success',
    waslResponse: 'Success'
  },
  {
    account: 'Tracking',
    device: '02',
    warehouse: 'Warehouse 1',
    inventory: '48907098',
    inventoryNumber: '12332532',
    storingCategory: 'Category',
    storingType: 'Type',
    waslReplay: 'Success',
    waslResponse: 'Success'
  },

  {
    account: 'Tracking',
    device: '02',
    warehouse: 'Warehouse 1',
    inventory: '48907098',
    inventoryNumber: '12332532',
    storingCategory: 'Category',
    storingType: 'Type',
    waslReplay: 'Success',
    waslResponse: 'Success'
  },
  {
    account: 'Tracking',
    device: '02',
    warehouse: 'Warehouse 1',
    inventory: '48907098',
    inventoryNumber: '12332532',
    storingCategory: 'Category',
    storingType: 'Type',
    waslReplay: 'Failed',
    waslResponse: 'Failed'
  },
  {
    account: 'Tracking',
    device: '02',
    warehouse: 'Warehouse 1',
    inventory: '48907098',
    inventoryNumber: '12332532',
    storingCategory: 'Category',
    storingType: 'Type',
    waslReplay: 'Success',
    waslResponse: 'Success'
  }
]
