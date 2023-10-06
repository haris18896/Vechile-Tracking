import { useRouter } from 'next/router'

// ** Custom Components
import { Icon } from '@iconify/react'
import CustomChip from 'src/@core/components/mui/chip'

export const columns = ({ ability }) => {
  const router = useRouter()

  return [
    {
      name: 'Type',
      sortable: true,
      selector: row => row.type
    },
    {
      name: 'Subject',
      sortable: true,
      selector: row => row.subject
    },
    {
      name: 'Created Date',
      sortable: true,
      selector: row => row.date_created
    },
    {
      name: 'Status',
      sortable: false,
      cell: row => (
        <CustomChip
          size='small'
          skin='light'
          sx={{
            padding: '0.4rem 0.5rem',
            '& .MuiChip-label': {
              fontSize: '0.85rem',
              fontWeight: 600
            }
          }}
          color={row?.status === 'Active' ? 'success' : 'error'}
          label={row.status}
        />
      )
    },
    {
      name: 'Edit',
      sortable: false,
      cell: row => {
        return (
          <div className='flex items-center justify-content-between'>
            {ability.can('update', 'update-email-template') && (
              <CustomChip
                onClick={() => router.push(`/catalogs/email-template/edit/${row.id}`)}
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
          </div>
        )
      }
    }
  ]
}

export const dummyRows = [
  {
    id: '1',
    type: 'Vehicle Register',
    subject: 'Vehicle Registration',
    date_created: '2021-05-05',
    status: 'Active'
  },
  {
    id: '2',
    type: 'Company Register',
    subject: 'Company Registration',
    date_created: '2021-05-05',
    status: 'Active'
  }
]
