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
      selector: row => row.name
    },
    {
      name: 'Vehicle Reference Key',
      sortable: true,
      selector: row => row.vehicle_ref_key
    },
    {
      name: 'Driver Reference Key',
      sortable: true,
      selector: row => row.driver_ref_key
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
    },
    {
      name: 'Velocity',
      sortable: true,
      selector: row => `${row.velocity} KM/H`
    },
    {
      name: 'Weight',
      sortable: true,
      selector: row => row.weight
    },
    {
      name: 'Location Time',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'Vehicle Status',
      sortable: false,
      cell: row => {
        const vehicle_status = row?.vehicle_status

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
            color={chipStatus[vehicle_status]?.color}
            label={row.vehicle_status}
          />
        )
      }
    },
    {
      name: 'Address',
      sortable: true,
      selector: row => row.address
    },
    {
      name: 'Role Code',
      sortable: true,
      selector: row => row.role_code
    },
    {
      name: 'Response',
      sortable: true,
      selector: row => row.response
    },
    {
      name: 'Status',
      sortable: false,
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
            color={chipStatus[status]?.color}
            label={row.status}
          />
        )
      }
    },
    {
      name: 'Posting Time',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'Response Time',
      sortable: true,
      selector: row => `${row.date.split('T')[0]}\n${row.date.split('T')[1]}`
    },
    {
      name: 'Activity',
      sortable: true,
      selector: row => row.activity
    },
    {
      name: 'Temperature',
      sortable: true,
      selector: row => row.temperature
    },
    {
      name: 'Humidity',
      sortable: true,
      selector: row => row.humidity
    }
  ]
}

export const rows = [
  {
    name: '769IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
    name: '770IJA',
    vehicle_ref_key: '049849',
    driver_ref_key: '87712DaA',
    velocity: 'High',
    weight: '75 KG',
    vehicle_status: 'active',
    role_code: 'N/A',
    response: 'Not Found',
    activity: 'N/A',
    temperature: 'low',
    humidity: 'normal',
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
  }
]
