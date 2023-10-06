// ** Third Party Imports
import { Icon } from '@iconify/react'
import { useState } from 'react'

// ** custom components
import CustomChip from 'src/@core/components/mui/chip'
import AlertDialog from 'src/components/Dialogs/AlertDialog'

export const columns = props => {
  const { router, slug, update } = props

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
      name: 'Name',
      selector: row => `${row?.first_name} ${row?.last_name}`
    },
    {
      name: 'Email',
      selector: row => row?.email
    },
    {
      name: 'Contact No.',
      selector: row => row?.contact_number
    },
    {
      name: 'Latitude',
      selector: row => row?.lat
    },
    {
      name: 'Longitude',
      selector: row => row?.lng
    },
    {
      name: 'User',
      selector: row => row?.user?.name
    },
    {
      name: 'Profile Type',
      selector: row => row?.profile_type?.name
    },
    {
      name: 'Asset',
      selector: row => row?.asset?.name
    },
    {
      name: 'Asset Brand',
      selector: row => row?.asset?.brand
    },
    {
      name: 'Asset Type',
      selector: row => row?.asset?.asset_type?.name
    },
    {
      name: 'City',
      selector: row => row?.city?.name
    },
    {
      name: 'State',
      selector: row => row?.state?.name
    },
    {
      name: 'Country',
      selector: row => row?.country?.name
    },

    {
      name: 'Actions',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {update && (
            <CustomChip
              onClick={() =>
                router.push(
                  `/catalogs/profile/add-edit/${row.id}?customer_id=${slug.value}?profile_type_id=${row?.profile_type?.id}}`
                )
              }
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

      {ability.can('delete', 'delete-profile') && (
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
            submit={() => console.log('dispatch(deleteProfileAction({id: idx, callBack: () => handleDeleteClose()}))')}
            context='Are you sure you want to delete this Profile?'
          />
          </div>
        )
      }
    }
  ]
}
