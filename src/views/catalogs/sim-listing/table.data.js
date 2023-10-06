import React, { useState } from 'react'
import { useRouter } from 'next/router'

// ** Custom Components
import { Icon } from '@iconify/react'
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'
import { deleteSimListingAction, updateSimListingAction } from 'src/store/catalogs/sim-listing/simListingAction'
import { useDispatch } from 'react-redux'

let idx = null

export const columns = ({ ability }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  // ** states
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleDeleteClose = () => setDeleteOpen(false)

  const handleDeleteOpen = id => {
    idx = id
    setDeleteOpen(true)
  }

  const handleDelete = id => {
    dispatch(
      deleteSimListingAction({
        id,
        callback: () => {
          handleDeleteClose()
        }
      })
    )
  }

  const handleUpdate = id => {
    // dispatch(updateSimListingAction({id}))
  }

  return [
    {
      name: 'Asset Name',
      sortable: true,
      selector: row => row.asset_name
    },
    {
      name: 'SIM No',
      sortable: true,
      selector: row => row.sim_no
    },
    {
      name: 'Serial No',
      sortable: true,
      selector: row => row.serial_no
    },
    {
      name: 'Service Provider',
      sortable: true,
      selector: row => row.service_provider
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status
    },
    {
      name: 'Edit / Remove',
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('update', 'update-sim-list') && (
              <CustomChip
                onClick={() => router.push(`/catalogs/sim-list/add-or-edit/${row.id}`)}
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

            {ability.can('delete', 'delete-sim-list') && (
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
              id='delete-Modal'
              icon='tabler:bell-ringing'
              IconWd='35'
              IconHt='35'
              iconColor='#FC3B61'
              context='Are you sure you want to delete this SIM?'
              close={() => handleDeleteClose()}
              open={deleteOpen}
              submit={() => handleDelete(idx)}
            />
          </div>
        )
      }
    }
  ]
}

export const rows = [
  {
    id: '1',
    asset_name: '7980',
    sim_no: '908976778978909',
    serial_no: '4577882890038u9123',
    service_provider: 'In Stock',
    status: 'In Stock'
  },
  {
    id: '2',
    asset_name: '7980',
    sim_no: '908976778978909',
    serial_no: '4577882890038u9123',
    service_provider: 'In Stock',
    status: 'In Stock'
  },
  {
    id: '3',
    asset_name: '7980',
    sim_no: '908976778978909',
    serial_no: '4577882890038u9123',
    service_provider: 'In Stock',
    status: 'In Stock'
  }
]
