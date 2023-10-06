// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'
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

    {
      name: 'Status',
      sortable: false,
      minWidth: '130px',
      cell: row => {
        const status = row?.status

        return (
          <CustomChip
            size='medium'
            skin='light'
            sx={{
              padding: '0.2rem 0.4rem',
              flex: 1,
              height: '28px',
              '& .MuiChip-label': {
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                textOverflow: 'unset'
              }
            }}
            color={chipStatus[status?.toLowerCase()]?.color}
            label={chipStatus[status?.toLowerCase()]?.label}
          />
        )
      }
    },
    {
      name: 'Power',
      sortable: true,
      cell: row => {
        return getNull(row?.location) ? (
          <div>N/A</div>
        ) : (
          <CustomChip
            size='small'
            skin='light'
            color={chipStatus[row.power]?.color}
            label={
              <Icon icon={chipStatus[row.power]?.icon} width='15' height='15' color={chipStatus[row.power]?.color} />
            }
            sx={{
              padding: '0.9rem 0rem',
              margin: 'auto'
            }}
          />
        )
      }
    },
    {
      name: 'Speed',
      sortable: true,
      selector: row => {
        return getNull(row?.speed) ? <div>N/A</div> : <div>{row?.speed}</div>
      }
    },

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
    },

    {
      name: 'Last Location',
      sortable: true,
      selector: row => {
        return getNull(row?.location) ? <div>N/A</div> : <div>{row?.location}</div>
      },
      minWidth: '180px',
      conditionalCellStyles: [
        {
          when: row => row.location,
          classNames: ['break-word']
        }
      ]
    },

    {
      name: 'Last Route',
      sortable: true,
      minWidth: '120px',
      cell: row => {
        return getNull(row?.longitude) ? (
          <div>N/A</div>
        ) : (
          <CustomChip
            // onClick={() => handleOpenGeofence(row.id)}
            size='small'
            label={
              <Icon
                icon='ic:baseline-location-on'
                width='15'
                height='15'
                color='success'
                style={{ marginTop: '4px' }}
              />
            }
            color='success'
            skin='light'
            sx={{
              padding: '0.95rem 0rem',
              marginRight: '0.25rem'
            }}
          />
        )
      }
    }
  ]
}
