import React, { useState } from 'react'

// ** MUI
import { Typography } from '@mui/material'

// ** Third Party Imports
import { Icon } from '@iconify/react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'

// ** store & actions
import AlertDialog from 'src/components/Dialogs/AlertDialog'
import { useDispatch } from 'react-redux'
import { deleteWaslAssetAction } from 'src/store/catalogs/assets/assetsActions'

let rowId = null

export const columns = ({ router, slug, ability, updateWaslAsset }) => {
  const dispatch = useDispatch()
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
      name: 'Customer ID',
      sortable: true,
      cell: row => (
        <Typography className='capitalized' variant='body' color='textPrimary'>
          {row?.customer_id}
        </Typography>
      )
    },
    {
      name: 'Plate  type id',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.plate_type_id}
        </Typography>
      )
    },
    {
      name: 'Asset id',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.asset_id}
        </Typography>
      )
    },
    {
      name: 'Sequence No#',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.sequence_number}
        </Typography>
      )
    },

    {
      name: 'IMEI No#',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.imei_number}
        </Typography>
      )
    },
    {
      name: 'Plate registration No#',
      sortable: true,
      cell: row => (
        <Typography variant='body' color='textPrimary'>
          {row?.plate_registration_no}
        </Typography>
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
                onClick={() => updateWaslAsset(row)}
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
                dispatch(
                  deleteWaslAssetAction({
                    id: rowId,
                    callBack: () => {
                      handleDeleteClose()
                    }
                  })
                )
              }}
              context='Are you sure you want to delete this Asset?'
            />
          </div>
        )
      }
    }
  ]
}
