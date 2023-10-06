// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import { chipStatus } from 'src/components/states/chips'

// ** Icon import
import { Icon } from '@iconify/react'

export const columns = () => {
  return [
    {
      name: 'Asset Name',
      sortable: true,
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon icon='mdi:truck' color={row.iconColor} fontSize={20} />
          {row.name}
        </div>
      ),
      selector: row => row.name
    },

    {
      name: 'Tracking Date',
      sortable: true,
      selector: row => row.trackingDate
    }
  ]
}

export const rows = [
  {
    name: '769IJA',
    status: 'idle',
    trackingDate: '2021-05-01T12:30:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '769IJA AF',
    status: 'idle',
    trackingDate: '2020-01-01T12:00:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
    name: '769IJA XA',
    status: 'idle',
    trackingDate: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FF8B00',
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
    name: '469IJA GH',
    status: 'idle',
    trackingDate: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#C0C5D0',
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
    name: '122JI AH',
    status: 'idle',
    trackingDate: '2022-08-01T12:45:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FC3B61',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#FF8B00',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
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
    name: '122JI WA',
    status: 'idle',
    trackingDate: '2019-08-01T12:25:00',
    address: 'King Fahad Road, Riyadh, Saudi Arabia',
    speed: '0',
    iconColor: '#2FC17E',
    odometer: '1234567',
    ignition_status: 'off',
    gps_status: 'off',
    gsm_status: 'off',
    battery: '0',
    panic: '0',
    latitude: '23.765788',
    longitude: '44.567890'
  }
]
