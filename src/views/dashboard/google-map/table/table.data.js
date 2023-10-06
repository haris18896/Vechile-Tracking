// ** Third Party Components
import { Icon } from '@iconify/react'

// ** styles
import { chipStatus } from 'src/components/states/chips'
import { getNull } from 'src/utilities/utils'

export const columns = () => {
  return [
    {
      name: 'Asset Name',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        const status = row?.status

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ with: '20%', display: 'flex', alignItems: 'center' }}>
              <Icon icon='mdi:truck' color={chipStatus[status?.toLowerCase()].iconColor} fontSize={20} />
            </div>
            <div style={{ with: '80%' }}>{row.name}</div>
          </div>
        )
      }
    },
    // {
    //   name: 'Status',
    //   sortable: false,
    //   cell: row => {
    //     const status = row.status

    //     return (
    //       <CustomChip
    //         size='small'
    //         label={row.status}
    //         skin='light'
    //         sx={{
    //           padding: '0.4rem 0.5rem',
    //           minWidth: '100px',

    //           '& .MuiChip-label': {
    //             fontSize: '0.85rem',
    //             fontWeight: 600,
    //           }
    //         }}
    //         color={status === 'Moving' ? 'success' : status === 'IDLE' ? 'warning' : 'error'}
    //       />
    //     )
    //   }
    // },

    {
      name: 'Date/Time',
      sortable: true,
      selector: row =>
        row?.lastPacketReceived === 'N/A'
          ? 'N/A'
          : `${row.lastPacketReceived.split(' ')[0]} ${row.lastPacketReceived.split(' ')[1]}`,
      minWidth: '140px',
      conditionalCellStyles: [
        {
          when: row => row,
          classNames: ['break-word']
        }
      ]
    }
  ]
}

export const rows = [
  {
    asset: 'Asset 1',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 2',
    status: 'Stopped',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 3',
    status: 'IDLE',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 4',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 5',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 6',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 7',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 8',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 9',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 10',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 11',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 1',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 2',
    status: 'Stopped',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 3',
    status: 'IDLE',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 4',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 5',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 6',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 7',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 8',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 9',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 10',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  },
  {
    asset: 'Asset 11',
    status: 'Moving',
    date: '14-09-2021 08:53:09 PM'
  }
]
