// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Asset ID',
      sortable: true,
      selector: row => row.id
    },
    {
      name: 'Asset Name',
      sortable: true,
      selector: row => row.name
    },
    {
      name: 'Date/Time',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'Start Address',
      sortable: true,
      selector: row => row.address
    },
    {
      name: 'Stop Data/Time',
      sortable: true,
      selector: row => `${row.speed} KM/H`
    },
    {
      name: 'Stop Address',
      sortable: true,
      selector: row => `${row.odometer} KMs`
    },
    {
      name: 'Distance Traveled',
      sortable: true,
      cell: row => (
        <CustomChip
          size='small'
          skin='light'
          color={chipStatus[row.ignition_status]?.color}
          label={
            <Icon
              icon={chipStatus[row.ignition_status]?.icon}
              width='15'
              height='15'
              color={chipStatus[row.ignition_status]?.color}
            />
          }
          sx={{
            padding: '0.9rem 0rem',
            margin: 'auto'
          }}
        />
      )
    },
    {
      name: 'Duration',
      sortable: false,
      selector: row => (row.gps_status === 'off' ? 'N/A' : row.gps_status)
    },
    {
      name: 'Start Odometer',
      sortable: false,
      selector: row => (row.gsm_status === 'off' ? 'N/A' : row.gsm_status)
    },
    {
      name: 'Stop Odometer',
      sortable: false,
      selector: row => (row.battery === '0' ? 'N/A' : row.battery)
    },
    {
      name: 'View on map',
      sortable: false,
      selector: row => (row.panic === '0' ? 'N/A' : row.panic)
    },
    {
      name: 'Latitude',
      sortable: false,
      selector: row => row.latitude
    },
    {
      name: 'Longitude',
      sortable: false,
      selector: row => row.longitude
    }
  ]
}

export const rows = [
  {
    id: 1,
    name: '769IJA',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 2,
    name: '770IJA',
    status: 'driving',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '44',
    odometer: '1234567',
    ignition_status: 'on',
    gps_status: 'on',
    gsm_status: 'on',
    battery: '100',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 3,
    name: '771IJA',
    status: 'stopped',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 4,
    name: '772IJA',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 5,
    name: '773IJA',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 6,
    name: '774IJA',
    status: 'driving',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '44',
    odometer: '1234567',
    ignition_status: 'on',
    gps_status: 'on',
    gsm_status: 'on',
    battery: '100',
    panic: '1',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 7,
    name: '769IJA',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 8,
    name: '770IJA',
    status: 'driving',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '44',
    odometer: '1234567',
    ignition_status: 'on',
    gps_status: 'on',
    gsm_status: 'on',
    battery: '100',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 9,
    name: '771IJA',
    status: 'stopped',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
  {
    id: 10,
    name: '772IJA',
    status: 'idle',
    date: '2021-05-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  },
]